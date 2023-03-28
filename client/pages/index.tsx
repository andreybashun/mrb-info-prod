import React, {} from 'react';
import {FormControl, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import {useInput} from "../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";


const Index = ({users}) => {
    const email = useInput('')
    const password = useInput('')
    const router = useRouter()
    return (
        <div>
            <Stack  sx={{
                display: "flex",
                position: "absolute",
                justifyContent: "center",
                padding:3,
                border: 1,
                borderRadius:2,
                borderColor:"#C0C0C0",
                height:250,
                width:500,
                top:"25%",
                left:"35%",
            }}>
                Авторизация
                    <FormControl  fullWidth sx={{p:1, pt:5}}>
                    <TextField
                        {...email}
                        label="логин"
                        size="small"
                        variant="outlined"
                    />
                    </FormControl>
                <FormControl  fullWidth sx={{p:1, pt:3}}>
                    <TextField
                        {...password}
                        label="пароль"
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                </FormControl>
                <Button onClick={() => {
                    for (let i = 0; i < users.length; i++){
                        console.log(i, users[i].email , users[i].password, password.value )
                        if (users[i].email === email.value && users[i].password === password.value){
                            router.push ('/' + users[i]._id)
                        }
                    }
                  }
                }
                    sx={{
                    width:"20%",
                    left:"40%",
                    mt:3,
                    border: 1,
                    borderRadius:2,
                    borderColor:"#C0C0C0",

                }}>
                    вход
                </Button>
                <Stack direction="row" spacing={37}>
                    <Link href="#">Регистрация  </Link>
                    <Link href="#"> Забыли пароль?</Link>
                </Stack>
            </Stack>
        </div>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const res = await  axios.get('51.250.27.240:5000/user')
    return {
        props: {
            users: res.data
        }
    }
}