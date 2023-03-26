import React, {useState} from 'react';
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
import DocStepWrapper from "../../../../../../components/Docs/DocStepWraper";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import MLayout from "../../../../../../layouts/MLayout";


const EditSatge = (props) => {
    const [activeStep, setActiveStep] = useState (0);
    const name = useInput (props.stage.name);
    const author = useInput (props.stage.author);
    const discription = useInput (props.stage.discription);
    const decId = useInput (props.stage.decId);
    const lastChangeDate = useInput (props.stage.lastChangeDate);
    const organization = useInput (props.stage.organization);
    const ata = useInput (props.stage.ata);
    const creationDate = useInput (props.stage.creationDate);
    const router = useRouter ();
    const {task} = router.query;
    const taskId = task + '';

    const [open, setOpen] = useState (false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen (false);
    };

    const [type, setType] = React.useState (props.stage.type);

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType (event.target.value);
    };

    const [status, setStatus] = React.useState (props.stage.status);

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus (event.target.value);
    };

    const [aircraftType, setAircraftType] = React.useState (props.stage.aircraftType);

    const handleAircraftChange = (event: SelectChangeEvent) => {
        setAircraftType (event.target.value);
    };

    const [engineType, setEngineType] = React.useState (props.stage.engineType);

    const handleEngineChange = (event: SelectChangeEvent) => {
        setEngineType (event.target.value);
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

        if (activeStep !== 2) {
            setActiveStep (prev => prev + 1)
        } else {

            axios.put (process.env.SERVER_HOST + 'task/stage/' + props.stageId.toString (), {
                type: type,
                name: name.value,
                author: author.value,
                status: status,
                description: discription.value,
                decId: decId.value,
                lastChangeDate: date.toLocaleDateString (),
                organization: organization.value,
                ata: ata.value,
                aircraftType: aircraftType,
                engineType: engineType,
                creationDate: date.toLocaleDateString (),
                taskId: taskId
            })
                .then (resp => {
                    setOpen (true)
                    router.push ({pathname: '/user/tasks/outbox/' + resp.data.taskId})
                })
                .catch (e => console.log (e))
        }
    }
    const back = () => {
        setActiveStep (prev => prev - 1)
    }

    return (
        <MLayout user={props.user}>
            <Breadcrumbs
                useDefaultStyle
                replaceCharacterList={[
                    {from: 'tasks', to: 'мои задачи'},
                    {from: 'outbox', to: 'исходящие задачи'},
                    {from: taskId, to: 'задача: ' + props.task.name},
                    {from: 'createStage', to: 'создание этапа'},
                    {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                ]
                }
            />
            <DocStepWrapper activeStep={activeStep}>
                {activeStep === 0 &&

                    <Box sx={{p: 1}}>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Тип этапа</InputLabel>
                            <Select
                                onChange={handleTypeChange}
                                labelId="select-small"
                                id="select-small"
                                value={type}
                                label="Тип этапа"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"MSG-3"}>MSG-3</MenuItem>\
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
                                label={"Наименование этапа"}
                                variant={"outlined"}
                                size={"small"}
                            />
                        </FormControl>

                        {/*<DocDescription/>*/}

                        <Box sx={{p: 1, width: '95ch'}}>
                            <TextField
                                {...discription}
                                id="task_revision_name"
                                label="описание этапа"
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

                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Статус документа</InputLabel>
                            <Select
                                onChange={handleStatusChange}
                                labelId="select-small"
                                id="select-small"
                                value={status}
                                label="Статус этапа"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Archived"}>Archived</MenuItem>
                                <MenuItem value={"Active"}>Active</MenuItem>

                            </Select>

                        </FormControl>

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

export default EditSatge;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resTask = await axios.get (process.env.SERVER_HOST + 'task/' + params.task)
    const resStage = await axios.get (process.env.SERVER_HOST + 'task/stage/' + params.stage)
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            task: resTask.data,
            stage: resStage.data,
            stageId: params.stage,
            user: resUser.data,
        }
    }
}