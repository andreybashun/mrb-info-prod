import React from 'react';
import Nbar from "../components/NBar";
import {myTheme} from "../MyTheme";
import {ThemeProvider} from "@mui/material";
import Appbar from "../components/Appbar";
import Grid from '@mui/material/Grid';
import List from "@mui/material/List";
import Calendar from "../components/Calendar";
import {IUser} from "../types/user";


type Props = {
    children?: React.ReactNode;
    user: IUser
};

const MLayout: React.FC<Props> = ({user, children}) => {
    return (
        <>
            <ThemeProvider theme={myTheme}>
                <Grid container spacing={2} columns={20}>
                    <Grid item xs={20}>
                        <Appbar user = {user}/>
                    </Grid>
                    <Grid item xs={3} md={3.7} sx={{display: {xs: 'none', sm: 'block'}}}>
                        <Nbar user = {user}/>
                    </Grid>
                    <Grid item xs={20} sm={12} md={12.5}>
                        <List>
                            <div>
                                {children}
                            </div>
                        </List>

                    </Grid>
                    <Grid item xs={3} sm={4} md={3.8} sx={{display: {xs: 'none', sm: 'block'}}}>
                        <List>
                            <Calendar/>
                        </List>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
};

export default MLayout;
