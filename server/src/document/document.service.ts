import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Doc, DocDocument} from "./schemas/document.schema";
import {Model, ObjectId} from "mongoose";
import {CreateDocDto} from "./dto/create-doc.dto";
import {S3Service} from "../s3/s3.service";
import {DocRevision, DocRevisionDocument} from "./schemas/docrevision.schema";
import {CreateDocRevisionDto} from "./dto/create-docRevision.dto";
import * as fs from "fs";
import { jsPDF } from "jspdf";
import {CryptoService} from "../crypto/crypto.service";


@Injectable ()
export class DocumentService {
    constructor (@InjectModel (Doc.name) private docModel: Model<DocDocument>,
                 @InjectModel (DocRevision.name) private docRevisionModel: Model<DocRevisionDocument>,
                 private s3Servise: S3Service,
                 private CryptoService: CryptoService
    ) {
    }

    // создание нового документа

    async create (dto: CreateDocDto): Promise<Doc> {
        return await this.docModel.create ({...dto});
    }

    // получние документа

    async getOne (id: ObjectId): Promise<Doc> {
        return this.docModel.findById (id).populate ('docRevisions');
    }
    // получение всех документов

    async getAll (): Promise<Doc[]> {
        return this.docModel.find ();
    }

    // удаление документа

    async delete (id: ObjectId): Promise<ObjectId> {
        const doc = await this.docModel.findByIdAndDelete (id)
        return doc._id
    }

    // удаление ревизии

    async deleteRevision (id: ObjectId): Promise<any> {
        const rev = await this.docRevisionModel.findById(id)
        const doc = await this.docModel.findById (rev.docId)
        await this.s3Servise.deleteFile (rev.key)
        await this.s3Servise.deleteFile(rev.certificateFile)
        const docRevisionIndex = doc.docRevisions.indexOf(rev._id)
        doc.docRevisions.splice(docRevisionIndex,1)
        await doc.save ();
        await rev.delete();
        return rev.certificateFile


    }

    // async createRevision(dto: CreateDocRevisionDto): Promise<DocRevision>{
    //     const doc = await this.docModel.findById (dto.docId)
    //     const docRevision = await this.docRevisionModel.create ({...dto});
    //     doc.docRevisions.push (docRevision._id);
    //     await doc.save ();
    //     return docRevision;
    // }

    //создание ревизии

    async createRevision (dto: CreateDocRevisionDto, key): Promise<DocRevision> {
        const cert = await new jsPDF();
        const date = new Date();
        const fileHash =  await this.CryptoService.getSHA256hash(key)
        cert.text(fileHash, 10, 10);
        cert.text("Certificate released:" , 10, 20 )
        cert.text("id: " + Date.now() , 10, 30 )
        cert.text("date: " + date.toLocaleDateString() +" "+ date.toLocaleTimeString(),10, 40);
        cert.text("revision name: " + dto.name, 10, 50);
        cert.text("author: " + dto.author, 10, 60);
        cert.text("Document ID: " + dto.docId, 10, 70);
        cert.text("Document type: " + dto.type, 10, 80);
        cert.text("Document status: " + dto.status, 10, 90);
        cert.text("Document type: " + dto.description, 10, 100);
        cert.cell(10,280,190,10,"Creation Request                    MRB Platform                https://mrb-info.ru",1,"")
        cert.save('fileHash.pdf');

        const fileContent =  Buffer.from(fs.readFileSync("fileHash.pdf", "utf8"));
        const doc = await this.docModel.findById (dto.docId)
        const fileKey = await this.s3Servise.upload (key.buffer)
        const fileHashKey = await  this.s3Servise.upload(fileContent)
        const docRevision = await this.docRevisionModel.create ({...dto, key: fileKey, certificateFile: fileHashKey, hash:fileHash});
        doc.docRevisions.push (docRevision._id);
        await doc.save ();
        return docRevision;
    }

    // получение файла из s3

    async getFile (key) {
        return await this.s3Servise.getFile (key)
 }

    //получение ревизии

    async getRevision (id: ObjectId): Promise<DocRevision> {
        return this.docRevisionModel.findById (id);
    }

    //редактирвоание ревизии

    async editRevision (id: ObjectId, dto: CreateDocRevisionDto){
        return this.docRevisionModel.findOneAndUpdate(id, {...dto})
    }
}

