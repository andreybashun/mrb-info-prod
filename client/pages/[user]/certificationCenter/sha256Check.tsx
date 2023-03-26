import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import axios from "axios";
import FileUpload from "../../../components/FileUpload";
import ShaCheckStepWraper from "../../../components/CertificationCenter/ShaCheckStepWraper";
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
import DangerousIcon from '@mui/icons-material/Dangerous';
import {auto} from "@popperjs/core";
import { jsPDF } from "jspdf";
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import MLayout from "../../../layouts/MLayout";



const Sha256Check = ({user, host}) => {
    const [activeStep, setActiveStep] = useState (0)
    const [file, setFile] = useState (null)
    const [certificate, setCertificate] = useState (null)
    const [SuccessModalOpen, setSuccessModalOpen] = React.useState (false);
    const handleSuccessModalOpen = () => setSuccessModalOpen (true);
    const handleSuccessModalClose = () => setSuccessModalOpen (false);
    const [FailModalOpen, setFailModalOpen] = React.useState (false);
    const handleFailModalOpen = () => setFailModalOpen (true);
    const handleFailModalClose = () => setFailModalOpen (false);
    const [checked, setChecked] = React.useState(false);
    const [pdf, setpdf] = React.useState(null)

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
        width: auto,
        bgcolor: 'background.paper',
        border: '1px solid #757575',
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
        justifyContent:"right",
        alignItems:"center"

    };

    const next = () => {

        if (activeStep !== 2) {
            setActiveStep (prev => prev + 1)
        } else {
            const HashData = new FormData ()
            HashData.append ('file', certificate)
            axios.post (host + 'crypto/pdf', HashData)
                .then (resp => {
                    const uploadedHash = resp.data
                    const SHA256Data = new FormData ()
                    SHA256Data.append ('file', file)
                    axios.post (host + 'crypto/sha256', SHA256Data)
                        .then (resp => {
                            const calculatedHash = resp.data
                            setpdf(calculatedHash)
                            console.log(uploadedHash)
                            console.log(calculatedHash)
                            if (uploadedHash.toString() === calculatedHash.toString()) {
                                setSuccessModalOpen (true)
                            } else {
                                setFailModalOpen (true)
                            }
                        })
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
                        {from: 'sha256Check', to: 'SHA256. Проверка сертификата'},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                    ]
                    }
                />
            </div>
            <Box sx={{border: '1px solid #757575',  margin:2, padding:4, borderRadius:3}}>

                <ShaCheckStepWraper activeStep={activeStep}>
                    {activeStep === 0 && <FileUpload setFile={setFile} next={next}>
                        <Button>Загрузите Файл</Button>
                    </FileUpload>}
                    {activeStep === 1 && <FileUpload setFile={setCertificate} next={next}>
                        <Button>Загрузите Сертификат</Button>
                    </FileUpload>}
                    {activeStep === 2 &&
                        <Button onClick={next}>Нажмите для проверки сертификата</Button>
                    }

                </ShaCheckStepWraper>
                <Grid container justifyContent={"space-around"}>
                    <Button size="small" variant="contained" sx={buttonStyle} disabled={activeStep === 0}
                            onClick={back} > <ChevronLeftIcon/> назад </Button>
                    <Button size="small" variant="contained" sx={buttonStyle} disabled={activeStep === 3}
                            onClick={next}> вперед <ChevronRightIcon/></Button>
                </Grid>
                <Modal
                    open={SuccessModalOpen}
                    onClose={handleSuccessModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}  justifyContent="right" alignItems="center">
                        <Stack>
                            <CheckCircleIcon color={"success"}  sx={{ fontSize: 40 }}/>
                            <Typography id="modal-modal-title" variant="h5" component="h2" align={"center"}>
                                Внимание
                            </Typography>
                        </Stack>

                        <Typography id="modal-modal-description" sx={{mt: 2, marginBottom: 2}} align={"center"}>
                            Действительный SHA256 сертификат
                        </Typography>

                        <FormGroup>
                            <FormControlLabel control={<Checkbox color="info"  onChange={() => setChecked(!checked)}/>} label=
                                {
                                    <Typography id="modal-modal-description" variant="caption" sx={{mt: 0}}
                                                align={"center"} >
                                        Сформировать протокол проверки сертификата
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
                            setChecked(false)
                            if (checked === true){
                                console.log('переход к формированию протокола')
                                const doc = new jsPDF();
                                let certStatus = "";
                                if (SuccessModalOpen === true) {certStatus = "the certificate is validated"}
                                else {certStatus = "the certificate is not validated"}
                                const date = new Date();
                                doc.cell(10,10,190,10,"Verification Request. MRB Platform. https://mrb-info.ru",1,"")
                                doc.text("id: " + Date.now() , 10, 30 )
                                doc.text("date: " + date.toLocaleDateString() +" "+ date.toLocaleTimeString(),10, 40);
                                doc.text("certificate : SHA certificate", 10,50);
                                doc.text(pdf, 10, 60);
                                doc.text("certificate file: " + certificate.name, 10, 70);
                                doc.text("file: " + file.name, 10, 80);
                                doc.text("status: " + certStatus, 10, 90);
                                doc.save();
                            }
                            handleSuccessModalClose ()
                        }
                        }  variant="outlined" color={"info"}  sx={{marginTop: 2, borderRadius: 6, fontSize: 12, marginLeft:22}}>
                        </Button>
                    </Box>
                </Modal>
                <Modal
                    open={FailModalOpen}
                    onClose={handleFailModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}  justifyContent="center" alignItems="center">
                        <DangerousIcon color={"error"}  sx={{ fontSize: 40 }}/>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                            Внимание
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2, marginBottom: 2}} align={"center"}>
                            Сертификат не прошел проверкую.
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2, marginBottom: 2}} align={"center"}>
                            Возможно используется другой алгоритм шифрования.
                        </Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox color="info" onChange={() => setChecked(!checked)}/>} label=
                                {
                                    <Typography id="modal-modal-description" variant="caption" sx={{mt: 0}}
                                                align={"center"}>
                                        Сформировать протокол проверки сертификата
                                    </Typography>
                                }
                            />
                            <FormControlLabel control={<Checkbox color="info" onChange={() => setChecked(!checked)}/> } label=
                                {
                                    <Typography id="modal-modal-description" variant="caption" sx={{mt: 0}}
                                                align={"center"}>
                                        Выслать документ и сертификат на электронную почту
                                    </Typography>
                                }
                            />
                        </FormGroup>
                        <Button onClick={() => {
                            setChecked(false)
                            if (checked === true){
                                console.log('переход к формированию протокола')
                                const doc = new jsPDF();
                                let certStatus = "";
                                if (SuccessModalOpen === true) {certStatus = "the certificate is validated"}
                                else {certStatus = "the certificate is not validated"}
                                const date = new Date();
                                doc.cell(10,10,190,10,"Verification Request. MRB Platform. https://mrb-info.ru",1,"")
                                doc.text("id: " + Date.now() , 10, 30 )
                                doc.text("date: " + date.toLocaleDateString()+ " " + date.toLocaleTimeString(),10, 40);
                                doc.text("certificate : SHA certificate", 10,50);
                                doc.text(pdf, 10, 60);
                                doc.text("certificate file: " + certificate.name, 10, 70);
                                doc.text("file: " + file.name, 10, 80);
                                doc.text("status: " + certStatus, 10, 90);
                                doc.save();
                            }
                            handleFailModalClose ()
                        }
                        }
                                variant="outlined" color={"info"}  sx={{marginTop: 2, borderRadius: 6, fontSize: 12, marginLeft:22}}>Ок
                        </Button>
                    </Box>
                </Modal>
            </Box>

        </MLayout>
    );
};

export default Sha256Check;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            user: resUser.data,
            host: process.env.SERVER_HOST
        }
    }
}