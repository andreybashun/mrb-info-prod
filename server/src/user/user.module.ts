import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {S3Controller} from "../s3/s3.controller";
import {S3Service} from "../s3/s3.service";
import {TaskStageRevision, TaskStageRevisionSchema} from "../task/schemas/taskStageRevision.schema";
import {TaskController} from "../task/task.controller";
import {TaskService} from "../task/task.service";
import {Doc, DocSchema} from "../document/schemas/document.schema";
import {DocRevision, DocRevisionSchema} from "../document/schemas/docrevision.schema";
import {Task, TaskSchema} from "../task/schemas/task.schema";
import {TaskStage, TaskStageSchema} from "../task/schemas/taskStage.schema";

@Module({
  imports:[ MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    MongooseModule.forFeature ([{name: Doc.name, schema: DocSchema}],),
    MongooseModule.forFeature ([{name: DocRevision.name, schema: DocRevisionSchema}],),
    MongooseModule.forFeature ([{name: Task.name, schema: TaskSchema}],),
    MongooseModule.forFeature ([{name: TaskStage.name, schema: TaskStageSchema}],),
    MongooseModule.forFeature ([{name: TaskStageRevision.name, schema: TaskStageRevisionSchema}],),


  ],
  controllers: [UserController,S3Controller, TaskController],
  providers: [UserService, S3Service, TaskService]
})
export class UserModule {}
