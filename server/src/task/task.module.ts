import {Module} from '@nestjs/common';
import {TaskController} from './task.controller';
import {TaskService} from './task.service';
import {S3Service} from "../s3/s3.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Doc, DocSchema} from "../document/schemas/document.schema";
import {DocRevision, DocRevisionSchema} from "../document/schemas/docrevision.schema";
import {Task, TaskSchema} from "./schemas/task.schema";
import {TaskStageRevision, TaskStageRevisionSchema} from "./schemas/taskStageRevision.schema";
import {TaskStage, TaskStageSchema} from "./schemas/taskStage.schema";
import {User, UserSchema} from "../user/schemas/user.schema";
import {UserController} from "../user/user.controller";
import {UserService} from "../user/user.service";

@Module ({
    imports: [
        MongooseModule.forFeature ([{name: Doc.name, schema: DocSchema}],),
        MongooseModule.forFeature ([{name: DocRevision.name, schema: DocRevisionSchema}],),
        MongooseModule.forFeature ([{name: Task.name, schema: TaskSchema}],),
        MongooseModule.forFeature ([{name: TaskStage.name, schema: TaskStageSchema}],),
        MongooseModule.forFeature ([{name: TaskStageRevision.name, schema: TaskStageRevisionSchema}],),
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    ],
    controllers: [TaskController, UserController],
    providers: [TaskService, S3Service, UserService]
})
export class TaskModule {
}
