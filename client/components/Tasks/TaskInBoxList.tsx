import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {Button, Stack} from "@mui/material";

import {IUser} from "../../types/user";
import TaskItemInBox from "./TaskItemInBox";
import router from "next/router";



interface TaskInBoxListProps {
    user:IUser;
    serverHost: string;
}




const TaskInBoxList: React.FC<TaskInBoxListProps>= ({ user, serverHost}) => {

    return (
        <Stack direction={"column"} spacing={2} sx={{
            padding: 5,
        }}>
 
            <List sx={{padding: 1, border: '1px  solid grey', borderRadius: 2}}>
            
                <Grid container spacing={2}>
                    <Grid xs={5} container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          fontSize={'0.75rem'}>
                        <Box sx={{marginTop: 2, marginLeft: 12}}>
                            Имя задачи
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
                    {user.taskInBox.map (task =>  <TaskItemInBox key={task._id} task={task} user={user} serverHost={serverHost}/>)}
                </Box>
            </List>
        </Stack>
    );
};

export default TaskInBoxList;
