import { Injectable } from '@nestjs/common';
import * as crypto from "crypto";

@Injectable()
export class CryptoService {

    async getSHA256hash(file?){

        const fileBuffer = await  Buffer?.from(file.buffer, "utf-8");
        return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    }

    // txt hash
    async getHash(file){
        const fileBuffer = Buffer.from(file.buffer, "utf-8");
        return fileBuffer.toString()

    }

    // pdf hash
     getPDFhash(file){
         const fileBuffer = Buffer.from(file.buffer, "utf-8");
         let raw = fileBuffer.toString();
         return raw.slice(raw.indexOf('Tj')-66,raw.indexOf('Tj')-2)

         }



}
