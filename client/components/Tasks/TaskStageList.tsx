import React from 'react';
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TaskStageItem from "./TaskStageItem";
import ArticleIcon from "@mui/icons-material/Article";
import {useRouter} from "next/router";
import {IUser} from "../../types/user";
import {ITasks, ITaskStage} from "../../types/task";

interface TaskStageListProps {
    user:IUser;
    task:ITasks;
    taskStages:ITaskStage[];
    serverHost:string;
}

const TaskStageList: React.FC <TaskStageListProps> = ({taskStages, task, user, serverHost}) => {
    const router = useRouter();
    return (
        <Stack direction={"column"} spacing={2} sx={{
            padding: 5,
        }}>
            <Stack direction="row"  justifyContent={"space-between"}>
                <Button size="small" variant="contained" onClick={() =>
                    router.push ('/' + user._id + '/tasks/drafts/' + task._id + '/createStage')}>
                    Создать этап
                </Button>
                <Button startIcon={<ArticleIcon color="info"/>} size="small" variant="contained"
                        onClick={()=> router.push('/' + user._id + '/tasks/drafts/' + task._id + '/taskCard')}>
                    Карточка задачи
                </Button>
            </Stack>
            <List  sx={{padding:1, border: '1px  solid grey', borderRadius: 2}}>
                <Grid container spacing={2}>
                    <Grid xs={5} container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2, marginLeft:8}}>
                            Наименование этапа
                        </Box>
                        <Divider/>

                    </Grid>
                    <Grid xs={3} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}
                    >
                        <Box sx={{marginTop:2}}>
                            автор
                        </Box>

                    </Grid>

                    <Grid xs={3} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2}}>
                            Дата изменения
                        </Box>
                    </Grid>
                    <Grid xs={1} container></Grid>
                </Grid>
                <Divider/>
                <Box p={2}>
                    {taskStages.map(taskStage =>
                        <TaskStageItem key={taskStage._id} taskStage={taskStage} task={task} user = {user} serverHost={serverHost}/>
                    )}
                </Box>
            </List>
        </Stack>
    );
};

export default TaskStageList;
