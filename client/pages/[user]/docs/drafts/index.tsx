import React from 'react';
import DocList from "../../../../components/Docs/DocList";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../../../store";
import {fetchDocs} from "../../../../store/actions-creators/doc";
import Breadcrumbs from "nextjs-breadcrumbs";
import axios from "axios";
import MLayout from "../../../../layouts/MLayout";



const Index = (props) => {

    const {docs, error} = useTypedSelector(state => state.doc)

    if (error){
        return <MLayout user = {props.user}>
            <h1>{error}</h1>
        </MLayout>
    }

    return (
        <MLayout user = {props.user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'docs', to: 'мои документы'},
                        {from: 'drafts', to: 'проекты'},
                        {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                    ]
                    }
                />
            </div>
            <DocList docs={docs} user={props.user} path={props.serverHost}/>
        </MLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(async ({store, params}) => {
    const  dispatch = store.dispatch as NextThunkDispatch
    const response = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    await dispatch(await fetchDocs())
    return {
        props: {
            user: response.data,
            serverHost: process.env.SERVER_HOST,
        }
    }
})
