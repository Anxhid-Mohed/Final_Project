/* eslint-disable @next/next/no-img-element */
import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import CssBaseline from '@mui/material/CssBaseline';


function Information(props:any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" mt={3}{...props}>
        {'Activate and confirm your email address by clicking the link inthe email we sent to your email'}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const EmailConfirmation = () => {
    return ( 
        <>
          <Container component="main" >
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
                            <Typography mb={6} component="h1" variant="h5" sx={{fontWeight:'600'}}>Please confirm you email address</Typography>
                        </Grid>
                        <Grid xs={12}>
                            <img style={{width:'500px'}} src="email-support-service-header-cropped.svg" alt=""  />
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{}}>
                                
                                <Button
                                    variant="contained"
                                    sx={{ 
                                            marginTop:'20px',
                                            borderRadius:'12px',
                                            color:"#fff",
                                            backgroundColor:'#eb1e44',
                                            textTransform: 'none',
                                            "&:hover": { backgroundColor: "#eb1e44"},
                                        }}
                                    >
                                      Confirm Now
                                    </Button>

                                <Information/>
                                <Button>Resend</Button>

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