import React from 'react';
import {Card, Container, Step, StepLabel, Stepper, ThemeProvider} from "@mui/material";
import Grid from "@mui/material/Grid";
import {StepperThem} from "../../StepperThem";
import {auto} from "@popperjs/core";

interface ShaReleaseStepWraperProps{
    activeStep: number;
    children: JSX.Element|JSX.Element[];
}

const steps= [
    'Загрузка файла', 'Выпуск Сертификата'];

const ShaReleaseStepWraper:React.FC<ShaReleaseStepWraperProps> = ({activeStep, children }) => {
    return (
        <ThemeProvider theme={StepperThem}>
            <Container sx={{p:2, marginTop: 1}}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) =>
                        <Step
                            key={index}
                            completed={activeStep > index}
                        >
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )}
                </Stepper>

                <Grid container justifyContent="center" sx={{margin: '60px 0', height: auto}}>
                    <Card sx={{width:auto}}>
                        {children}
                    </Card>
                </Grid>

            </Container>
        </ThemeProvider>
    );
};

export default ShaReleaseStepWraper;
