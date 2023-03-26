import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useInput} from "../../../../hooks/useInput";
import Box from "@mui/material/Box";
import {FormControl, InputLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useRouter} from "next/router";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import DocStepWrapper from "../../../../components/Docs/DocStepWraper";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import {GetServerSideProps} from "next";
import MLayout from "../../../../layouts/MLayout";
import Breadcrumbs from "nextjs-breadcrumbs";


const CreateDraft = ({user, serverHost}) => {
    const [activeStep, setActiveStep] = useState (0);
    const name = useInput ('');
    const author = user._id;
    const description = useInput ('');
    const lastChangeDate = useInput ('');
    const organization = user.organization;
    const ata = useInput ('');
    const creationDate = useInput ('');
    const router = useRouter ();

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    const [open, setOpen] = useState (false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen (false);
    };

    const [type, setType] = React.useState ('');

    const handleTypeChange = (event: SelectChangeEvent) => {

        setType (event.target.value);
    };

    const [status, setStatus] = React.useState ('');

    const handleStatusChange = (event: SelectChangeEvent) => {

        setStatus (event.target.value);
    };

    const [aircraftType, setAircraftType] = React.useState ('');

    const handleAircraftChange = (event: SelectChangeEvent) => {
        setAircraftType (event.target.value);
    };

    const [engineType, setEngineType] = React.useState ('');

    const handleEngineChange = (event: SelectChangeEvent) => {
        setEngineType (event.target.value);
    };

    const [decimalNumber, setDecimalNumber] = React.useState ('number')

    useEffect (() => {
        axios.get (serverHost + 'document')
            .then (resp => {
                let maxIndex = 0

                // индекс нового документа (последнее поле доцемального номера)
                // присваивается следующему нибольшему индексу документа с совпадающими полями 1-4.
                //  в случае удаления последнего документа в массиве с совпадающими полями 1-4,
                // его индекс забирается с задвоением истории. Нужно сделать глобальный счетчик на событие для
                // их уникальной нумерации

                resp.data.map (doc => {
                    // if (doc.decId.includes ('Doc.' + type + '.' + aircraftType + '.' + ata.value)) {
                    //     i++
                    // }
                    if (doc.decId.includes('Doc.' + type + '.' + aircraftType + '.' + ata.value)){
                        const index = 100 * Number(doc.decId.slice(-3,-2)) + 10 * Number(doc.decId.slice(-2,-1)) + Number(doc.decId.slice(-1))
                        if (index > maxIndex){
                            maxIndex = index
                        }
                    }

                })
                if (maxIndex > 999) {
                    console.log ('база не может содержать более 999 объектов')
                } else {
                    const num = (1000 + maxIndex + 1).toString ().slice (1)
                    setDecimalNumber ('Doc.' + type + '.' + aircraftType + '.' + ata.value + '.' + num)
                }
            })
            .catch (e => console.log (e))
    })
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

            if (activeStep === 3) {
                (async () => {
                    await delay(2000);
                })();
            }
            setActiveStep (prev => prev + 1)
        } else {

            axios.post (serverHost + 'document', {
                type: type,
                name: name.value,
                author: user._id,
                status: status,
                description: description.value,
                decId: decimalNumber,
                lastChangeDate: date.toLocaleDateString (),
                organization: organization.value,
                ata: ata.value,
                aircraftType: aircraftType,
                engineType: engineType,
                creationDate: date.toLocaleDateString (),
            })
                .then (resp => {
                    setOpen (true)
                    router.push ({pathname: '/' + user._id + '/docs/drafts/' + resp.data._id})
                })
                .catch (e => console.log (e))
        }
    }
    const back = () => {
        setActiveStep (prev => prev - 1)
    }

    return (
        <MLayout user={user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'docs', to: 'мои документы'},
                        {from: 'drafts', to: 'проекты'},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                        {from: 'createDraft', to: 'создание драфта'},
                    ]
                    }
                />
            </div>
            <DocStepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
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
                {activeStep === 1 &&

                    <Box sx={{p: 1}}>
                        <FormControl fullWidth sx={{paddingBottom: 2}} size="small">
                            <InputLabel id="select-small" sx={{paddingRight: 1}}>Тип документа</InputLabel>
                            <Select
                                onChange={handleTypeChange}
                                labelId="select-small"
                                id="select-small"
                                value={type}
                                label="Тип документа"
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
                                label={"Наименование документа"}
                                variant={"outlined"}
                                size={"small"}
                            />
                        </FormControl>

                        <Box sx={{p: 1, width: '95ch'}}>
                            <TextField
                                {...description}
                                id="task_revision_name"
                                label="описание документа"
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
                                label="Статус документа"
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

export default CreateDraft;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            user: response.data,
            serverHost: process.env.SERVER_HOST
        }
    }
}