import React, {useRef, useState} from 'react';
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";



interface FileUploadProps {
    setFile: Function;
    children: JSX.Element | JSX.Element[];
    next: Function;
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const action = (
    <React.Fragment>
        <IconButton color="info">
            <CheckCircleOutlineIcon/>
        </IconButton>
    </React.Fragment>
);

const FileUpload: React.FC<FileUploadProps> = ({next, setFile, children}) => {
    const ref = useRef<HTMLInputElement> ()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            (async () => {
                setFile (e.target.files[0])
                setOpen(true)
                await delay(2000);
                next ()
            })();

        } catch (e) {
        console.log(e)
    }

    }


    const [open, setOpen] = useState (false);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen (false);
    };

    return (
        <div onClick={() => ref.current.click ()}>
            <input
                type="file"
                style={{display: "none"}}
                ref={ref}
                onChange={onChange}
            />
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Файл загружен"
                    action={action}
                />
            </div>
            {children}
        </div>

    );
};

export default FileUpload;