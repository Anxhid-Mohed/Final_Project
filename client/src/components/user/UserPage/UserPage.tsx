/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import { Box, Divider, Grid, Stack, Typography,} from "@mui/material";
import { Container } from "@mui/system";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import About from "../PageComponents/About";
import Posts from "../PageComponents/AddPost";
import AboutPage from "../About/AboutPage";


const userPage = () => {
    return (  
        
        <Container  maxWidth={false}  sx={{ maxWidth: '1000px'}}>
            <Grid xs={12} sx={{
                backgroundColor:'#c9c8c7',
                height: { xs:'90px' , sm:'150px' , md:'200px'},
                width:{ xs:'100%' , sm:'100%' , md:'100%'},
                borderRadius:'15px'
            }}>

            </Grid>
            <Grid xs={12} sx={{display:'flex' , lineBreak:'anywhere' , minHeight:'10px'}}>
                <Grid xs={2}sx={{
                    pl: 1,
                    marginTop:'-20px'
                }}>
                    <img src="https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png" alt="" style={{  width:'45%' ,borderRadius:'50%' }} />
                </Grid>
                <Grid xs={7} sx={{ width:'100%' , ml:{ xs: -13 , sm: -13 , md: -16} }}>
                    <Box sx={{marginTop:'10px'}}>
                        <Typography sx={{ fontWeight:'bold' , fontSize:{ xs:'18px' , md:'24px'} }} >Muhammed Anshid</Typography>
                        <Typography sx={{ fontSize:{ xs:'10px' , md:'17px'} }}><a href="">http://localhost:3000/pagevxvxcvxv</a></Typography>
                    </Box>

                </Grid>
                <Grid xs={2} sx={{ marginTop:'4%' }}>
                    <Box sx={{
                        width:'40px',
                        height:'40px',
                        borderRadius:'50%',
                        backgroundColor:'#c9c8c7',
                        padding:'19%'
                    }}>
                        <SettingsOutlinedIcon/>
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