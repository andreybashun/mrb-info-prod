import {DocAction, DocActionTypes, DocState} from "../../types/doc";

const  initialState: DocState = {
    docs:[],
    error: ''
}

export  const docReducer = (state = initialState, action: DocAction): DocState => {
    switch (action.type){
        case DocActionTypes.FETCH_DOCS:
            return {error:'', docs:action.payload}
        case DocActionTypes.FETCH_DOCS_ERROR:
            return {...state, error: action.payload}

        default:
            return state
    }
}