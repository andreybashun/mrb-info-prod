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
import MLayout from "../../../../../../layouts/MLayout";


const TaskStageCard = (props) => {
    const router = useRouter ()
    return (
        <MLayout user={props.user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'tasks', to: 'задачи'},
                    {from: 'drafts', to: 'драфты'},
                    {from: props.task._id, to: props.task.name},
                    {from: props.stage._id, to: props.stage.name},
                    {from: 'taskStageCard', to: 'карточка этапа'},
                    {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                ]
                }

            />
            <Stack direction={"column"} spacing={0} sx={{
                padding: 5,
            }}>
                <Stack direction="row" spacing={2}>
                    <Button size="small" sx={{marginBottom:2}} variant="contained" onClick={() =>
                        router.push ('/' + props.user._id + '/tasks/drafts/' + props.stage.taskId + '/' + props.stage._id + '/editStage/')}
                    >
                        Редактировать
                    </Button>
                </Stack>
                Учетные данные этапа задачи
                <Divider/>


                <Grid container spacing={1}  sx={{padding: 1, marginTop:0, marginBottom:1}}>
                    <Grid item xs={4} fontSize={12}>
                        ID
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage._id}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Децимальный номер этапа задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.decId}
                    </Grid>


                    <Grid item xs={4} fontSize={12} >
                        Наименование этапа задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.name}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.type}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Описнаие этапа задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.discription}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата создаия
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.creationDate}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата последнего изменения
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.lastChangeDate}
                    </Grid>
                </Grid>
                Учетные данные пользователя
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5,marginBottom:1}}>

                    <Grid item xs={4} fontSize={12}>
                        Автор
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        <Link href="/repository/Cards/persons/a_bashun">{props.stage.author}</Link>
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Организация
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.organization}
                    </Grid>
                </Grid>

                Применимость документа
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        АТА
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.ata}
                    </Grid>
                    <Grid item xs={4} fontSize={12}>
                        Тип воздушного судна
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        <Link href="/repository/Cards/AircraftType/rrj-95new">{props.stage.aircraftType}</Link>
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип двигателя
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.engineType}
                    </Grid>
                </Grid>

                Входит
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        Задача
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.name}
                    </Grid>
                </Grid>

                Содержит
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        Ревизии
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.taskStageRevisions.map(taskStageRevision =>
                            taskStageRevision.name
                        )
                            }
                    </Grid>
                </Grid>
            </Stack>
        </MLayout>
    )
};

export default TaskStageCard;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resTask = await axios.get (process.env.SERVER_HOST + 'task/' + params.task);
    const resStage = await axios.get (process.env.SERVER_HOST + 'task/stage/' + params.stage);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            task: resTask.data,
            stage: resStage.data,
            user:resUser.data,
        }
    }
}