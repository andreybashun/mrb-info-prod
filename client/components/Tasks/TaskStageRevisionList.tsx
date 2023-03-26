import React from 'react';
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TaskStageRevisionItem from "./TaskStageRevisionItem";
import ArticleIcon from "@mui/icons-material/Article";
import {useRouter} from "next/router";
import {IUser} from "../../types/user";
import {ITasks, ITaskStage, ITaskStageRevision} from "../../types/task";

interface TaskStageRevisionListProps {
    user: IUser;
    task: ITasks;
    taskStage: ITaskStage;
    taskStageRevisions:ITaskStageRevision[];
    serverHost: string;
}

const TaskStageRevisionList:React.FC<TaskStageRevisionListProps> =
    ({taskStageRevisions, task, taskStage, user, serverHost}) => {
    const router = useRouter();
    return (
        <Stack direction={"column"} spacing={2} sx={{
            padding: 5,
        }}>
            <Stack direction="row" justifyContent={"space-between"}>
                <Button size="small" variant="contained" onClick={() =>
                    router.push ('/' + user._id + '/tasks/drafts/' + task._id + '/' + taskStage._id + '/createStageRevision')}>
                    Создать ревизию
                </Button>
                <Button startIcon={<ArticleIcon color="info"/>} size="small" variant="contained"
                        onClick={()=> router.push('/' + user._id + '/tasks/drafts/' + task._id + '/' + taskStage._id +  '/taskStageCard')}>
                    Карточка этапа
                </Button>
            </Stack>
            <List  sx={{padding:1, border: '1px  solid grey', borderRadius: 2}}>
                <Grid container spacing={2}>
                    <Grid xs={5} container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2, marginLeft:12}}>
                            Наименование ревизии
                        </Box>
                        <Divider/>

                    </Grid>
                    <Grid xs={2} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}
                    >
                        <Box sx={{marginTop:2}}>
                            автор
                        </Box>

                    </Grid>
                    <Grid xs={2} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2}}>
                            Согласующий
                        </Box>
                    </Grid>
                    <Grid xs={2} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2}}>
                            Дата изменнеия
                        </Box>
                    </Grid>
                    <Grid xs={1} container></Grid>
                </Grid>
                <Divider/>
                <Box p={2}>
                    {taskStageRevisions.map(taskStageRevision =>
                        <TaskStageRevisionItem key={taskStageRevision._id}
                                               taskStageRevision={taskStageRevision} task={task} user={user} taskStage={taskStage} serverHost={serverHost}/>
                    )}
                </Box>
            </List>
        </Stack>
    );
};

export default TaskStageRevisionList;