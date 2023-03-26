import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskStageRevisionOptionMenu from "./TaskStageRevisionOptionMenu";
import {IUser} from "../../types/user";
import {ITasks, ITaskStage, ITaskStageRevision} from "../../types/task";
import axios from "axios";


interface TaskStageRevisionItemProps {
    user: IUser;
    task: ITasks;
    taskStage: ITaskStage;
    taskStageRevision:ITaskStageRevision;
    serverHost:string
}

const TaskStageRevisionItem:React.FC<TaskStageRevisionItemProps> = ({taskStageRevision, task, user, serverHost}) => {
    const router = useRouter();
    const [signer, setSigner] = React.useState ('')

    useEffect(() => {
         axios.get(`${serverHost}user/${taskStageRevision.signer}`)
             .then (resp => {
                 setSigner(`${resp.data.firstName[0]}.${resp.data.secondName}`)
             })
             .catch (e => console.log (e))
        return
    })
    return (
        <Grid container spacing={2}>
            <ListItemButton>
                <Grid xs={5} container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center">
                        <IconButton color="info"  onClick={() => router.push ('/' +
                            user._id + '/tasks/drafts/' + task._id + '/'+ taskStageRevision.taskStageId + '/' + taskStageRevision._id)}>
                            <AssignmentIcon/>
                        </IconButton>
                    {taskStageRevision.name}
                </Grid>
                <Grid xs={2}  container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {`${user.firstName[0]}.${user.secondName}`}
                </Grid>
                <Grid xs={2} container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {signer}
                </Grid>
                <Grid xs={2} container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {taskStageRevision.lastChangeDate}
                </Grid>
                <Grid xs={1} container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center">
                    <TaskStageRevisionOptionMenu taskStageRevision={taskStageRevision} user={user} serverHost={serverHost}/>
                </Grid>
                <Divider/>
            </ListItemButton>
        </Grid>
    );
};

export default TaskStageRevisionItem;