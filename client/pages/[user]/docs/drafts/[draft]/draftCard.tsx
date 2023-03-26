import React, {} from 'react';
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import axios from "axios";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MLayout from "../../../../../layouts/MLayout";

const DraftCard = (props) => {
    const router = useRouter ()
    const {draft} = router.query;
    return (
        <MLayout user={props.user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'docs', to: 'мои документы'},
                    {from: 'drafts', to: 'проекты'},
                    {from: props.document, to: 'документ'},
                    {from: 'draftCard', to: 'карточка документа'},
                    {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                ]
                }

            />
            <Stack direction={"column"} spacing={0} sx={{
                padding: 5,
            }}>
                <Stack direction="row" spacing={2}>
                    <Button size="small" sx={{marginBottom: 2}} variant="contained" onClick={() =>
                        router.push ('/' + props.user._id + '/user/docs/drafts/' + draft + '/editDraft/')}
                    >
                        Редактировать
                    </Button>
                </Stack>
                Учетные данные документа
                <Divider/>


                <Grid container spacing={1} sx={{padding: 1, marginTop: 0, marginBottom: 1}}>
                    <Grid item xs={4} fontSize={12}>
                        ID
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc._id}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Децимальный номер документа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.decId}
                    </Grid>


                    <Grid item xs={4} fontSize={12}>
                        Наименование документа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.name}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип документа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.type}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Описнаие документа
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.discription}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата создаия
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.creationDate}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Дата последнего изменения
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.lastChangeDate}
                    </Grid>
                </Grid>
                Учетные данные пользователя
                <Divider/>

                <Grid container spacing={1} sx={{padding: 1, marginTop: 0.5, marginBottom: 1}}>

                    <Grid item xs={4} fontSize={12}>
                        Автор
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.author}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Организация
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.organization}
                    </Grid>
                </Grid>

                Применимость документа
                <Divider/>

                <Grid container spacing={1} sx={{padding: 1, marginTop: 0.5}}>

                    <Grid item xs={4} fontSize={12}>
                        АТА
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.ata}
                    </Grid>
                    <Grid item xs={4} fontSize={12}>
                        Тип воздушного судна
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.aircraftType}
                    </Grid>

                    <Grid item xs={4} fontSize={12}>
                        Тип двигателя
                    </Grid>
                    <Grid item xs={8} fontSize={12}>
                        {props.doc.engineType}
                    </Grid>
                </Grid>

            </Stack>
        </MLayout>
    )
};

export default DraftCard;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (process.env.SERVER_HOST + 'document/' + params.draft);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            doc: response.data,
            document: params.draft,
            user: resUser.data,
        }
    }
}