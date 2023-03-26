import React, {ReactElement} from 'react';
import {Card, Container, Step, StepLabel, Stepper, ThemeProvider} from "@mui/material";
import Grid from "@mui/material/Grid";
import {StepperThem} from "../../StepperThem";
import {auto} from "@popperjs/core";


interface StepWrapperProps{
    activeStep: number;
    children: JSX.Element|JSX.Element[];
}


const steps= [
    'Учетные данные документа', 'Персональные данные автора', 'Применяемость документа','Документы для согласования','Маршрут', 'Выпуск УЛ'];

const TaskStageStepWrapper:React.FC<StepWrapperProps> = ({activeStep, children }) => {
    return (
        <ThemeProvider theme={StepperThem}>
        <Container sx={{p:5}}>
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

                <Grid container justifyContent="center" sx={{margin: '20px 0', height: auto}}>
                    <Card sx={{width:auto}}>
                        {children}
                    </Card>
                </Grid>

        </Container>
        </ThemeProvider>
    );
};

export default TaskStageStepWrapper;
