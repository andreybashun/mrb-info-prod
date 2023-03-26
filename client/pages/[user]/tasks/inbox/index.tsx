import React from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";
import Breadcrumbs from "nextjs-breadcrumbs";
import MLayout from "../../../../layouts/MLayout";
import TaskInBoxList from "../../../../components/Tasks/TaskInBoxList";

const Index = ({ user, serverHost}) => {
    return (

        <MLayout user={user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'tasks', to: 'мои задачи'},
                        {from: 'outbox', to: 'исходящие задачи'},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                    ]
                    }
                />
            </div>
            <TaskInBoxList user={user} serverHost={serverHost}/>
        </MLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            user: resUser.data,
            serverHost: process.env.SERVER_HOST,
        }
    }
}
