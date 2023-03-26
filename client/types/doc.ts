export  interface IDoc {
    _id: string;
    name: string;
    type: string;
    author: string;
    status: string;
    key: string;
    docRevisions: IDocRevision[];
    lastChangeDate:string;
    discription: string;
    decId: string;
    organization: string;
    ata: string;
    aircraftType: string;
    engineType: string;
    creationDate: string;
}


export interface IDocRevision{
    _id: string;
    name: string;   // имя ревизии
    type: string;   // тип ревизии
    status: string;   // статус ревизии
    key: string; // s3 key
    decId: string;     // децимальный ID (партийный номер)
    creationDate: string; // дата создания
    lastChangeDate: string; // дата последнего изменения
    discription: string;   // описание документа
    organization:string;  // организация автора документа
    author: string;   // автор документа
    certificateFile: string // файл сертификата
    hash:string     // значение хеш функции
    docId: IDoc;
    ata: string;   //ATA chapter
    aircraftType: string;   // тип воздушного судна
    engineType:string;   // тип воздушного судна
    // task: Task;
    // docRevisionInherit: DocRevision;
    // docRevForSignId: DocRevision[];
    // docRevForAttachId: DocRevision[];
}



export  interface DocState{
    docs: IDoc[];
    error: string;
}

export  enum DocActionTypes{
    FETCH_DOCS = 'FETCH_DOC',
    FETCH_DOCS_ERROR = 'FETCH_DOCS_ERROR',
}

interface FetchDocsAction{
    type: DocActionTypes.FETCH_DOCS;
    payload: IDoc[];
}

interface FetchDocsErrorAction{
    type: DocActionTypes.FETCH_DOCS_ERROR;
    payload: string;
}

export type DocAction = FetchDocsAction | FetchDocsErrorAction
