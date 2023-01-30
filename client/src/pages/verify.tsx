/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect} from 'react';
import { useRouter } from 'next/router';
import CircularProgress from "@mui/material/CircularProgress";
import { verifyAccount } from '@/Apis/userApi/userAuthRequest';
import { tokenToString } from 'typescript';
import { useParams } from 'react-router-dom';

const verifySignup = () => {
    const router = useRouter();
    const param = useParams();
    const id = param.id
    const token = param.token;
    console.log(id);
    

    const verify = async () => {
    useEffect( () => {

       async () => {

        const response = await verifyAccount(id,token)
        console.log(response);
        }
    
    })
    }

    return ( 
        <CircularProgress color="inherit" />
     );
}
 
export default verifySignup;