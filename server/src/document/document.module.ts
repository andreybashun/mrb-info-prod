import {Module} from '@nestjs/common';
import {DocumentController} from './document.controller';
import {DocumentService} from './document.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Doc, DocSchema} from "./schemas/document.schema";
import {S3Service} from "../s3/s3.service";
import {DocRevision, DocRevisionSchema} from "./schemas/docrevision.schema";
import {Task, TaskSchema} from "../task/schemas/task.schema";
import {TaskStageRevision, TaskStageRevisionSchema} from "../task/schemas/taskStageRevision.schema";
import {S3Controller} from "../s3/s3.controller";
import {CryptoService} from "../crypto/crypto.service";
import {TaskStage, TaskStageSchema} from "../task/schemas/taskStage.schema";

@Module ({
    imports: [
        MongooseModule.forFeature ([{name: Doc.name, schema: DocSchema}],),
        MongooseModule.forFeature ([{name: DocRevision.name, schema: DocRevisionSchema}],),
        MongooseModule.forFeature ([{name: Task.name, schema: TaskSchema}],),
        MongooseModule.forFeature ([{name: TaskStage.name, schema: TaskStageSchema}],),
        MongooseModule.forFeature ([{name: TaskStageRevision.name, schema: TaskStageRevisionSchema}],),
    ],

    controllers: [DocumentController, S3Controller],
    providers: [DocumentService, S3Service, CryptoService]
})
export class DocumentModule {
}
