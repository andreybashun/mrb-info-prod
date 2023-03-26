import {Body, Controller, Delete, Get} from '@nestjs/common';
import {Post, UseInterceptors, UploadedFile} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {S3Service} from "./s3.service";


@Controller ('s3')
export class S3Controller {
    constructor (private s3service: S3Service) {
    }

    @Post ()
    @UseInterceptors (FileInterceptor ('file'))
    async upload (@UploadedFile () file) {
        return await this.s3service.upload (file);
    }

    @Post ()
    @UseInterceptors (FileInterceptor ('file'))
    async uploadPng (@UploadedFile () file) {
        return await this.s3service.uploadPng (file);
    }


    @Get ()
    getFile (@Body ('key') key: string) {
        return this.s3service.getFile (key);
    }


    @Delete()
    deleteFile (@Body ('key') key: string) {
        return this.s3service.deleteFile(key);
    }
}
