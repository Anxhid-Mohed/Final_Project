/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import { Avatar, Box, Button, Divider, Grid, Stack, Typography,} from "@mui/material";
import { Container } from "@mui/system";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {AiOutlineMessage } from 'react-icons/ai'
import AboutPage from "../About/AboutPage";


const userPage = () => {
    const style = { color:'#303030', fontSize: "1.8em" }
    return (  
        
        <Container  maxWidth={false}  sx={{ maxWidth: '1000px'}}>
            <Grid xs={12} sx={{
                backgroundColor:'#c9c8c7',
                height: { xs:'90px' , sm:'150px' , md:'200px'},
                width:{ xs:'100%' , sm:'100%' , md:'100%'},
                borderRadius:'15px'
            }}>
                {/* //Cover-image */}
            </Grid>
            
            <Grid xs={12} sx={{display:'flex' , lineBreak:'anywhere' , minHeight:'10px'}}>
                <Grid xs={2} md={2} sx={{
                    pl: 1,
                    marginTop:'-20px'
                }}>
                    <img src="https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png" alt="" style={{  width:'41%' ,borderRadius:'50%' }} />
                    <Box sx={{marginTop:'5px' , display:{ xs:'block' , md:'none' }}}>
                        <Typography sx={{ fontWeight:'600' , fontSize:{ xs:'18px' , md:'24px'} }} >Muhammed Anshid</Typography>
                        <Typography sx={{ fontSize:{ xs:'10px' , md:'17px'} }}><a href="">http://localhost:3000/pagevxvxcvxv</a></Typography>
                    </Box>
                </Grid>

                <Grid xs={5} md={6} sx={{ width:{md:'54%'} , ml:{ xs: -13 , sm: -10 , md: -22} }}>
                    <Box sx={{marginTop:'10px', display:{ xs:'none' , md:'block' }}}>
                        <Typography sx={{ fontWeight:'600' , fontSize:{ xs:'18px' , md:'24px'} }} >Muhammed Anshid</Typography>
                        <Typography sx={{ fontSize:{ xs:'10px' , md:'17px'} }}><a href="">http://localhost:3000/pagevxvxcvxv</a></Typography>
                    </Box>
                </Grid>

                <Grid xs={5} md={4} sx={{ marginTop:'2%',display:'flex' , ml:'auto' }}>

                    <Box m={0.3}>
                        <Button  sx={{
                            backgroundColor:'#eb1e44',
                            "&:hover": { backgroundColor: "#eb1e44"},
                            textTransform: 'none',
                            borderRadius: 3,
                            color:'white',
                            width:{md:'8.2rem'},
                        }}>Follow</Button>
                    </Box>
                    
                    <Box m={0.3}>
                        <Button sx={{
                            backgroundColor:'#f0eded',
                            "&:hover": { backgroundColor: "#f0eded"},
                            textTransform: 'none',
                            borderRadius: 4,
                        }}><AiOutlineMessage style={style} /></Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid xs={12} sx={{borderBottom: '2px solid #c9c8c7'}}>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    my={3}
                    ml={3}
                    >
                    <Typography><a>About</a></Typography>
                    <Typography><a>Posts</a></Typography>
                </Stack>
            </Grid>

            <AboutPage/>

            
        </Container>
        
    );
}
 
export default userPage;