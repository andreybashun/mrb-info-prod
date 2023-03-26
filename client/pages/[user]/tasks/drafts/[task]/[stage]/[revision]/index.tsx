import React from 'react';
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Folder} from "@mui/icons-material";
import GradingIcon from "@mui/icons-material/Grading";
import {GetServerSideProps} from "next";
import axios from "axios";
import Breadcrumbs from "nextjs-breadcrumbs";
import {useRouter} from "next/router";
import MLayout from "../../../../../../../layouts/MLayout";


const Index = ({task, stage, revision, user, serverHost}) => {
    const router = useRouter ()
    return (
        <MLayout user={user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'tasks', to: 'мои задачи'},
                    {from: 'drafts', to: 'драфты'},
                    {from: task._id, to: 'задача: ' + task.name},
                    {from: stage._id, to: 'этап: ' + stage.name},
                    {from: revision._id, to: 'ревизия: ' + revision.name},
                    {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                ]
                }
            />
            <Stack direction={"column"} spacing={2} sx={{
                padding: 5,

            }}>
                <Stack direction="row" spacing={2}>
                    <Button size="small" variant="contained"
                    >
                        Редактировать
                    </Button>
                    <Button size="small" variant="contained">
                        Отозвать
                    </Button>
                    <Button size="small" variant="contained" onClick={() => {
                        revision.status = 'inbox'
                        axios.put(`${serverHost}task/revision/${revision._id}`, revision = {...revision})
                        .then(()=>{
                            axios.put(`${serverHost}user/${revision.signer}/taskInBox`, revision = {...revision})
                            .then (() => {
                                router.push (`/${revision.signer}`)
                            })
                            .catch (e => console.log (e))

                        })
                        .catch (e => console.log (e))
                        
                    }
                    }>
                        Направить
                    </Button>
                </Stack>
                <List sx={{padding: 1, border: '1px  solid grey', borderRadius: 2}}>
                    <Grid container spacing={2}>
                        <Grid xs={8} container
                              direction="row"
                              justifyContent="flex-start"
                              alignItems="center"
                              fontSize={'0.75rem'}>
                            <Box sx={{marginTop: 2, marginLeft: 12}}>
                                Имя
                            </Box>

                        </Grid>
                        <Grid xs={2} container
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              fontSize={'0.75rem'}
                        >
                            <Box sx={{marginTop: 2}}>
                                Дата изменения
                            </Box>

                        </Grid>
                        <Grid xs={2} container
                              direction="row"
                              justifyContent="flex-end"
                              alignItems="center">
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Box p={2}>
                        <Grid container spacing={2}
                              justifyContent="space-between"
                              alignItems="center">

                            <ListItemButton>
                                <Grid xs={8} container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                >
                                    <IconButton color="info"
                                                onClick={() => router.push ('/' + user._id + '/tasks/drafts/' +
                                                    task._id + '/' + stage._id + '/' + revision._id + '/taskStageRevisionCard')}>
                                        <SummarizeIcon/>
                                    </IconButton>
                                    Карточка ревизии
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                      fontSize={'0.8rem'}
                                >
                                    21.07.2022
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="flex-end"
                                      alignItems="center">
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Grid>
                            </ListItemButton>
                        </Grid>
                        <Grid container spacing={2}>

                            <ListItemButton>
                                <Grid xs={8} container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center">
                                    <IconButton color="info"
                                                onClick={() => router.push ('/' + user._id + '/tasks/drafts/' +
                                                    task._id + '/' + stage._id + '/' + revision._id + '/taskStageRevisionCard')}>
                                        <Folder/>
                                    </IconButton>
                                    Документы на подпись
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                      fontSize={'0.8rem'}
                                >
                                    21.07.2022
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="flex-end"
                                      alignItems="center">
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Grid>
                            </ListItemButton>
                        </Grid>
                        <Grid container spacing={2}>
                            <ListItemButton>
                                <Grid xs={8} container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center">
                                    <IconButton color="info">
                                        <Folder/>
                                    </IconButton>
                                    Сопроводительные документы
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                      fontSize={'0.8rem'}
                                >
                                    21.07.2022
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="flex-end"
                                      alignItems="center">
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Grid>
                            </ListItemButton>
                        </Grid>
                        <Grid container spacing={2}>
                            <ListItemButton>
                                <Grid xs={8} container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center">
                                    <IconButton color="info">
                                        <GradingIcon/>
                                    </IconButton>
                                    Удостоверяющий лист
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                      fontSize={'0.8rem'}
                                >
                                    21.07.2022
                                </Grid>
                                <Grid xs={2} container
                                      direction="row"
                                      justifyContent="flex-end"
                                      alignItems="center">
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Grid>
                            </ListItemButton>
                        </Grid>
                    </Box>
                </List>
            </Stack>
        </MLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const resTask = await axios.get (process.env.SERVER_HOST + 'task/' + params.task)
    const resStage = await axios.get (process.env.SERVER_HOST + 'task/stage/' + params.stage)
    const resRevision = await axios.get (process.env.SERVER_HOST + 'task/revision/' + params.revision)
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            task: resTask.data,
            stage: resStage.data,
            revision: resRevision.data,
            user: resUser.data,
            serverHost:process.env.SERVER_HOST
        }
    }
}