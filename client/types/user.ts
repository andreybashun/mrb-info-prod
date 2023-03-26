export interface ITaskStageRevision {
    _id: string;
    name: string;
    type: string;
    author: string;
    status: string;
    key: string;
    revNum: number;
    signer: string;
    task: string;
    duedate: string;
    taskId: string;
    taskStageId: string;
    creationDate: string;
    lastChangeDate: string;
}
export  interface IUser {
    _id: string;
    email: string;
    firstName: string;
    secondName: string;
    password: string;
    avatar: string;
    taskInBox: ITaskStageRevision[];
}

