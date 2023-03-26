import React from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


const DocDescription : React.FC= () => {

    return (
        <Box  sx={{p:1, width:'95ch'}}>
            <TextField
                id="task_revision_name"
                label="описание документа"
                multiline
                fullWidth
                rows={3}
                sx={{marginRight:1, display:'flex'}}
            />
        </Box>
    );
};

export default DocDescription;