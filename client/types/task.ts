export  interface ITasks{
    _id: string;
    name: string;
    type: string;
    author: string;
    status: string;
    key: string;
    taskStages: ITaskStage[];
    lastChangeDate:string;
    creationDate:string;

}

export interface ITaskStage{
    _id: string;
    name: string;
    type: string;
    author: string;
    status: string;
    key: string;
    taskId:string;
    taskStageRevisions: ITaskStageRevision[];
    lastChangeDate:string;
    creationDate:string;
}


export interface ITaskStageRevision{
    _id: string;
    name: string;
    type: string;
    author: string;
    status: string;
    key: string;
    revNum: number;
    signer:string;
    task:string;
    duedate:string;
    taskId:string;
    taskStageId:string;
    creationDate:string;
    lastChangeDate:string;

    // task: Task;
    // docRevisionInherit: DocRevision;
    // docRevForSignId: DocRevision[];
    // docRevForAttachId: DocRevision[];
}



