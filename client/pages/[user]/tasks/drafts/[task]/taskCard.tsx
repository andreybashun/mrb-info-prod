import React, {} from 'react';
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import axios from "axios";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import MLayout from "../../../../../layouts/MLayout";

const TaskCard = (props) => {
    const router = useRouter ()
    return (
        <MLayout user={props.user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'tasks', to: 'мои задачи'},
                    {from: 'drafts', to: 'драфты'},
                    {from: props.taskId, to: 'задача'},
                    {from: 'taskCard', to: 'карточка задачи'},
                    {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                ]
                }

            />
            <Stack direction={"column"} spacing={0} sx={{
                padding: 5,
            }}>
                <Stack direction="row" spacing={2}>
                    <Button size="small" sx={{marginBottom:2}} variant="contained" onClick={() =>
                        router.push ('/' + props.user._id + '/tasks/drafts/' + props.taskId + '/editTask/')}
                    >
                        Редактировать
                    </Button>
                </Stack>
                Учетные данные задачи
                <Divider/>


                <Grid container spacing={1}  sx={{padding: 1, marginTop:0, marginBottom:1}}>
                    <Grid item xs={4} fontSize={12}>
                        ID
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.task._id}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Децимальный номер задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.decId}
                    </Grid>


                    <Grid item xs={4} fontSize={12} >
                        Наименование задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.name}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.type}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Описнаие задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.discription}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата создаия
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.creationDate}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата последнего изменения
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.lastChangeDate}
                    </Grid>
                </Grid>
                Учетные данные пользователя
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5,marginBottom:1}}>

                    <Grid item xs={4} fontSize={12}>
                        Автор
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        <Link href="/repository/Cards/persons/a_bashun">{props.task.author}</Link>
                    </Grid>
                    <Grid item xs={4} fontSize={12}>
                        Организация
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.organization}
                    </Grid>
                </Grid>
                Применимость задачи
                <Divider/>
                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        АТА
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.ata}
                    </Grid>
                    <Grid item xs={4} fontSize={12}>
                        Тип воздушного судна
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        <Link href="repository/Cards/AircraftType/rrj-95new">{props.task.aircraftType}</Link>
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип двигателя
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.engineType}
                    </Grid>
                </Grid>
                Содержит
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5}}>

                    <Grid item xs={4} fontSize={12}>
                    Этапы
                </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.taskStages.map(taskStage =>
                            taskStage.name
                        )
                        }
                    </Grid>
                </Grid>

            </Stack>
        </MLayout>
    )
};

export default TaskCard;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (process.env.SERVER_HOST + 'task/' + params.task);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            task: response.data,
            taskId: params.task,
            user: resUser.data,
        }
    }
}