import React from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";
import TaskList from "../../../../components/Tasks/TaskList";
import Breadcrumbs from "nextjs-breadcrumbs";
import MLayout from "../../../../layouts/MLayout";

const Index = ({tasks, user, serverHost}) => {
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
            <TaskList tasks={tasks} user={user} taskStatus={'draft'} serverHost={serverHost}/>
        </MLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const response = await axios.get (process.env.SERVER_HOST + 'task/');
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            tasks: response.data,
            user: resUser.data,
            serverHost: process.env.SERVER_HOST,
        }
    }
}
