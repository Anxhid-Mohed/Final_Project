/* eslint-disable @next/next/no-img-element */
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import {IoSettingsOutline } from 'react-icons/io5'

const ProfilePage:React.FC<{userData?: {
    userId: string,
    email:string,
    name:string,
    username:string,
    about:string,
    socialLink:string,
    profile:string,
    coverImage:string,
    category:string,
    isVerified:boolean,
    isBanned:boolean,
    disabled:boolean,
    isAuthenticated:boolean
}}> = ({userData}) => {
    
    const style = { color:'#303030', fontSize: "1.8em" }
    const URL = process.env.NEXT_PUBLIC_USER_API as string
    return (
        <>
            <Grid mt={3} p={3} boxShadow={1} sx={{borderRadius:'15px',border:'1px solid #dedede'}}>
                <Grid  xs={12} sx={{display:'flex'}} >
                    <Grid xs={4}  sm={7} md={8} sx={{display:{xs:'block', sm:'block' ,md:'flex'}}}>
                        <Grid xs={1} >
                            <Avatar
                                src={userData ? userData.profile :''}
                                alt="Remy Sharp"
                                sx={{ width: 56, height: 56 }}
                            />
                        </Grid>

                        <Grid xs={7} sx={{  pl:{ md:5 } }} >
                            <Typography variant="h5" component="h2" sx={{ fontSize:{ xs:'10px',sm:'15px', md:'20px'} }}>{userData?.name}</Typography>
                            <Typography sx={{ fontSize:{ xs:'10px' , md:'15px'}, display:{xs:'none' ,sm:'block' ,md:'flex'} }}><a href="">{userData?.username}</a></Typography>
                        </Grid>
                    </Grid>
                    

                    <Grid xs={8} sm={5} md={4} sx={{display:'flex',ml:'auto'}}>
                        <Box m={0.3}>
                            <Button  sx={{
                                backgroundColor:'#f0eded',
                                "&:hover": { backgroundColor: "#f0eded"},
                                textTransform: 'none',
                                borderRadius: 3,
                                color:'#000',
                                width:{sm:'8.1rem',md:'8.2rem'},
                            }} href={'/manage'}>Edit Profile</Button>
                        </Box>
                        
                        <Box m={0.3}>
                            <Button sx={{
                                backgroundColor:'#f0eded',
                                "&:hover": { backgroundColor: "#f0eded"},
                                textTransform: 'none',
                                borderRadius: 4,
                            }}><IoSettingsOutline  style={style}/></Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid mt={3} xs={12}>
                    
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={10}
                    >
                        <Typography>0<a style={{marginLeft:'4px'}}>Followers</a></Typography>
                        <Typography>0<a style={{marginLeft:'4px'}}>Following</a></Typography>
                    </Stack>
                </Grid>
            </Grid>
        </>
        
    );
}
 
export default ProfilePage;