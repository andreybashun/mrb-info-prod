import React from 'react';
import Breadcrumbs from 'nextjs-breadcrumbs';
import MLayout from "../../layouts/MLayout";
import {GetServerSideProps} from "next";
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import router from 'next/router';
import Popover from '@mui/material/Popover';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InfoIcon from '@mui/icons-material/Info';
import { Badge, CardActionArea, Container } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import OutboxOutlinedIcon from '@mui/icons-material/OutboxOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import { Doughnut, PolarArea} from 'react-chartjs-2';
import 'chart.js/auto';
import { height } from '@mui/system';



type IconType = (props: IconType) => JSX.Element;

function MouseOverPopover (props) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null> (null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl (event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl (null);
    };

    const open = Boolean (anchorEl);


    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}

            >
                {props.icon}
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{p: 1}}>{props.text}</Typography>
            </Popover>
        </div>
    );
}

const data = {
datasets: [{
    label: '',
    data: [300, 50, 100],
    backgroundColor: [
      'rgba(128, 128, 128, 0.4)',
      'rgba(0, 0, 255,  0.4)',
      'rgba(255, 205, 86,  0.4)'
    ],
    hoverOffset: 4,
    radius:35,
    cutout:20,
  }]
};

const dataPolar = {
    datasets: [{
        label: '',
        data: [4, 10, 6, 8],
        backgroundColor: [
          'rgba(233, 30, 99, 0.4)',
          'rgba(0, 0, 255,  0.4)',
          'rgba(255, 205, 86,  0.4)',
          'rgba(0, 150, 136,  0.4)',
        ],
        hoverOffset: 4,
      }]
    };

const Index = (props) => {
    return (
        <>
            <MLayout user={props.user}>
                <div>
                    <Breadcrumbs
                        useDefaultStyle
                        replaceCharacterList={[
                            {from: 'tasks', to: 'мои задачи'},
                            {from: 'Home', to: 'Login'},
                            {from: props.user._id, to: props.user.firstName[0] + '.' + props.user.secondName},
                            {from: 'drafts', to: 'проекты'},
                        ]
                        }
                    />
                </div>
                <Box sx={{flexGrow: 1, marginTop: 10}}>
                <Grid container spacing={4}>
                    <Grid xs={4} >

                        <Card sx={{ margin: 1}}>
                        <CardActionArea onClick={() =>
                                       router.push (`/${props.user._id}/tasks/`)}>
                            <CardContent >
                                <Stack direction="row"   justifyContent="space-between" alignItems="center" spacing={2}>                  
                                    <Typography gutterBottom variant="h5" color="gray">
                                        Задачи
                                    </Typography>  
                                    <Box sx={{height: '80px'}}>
                                        <Doughnut data={data}/>
                                    </Box>                                 
                                </Stack>

                            </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Grid container spacing={1}>

                                <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/tasks/`)}>
                                        <MouseOverPopover
                                            icon={<Badge badgeContent= {props.user.taskInBox.length} color="primary" >
                                                <InboxOutlinedIcon/>   
                                            </Badge>
                                             
                                            }
                                            text="входящие"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                входящие
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                    <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/docs/`)}>
                                        <MouseOverPopover
                                            icon={
                                                <Badge badgeContent={props.user.draftsInBox.length} color="primary" >
                                                    <OutboxOutlinedIcon/>
                                                </Badge>
                                            
                                           }
                                            text="драфты"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                исходящие
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                    <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/tasks/`)}>
                                        <MouseOverPopover
                                            icon={
                                                <Badge badgeContent={props.user.taskInBox.length} color="primary" >
                                            <AlarmOutlinedIcon  color="error"/>
                                            </Badge>
                                            }
                                            text="просрочено"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                просроченные
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                </Grid>

                            </CardActions>
                        </Card>

                    </Grid>


                    <Grid xs={4} >

                        <Card sx={{ margin: 1}}>
                        <CardActionArea onClick={() =>
                                       router.push (`/${props.user._id}/docs/`)}>
                            <CardContent >
                                <Stack direction="row"   justifyContent="space-between" alignItems="center" spacing={2}>                  
                                    <Typography gutterBottom variant="h5" color="gray">
                                        Документы
                                    </Typography>  
                                    <Box sx={{height: '80px'}}>
                                        <PolarArea data={dataPolar}/>
                                    </Box>                                 
                                </Stack>

                            </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Grid container spacing={1}>

                                <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/docs/`)}>
                                        <MouseOverPopover
                                            icon={<Badge badgeContent= {props.user.taskInBox.length} color="primary" >
                                                <InboxOutlinedIcon/>   
                                            </Badge>
                                             
                                            }
                                            text="входящие"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                входящие
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                    <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/tasks/`)}>
                                        <MouseOverPopover
                                            icon={
                                                <Badge badgeContent={props.user.draftsInBox.length} color="primary" >
                                                    <OutboxOutlinedIcon/>
                                                </Badge>
                                            
                                           }
                                            text="драфты"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                исходящие
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                    <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/tasks/`)}>
                                        <MouseOverPopover
                                            icon={
                                                <Badge badgeContent={props.user.taskInBox.length} color="primary" >
                                            <AlarmOutlinedIcon  color="error"/>
                                            </Badge>
                                            }
                                            text="просрочено"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                просроченные
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                </Grid>

                            </CardActions>
                        </Card>

                    </Grid>
                    <Grid xs={4} >

                        <Card sx={{ margin: 1}}>
                        <CardActionArea onClick={() =>
                                       router.push (`/${props.user._id}/tasks/`)}>
                            <CardContent >
                                <Stack direction="row"   justifyContent="space-between" alignItems="center" spacing={2}>                  
                                    <Typography gutterBottom variant="h5" color="gray">
                                        Совещания
                                    </Typography>  
                                    <Box sx={{height: '80px'}}>
                                        <Doughnut data={data}/>
                                    </Box>                                 
                                </Stack>

                            </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Grid container spacing={1}>

                                <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/tasks/`)}>
                                        <MouseOverPopover
                                            icon={<Badge badgeContent= {props.user.taskInBox.length} color="primary" >
                                                <InboxOutlinedIcon/>   
                                            </Badge>
                                             
                                            }
                                            text="входящие"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                входящие
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                    <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/tasks/`)}>
                                        <MouseOverPopover
                                            icon={
                                                <Badge badgeContent={props.user.draftsInBox.length} color="primary" >
                                                    <OutboxOutlinedIcon/>
                                                </Badge>
                                            
                                           }
                                            text="драфты"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                исходящие
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                    <Grid item xs={4}>
                                <Stack direction="column"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push (`/${props.user._id}/tasks/`)}>
                                        <MouseOverPopover
                                            icon={
                                                <Badge badgeContent={props.user.taskInBox.length} color="primary" >
                                            <AlarmOutlinedIcon  color="error"/>
                                            </Badge>
                                            }
                                            text="просрочено"
                                        />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                                просроченные
                                            </Typography>
                                    </Stack>
                                    
                                    </Grid>
                                </Grid>

                            </CardActions>
                        </Card>

                    </Grid>

                </Grid>
            </Box>
            </MLayout>
        </>

    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (`${process.env.SERVER_HOST}user/${params.user}`);
    console.log (response.data)
    return {
        props: {
            user: response.data,
            host: process.env.SERVER_HOST,
        }
    }
}