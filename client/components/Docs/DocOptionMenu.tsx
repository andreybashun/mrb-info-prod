import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import {IDoc} from "../../types/doc";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {IUser} from "../../types/user";

interface DocOptionMenuProps {
    doc: IDoc;
    user:IUser;
    path: string;
}

const StyledMenu = styled ((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
)) (({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing (1),
        minWidth: 10,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing (1.5),
            },
            '&:active': {
                backgroundColor: alpha (
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '1px solid #757575',
    boxShadow: 24,
    p: 2,
    borderRadius: 2
};

const DocOptionMenu: React.FC<DocOptionMenuProps> = ({doc, user, path}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement> (null);
    const open = Boolean (anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl (event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl (null);
    };
    const router = useRouter ();

    const [modalOpen, setModalOpen] = React.useState (false);
    const handleModalOpen = () => setModalOpen (true);
    const handleModalClose = () => setModalOpen (false);

    const [dialogOpen, setDialogOpen] = React.useState (false);
    const handleDialogOpen = () => setDialogOpen (true);
    const handleDialogClose = () => setDialogOpen (false);

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    router.push ('/' + user._id + '/docs/drafts/createDraft')
                }
                } disableRipple>
                    <EditIcon />
                </MenuItem>
                <MenuItem>
                    <Modal
                        open={modalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                                Внимание
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}} align={"center"}>
                                Вы хотите удалить документ. Документ содержит ревизии. Для удаления документа удалите
                                все его ревизии и попробуйте снова.
                            </Typography>
                            <Button onClick={() => {
                                handleModalClose ()
                                handleClose ()
                            }
                            }
                                    variant="outlined" color={"info"} sx={{mt: 2, marginTop: 2, marginLeft: 22,}}>Ок
                            </Button>
                        </Box>
                    </Modal>
                    <Modal
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                                Удаление документа
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}} align={"center"}>
                                Вы действительно хотите удалить документ? Документ будет помещен в архив. Восстановление документа будет возможно из архивной версии в течении 120 дней
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid>
                                    <Button onClick={() => {
                                        handleDialogClose ()
                                        handleClose ()

                                    }
                                    }
                                            variant="outlined" color={"info"}
                                            sx={{mt: 2, marginTop: 2}}>Отменить
                                    </Button>
                                </Grid>
                                <Grid >
                                    <Button onClick={() => {
                                        handleDialogClose ()
                                        handleClose ()
                                        axios.delete(path + 'document/'+ doc._id)
                                            .then(() => router.push('/' + user._id + '/docs/drafts'))
                                            .catch(e => console.log(e))
                                        // router.push ('/docs/drafts/' + doc._id)
                                    }
                                    }
                                            variant="contained" color={"info"}
                                            sx={{mt: 2, marginTop: 2}}
                                    >Удалить
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                    <DeleteIcon onClick={() => {

                        if (doc.docRevisions.length === 0) {
                            handleDialogOpen ()
                        } else {
                            handleModalOpen ()
                        }
                    }
                    }/>
                </MenuItem>
                <Divider sx={{my: 0.5}}/>
                <MenuItem onClick={handleClose} disableRipple>
                    <ArchiveIcon/>
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon/>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}

export default DocOptionMenu
