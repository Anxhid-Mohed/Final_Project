/* eslint-disable @next/next/no-img-element */
import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import CssBaseline from '@mui/material/CssBaseline';


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
                            <Typography mb={6} component="h1" variant="h5" sx={{fontWeight:'600'}}>Activate Your Account</Typography>
                        </Grid>
                        <Grid xs={12}>
                            <img style={{width:'500px'}} src="email-support-service-header-cropped.svg" alt=""  />
                        </Grid>
                        <Grid xs={12}>
                            <Box sx={{}}>
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