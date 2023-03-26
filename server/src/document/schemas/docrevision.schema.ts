import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";
import {Doc} from "./document.schema";

export type DocRevisionDocument = DocRevision & Document;

@Schema ()
export class DocRevision {
    @Prop ()
    name: string;   // имя ревизии

    @Prop ()
    type: string;   // тип ревизии

    @Prop ()
    status: string;   // статус ревизии

    @Prop ()
    key: string; // s3 key

    @Prop()
    decId: string;     // децимальный ID (партийный номер)

    @Prop()
    creationDate: string; // дата создания

    @Prop ()
    lastChangeDate: string; // дата последнего изменения

    @Prop ()
    discription: string;   // описание документа

    @Prop()
    organization:string;  // организация автора документа
    @Prop ()
    author: string;   // автор документа

    @Prop ()
    certificateFile: string // файл сертификата

    @Prop()
    hash:string     // значение хеш функции

    @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'Doc'})   // родительский контейнер
    docId: Doc;

    @Prop()
    ata: string;   //ATA chapter

    @Prop()
    aircraftType: string;   // тип воздушного судна

    @Prop()
    engineType:string;   // тип воздушного судна

    @Prop()
    description:string // описание ревизии

}

export const DocRevisionSchema = SchemaFactory.createForClass (DocRevision);