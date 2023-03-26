import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {FormControl} from "@mui/material";

export default function Credentials() {
    return (
        <Box>
            <FormControl fullWidth sx={{p:1}}>
                <TextField id="task_revision_type" label="тип" variant="outlined" size="small"/>
            </FormControl>
            <FormControl fullWidth sx={{ p: 1}}>
                <TextField id="task_revision_id" label="идентификатор" variant="outlined" size="small"/>
            </FormControl>
            <FormControl fullWidth sx={{ p: 1}}>
                <TextField id="task_revision_name" label="имя" variant="outlined" size="small"/>
            </FormControl>
            <FormControl  sx={{ p: 1, width: '50ch' }}>
                <TextField id="task_revision_author" label="автор" variant="outlined" size="small"/>
            </FormControl>
            <FormControl  sx={{ p: 1, marginLeft:10, width: '25ch',}}>
                <TextField id="task_revision_author" label="дата создания" variant="outlined" size="small"/>
            </FormControl>
            <FormControl  sx={{ p: 1, width: '50ch' }}>
                <TextField id="task_revision_author" label="автор" variant="outlined" size="small"/>
            </FormControl>
            <FormControl  sx={{ p: 1, marginLeft:10, width: '25ch',}}>
                <TextField id="task_revision_author" label="дата модификации" variant="outlined" size="small"/>
            </FormControl>

        </Box>
    );
}
