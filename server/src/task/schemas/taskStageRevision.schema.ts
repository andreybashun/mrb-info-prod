import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import {Task} from "./task.schema";
import {DocRevision} from "../../document/schemas/docrevision.schema";
import {TaskStage} from "./taskStage.schema";
import {Doc} from "../../document/schemas/document.schema";


export type TaskStageRevisionDocument = TaskStageRevision & Document;

@Schema ()
export class TaskStageRevision {
    @Prop ()
    name: string;

    @Prop ()
    type: string;

    @Prop ()
    author: string;

    @Prop ()
    status: string;
    //status: ['created','delivered','signed','rejected', 'withdraw']

    @Prop ()
    readonly discription: string;

    @Prop ()
    readonly decId: string;

    @Prop ()
    readonly lastChangeDate: string;

    @Prop ()
    readonly organization: string;

    @Prop ()
    readonly ata: string;

    @Prop ()
    readonly aircraftType: string;

    @Prop ()
    readonly engineType: string;

    @Prop ()
    readonly creationDate: string;

    @Prop ()
    readonly signer: string;


    @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'Task'})
    taskId: Task;

    @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'TaskStage'})
    taskStageId: TaskStage;

    @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'DocRevision'})
    docRevisionInherit: DocRevision;

    @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'Document'})
    docForSignId: Doc;

    @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'DocRevision'})
    docRevForSignId: DocRevision;

    @Prop ({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'DocRevision'}]})
    docRevForAttachId: DocRevision[];

}

export const TaskStageRevisionSchema = SchemaFactory.createForClass (TaskStageRevision);