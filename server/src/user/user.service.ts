import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {S3Service} from "../s3/s3.service";
import {TaskStageRevision, TaskStageRevisionDocument} from "../task/schemas/taskStageRevision.schema";
import {CreateTaskStageRevisionDto} from "../task/dto/create-taskStageRevision.dto";



@Injectable()
export class UserService {
    constructor (@InjectModel (User.name) private userModel: Model<UserDocument >,
                 @InjectModel (TaskStageRevision.name) private taskStageRevisionModel: Model<TaskStageRevisionDocument>,
                 private s3Servise: S3Service
    ) {

    }
    async create (dto: CreateUserDto, key): Promise<User> {
        const fileKey = await this.s3Servise.uploadPng(key.buffer)
        return await this.userModel.create ({...dto, avatar: fileKey});
    }

    // получние пользователя

    async getOne (id: ObjectId): Promise<User> {
        return this.userModel.findById (id);
    }
    // получение всех пользователей

    async getAll (): Promise<User[]> {
        return this.userModel.find ();
    }

  //  удаление пользователя

    async delete (id: ObjectId): Promise<ObjectId>{
        return this.userModel.findByIdAndDelete (id);

    }

    // добовление входящей задачи

    async addTaskInBox(id:ObjectId, dto:CreateTaskStageRevisionDto): Promise<User>{
        const user = await  this.userModel.findById(id)
        user.taskInBox.push(dto);
        user.save();
        return user
    }

    async deleteTaskInBox(id:ObjectId, dto:CreateTaskStageRevisionDto): Promise<User>{
        const user = await  this.userModel.findById(id)
        const taskInBoxIndex = user.taskInBox.indexOf(dto)
        user.taskInBox.splice(taskInBoxIndex,1)
        await user.save ();
        return user
    }

    async editUser(id:ObjectId, dto:CreateTaskStageRevisionDto): Promise<User>{
        const user = await  this.userModel.findByIdAndUpdate(id, dto);
        user.save();
        return user
    }
   

}
