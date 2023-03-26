import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {IDoc} from "../../types/doc";
import DocItem from "./DocItem";
import {useRouter} from "next/router";
import {IUser} from "../../types/user";

interface DocListProps {
    docs: IDoc[],
    user: IUser,
    path:string
}

const DocList: React.FC<DocListProps> = ({docs, user, path}) => {
    const router = useRouter ();
    return (
        <Stack direction={"column"} spacing={2} sx={{
            padding: 5,
        }}>
            <Stack direction="row" spacing={2}>
                <Button size="small" variant="contained" onClick={() =>
                    router.push ('/' + user._id + '/docs/drafts/createDraft')}
                >
                    Создать документ
                </Button>
            </Stack>
            <List sx={{padding: 1, border: '1px  solid grey', borderRadius: 2}}>
                <Grid container spacing={2}>
                    <Grid xs={5} container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop: 2, marginLeft: 12}}>
                            Имя документа
                        </Box>
                        <Divider/>

                    </Grid>
                    <Grid xs={4} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}
                    >
                        <Box sx={{marginTop: 2}}>
                            автор
                        </Box>

                    </Grid>
                    <Grid xs={2} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop: 2}}>
                            Дата изменения
                        </Box>
                    </Grid>
                    <Grid xs={1} container></Grid>
                </Grid>
                <Divider/>

                <Box p={2}>
                    {docs.map (docs => {
                            // if (docs.author === 'A.Bashun')
                            // {
                            //     return (<DocItem key={docs._id} doc={docs}/>)
                            // }
                            return (<DocItem key={docs._id} doc={docs} user={user} path={path}/>)
                        }
                    )}
                </Box>
            </List>
        </Stack>
    );
};

export default DocList;
