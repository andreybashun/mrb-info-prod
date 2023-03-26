import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListItemButton from "@mui/material/ListItemButton";
import {useRouter} from "next/router";
import {IUser} from "../../types/user";
import {ITaskStageRevision} from "../../types/task";
import axios from "axios";

interface TaskItemInBoxProps {
    user:IUser;
    serverHost: string;
    task: ITaskStageRevision;
}

const TaskItemInBox: React.FC<TaskItemInBoxProps> = ({user, serverHost, task}) => {

    const router = useRouter();
    const [author, setAuthor] = React.useState ('')

    useEffect(() => {
        axios.get(`${serverHost}user/${task.author}`)
            .then (resp => {
                setAuthor(`${resp.data.firstName[0]}.${resp.data.secondName}`)
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
                    <IconButton color="info"  onClick={() => router.push ('/' + user._id + '/tasks/inbox/' + task._id)}>
                        <AssignmentIcon/>
                    </IconButton>
                    {task.name}
                </Grid>
                <Grid xs={4}  container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {author}
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

                    {/*<TaskOptionMenu task={task} user={user} serverHost={serverHost}/>*/}

                </Grid>
                <Divider/>
            </ListItemButton>
        </Grid>

    );
};

export default TaskItemInBox;
