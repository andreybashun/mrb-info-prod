import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskService} from "./task.service";
import {CreateTaskStageRevisionDto} from "./dto/create-taskStageRevision.dto";
import {CreateTaskStageDto} from "./dto/create-taskStage.dto";
import {ObjectId} from "mongoose";


@Controller('task')
export class TaskController {

    constructor (private taskService: TaskService) {
    }
    // создание задачи
    @Post()
    create (@Body () dto: CreateTaskDto) {
        return this.taskService.create(dto);
    }

    // получение задачи

    @Get(':id')
    getOne (@Param('id') id:ObjectId) {
        return this.taskService.getOne(id)
    }

    //получение всех задач
    @Get ()
    getAll () {
        return this.taskService.getAll ();
    }

    // удаление задачи

    @Delete(':id')
    delete (@Param('id') id:ObjectId) {
        return this.taskService.delete(id);
    }

    @Put(':id')
    editTask(@Param('id') id:ObjectId, @Body () dto: CreateTaskDto){
        return this.taskService.editTask(id, dto);
    }



    // создание этапа
    @Post('/stage')
    createTaskStage(@Body() dto: CreateTaskStageDto){
        return this.taskService.createTaskStage(dto)
    }


    // получение этапа
    @Get('/stage/:id')
    getTaskStage(@Param('id') id: ObjectId){
        return this.taskService.getTaskStage(id)
    }


    // изменение этапа
    @Put('/stage/:id')
    editTaskStage(@Param('id') id:ObjectId, @Body () dto: CreateTaskStageDto){
        return this.taskService.editTaskStage(id, dto);
    }

    // удаление этапа

    @Delete('/stage/:id')
    deleteTaskStage(@Param('id') id:ObjectId) {
        return this.taskService.deleteTaskStage(id);
    }

    // получение всех этапов

    @Get ('/stage')
    getAllStages () {
        return this.taskService.getAllStages();
    }


    // создание ревизии

    @Post('/revision')
    createRevision (@Body () dto: CreateTaskStageRevisionDto) {
        return this.taskService.createRevision(dto);
    }

    // получение ревизии

    @Get('/revision/:id')
    getRevision(@Param('id') id:ObjectId){
        return this.taskService.getRevision(id);
    }

    // удаление ревизии

    @Delete('/revision/:id')
    deleteRevision (@Param('id') id:ObjectId) {
        return this.taskService.deleteRevision(id);
    }

    // изменение ревизии
    @Put('/revision/:id')
    editRevision(@Param('id') id:ObjectId, @Body () dto: CreateTaskStageRevisionDto){
        return this.taskService.editRevision(id, dto);
    }
}
