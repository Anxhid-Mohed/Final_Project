/* eslint-disable @next/next/no-img-element */
import { Avatar, Box, Button, CssBaseline, Fade, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {IoSettingsOutline } from 'react-icons/io5'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useRouter} from "next/router";
import Link from "next/link";

const ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs:350,sm:450,md:450},
    height:500,
    bgcolor: 'background.paper',
    borderRadius:'12px',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

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
    followers:any,
    followings:any,
    isVerified:boolean,
    isBanned:boolean,
    disabled:boolean,
    isAuthenticated:boolean
}}> = ({userData}) => {

    const [followers, setFollowers] = React.useState(false)
    const [followings, setFollowings] = React.useState(false)
    const router = useRouter()

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
                        <a onClick={()=>setFollowers(true)}><Typography>{userData?.followers.length}<span style={{marginLeft:'4px'}}>Followers</span></Typography></a>
                        <a onClick={()=>setFollowings(true)}><Typography>{userData?.followings.length}<span style={{marginLeft:'4px'}}>Following</span></Typography></a>
                    </Stack>
                </Grid>
                <Modal
                    open={followers}
                    onClose={()=>setFollowers(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={followers}>
                        <Box sx={ModalStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center" letterSpacing={1}>
                                Followers
                            </Typography>
                            <Box mt={2} sx={{overflowY:'scroll',overflowX:'hidden'}}>
                                <Box sx={{ pb: 3,height: "375px" }} >
                                    <CssBaseline />  
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        {userData?.followers?.map((follower:any)=>{
                                            return(
                                                <Link legacyBehavior key={follower._id} href={`/${follower.username}`}>
                                                <ListItem button >
                                                    <ListItemAvatar>
                                                        <Avatar alt="Profile Picture" src={follower ? follower.profile:''} />
                                                    </ListItemAvatar>
                                                    <ListItemText sx={{lineBreak:'auto'}} primary={follower ? follower.username:''} secondary={follower ? follower.name:''} />
                                                    <Button 
                                                        sx={{
                                                            backgroundColor:'#f0eded',
                                                            "&:hover": { backgroundColor: "#f0ered"},
                                                            textTransform: 'none',
                                                            borderRadius: 2,
                                                            color:'#7e8380',
                                                        }}>
                                                        profile
                                                    </Button>
                                                </ListItem>
                                                </Link>
                                            )
                                        })
                                        }
                                    </List> 
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
                <Modal
                    open={followings}
                    onClose={()=>setFollowings(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Fade in={followings}>
                        <Box sx={ModalStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center" letterSpacing={1}>
                                Following
                            </Typography>
                            <Box mt={2} sx={{overflowY:'scroll',overflowX:'hidden'}}>
                                <Box sx={{ pb: 3,height: "375px" }} >
                                    <CssBaseline />  
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        {userData?.followings?.map((following:any)=>{
                                            return(
                                                <Link legacyBehavior key={following._id} href={`/${following.username}`}>
                                                <ListItem button >
                                                    <ListItemAvatar>
                                                        <Avatar alt="Profile Picture" src={following ? following.profile:''} />
                                                    </ListItemAvatar>
                                                    <ListItemText sx={{lineBreak:'auto'}} primary={following ? following.username:''} secondary={following ? following.name:''} />
                                                    <Button 
                                                    sx={{
                                                        backgroundColor:'#f0eded',
                                                        "&:hover": { backgroundColor: "#f0ered"},
                                                        textTransform: 'none',
                                                        borderRadius: 2,
                                                        color:'#7e8380',
                                                    }}>
                                                        profile
                                                    </Button>
                                                </ListItem>
                                                </Link>
                                            )
                                        })
                                    }
                                    </List> 
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </>
        
    );
}
 
export default ProfilePage;