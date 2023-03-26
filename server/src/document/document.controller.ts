import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {DocumentService} from "./document.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateDocDto} from "./dto/create-doc.dto";
import {CreateDocRevisionDto} from "./dto/create-docRevision.dto";
import {ObjectId} from "mongoose";


@Controller('document')
export class DocumentController {
    constructor (private documentService: DocumentService) {
    }

    @Post()
    create (@Body () dto: CreateDocDto) {
        return this.documentService.create (dto);
    }

    @Get(':id')
    getOne (@Param('id') id:ObjectId) {
        return this.documentService.getOne(id)
    }

    @Get ()
    getAll () {
        return this.documentService.getAll ();
    }


    @Delete(':id')
    delete (@Param('id') id:ObjectId) {
        return this.documentService.delete(id);
    }

    @Post('/revision')
    @UseInterceptors (
        FileInterceptor ('file'))
    createRevision (@UploadedFile () file,  @Body () dto: CreateDocRevisionDto) {
        return this.documentService.createRevision(dto, file);
    }


    @Get('/revision/:id')
    getRevision(@Param('id') id:ObjectId){
        return this.documentService.getRevision(id);
    }

    @Get(':id/:key')
    getFile(@Param('key') key:string){
        return this.documentService.getFile(key)
    }

    @Delete('revision/:id')
    deleteRevision (@Param('id') id:ObjectId) {
        return this.documentService.deleteRevision(id);
    }

    @Put('/revision/:id')
    editRevision(@Param('id') id:ObjectId, @Body () dto: CreateDocRevisionDto){
        return this.documentService.editRevision(id, dto);
    }




    // @Post('/revision')
    // createRevision(@Body() dto:CreateDocRevisionDto){
    //     return this.documentService.createRevision(dto)
    // }
}
