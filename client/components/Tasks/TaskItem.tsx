import React from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListItemButton from "@mui/material/ListItemButton";
import {useRouter} from "next/router";
import TaskOptionMenu from "./TaskOptionMenu";
import {IUser} from "../../types/user";
import {ITasks} from "../../types/task";

interface TaskItemProps {
    user:IUser;
    task:ITasks;
    serverHost: string;
}

const TaskItem: React.FC<TaskItemProps> = ({task, user, serverHost}) => {
    const router = useRouter();
    return (
        <Grid container spacing={2}>
            <ListItemButton>
            <Grid xs={5} container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center">
                <IconButton color="info"  onClick={() => router.push ('/' + user._id + '/tasks/drafts/' + task._id)}>
                    <AssignmentIcon/>
                </IconButton>
                {task.name}
            </Grid>
            <Grid xs={4}  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {`${user.firstName[0]}.${user.secondName}`}
            </Grid>
            <Grid xs={2} container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                {task.lastChangeDate}
            </Grid>
            <Grid xs={1} container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center">

                    <TaskOptionMenu task={task} user={user} serverHost={serverHost}/>

            </Grid>
            <Divider/>
                </ListItemButton>
        </Grid>

    );
};

export default TaskItem;
