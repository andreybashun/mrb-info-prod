import React, {} from 'react';
import DocRevisionList from "../../../../../components/Docs/DocRevisionList";
import {GetServerSideProps} from "next";
import axios from "axios";
import Breadcrumbs from "nextjs-breadcrumbs";
import MLayout from "../../../../../layouts/MLayout";


const Index = ({docRevisions, document, user, serverHost}) => {

    return (
        <MLayout user = {user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'docs', to: 'мои документы'},
                    {from: 'drafts', to: 'проекты'},
                    {from: document, to: 'документ'},
                    {from: user._id, to: user.firstName[0] + '.' + user.secondName},

                ]
                }
            />
            <DocRevisionList docRevisions={docRevisions} user={user} serverHost={serverHost}/>
        </MLayout>
    );

};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (process.env.SERVER_HOST + 'document/' + params.draft);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            docRevisions: response.data.docRevisions,
            document: params.draft,
            user:resUser.data,
            serverHost:process.env.SERVER_HOST,
        }
    }
}

