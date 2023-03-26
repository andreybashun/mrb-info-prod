import {ObjectId, Schema} from "mongoose";


export class CreateDocDto {
    readonly name;
    readonly type;
    readonly author;
    readonly status;
    readonly discription;
    readonly decId;
    readonly lastChangeDate;
    readonly organization;
    readonly ata;
    readonly aircraftType;
    readonly engineType;
    readonly creationDate;
}