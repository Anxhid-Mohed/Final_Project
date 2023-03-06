import { Container, Box, Grid, Typography, Button } from "@mui/material";
import { useRouter } from 'next/router';

function Information(props:any) {
    return (
      <Typography  variant="body2" color="text.secondary" align="center" mb={1.5}{...props}>
        {'Oops 404 ! Something went wrong,'}
        {'.'}
      </Typography>
    );
}

const ErrorPage = () => {
    const router = useRouter()
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
                            <Typography mb={3} component="h1" variant="h3" sx={{fontWeight:'600',color:'#36385a'}}>Ooopss... </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <img style={{width:'500px'}} src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1677915715/Banner-Images/404_xirlyx.gif" alt=""  />
                        </Grid>
                        <Grid xs={12}>
                            <Information/>
                            <Box>
                                <Button 
                                onClick={()=>router.push('/dashboard')}
                                sx={{
                                    borderRadius: "15px",
                                    height: "42px",
                                    fontWeight:'700',
                                    backgroundColor: "#36385a",
                                    "&:hover": { backgroundColor: "#36385a"},
                                    textTransform: "none",
                                    color:'white'
                                }}
                                >
                                    Back to Home Page
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
 
export default ErrorPage;