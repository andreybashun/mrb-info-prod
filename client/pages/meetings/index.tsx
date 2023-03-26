import React from 'react';
import MLayout from "../../layouts/MLayout";
import {GetServerSideProps} from "next";
import axios from "axios";

const Index = (props) => {
    return (
        <MLayout user={props.user}>
           <h2>страница со списком совещаний</h2>
        </MLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const resUser = await axios.get (process.env.SERVER_HOST + 'user/' + params.user);
    return {
        props: {
            user: resUser.data,
            serverHost: process.env.SERVER_HOST,
        }
    }
}