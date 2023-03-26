import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useRouter} from "next/router";
import HandshakeIcon from '@mui/icons-material/Handshake';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import PolicyIcon from '@mui/icons-material/Policy';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';
import {GetServerSideProps} from "next";
import axios from "axios";
import {IUser} from "../types/user";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { truncate } from 'fs';




interface NBarProps {
    user: IUser;
}
const NBar: React.FC<NBarProps> = ({user}) => {

    const [SelectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const menuItems = [
        {index:1, text: 'Инфопанель', href: '/' + user._id, icon: <HomeIcon />, badge: ''},
        {index:2, text: 'Задачи', href: '/'+ user._id +'/tasks', icon: <WorkHistoryIcon />, badge: user.taskInBox.length},
        {index:3, text: 'Документы', href: '/'+ user._id +'/docs', icon: <LibraryBooksIcon />, badge: ''},
        {index:4, text: 'Совещания', href:'/'+ user._id + '/meetings', icon: <HandshakeIcon/>, badge: ''},
        {index:5, text: 'Группы', href: '/'+ user._id +'/groups', icon: <GroupsIcon/>, badge:''},
        {index:6, text: 'Удостоверяющий центр', href: '/' + user._id +'/certificationCenter', icon: <PolicyIcon/>, badge: ''},
        {index:7, text: 'Репозиторий', href: '/' + user._id +'/repository', icon:  <InventoryIcon/>, badge:''},
    ]
    const router = useRouter ()
    return (

        <Box  sx={{display: {md: 'flex'}}}>
            <CssBaseline/>
            <Box sx={{overflow: 'auto'}}>
                <List  sx={{marginBottom:0}}>
                    {menuItems.map ((menuItems) => (
                        <ListItem key={menuItems.href}  disablePadding onClick={() => {
                            router.push (menuItems.href)
                        }}
                        >                          
                                <ListItemButton  selected={SelectedIndex === 2}
                                                 onClick={(event) => handleListItemClick(event, 2)}>
                                   
                                    <ListItemIcon>
                                    <Badge badgeContent={menuItems.badge} color="primary" invisible ={menuItems.badge===''}> 
                                             {menuItems.icon}
                                        </Badge>
                                       
                                    </ListItemIcon>
                                        <ListItemText secondary={menuItems.text} sx={{ display: {xs: 'none', md: 'flex'}}}/>
                                    
                                </ListItemButton>

                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}
export default NBar;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    console.log (response.data)
    return {
        props: {
            user: params.user,
        }
    }
}