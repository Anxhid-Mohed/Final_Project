/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/user/NavBar/NavBar";
import SideBar from "@/components/user/SideBar/SideBar";
import { Box, Grid, Typography } from "@mui/material";
import { HiOutlineExclamationCircle } from "react-icons/hi2"
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { accountDisable } from "@/Apis/userApi/userManagement";

const About = () => {

    const style = {fontSize:'1.5rem',marginLeft:'5px', color:' rgba(238,82,82,.8)'}
    return (  
        <>
           <Navbar/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }} >
                        <SideBar/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>About</h3>
                                <Grid item mt={3} mb={2} xs={12}  p={3.5}  sx={{borderRadius:'12px',border:'1px solid rgba(238,82,82,.5)',lineBreak:'auto',backgroundColor:'#fef6f6'}}>
                                    <Grid item xs={12}>
                                        <h3>Disable Account</h3>
                                    </Grid>
                                    <Box mt={2} sx={{display:{xs:'block' ,sm:'flex' ,md:'flex'}}}>
                                        <Grid item xs={12} sm={9} md={9} sx={{width:'100%'}}>
                                            <Typography sx={{lineBreak:'auto',color:'#717171',fontSize:'16px'}} letterSpacing={1}>
                                            Your account will be temporarily deactivated and will not be accessible publicly.
                                            You will be logged out in the process, and the page will be re-activated when you login again.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3} md={3} sx={{width:'100%',textAlign:{xs:'-moz-initial',sm:'end',md:'end'}}}>
                                            <Button  
                                            
                                            sx={{
                                                backgroundColor:'#ee5252',
                                                "&:hover": { backgroundColor: "#ee5252"},
                                                textTransform: 'none',
                                                borderRadius: 3,
                                                fontWeight:'bold',
                                                color:'#fff',
                                                width:{sm:'8.1rem',md:'8.2rem'},
                                            }}
                                            >
                                                Disable
                                            </Button>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item mt={3} mb={2} xs={12}  p={3.5}  sx={{borderRadius:'15px',border:'1px solid rgba(238,82,82,.5)',lineBreak:'auto',backgroundColor:'#fef6f6'}}>
                                    <Grid item xs={12} sx={{display:'flex'}}>
                                        <h3>Delete Account</h3>
                                        <HiOutlineExclamationCircle style={style}/>
                                    </Grid>
                                    <Box mt={2} sx={{display:{xs:'block' ,sm:'flex' ,md:'flex'}}}>
                                        <Grid item xs={12} sm={9} md={9} sx={{width:'100%'}}>
                                            <Typography sx={{lineBreak:'auto',color:'#717171',fontSize:'16px'}} letterSpacing={1}>
                                            Are you absolutely sure that you want to delete your account ?.
                                            If you click the button we will required to put your password for confirm your account deletion proccess
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3} md={3} sx={{width:'100%',textAlign:{xs:'-moz-initial',sm:'end',md:'end'}}}>
                                            <Button  sx={{
                                                backgroundColor:'#ee5252',
                                                "&:hover": { backgroundColor: "#ee5252"},
                                                textTransform: 'none',
                                                borderRadius: 3,
                                                fontWeight:'bold',
                                                color:'#fff',
                                                width:{sm:'8.1rem',md:'8.2rem'},
                                            }}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
 
export default About;