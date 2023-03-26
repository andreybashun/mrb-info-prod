import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import axios from "axios";
import FileUpload from "../../../components/FileUpload";
import ShaReleaseStepWraper from "../../../components/CertificationCenter/ShaReleaseStepWraper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Stack} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Breadcrumbs from "nextjs-breadcrumbs";
import {jsPDF} from "jspdf";
import {GetServerSideProps} from "next";
import MLayout from "../../../layouts/MLayout";



const Sha256Release = ({user, host}) => {
    const [activeStep, setActiveStep] = useState (0)
    const [file, setFile] = useState (null)
    const [certificate, setCertificate] = useState (null)
    const router = useRouter ()

    const [SuccessModalOpen, setSuccessModalOpen] = React.useState (false);
    const [modalText, setModalText] = React.useState (null)
    const handleSuccessModalOpen = () => setSuccessModalOpen (true);
    const handleSuccessModalClose = () => setSuccessModalOpen (false);

    const [FailModalOpen, setFailModalOpen] = React.useState (false);
    const handleFailModalOpen = () => setFailModalOpen (true);
    const handleFailModalClose = () => setFailModalOpen (false);

    const [checked, setChecked] = React.useState (false);

    const [pdf, setpdf] = React.useState (null)

    const buttonStyle = {
        marginTop: 4,
        borderRadius: 6,
        fontSize: 12,
        color: "info"

    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 470,
        bgcolor: 'background.paper',
        border: '1px solid #757575',
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
        justifyContent: "right",
        alignItems: "center"

    };

    const next = () => {
        if (activeStep !== 1) {
            setActiveStep (prev => prev + 1)
        } else {
            const SHA256Data = new FormData ()
            SHA256Data.append ('file', file)
            axios.post(host + 'crypto/sha256', SHA256Data)
                .then (resp => {
                    const calculatedHash = resp.data
                    if (calculatedHash) {
                        setModalText (calculatedHash)
                        setSuccessModalOpen (true)
                        setpdf (calculatedHash)
                    } else {
                        setFailModalOpen (true)
                    }
                })
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
                        {from: 'certificationCenter', to: 'Удостоверяющий центр'},
                        {from: 'sha256Release', to: 'SHA256. Выпуск сертификата'},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                    ]
                    }
                />
            </div>
            <Box sx={{border: '1px solid #757575', margin: 2, padding: 4, borderRadius: 3}}>

                <ShaReleaseStepWraper activeStep={activeStep}>
                    {activeStep === 0 && <FileUpload setFile={setFile} next={next}>
                        <Button>Загрузите Файл</Button>
                    </FileUpload>}
                    {activeStep === 1 &&
                        <Button onClick={next}>Нажмите для выпуска сертификата</Button>
                    }

                </ShaReleaseStepWraper>
                <Grid container justifyContent={"space-around"}>
                    <Button size="small" variant="contained" sx={buttonStyle} disabled={activeStep === 0}
                            onClick={back}> <ChevronLeftIcon/> назад </Button>
                    <Button size="small" variant="contained" sx={buttonStyle} disabled={activeStep === 3}
                            onClick={next}> вперед <ChevronRightIcon/></Button>
                </Grid>
                <Modal
                    open={SuccessModalOpen}
                    onClose={handleSuccessModalClose}
                    aria-labelledby={modalText}
                    aria-describedby="modal-modal-description"
                    title={modalText}
                >
                    <Box sx={style} justifyContent="right" alignItems="center">
                        <Stack>
                            <CheckCircleIcon color={"success"} sx={{fontSize: 40}}/>
                            <Typography id="modal-modal-title" variant="h5" component="h2" align={"center"}>
                                Внимание
                            </Typography>

                        </Stack>

                        <Typography id="modal-modal-description" sx={{mt: 2, marginBottom: 2}} align={"center"}>
                            Выпущенный SHA256 сертификат
                        </Typography>
                        <Typography id="modal-modal-description" variant="caption" sx={{mt: 2, marginBottom: 2}}
                                    align={"center"}>
                            {modalText}
                        </Typography>
                        <FormGroup sx={{paddingTop: 4}} onChange={() => setChecked (!checked)}>
                            <FormControlLabel control={<Checkbox color="info"/>} label=
                                {
                                    <Typography id="modal-modal-description" variant="caption" sx={{mt: 0}}
                                                align={"center"}>
                                        Сформировать протокол выпуска сертификата
                                    </Typography>
                                }
                            />
                            <FormControlLabel control={<Checkbox color="info"/>} label=
                                {
                                    <Typography id="modal-modal-description" variant="caption" sx={{mt: 0}}
                                                align={"center"}>
                                        Выслать документ и сертификат на электронную почту
                                    </Typography>
                                }
                            />
                        </FormGroup>
                        <Button onClick={() => {

                            setChecked (false)
                            if (checked === true) {
                                const doc = new jsPDF ();
                                const date = new Date ();
                                doc.text (pdf, 10, 10);
                                doc.text ("Certificate released:", 10, 20)
                                doc.text ("id: " + Date.now (), 10, 30)
                                doc.text ("date: " + date.toLocaleDateString () + " " + date.toLocaleTimeString (), 10, 40);
                                doc.text ("file: " + file.name, 10, 50);
                                doc.cell (10, 280, 190, 10, "Creation Request                    MRB Platform                https://mrb-info.ru", 1, "")
                                doc.save ();
                            }
                            handleSuccessModalClose ()
                        }
                        } variant="outlined" color={"info"}
                                sx={{marginTop: 2, borderRadius: 6, fontSize: 12, marginLeft: 22}}>Ок
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </MLayout>
    );
};

export default Sha256Release;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            user: resUser.data,
            host: process.env.SERVER_HOST
        }
    }
}