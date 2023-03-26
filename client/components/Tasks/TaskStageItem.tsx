import React from 'react';
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {useRouter} from "next/router";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskStageOptionMenu from "./TaskStageOptionMenu";
import {IUser} from "../../types/user";
import {ITasks, ITaskStage} from "../../types/task";

interface TaskStageItemProps {
    user:IUser;
    task:ITasks;
    taskStage:ITaskStage;
    serverHost:string;
}


const TaskStageItem: React.FC<TaskStageItemProps> = ({taskStage, task, user, serverHost}) => {
    const router = useRouter();
    return (
        <Grid container spacing={2}>
            <ListItemButton>
                <Grid xs={5} container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center">

                        <IconButton color="info"  onClick={() => router.push ('/' + user._id + '/tasks/drafts/' + task._id + '/' + taskStage._id)}>
                            <AssignmentIcon/>
                        </IconButton>

                    {taskStage.name}
                </Grid>
                <Grid xs={3}  container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {`${user.firstName[0]}.${user.secondName}`}
                </Grid>

                <Grid xs={3} container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {taskStage.creationDate}
                </Grid>
                <Grid xs={1} container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center">
                    <TaskStageOptionMenu taskStage={taskStage} task={task} user={user} serverHost={serverHost}/>
                </Grid>
                <Divider/>
            </ListItemButton>
        </Grid>
    );
};

export default TaskStageItem;
