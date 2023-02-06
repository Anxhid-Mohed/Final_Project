import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect} from 'react';
import { useRouter } from 'next/router';
import { userApi } from '@/utils/apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react'
import axios from 'axios';
import { adminSignin } from '@/Apis/adminApi/AdminAuthRequests';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'By signing up, you agree to our terms and privacy policy. You must be at least 18 years old to start a page.'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme({
    typography: {
     "fontFamily":'sans-serif'
    }
 });

export default function AdminSignIn() {

  const router = useRouter()
  const [email,setEmail] = useState(false)
  const [emailErr,setEmailErr] = useState('')
  const [password,setPassword] = useState(false)
  const [passwordErr,setPasswordErr] = useState('')
  const [required ,setRequired] = useState('')

  // useEffect(()=>{

  //   if(localStorage.getItem('userToken')){
  //     console.log(userApi);
      
  //     axios.get('http://localhost:3002/verify-token',{headers:{'userToken':localStorage.getItem('userToken')}}).then((response)=>{
  //       console.log(response);
        
  //       // if(response.data.status === "failed"){
  //       //   router.push('/auth')
  //       // }else if(response.data.auth){
  //       //   router.push('/')
  //       // }
  //     })
  //   }else{
  //     router.push('/auth')
  //   }
  // })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let signinData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    if(!signinData.email || !signinData.password){
      setRequired('All feilds are required')
      return;
    }
    let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
    setRequired('');
    if(!regEmail.test(signinData.email.toString())){
      setEmail(true)
      setEmailErr('Enter a valid email address')
    } 
    if(signinData.password.length < 8) {
      setPassword(true)
      setPasswordErr('Password must be at least 8 characters')
    }
        const response = await adminSignin(signinData)
        if(typeof response === 'string') {
          toast.error(response, {
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
        if(response.auth == true){

          toast.success(response.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(()=>{
            localStorage.setItem('adminToken',response.token)
            router.push('/admin/users')
          },1500)
        }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
      <Container component="main" maxWidth="xs">
        
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <Typography component="h1" variant="h4" sx={{fontWeight:'600'}}>
            Welcome Admin
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {required && <Typography mb={0.5} sx={{color:'red',fontFamily:'sans-serif'}} align='center'>{required}</Typography>}
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={email}
                  helperText={emailErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#191a19'},//styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": { borderColor: "#191a19" }},
                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                  }}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={password}
                  helperText={passwordErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#191a19'},
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#191a19"}},
                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3,
                    mb: 2 ,
                    borderRadius:'20px',
                    height:'42px',
                    backgroundColor:'#191a19',
                    "&:hover": { backgroundColor: "#191a19"},
                    textTransform: 'none'
                }}
            >
              Continue with email
            </Button>
            <hr/>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}