import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Doc, DocDocument} from "../document/schemas/document.schema";
import {Model, ObjectId} from "mongoose";
import {DocRevision, DocRevisionDocument} from "../document/schemas/docrevision.schema";
import {Task, TaskDocument} from "./schemas/task.schema";
import {TaskStageRevision, TaskStageRevisionDocument} from "./schemas/taskStageRevision.schema";
import {CreateTaskDto} from "./dto/create-task.dto";
import {CreateTaskStageRevisionDto} from "./dto/create-taskStageRevision.dto";
import {TaskStage, TaskStageDocument} from "./schemas/taskStage.schema";
import {CreateTaskStageDto} from "./dto/create-taskStage.dto";
import {User, UserDocument} from "../user/schemas/user.schema";


@Injectable()
export class TaskService {

    constructor (@InjectModel (Doc.name) private docModel: Model<DocDocument>,
                 @InjectModel (DocRevision.name) private docRevisionModel: Model<DocRevisionDocument>,
                 @InjectModel (Task.name) private taskModel: Model<TaskDocument>,
                 @InjectModel (TaskStage.name) private taskStageModel: Model<TaskStageDocument>,
                 @InjectModel (TaskStageRevision.name) private taskStageRevisionModel: Model<TaskStageRevisionDocument>,
                 @InjectModel (User.name) private userModel: Model<UserDocument>,
    ) {
    }
    // создание задчи
    async create (dto: CreateTaskDto): Promise<Task> {
        return await this.taskModel.create ({...dto});
    }

    // получние задачи

    async getOne (id: ObjectId): Promise<Task> {
        return this.taskModel.findById (id).populate ('taskStages');
    }

    async getAll (): Promise<Task[]> {
        return this.taskModel.find ();
    }

    // удаление задачи

    async delete (id: ObjectId): Promise<ObjectId> {
        const task = await this.taskModel.findByIdAndDelete (id)
        return task._id
    }

    //редактирвоание задачи

    async editTask (id: ObjectId, dto: CreateTaskDto){
        return this.taskModel.findOneAndUpdate (id, {...dto});

    }


    //создание этапа
    async createTaskStage(dto:CreateTaskStageDto):Promise<TaskStage>{
        const task = await  this.taskModel.findById(dto.taskId);
        const taskStage = await  this.taskStageModel.create({...dto});
        task.taskStages.push(taskStage._id);
        await  task.save();
        return taskStage;
    }

    //получние этапа
     async  getTaskStage(id:ObjectId):Promise<TaskStage>{
        return this.taskStageModel.findById(id).populate('taskStageRevisions')
     }

    //удаление этапа

    async deleteTaskStage(id: ObjectId):Promise<ObjectId>{
        const taskStage = await this.taskStageModel.findByIdAndDelete(id)
        const task = await this.taskModel.findById(taskStage.taskId)
        const taskStageIndex = task.taskStages.indexOf(taskStage._id)
        task.taskStages.splice(taskStageIndex,1)
        await task.save ();
        return taskStage._id
    }

    //редактирвоание этапа

    async editTaskStage (id: ObjectId, dto: CreateTaskStageDto): Promise<TaskStage>{
        const task = await  this.taskModel.findById(dto.taskId);
        const taskStage = await this.taskStageModel.findByIdAndUpdate(id, {...dto}, {new:true});
        task.taskStages.push(taskStage._id);
        return taskStage
    }

    // получение всех этапов

    async getAllStages (): Promise<TaskStage[]> {
        return this.taskStageModel.find ();
    }

    // создание ревизии
    async createRevision (dto: CreateTaskStageRevisionDto): Promise<TaskStageRevision>{
        const user = await this.userModel.findById(dto.author)
        const  taskStage = await  this.taskStageModel.findById(dto.taskStageId);
        const  docRevForSign = await  this.docModel.findById(dto.docRevForSignId);
        const  docRevForAttach = await  this.docModel.findById(dto.docRevForAttachId);
        const docForSign = await  this.docModel.findById(dto.docForSignId)
        const taskStageRevision =  await this.taskStageRevisionModel.create({...dto, docRevForSign, docRevForAttach, docForSign});
        taskStage.taskStageRevisions.push(taskStageRevision);
        user.draftsInBox.push(taskStageRevision)
        await taskStage.save();
        await user.save();
        return taskStageRevision;
    }

    // получение ревизии
    async getRevision (id: ObjectId): Promise<TaskStageRevision> {
        return this.taskStageRevisionModel.findById (id);
    }


    // удаление ревизии
    async deleteRevision (id: ObjectId): Promise<ObjectId> {

        const revision = await this.taskStageRevisionModel.findByIdAndDelete (id);
        const revisionSigner = await this.userModel.findById(revision.signer);
        const taskStage = await this.taskStageModel.findById (revision.taskStageId);
        const taskStageRevisionIndex = taskStage.taskStageRevisions.indexOf(revision);
        taskStage.taskStageRevisions.splice(taskStageRevisionIndex,1);
        const draftIndex = revisionSigner.draftsInBox.indexOf(revision);
        revisionSigner.draftsInBox.splice(draftIndex,1)
        await taskStage.save ();
        await revisionSigner.save();
        return
    }

    //редактирвоание ревизии

    async editRevision (id: ObjectId, dto: CreateTaskStageRevisionDto){
        const task = await  this.taskModel.findById(dto.taskId);
        const  taskStage = await  this.taskStageModel.findById(dto.taskStageId);
        const  docRevForSign = await  this.docModel.findById(dto.docRevForSignId);
        const  docRevForAttach = await  this.docModel.findById(dto.docRevForAttachId);
        const docForSign = await  this.docModel.findById(dto.docForSignId)
        const taskStageRevision = await this.taskStageRevisionModel.findByIdAndUpdate(id, {...dto, docRevForSign, docRevForAttach, docForSign}, {new:true});
        await taskStage.taskStageRevisions.push(taskStageRevision);
        await task.taskStages.push(taskStage._id);
        return taskStageRevision
    }


}
