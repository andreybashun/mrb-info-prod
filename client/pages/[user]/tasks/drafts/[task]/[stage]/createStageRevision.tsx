import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useInput} from "../../../../../../hooks/useInput";
import Box from "@mui/material/Box";
import {FormControl, InputLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useRouter} from "next/router";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import {GetServerSideProps} from "next";
import TaskStageStepWrapper from "../../../../../../components/Tasks/TaskStageStepWrapper";
import Breadcrumbs from "nextjs-breadcrumbs";
import MLayout from "../../../../../../layouts/MLayout";


const CreateStageRevision = ({docs, task, stage, user, users, serverHost}) => {

    const [activeStep, setActiveStep] = useState (0);
    const name = useInput ('');
    const author = user._id;
    const description = useInput ('');
    const lastChangeDate = useInput ('');
    const organization = user.organization;
    const creationDate = useInput ('');
    const router = useRouter ();
    // const {...id} = router.query;
    // const stageId = id.stage + '';
    // const taskId = id.task + '';


    const [open, setOpen] = useState (false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen (false);
    };

    const [signer, setSigner] = React.useState ('');
    const handleSignerChange = (event: SelectChangeEvent) => {
        setSigner (event.target.value);
    };


    const [doc, setDoc] = React.useState ('');
    const [docRevisions, setDocRevisions] = React.useState ([]);


    const handleDocChange = async (event: SelectChangeEvent) => {
        setDoc (event.target.value.toString ());
        const response = await axios.get (serverHost + 'document/' + event.target.value.toString ())
        if (event.target.value.toString () === '' || doc !== '') {
            await setDocRevision ('')
        } else {
            await setDocRevisions (response.data.docRevisions);
        }
    };


    const [docRevision, setDocRevision] = React.useState ('');

    const handleDocRevisionChange = async (event: SelectChangeEvent) => {
        setDocRevision (event.target.value.toString ());
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
        axios.get (serverHost + 'task/stage/' + stage._id)
            .then (resp => {
                let maxIndex = 0
                const stage = resp.data
                // индекс нового документа (последнее поле доцемального номера)
                // присваивается следующему нибольшему индексу документа с совпадающими полями 1-4.
                //  в случае удаления последнего документа в массиве с совпадающими полями 1-4,
                // его индекс забирается с задвоением истории. Нужно сделать глобальный счетчик на событие для
                // их уникальной нумерации
                if (stage.taskStageRevisions){
                    stage.taskStageRevisions.map (revision => {
                        if (revision.decId.includes('RVN.' + task.type + '.' + task.aircraftType + '.' + task.ata)){
                            const index = 100 * Number(revision.decId.slice(-3,-2)) + 10 * Number(revision.decId.slice(-2,-1)) + Number(revision.decId.slice(-1))
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


        if (activeStep !== 5) {
            setActiveStep (prev => prev + 1)
        } else {

            axios.post (serverHost + 'task/revision', {
                type: task.type,
                name: name.value,
                author: user._id,
                status: 'draft',
                description: description.value,
                decId: decimalNumber,
                lastChangeDate: date.toLocaleDateString (),
                organization: user.organization,
                ata: task.ata,
                aircraftType: task.aircraftType,
                engineType: task.engineType,
                creationDate: date.toLocaleDateString (),
                taskStageId: stage._id,
                taskId: task._id,
                signer: signer,
                docForSignId: doc,
                docRevForSignId: docRevision
            })
                .then (resp => {
                    setOpen (true)
                    console.log ()
                    router.push ({pathname: '/' + user._id + '/tasks/drafts/' + resp.data.taskId + '/' + resp.data.taskStageId + '/' + resp.data._id})
                })
                .catch (e => console.log (e))
        }
    }
    const back = () => {
        setActiveStep (prev => prev - 1)
    }

    return (
        <MLayout user={user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'tasks', to: 'мои задачи'},
                    {from: 'drafts', to: 'драфты'},
                    {from: task._id, to: 'задача: ' + task.name},
                    {from: stage._id, to: 'этап: ' + stage.name},
                    {from: 'createStageRevision', to: 'создание ревизии'},
                    {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                ]
                }
            />
            <TaskStageStepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Box sx={{p: 1, width: '800px'}}>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                id={"aircraftType"}
                                label={"Тип самолета"}
                                variant={"outlined"}
                                size={"small"}
                                value={task.aircraftType}
                                disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                id={"engineType"}
                                label={"Тип двигателя"}
                                variant={"outlined"}
                                size={"small"}
                                value={task.engineType}
                                disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{p: 0}} size="small">
                            <TextField
                                id={"ata"}
                                label={"ATA"}
                                variant={"outlined"}
                                size={"small"}
                                value={task.ata}
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
                                value={task.type}
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
                                label={"Наименование ревизии"}
                                variant={"outlined"}
                                size={"small"}
                            />
                        </FormControl>

                        <Box sx={{p: 1, width: '95ch'}}>
                            <TextField
                                {...description}
                                id="task_revision_name"
                                label="Описание ревизии"
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
                                value={user.firstName[0] + '.' + user.secondName}
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
                                value={user.organization}
                                disabled={true}
                            />
                        </FormControl>
                    </Box>
                }
                {activeStep === 3 &&

                    <Box sx={{width: '800px', alignContent: "space-arround"}}>
                        <FormControl sx={{m: 1, width: '30ch'}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Идентификатор документа</InputLabel>
                            <Select
                                onChange={handleDocChange}
                                defaultValue=""
                                labelId="select-small"
                                id="select-small"
                                label="Идентификатор Документа"
                                value={doc}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {docs.map ((doc, index) => (
                                    <MenuItem key={index} value={doc._id}>
                                        {doc._id}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                        <FormControl sx={{m: 1, width: '55ch'}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Наименование документа</InputLabel>
                            <Select
                                onChange={handleDocChange}
                                labelId="select-small"
                                id="select-small"
                                label="Наименование документа"
                                value={doc}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {docs.map ((doc, index) => (
                                    <MenuItem key={index} value={doc._id}>
                                        {doc.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{m: 1, width: '30ch'}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Идентификатор ревизии
                                документа</InputLabel>
                            <Select
                                onChange={handleDocRevisionChange}
                                defaultValue=""
                                labelId="select-small"
                                id="select-small"
                                label="Идентификатор ревизии документа"
                                value={docRevision}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {

                                    docRevisions.map ((docRevision, index) => (
                                        <MenuItem key={index} value={docRevision._id}>
                                            {docRevision._id}
                                        </MenuItem>
                                    ))}

                            </Select>
                        </FormControl>
                        <FormControl sx={{m: 1, width: '55ch'}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Наименование ревизии</InputLabel>
                            <Select
                                onChange={handleDocRevisionChange}
                                labelId="select-small"
                                id="select-small"
                                label="Наименование ревизии"
                                value={docRevision}

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {

                                    docRevisions.map ((docRevision, index) => (
                                        <MenuItem key={index} value={docRevision._id}>
                                            {docRevision.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>
                }

                {activeStep === 4 &&


                    <Box sx={{width: '800px', alignContent: "space-arround"}}>
                        <FormControl fullWidth sx={{m: 1, paddingRight: 2}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Утверждающий</InputLabel>
                            <Select
                                onChange={handleSignerChange}
                                defaultValue=""
                                labelId="select-small"
                                id="select-small"
                                label="Утверждающий"
                                value={signer}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    users.map ((user, index) => (
                                        <MenuItem key={index} value={user._id}>
                                            {user.firstName + ' ' + user.secondName}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>

                }
                {activeStep === 5 && <h1>step6</h1>}
            </TaskStageStepWrapper>
            <Grid container justifyContent={"space-between"}>
                <Button size="small" variant="contained" disabled={activeStep === 0} onClick={back}> назад </Button>
                <Button size="small" variant="contained" disabled={activeStep === 6} onClick={next}> вперед </Button>
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

export default CreateStageRevision;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (process.env.SERVER_HOST + 'document/')
    const resTask = await axios.get (process.env.SERVER_HOST + 'task/' + params.task)
    const resStage = await axios.get (process.env.SERVER_HOST + 'task/stage/' + params.stage)
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    const resUsers = await axios.get(process.env.SERVER_HOST + 'user/')
    return {
        props: {
            docs: response.data,
            task: resTask.data,
            stage: resStage.data,
            user: resUser.data,
            users: resUsers.data,
            serverHost: process.env.SERVER_HOST

        }
    }
}