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

export default function SignIn() {

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let signinData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    if(signinData.email && signinData.password){
      let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      setRequired('');
      if(regEmail.test(signinData.email.toString())){
        setEmail(false)
        setEmailErr('')
        if(signinData.password.length >= 8){
          setPassword(false)
          setEmailErr('')

          axios.post('http://localhost:3002/signin',{signinData}).then((response)=>{
            if(response.data.status == "success"){

              toast.success('Here we go..!', {
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
                router.push('/dashboard')
              },1500)

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
            
          })

        }else{
          setPassword(true)
          setPasswordErr('Password must be at least 8 characters')
        }
      }else{
        setEmail(true)
        setEmailErr('Please enter valid email address')
      }
    }else{
      setRequired('All feilds are required')
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
            Welcome back
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},//styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": { borderColor: "#f22c50" }},
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
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
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
                    backgroundColor:'#eb1e44',
                    "&:hover": { backgroundColor: "#eb1e44"},
                    textTransform: 'none'
                }}
            >
              Continue with email
            </Button>
            <hr/>
            <Typography sx={{textAlign:'center',fontSize:'13px',fontWeight:'600',color:'#b5b2b1'}}>Or Signin with</Typography>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3,
                    mb: 2,
                    height:'42px',
                    borderRadius:'20px',
                    textTransform: 'none',
                    background:'#ffff',
                    border: '1px solid',
                    "&:hover": { backgroundColor: "#ffff"},
                    color:'black'
                }}
            >
              Google
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
       
      </Container>
    </ThemeProvider>
  );
}