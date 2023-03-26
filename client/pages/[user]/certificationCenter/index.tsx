import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import {Popover, Stack} from "@mui/material";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InfoIcon from '@mui/icons-material/Info';
import {useRouter} from "next/router";
import Breadcrumbs from "nextjs-breadcrumbs";
import {GetServerSideProps} from "next";
import axios from "axios";
import MLayout from "../../../layouts/MLayout";

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


const Index = ({user}) => {
    const router = useRouter();

    return (
        <MLayout user={user}>
            <div>
                <Breadcrumbs
                    useDefaultStyle
                    replaceCharacterList={[
                        {from: 'certificationCenter', to: 'Удостоверяющий центр'},
                        {from: user._id, to: user.firstName[0] + '.' + user.secondName},
                    ]
                    }
                />
            </div>
            <Box sx={{flexGrow: 1, marginTop: 4}}>
                <Grid container spacing={4}>
                    <Grid xs={4}>

                        <Card sx={{maxWidth: 345}}>

                            <CardContent>
                                <Stack direction="row" spacing={2}>
                                    <Box
                                        component="img"
                                        sx={{
                                            width: 45,
                                            height:45,
                                            paddingBottom:2
                                        }}
                                        src="/static/images/cards/crypto_1.png"
                                    />
                                    <Typography gutterBottom variant="body2" color="text.black" sx={{align:"center"}}>
                                        Сертификация целостности файла внешним ключом
                                    </Typography>

                                </Stack>

                            </CardContent>
                            <CardActions>
                                <Stack direction="row"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push ('/' + user._id + '/certificationCenter/sha256Check')}>
                                        <MouseOverPopover
                                            icon={<VerifiedUserIcon
                                                fontSize="medium"
                                                sx={{color: "cornflowerblue"}}

                                            />}
                                            text="Проверить сертификат"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            проверить
                                        </Typography>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push ('/' + user._id + '/certificationCenter/sha256Release')}>
                                        <MouseOverPopover
                                            icon={<HistoryEduIcon
                                                fontSize="medium"
                                                sx={{color: "cornflowerblue"}}

                                            />}
                                            text="Выпустить сертификат"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            выпустить
                                        </Typography>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}>
                                        <MouseOverPopover
                                            icon={<InfoIcon  fontSize="medium" sx={{color: "cornflowerblue"}}/>}
                                            text="Дополнительная информация"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            инфо
                                        </Typography>
                                    </IconButton>
                                </Stack>

                            </CardActions>
                        </Card>

                    </Grid>
                    <Grid xs={4}>

                        <Card sx={{maxWidth: 345}}>

                            <CardContent>
                                <Stack direction="row" spacing={2}>
                                    <Box
                                        component="img"
                                        sx={{
                                            width: 45,
                                            height:45,
                                            paddingBottom:2
                                        }}
                                        src="/static/images/cards/crypto_2.png"
                                    />
                                    <Typography gutterBottom variant="body2" color="text.black" sx={{align:"center"}}>
                                        Сертификация целостности файла вложенным ключом
                                    </Typography>

                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Stack direction="row"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push ('/' + user._id + '/certificationCenter/sha256Check')}>
                                        <MouseOverPopover
                                            icon={<VerifiedUserIcon
                                                fontSize="medium"
                                                sx={{color: "cornflowerblue"}}

                                            />}
                                            text="Проверить сертификат"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            проверить
                                        </Typography>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push ('/' + user._id + '/certificationCenter/sha256Release')}>
                                        <MouseOverPopover
                                            icon={<HistoryEduIcon
                                                fontSize="medium"
                                                sx={{color: "cornflowerblue"}}

                                            />}
                                            text="Выпустить сертификат"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            выпустить
                                        </Typography>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}>
                                        <MouseOverPopover
                                            icon={<InfoIcon  fontSize="medium" sx={{color: "cornflowerblue"}}/>}
                                            text="Дополнительная информация"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            инфо
                                        </Typography>
                                    </IconButton>
                                </Stack>
                            </CardActions>
                        </Card>

                    </Grid>
                    <Grid xs={4}>

                        <Card sx={{maxWidth: 345}}>
                            <CardContent>
                                <Stack direction="row" spacing={2}>
                                    <Box
                                        component="img"
                                        sx={{
                                            width: 45,
                                            height:45,
                                            paddingBottom:2
                                        }}
                                        src="/static/images/cards/crypto_7.png"
                                    />
                                    <Typography gutterBottom variant="body2" color="text.black" sx={{align:"center"}}>
                                        Сертификация целостности и подлинности файла.
                                    </Typography>

                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Stack direction="row"
                                       justifyContent="space-between"
                                       alignItems="center"
                                >
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push ('/' + user._id + '/certificationCenter/sha256Check')}>
                                        <MouseOverPopover
                                            icon={<VerifiedUserIcon
                                                fontSize="medium"
                                                sx={{color: "cornflowerblue"}}

                                            />}
                                            text="Проверить сертификат"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            проверить
                                        </Typography>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}  onClick={() =>
                                        router.push ('/' + user._id + '/certificationCenter/sha256Release')}>
                                        <MouseOverPopover
                                            icon={<HistoryEduIcon
                                                fontSize="medium"
                                                sx={{color: "cornflowerblue"}}

                                            />}
                                            text="Выпустить сертификат"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            выпустить
                                        </Typography>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" sx={{borderRadius:5}}>
                                        <MouseOverPopover
                                            icon={<InfoIcon  fontSize="medium" sx={{color: "cornflowerblue"}}/>}
                                            text="Дополнительная информация"
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            инфо
                                        </Typography>
                                    </IconButton>
                                </Stack>
                            </CardActions>
                        </Card>

                    </Grid>

                </Grid>
            </Box>
        </MLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            user: resUser.data
        }
    }
}