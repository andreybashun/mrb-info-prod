import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {Folder} from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useRouter} from "next/router";
import ListItemButton from "@mui/material/ListItemButton";
import Breadcrumbs from "nextjs-breadcrumbs";

import {GetServerSideProps} from "next";
import axios from "axios";
import MLayout from "../../../layouts/MLayout";


const Index = ({user}) => {
    const router = useRouter ()
    return (
        <MLayout user={user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'tasks', to: 'мои задачи'},
                        {from: 'Home', to: 'Login'},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                        {from: 'drafts', to: 'проекты'},
                    ]
                    }
                />
            </div>
            <Stack direction={"column"} spacing={2} sx={{
                padding: 5,

            }}>
                <Stack direction="row" spacing={2}>
                    <Button size="small" variant="contained">
                        Создать каталог
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
                        <Grid container spacing={2}>
                            <ListItemButton>
                                <Grid xs={8} container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center">
                                    <IconButton color="info" onClick={() => router.push ('/' + user._id + '/tasks/drafts')}>
                                        <Folder/>
                                    </IconButton>
                                    Драфты
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
                        <Grid container spacing={2}
                              justifyContent="space-between"
                              alignItems="center">

                            <ListItemButton>
                                <Grid xs={8} container
                                      direction="row"
                                      justifyContent="flex-start"
                                      alignItems="center"
                                >
                                    <IconButton color="info"  onClick={() => router.push ('/' + user._id + '/tasks/inbox')}>
                                        <Folder/>
                                    </IconButton>
                                    Входящие задачи
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
                                                onClick={() => router.push ('/' + user._id + '/tasks/outbox')}>
                                        <Folder/>
                                    </IconButton>
                                    Исходящие задачи
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
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            user: resUser.data
        }
    }
}