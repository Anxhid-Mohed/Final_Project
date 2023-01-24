import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function CompletePage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        > 

          <Typography component="h1" variant="h5" sx={{fontWeight:'600'}}>
             Complete your page
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={4 }>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
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
                  id="link"
                  label="Your page link"
                  name="link"
                  autoComplete="link"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},//styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": { borderColor: "#f22c50" }},
                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                  }}
                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="about"
                  label="About"
                  type="text"
                  id="about"
                  autoComplete="about"
                  placeholder="Hey 👋 I just created a page here. Make a day for me !"
                  multiline
                  rows={3}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="social"
                  label="Website or social link"
                  placeholder="https://"
                  name="social"
                  autoComplete="social"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},//styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": { borderColor: "#f22c50" }},
                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                  }}
                  
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5,
                    mb: 2 ,
                    borderRadius:'20px',
                    height:'42px',
                    backgroundColor:'#eb1e44',
                    "&:hover": { backgroundColor: "#eb1e44"},
                    textTransform: 'none'
                }}
            >
              Continue
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
       
      </Container>
    </ThemeProvider>
  );
}