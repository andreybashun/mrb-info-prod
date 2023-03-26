import React from 'react';
import {GetServerSideProps} from "next";
import axios from "axios";
import TaskStageRevisionList from "../../../../../../components/Tasks/TaskStageRevisionList";
import Breadcrumbs from "nextjs-breadcrumbs";
import MLayout from "../../../../../../layouts/MLayout";

const Index = ({taskStageRevision, taskId, stageId, stage, task, user, serverHost}) => {
    return (
        <MLayout user={user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'tasks', to: 'мои задачи'},
                        {from: 'outbox', to: 'исходящие задачи'},
                        {from: taskId, to: 'задача: ' + task.name},
                        {from: stageId, to: 'этап:' + stage.name},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                    ]
                    }
                />
            </div>
            <TaskStageRevisionList taskStageRevisions={taskStageRevision} task={task} taskStage={stage} user={user} serverHost={serverHost}/>
        </MLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const response = await axios.get (process.env.SERVER_HOST + 'task/stage/' + params.stage);
    const res = await axios.get (process.env.SERVER_HOST + 'task/' + response.data.taskId)
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);

    return {
        props: {
            taskStageRevision: response.data.taskStageRevisions,
            taskId: params.task,
            stageId: params.stage,
            stage: response.data,
            task: res.data,
            user: resUser.data,
            serverHost:process.env.SERVER_HOST

        }
    }
}