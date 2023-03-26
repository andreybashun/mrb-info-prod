import {ObjectId} from "mongoose";

export class CreateTaskStageDto {
    readonly name;
    readonly type;
    readonly author;
    readonly status;

    readonly discription;
    readonly lastChangeDate;
    readonly organization;
    readonly ata;
    readonly aircraftType;
    readonly engineType;
    readonly creationDate;
    readonly taskId;
}