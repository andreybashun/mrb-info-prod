import React from 'react';
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import axios from "axios";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import MLayout from "../../../../../../../layouts/MLayout";

const TaskStageRevisionCard = (props) => {
    const router = useRouter ()
    const {draft} = router.query;
    return (
        <MLayout user={props.user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'tasks', to: 'задачи'},
                    {from: 'drafts', to: 'драфты'},
                    {from: props.task._id, to: props.task.name},
                    {from: props.stage._id, to: props.stage.name},
                    {from: props.revision._id, to: props.revision.name},
                    {from: 'taskStageRevisionCard', to: 'карточка ревизии'},
                    {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                ]
                }

            />
            <Stack direction={"column"} spacing={0} sx={{
                padding: 5,
            }}>
                <Stack direction="row" spacing={2}>
                    <Button size="small" sx={{marginBottom:2}} variant="contained" onClick={() =>
                        router.push ('/' + props.user._id + '/docs/drafts/' + draft + '/editDraft/')}
                    >
                        Редактировать
                    </Button>
                </Stack>
                Учетные данные ревизии этапа задачи
                <Divider/>


                <Grid container spacing={1}  sx={{padding: 1, marginTop:0, marginBottom:1}}>
                    <Grid item xs={4} fontSize={12}>
                        ID
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.revision._id}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Децимальный номер ревизии этапа задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.decId}
                    </Grid>


                    <Grid item xs={4} fontSize={12} >
                        Наименование ревизии этапа задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.name}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.type}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Описнаие ревизии этапа задачи
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.discription}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата создаия
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.creationDate}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата последнего изменения
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.lastChangeDate}
                    </Grid>
                </Grid>
                Учетные данные пользователя
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5,marginBottom:1}}>

                    <Grid item xs={4} fontSize={12}>
                        Автор
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        <Link href="/repository/Cards/persons/a_bashun">{props.revision.author}</Link>
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Организация
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.organization}
                    </Grid>
                </Grid>

                Применимость документа
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        АТА
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.ata}
                    </Grid>
                    <Grid item xs={4} fontSize={12}>
                        Тип воздушного судна
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        <Link href="/repository/Cards/AircraftType/rrj-95new">{props.revision.aircraftType}</Link>
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип двигателя
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.revision.engineType}
                    </Grid>
                </Grid>

                Входит
                <Divider/>

                <Grid container spacing={1}  sx={{padding: 1, marginTop:0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        Этап
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.stage.name}
                    </Grid>
                    <Grid item xs={4} fontSize={12}>
                        Задача
                    </Grid>
                    <Grid item xs={8}  fontSize={12}>
                        {props.task.name}
                    </Grid>
                </Grid>
            </Stack>
        </MLayout>
    )
};

export default TaskStageRevisionCard;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resTask = await axios.get (process.env.SERVER_HOST + 'task/' + params.task);
    const resStage = await axios.get (process.env.SERVER_HOST+ 'task/stage/' + params.stage);
    const resRevision = await axios.get (process.env.SERVER_HOST+ 'task/revision/' + params.revision);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            task: resTask.data,
            stage: resStage.data,
            revision: resRevision.data,
            user: resUser.data
        }
    }
}