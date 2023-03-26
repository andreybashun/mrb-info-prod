import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useInput} from "../../../../../../../hooks/useInput";
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
import TaskStageStepWrapper from "../../../../../../../components/Tasks/TaskStageStepWrapper";
import Breadcrumbs from "nextjs-breadcrumbs";
import MLayout from "../../../../../../../layouts/MLayout";


const CreateStageRevision = ({docs, task, stage, revision, user, serverHost}) => {

    const [activeStep, setActiveStep] = useState (0);
    const name = useInput (revision.name);
    const author = useInput (revision.author);
    const discription = useInput (revision.discription);
    const decId = useInput (revision.decId);
    const lastChangeDate = useInput (revision.lastChangeDate);
    const organization = useInput (revision.organization);
    const ata = useInput (revision.ata);
    const creationDate = useInput (revision.creationDate);
    const router = useRouter ();
    const {...id} = router.query;
    const stageId = id.stage + '';
    const taskId = id.task + '';


    const [open, setOpen] = useState (false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen (false);
    };

    const [type, setType] = React.useState (revision.type);

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType (event.target.value);
    };

    // const [status, setStatus] = React.useState (revision.status);
    //
    // const handleStatusChange = (event: SelectChangeEvent) => {
    //     console.log ('document status', event.target.value);
    //
    //     setStatus (event.target.value);
    //
    //     console.log ('document status', event.target.value);
    // };

    const [aircraftType, setAircraftType] = React.useState (revision.aircraftType);

    const handleAircraftChange = (event: SelectChangeEvent) => {
        setAircraftType (event.target.value);
    };

    const [signer, setSigner] = React.useState (revision.signer);

    const handleSignerChange = (event: SelectChangeEvent) => {
        setSigner (event.target.value);
    };

    const [engineType, setEngineType] = React.useState (revision.engineType);

    const handleEngineChange = (event: SelectChangeEvent) => {
        setEngineType (event.target.value);
    };

    const [doc, setDoc] = React.useState (revision.docForSignId);
    const [docRevisions, setDocRevisions] = React.useState ([]);


    const handleDocChange = async (event: SelectChangeEvent) => {

        setDoc (event.target.value.toString ());
        const response = await axios.get (serverHost + 'document/' + event.target.value.toString ())
        // await setDocRevisions( response.data.docRevisions);

        if ((event.target.value.toString () === '' || doc !== '')) {
            await setDocRevision ('')
            await setDocRevisions (response.data.docRevisions);
        } else {
            await setDocRevisions (response.data.docRevisions);
        }
    };


    const [docRevision, setDocRevision] = React.useState (revision.docRevForSignId);

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


    const next = () => {


        if (activeStep !== 5) {
            setActiveStep (prev => prev + 1)
        } else {

            axios.put (serverHost + 'task/revision/' + revision._id, {
                type: type,
                name: name.value,
                author: author.value,
                status: 'draft',
                description: discription.value,
                decId: decId.value,
                lastChangeDate: date.toLocaleDateString (),
                organization: organization.value,
                ata: ata.value,
                aircraftType: aircraftType,
                engineType: engineType,
                creationDate: date.toLocaleDateString (),
                taskStageId: stageId,
                taskId: taskId,
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
                    {from: taskId, to: 'задача: ' + task.name},
                    {from: stageId, to: 'этап: ' + stage.name},
                    {from: revision._id, to: 'ревизия: ' + revision.name},
                    {from: 'createStageRevision', to: 'создание ревизии'},
                    {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                ]
                }
            />
            <TaskStageStepWrapper activeStep={activeStep}>
                {activeStep === 0 &&

                    <Box sx={{p: 1}}>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Тип ревизии</InputLabel>
                            <Select
                                onChange={handleTypeChange}
                                labelId="select-small"
                                id="select-small"
                                value={type}
                                label="Тип ревизии"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"MSG-3"}>MSG-3</MenuItem>
                                <MenuItem value={"Tech-doc"}>Tech-doc</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <TextField
                                {...decId}
                                id={"decId"}
                                label={"Децимальный номер"}
                                variant={"outlined"}
                                size={"small"}
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

                        {/*<DocDescription/>*/}

                        <Box sx={{p: 1, width: '95ch'}}>
                            <TextField
                                {...discription}
                                id="task_revision_name"
                                label="описание ревизии"
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

                        {/*<FormControl fullWidth sx={{paddingBottom: 2}} size="small">*/}
                        {/*    <InputLabel id="select-small" sx={{paddingRight: 1}}>Статус ревизии</InputLabel>*/}
                        {/*    <Select*/}
                        {/*        onChange={handleStatusChange}*/}
                        {/*        labelId="select-small"*/}
                        {/*        id="select-small"*/}
                        {/*        value={status}*/}
                        {/*        label="Статус ревизии"*/}
                        {/*    >*/}
                        {/*        <MenuItem value="">*/}
                        {/*            <em>None</em>*/}
                        {/*        </MenuItem>*/}
                        {/*        <MenuItem value={"Archived"}>Archived</MenuItem>*/}
                        {/*        <MenuItem value={"Active"}>Active</MenuItem>*/}

                        {/*    </Select>*/}

                        {/*</FormControl>*/}

                    </Box>
                }
                {activeStep === 1 &&
                    <Box sx={{p: 1, width: '800px'}}>
                        <FormControl fullWidth sx={{p: 1}} size="small">
                            <TextField
                                {...author}
                                id={"author"}
                                label={"автор"}
                                variant={"outlined"}
                                size={"small"}
                                value={"Bashun"}
                                //disabled={true}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{p: 1}} size="small">
                            <TextField
                                {...organization}
                                id={"organization"}
                                label={"организация"}
                                variant={"outlined"}
                                size={"small"}
                                value={"FRS"}
                                // disabled={true}
                            />
                        </FormControl>
                    </Box>
                }
                {activeStep === 2 &&
                    <Box sx={{p: 1, width: '800px'}}>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Тип самолета</InputLabel>
                            <Select
                                labelId="select-small"
                                id="select-small"
                                label="Тип самолета"
                                onChange={handleAircraftChange}
                                value={aircraftType}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"RRJ"}>RRJ</MenuItem>\
                                <MenuItem value={"RRJ-NEW"}>RRJ-NEW</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Тип двигателя</InputLabel>
                            <Select
                                onChange={handleEngineChange}
                                labelId="select-small"
                                id="select-small"
                                label="Тип двигателя"
                                value={engineType}

                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"PD-8"}>PD-8</MenuItem>\
                                <MenuItem value={"CFM56"}>CFM56</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{p: 0}} size="small">
                            <TextField
                                {...ata}
                                id={"ata"}
                                label={"ATA"}
                                variant={"outlined"}
                                size={"small"}
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
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Наименование ревизии
                                документа</InputLabel>
                            <Select
                                onChange={handleDocRevisionChange}
                                labelId="select-small"
                                id="select-small"
                                label="Наименование ревизии документа"
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
                                <MenuItem value={"A.Bashun"}>A.Bashun</MenuItem>
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
    const response = await axios.get (process.env.SERVER_HOST + 'document/');
    const resTask = await axios.get (process.env.SERVER_HOST + 'task/' + params.task);
    const resStage = await axios.get (process.env.SERVER_HOST + 'task/stage/' + params.stage);
    const resRevision = await axios.get (process.env.SERVER_HOST + 'task/revision/' + params.revision);
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            docs: response.data,
            task: resTask.data,
            stage: resStage.data,
            revision: resRevision.data,
            user: resUser.data,
            serverHost: process.env.SERVER_HOST,
        }
    }
}