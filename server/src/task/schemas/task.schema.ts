import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from "mongoose";
import {TaskStage} from "./taskStage.schema";


export type TaskDocument = Task & Document;

@Schema ()
export class Task {
    // document data

    @Prop ()
    name: string;     // наименование документа

    @Prop ()
    type: string;     // тип документа


    @Prop ()
    status: string;   // статус документа

    // @Prop ()
    // key: string;      // ключ хранения в s3

    @Prop()
    decId: string;     // децимальный ID (партийный номер)

    @Prop()
    creationDate: string; // дата создания

    @Prop ()
    lastChangeDate: string; // дата последнего изменения

    @Prop ()
    discription: string;   // описание документа

    @Prop ({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'TaskStage'}]})
    taskStages: TaskStage[];

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

export const TaskSchema = SchemaFactory.createForClass (Task);