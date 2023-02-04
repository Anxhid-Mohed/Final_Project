/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect} from 'react';
import { useRouter } from 'next/router';
import { accountVerification } from '@/Apis/userApi/userAuthRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography } from '@mui/material';
// import Style from  '@/styles/Verify.module.css';


export const VerifySignup = () => {
    const router = useRouter();
    let {id,token}  = router.query

    useEffect(()=>{
        if(id && token){
            (
                async () => {
                    const response = await accountVerification(id.toString(),token.toString())
                    console.log(response);   
                    if(response.auth == true){
                        toast.success(response.message, {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTimeout(()=>{
                        localStorage.setItem('userToken',response.token)
                        router.push('/dashboard')
                    },1000)
                    }else{
                    toast.error('Oops..,Somthing went wrong', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });  
                    }
                }
            )()
        }
    },[id,token])

    return ( 
        <>
          <ToastContainer />
          {/* <Box className={Style.loader}>
            <span className={Style.loader__element}></span>
            <span className={Style.loader__element}></span>
            <span className={Style.loader__element}></span>
          </Box> */}
        </>
        
    );
}
