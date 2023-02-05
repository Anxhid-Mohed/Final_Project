import { Avatar, Box, Button, Chip, Stack, Typography } from "@mui/material";
import {FcAddImage,FcVideoCall ,FcRules } from 'react-icons/fc';

const AddPosts = () => {
    const style = { fontSize: "1.6em" }
    return (  
        <Box boxShadow={2} sx={{
            borderRadius:'20px',
            py:'4px',
            pr:'15px'
            }}>
                <Box p={2} mb={2} sx={{color:'#333232',display:'flex'}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography sx={{
                        backgroundColor:'#bfbdbd',
                        borderRadius:'20px',
                        // width:{xs:'400px',sm:'280',md:'380px'},
                        marginLeft:'10px',
                        lineHeight:'2.5rem',
                        textAlign:'center',
                        width:'100%'
                    }}><a style={{marginTop:'10px' , fontSize:'13px'}}>Hy i just started a page here , </a></Typography>
                    <br />
                    
                </Box>
                <hr style={{width: '90%',margin:'auto'}} />
                <Typography mt={1} sx={{textAlign:'center'}}>or</Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    spacing={2}
                >
                    <Box sx={{display:'flex',alignItems:'center'}}><FcAddImage style={style}/><Typography ml={1}>Image</Typography></Box>
                    <Box sx={{display:'flex',alignItems:'center'}}><FcVideoCall style={style}/><Typography ml={1}>Video</Typography></Box>
                    <Box sx={{display:'flex',alignItems:'center'}}><FcRules style={style}/><Typography ml={1}>Write</Typography></Box>
                </Stack>
        </Box>
    );
}
 
export default AddPosts;