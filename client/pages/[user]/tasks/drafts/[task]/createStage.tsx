import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useInput} from "../../../../../hooks/useInput";
import Box from "@mui/material/Box";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useRouter} from "next/router";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import DocStepWrapper from "../../../../../components/Docs/DocStepWraper";
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import MLayout from "../../../../../layouts/MLayout";



const CreateStage = (props) => {
    const [activeStep, setActiveStep] = useState (0);
    const name = useInput ('');
    const author = props.user._id;
    const description = useInput ('');
    const lastChangeDate = useInput ('');
    const organization = props.user.organization;
    const ata = props.task.ata;
    const creationDate = useInput ('');
    const router = useRouter ();


    const [open, setOpen] = useState (false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen (false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );
    const date = new Date ();

    const [decimalNumber, setDecimalNumber] = React.useState ('number')

    useEffect (() => {
        axios.get (props.serverHost + 'task/' + props.task._id)
            .then (resp => {
                let maxIndex = 0
                const task = resp.data
                // индекс нового документа (последнее поле доцемального номера)
                // присваивается следующему нибольшему индексу документа с совпадающими полями 1-4.
                //  в случае удаления последнего документа в массиве с совпадающими полями 1-4,
                // его индекс забирается с задвоением истории. Нужно сделать глобальный счетчик на событие для
                // их уникальной нумерации
                if (task.taskStages){
                    task.taskStages.map (stage => {
                        if (stage.decId.includes('STG.' + task.type + '.' + task.aircraftType + '.' + task.ata)){
                            const index = 100 * Number(stage.decId.slice(-3,-2)) + 10 * Number(stage.decId.slice(-2,-1)) + Number(stage.decId.slice(-1))
                            if (index > maxIndex){
                                maxIndex = index
                            }
                        }
                    })
                }
                if (maxIndex > 999) {
                    console.log ('база не может содержать более 999 объектов')
                } else {
                    const num = (1000 + maxIndex + 1).toString ().slice (1)
                    setDecimalNumber ('STG.' + task.type + '.' + task.aircraftType + '.' + task.ata + '.' + num)
                    console.log('STG.' + task.type + '.' + task.aircraftType + '.' + task.ata + '.' + num)
                }
            })
            .catch (e => console.log (e))
    })


    const next = () => {

        if (activeStep !== 2) {
            setActiveStep (prev => prev + 1)
        } else {

            axios.post (props.serverHost + 'task/stage', {
                type: props.task.type,
                name: name.value,
                author: props.user._id,
                status: 'draft',
                description: description.value,
                decId: decimalNumber,
                lastChangeDate: date.toLocaleDateString (),
                organization: props.user.organization,
                ata: ata.value,
                aircraftType: props.aircraftType,
                engineType: props.engineType,
                creationDate: date.toLocaleDateString (),
                taskId: props.task._id,
            })
                .then (resp => {
                    setOpen (true)
                    router.push ({pathname: '/' + props.user._id + '/tasks/drafts/' + resp.data.taskId + '/' + resp.data._id})
                })
                .catch (e => console.log (e))
        }
    }
    const back = () => {
        setActiveStep (prev => prev - 1)
    }

    return (
        <MLayout user={props.user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'tasks', to: 'мои задачи'},
                        {from: 'drafts', to: 'драфты'},
                        {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                        {from: 'createTask', to: 'создание задачи'},
                        {from: 'createStage', to: 'создание этапа'},
                        {from: props.task._id, to: props.task.name}
                    ]
                    }
                />
            </div>
            <DocStepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Box sx={{p: 1, width: '800px'}}>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                id={"aircraftType"}
                                label={"Тип самолета"}
                                variant={"outlined"}
                                size={"small"}
                                value={props.task.aircraftType}
                                disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                id={"engineType"}
                                label={"Тип двигателя"}
                                variant={"outlined"}
                                size={"small"}
                                value={props.task.engineType}
                                disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{p: 0}} size="small">
                            <TextField
                                id={"ata"}
                                label={"ATA"}
                                variant={"outlined"}
                                size={"small"}
                                value={props.task.ata}
                                disabled={true}
                            />
                        </FormControl>

                    </Box>
                }
                {activeStep === 1 &&

                    <Box sx={{p: 1}}>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                id={"documentType"}
                                label={"Тип задачи"}
                                variant={"outlined"}
                                size={"small"}
                                value={props.task.type}
                                disabled={true}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                id={"decimalNumber"}
                                label={"Децимальный номер"}
                                variant={"outlined"}
                                size={"small"}
                                value={decimalNumber}
                                disabled={true}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                {...name}
                                id={"name"}
                                label={"Наименование этапа"}
                                variant={"outlined"}
                                size={"small"}
                            />
                        </FormControl>

                        <Box sx={{p: 1, width: '95ch'}}>
                            <TextField
                                {...description}
                                id="task_revision_name"
                                label="Описание этапа"
                                multiline
                                fullWidth
                                rows={3}
                                sx={{marginRight: 1, display: 'flex'}}
                            />
                        </Box>

                        <FormControl sx={{paddingBottom: 2, paddingTop: 2, width: '25ch'}}>
                            <TextField
                                {...creationDate}
                                id={"creationDate"}
                                label={"дата создания"}
                                variant={"outlined"}
                                size={"small"}
                                value={date.toLocaleDateString ()}
                            />
                        </FormControl>

                        <FormControl sx={{paddingBottom: 2, paddingTop: 2, marginLeft: 10, width: '25ch',}}>
                            <TextField
                                {...lastChangeDate}
                                id={"creationDate"}
                                label={"дата последнего изменения"}
                                variant={"outlined"}
                                size={"small"}
                                value={date.toLocaleDateString ()}
                            />
                        </FormControl>

                    </Box>
                }
                {activeStep === 2 &&
                    <Box sx={{p: 1, width: '800px'}}>
                        <FormControl fullWidth sx={{p: 1}} size="small">
                            <TextField
                                {...author}
                                id={"author"}
                                label={"автор"}
                                variant={"outlined"}
                                size={"small"}
                                value={props.user.firstName[0] + '.' + props.user.secondName}
                                disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{p: 1}} size="small">
                            <TextField
                                {...organization}
                                id={"organization"}
                                label={"организация"}
                                variant={"outlined"}
                                size={"small"}
                                value={props.user.organization}
                                disabled={true}
                            />
                        </FormControl>
                    </Box>
                }

            </DocStepWrapper>
            <Grid container justifyContent={"space-between"}>
                <Button size="small" variant="contained" disabled={activeStep === 0} onClick={back}> назад </Button>
                <Button size="small" variant="contained" disabled={activeStep === 3} onClick={next}> вперед </Button>
            </Grid>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Note archived"
                    action={action}
                />
            </div>
        </MLayout>
    );
};

export default CreateStage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resTask = await axios.get (process.env.SERVER_HOST + 'task/' + params.task)
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            task: resTask.data,
            user: resUser.data,
            serverHost: process.env.SERVER_HOST,
        }
    }
}