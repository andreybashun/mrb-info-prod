import React, {} from 'react';
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import axios from "axios";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MLayout from "../../../../../../layouts/MLayout";

const StageCard = (props) => {
    const router = useRouter ()
    const {stage} = router.query;
    return (
        <MLayout user={props.user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'tasks', to: 'мои задачи'},
                    {from: 'drafts', to: 'драфты'},
                    {from: props.stage.taskId, to: 'задача'},
                    {from: props.stageId, to: 'этап'},
                    {from: 'stageCard', to: 'карточка этапа'},
                    {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                ]
                }

            />
            <Stack direction={"column"} spacing={0} sx={{
                padding: 5,
            }}>
                <Stack direction="row" spacing={2}>
                    <Button size="small" sx={{marginBottom: 2}} variant="contained" onClick={() =>
                        router.push ('/' + props.user._id + '/tasks/drafts/' + props.stage.taskId + '/' + stage + '/editStage/')}
                    >
                        Редактировать
                    </Button>
                </Stack>
                Учетные данные этапа
                <Divider/>


                <Grid container spacing={1} sx={{padding: 1, marginTop: 0, marginBottom: 1}}>
                    <Grid item xs={4} fontSize={12}>
                        ID
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage._id}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Децимальный номер этапа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.decId}
                    </Grid>


                    <Grid item xs={4} fontSize={12}>
                        Наименование этапа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.name}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип этапа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.type}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Описнаие этапа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.discription}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата создаия
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.creationDate}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата последнего изменения
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.lastChangeDate}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Идентификатор Задачи
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.taskId}
                    </Grid>


                </Grid>
                Учетные данные пользователя
                <Divider/>

                <Grid container spacing={1} sx={{padding: 1, marginTop: 0.5, marginBottom: 1}}>

                    <Grid item xs={4} fontSize={12}>
                        Автор
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.author}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Организация
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.organization}
                    </Grid>
                </Grid>
                Применимость этапа
                <Divider/>
                <Grid container spacing={1} sx={{padding: 1, marginTop: 0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        АТА
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.ata}
                    </Grid>
                    <Grid item xs={4} fontSize={12}>
                        Тип воздушного судна
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.aircraftType}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип двигателя
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.stage.engineType}
                    </Grid>
                </Grid>

            </Stack>
        </MLayout>
    )
};

export default StageCard;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (process.env.SERVER_HOST + 'task/stage' + params.stage);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            stage: response.data,
            stageId: params.task,
            user: resUser.data,
        }
    }
}