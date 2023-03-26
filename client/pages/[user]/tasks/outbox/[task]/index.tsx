import React from 'react';
import TaskStageList from "../../../../../components/Tasks/TaskStageList";
import {GetServerSideProps} from "next";
import axios from "axios";
import Breadcrumbs from "nextjs-breadcrumbs";
import MLayout from "../../../../../layouts/MLayout";

const Index = ({taskStage, task, user, serverHost}) => {
    return (
        <MLayout user={user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'tasks', to: 'мои задачи'},
                        {from: 'outbox', to: 'исходящие задачи'},
                        {from: task._id, to: 'задача: ' + task.name},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                    ]
                    }
                />
            </div>
            <TaskStageList taskStages={taskStage} task={task} user={user} serverHost={serverHost}/>
        </MLayout>
    );
};

export default Index;


export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const response = await axios.get (process.env.SERVER_HOST +'task/' + params.task);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            taskStage: response.data.taskStages,
            task:response.data,
            taskId: params.task,
            user:resUser.data,
            serverHost: process.env.SERVER_HOST,
        }
    }
}