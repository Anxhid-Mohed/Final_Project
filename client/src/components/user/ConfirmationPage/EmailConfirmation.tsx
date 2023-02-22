/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resendEmail } from "@/Apis/userApi/userAuthRequest";


function Information(props:any) {
    return (
      <Typography  variant="body2" color="text.secondary" align="center" mt={3}{...props}>
        {'Activate and confirm your email by clicking the activation link in the email '}<br />
        {"we've sent to :example@example.com"}
        {/* {new Date().getFullYear()} */}
        {'.'}
      </Typography>
    );
}

 const setErrMsg = (msg: string) =>{
    toast.error(msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return;
}

 const setSuccessMsg = (msg: string) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return;
}

const EmailConfirmation = () => {
    const [resend , setResend] = useState(false)
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);

    useEffect(()=>{
        const interval = setInterval(() => {
            if (seconds > 0) {
              setSeconds(seconds - 1);
            }
        
            if (seconds === 0) {
              if (minutes === 0) {
                clearInterval(interval);
              } else {
                setSeconds(59);
                setMinutes(minutes - 1);
              }
            }
            }, 1000);
        
          return () => {
            clearInterval(interval);
        };
    },[seconds])

    const handleResendEmail = async() => {
        try {
            const userId = localStorage.getItem("userId") as string;
            console.log(userId);
            const response = await resendEmail(userId)
            if(response?.status === true){
                setMinutes(1);
                setSeconds(30);
                setSuccessMsg(response.message)
            }else{
                setErrMsg(response.message)
            }
        } catch (error) {
            
        }
    }

    return ( 
        <>
          <Container component="main" >
            <ToastContainer/>
            <Box   sx={{
                
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign:'center',
                justifyContent: "center",
                height: "100vh",
            }}>
                <Box>
                    <Grid container>

                        <Grid xs={12}>
                            <Typography mb={6} component="h1" variant="h5" sx={{fontWeight:'600'}}>Activate Your Account</Typography>
                        </Grid>
                        <Grid xs={12}>
                            <img style={{width:'500px'}} src="email-support-service-header-cropped.svg" alt=""  />
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{}}>
                            {seconds > 0 || minutes > 0 ? (
                                <p>
                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                            ) : (
                                <p>Didnt recieve code?</p>
                            )}
                                <Information/>
                                <Button 
                                disabled={seconds > 0 || minutes > 0} 
                                onClick={handleResendEmail}
                                >
                                    Resend
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
          </Container>
        </>
    );
}
 
export default EmailConfirmation;