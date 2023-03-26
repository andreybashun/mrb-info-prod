import React from 'react';
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DocRevisionItem from "./DocRevisionItem";
import {IDocRevision} from "../../types/doc";
import {useRouter} from "next/router";
import ArticleIcon from "@mui/icons-material/Article";
import {IUser} from "../../types/user";


interface DocRevisionListProps{
    docRevisions:IDocRevision[],
    user:IUser,
    serverHost:string,
}




const DocRevisionList: React.FC<DocRevisionListProps> = ({docRevisions, user, serverHost}) => {
    const router = useRouter();
    const {draft} = router.query;
    return (
        <Stack direction={"column"} spacing={2} sx={{
            padding: 5,
        }}>
            <Stack direction="row"  justifyContent={"space-between"}>

                    <Button size="small" variant="contained" onClick={() =>
                        router.push ('/' + user._id + '/docs/drafts/' + draft + '/createRevision/')}
                    >
                        Создать ревизию
                    </Button>

                <Button startIcon={<ArticleIcon color="info"/>} size="small" variant="contained"  onClick={()=> router.push('/' + user._id + '/docs/drafts/' + draft + '/draftCard')}>
                    Карточка документа
                </Button>


            </Stack>
            <List  sx={{padding:1, border: '1px  solid grey', borderRadius: 2}}>
                <Grid container spacing={2}>
                    <Grid xs={5} container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2, marginLeft:6}}>
                            Наименование ревизии
                        </Box>
                        <Divider/>

                    </Grid>
                    <Grid xs={2} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}
                    >
                        <Box sx={{marginTop:2}}>
                            автор
                        </Box>

                    </Grid>
                    <Grid xs={2} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2, marginLeft:-3}}>
                            Статус
                        </Box>
                    </Grid>
                    <Grid xs={2} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop:2, marginLeft:-4}}>
                            Дата изменения
                        </Box>
                    </Grid>
                    <Grid xs={1} container></Grid>
                </Grid>
                <Divider/>
                <Box p={2}>
                        {docRevisions.map(docRevision =>
                            <DocRevisionItem key={docRevision._id} docRevision={docRevision} user={user} serverHost={serverHost}/>
                        )}
               </Box>
            </List>
        </Stack>
    );
};

export default DocRevisionList;

