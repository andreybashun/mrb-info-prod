import React from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListItemButton from "@mui/material/ListItemButton";
import {IDoc} from "../../types/doc";
import {useRouter} from "next/router";
import DocOptionMenu from "./DocOptionMenu";
import {IUser} from "../../types/user";


interface DocItemProps {
    doc: IDoc;
    user:IUser;
    path:string;
}


 const DocItem: React.FC<DocItemProps> = ({doc, user, path}) => {
    const router = useRouter();
    return (
        <Grid container spacing={2}>
            <ListItemButton>
                <Grid xs={5} container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center">
                    <IconButton color="info"  onClick={() => router.push ('/' + user._id + '/docs/drafts/' + doc._id)}>
                        <AssignmentIcon/>
                    </IconButton>
                    {doc.name}
                </Grid>
                <Grid xs={4}  container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {user.firstName[0] + '.' + user.secondName}
                </Grid>
                <Grid xs={2} container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    {doc.lastChangeDate}
                </Grid>
                <Grid xs={1} container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center">
                    <DocOptionMenu doc={doc} user={user} path={path}/>
                </Grid>
                <Divider/>
            </ListItemButton>
        </Grid>

    );
};

export default DocItem;
