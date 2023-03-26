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


const menuItems = [
    {text: 'Инфопанель', href: '/', icon: <HomeIcon />},
    {text: 'Задачи', href: '/tasks', icon: <WorkHistoryIcon />},
    {text: 'Документы', href: '/docs', icon: <LibraryBooksIcon />},
    {text: 'Совещания', href: '/meetings', icon: <HandshakeIcon/>},
    {text: 'Группы', href: '/groups', icon: <GroupsIcon/>},
    {text: 'Удостоверяющий центр', href: '/certificationCenter', icon: <PolicyIcon/>},
    {text: 'Репозиторий', href: '/repository', icon:  <InventoryIcon/>},
]

export default function Navbar () {
    const router = useRouter ()
    return (

        <Box  sx={{display: {md: 'flex'}}}>
            <CssBaseline/>
            <Box sx={{overflow: 'auto'}}>
                <List  sx={{marginBottom:0}}>
                    {menuItems.map ((menuItems) => (
                        <ListItem key={menuItems.href} disablePadding onClick={() => router.push (menuItems.href)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {menuItems.icon}
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
