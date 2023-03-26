import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";
import {Task} from "./task.schema";
import {TaskStageRevision} from "./taskStageRevision.schema";


export type TaskStageDocument = TaskStage & Document;

@Schema ()
export class TaskStage {
    // document data

    @Prop ()
    name: string;     // наименование документа

    @Prop ()
    type: string;     // тип документа


    @Prop ()
    status: string;   // статус документа


    @Prop()
    decId: string;     // децимальный ID (партийный номер)

    @Prop()
    creationDate: string; // дата создания

    @Prop ()
    lastChangeDate: string; // дата последнего изменения

    @Prop ()
    discription: string;   // описание документа

    @Prop ({type: mongoose.Schema.Types.ObjectId, ref: 'Task'})
    taskId: Task;

    @Prop ({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'TaskStageRevision'}]})
    taskStageRevisions: TaskStageRevision[];

    // user data

    @Prop()
    organization:string;  // организация автора документа
    @Prop ()
    author: string;   // автор документа


    // aircraft data

    @Prop()
    ata: string;   //ATA chapter

    @Prop()
    aircraftType: string;   // тип воздушного судна

    @Prop()
    engineType:string;   // тип воздушного судна

}

export const TaskStageSchema = SchemaFactory.createForClass (TaskStage);