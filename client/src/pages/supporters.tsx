import React from "react";
import { useEffect } from "react";
import Navbar from "@/components/user/NavBar/NavBar";
import SideBar from "@/components/user/SideBar/SideBar";
import { Avatar, Box, Button, Container, CssBaseline, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import styles from '@/styles/Explore.module.css';
import {FcLikePlaceholder} from 'react-icons/fc';
import { useDispatch, useSelector } from "react-redux";
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import { useRouter } from "next/router";
import { userDetails } from "@/redux/userSlice";
import { userWallet } from "@/Apis/userApi/userRequests";


const Supporters = () => {
    
    const {user} = useSelector((state:any)=>state.userInfo)
    const dispatch = useDispatch()
    
    const router = useRouter()
    const [data, setData] = React.useState<{userId: string; amount: number; donators:any}>()

    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {

                    const response = await tokenVerification(token);
                    console.log(response);
                    if(response?.status === false || response?.isBanned === true){
                        router.push('/auth')
                    }else if (response?.isAuthenticated && response?.isBanned === false){
                        dispatch(userDetails(response))
                        
                    }else{
                        router.push('/auth')
                    }
                }
            )()
        }else{
          router.push('/auth')
        }
    },[])

    useEffect(()=>{
        (
            async()=>{
                const response = await userWallet()
                if(response?.status === true){
                    console.log(response.data)
                    setData(response.data);
                }
            }
        )()
    },[])

    return (
        <>
            <Navbar/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <SideBar userData={user?.username} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Supporters</h3>
                            </Grid>

                           { data ? <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}>
                                    <Box className={styles.scrollBar} mt={2} sx={{overflowY:'scroll',overflowX:'hidden'}}>
                                        <Box sx={{ pb: 3,height: "450px" }}>
                                        <CssBaseline />  
                                        <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                            {
                                                data?.donators.map((donor:{donorId:any,amount:number,note:string})=>{
                                                    return(
                                                        <ListItem button  key={donor?.donorId?._id}>
                                                            <ListItemAvatar>
                                                                <Avatar alt="Profile Picture" src={donor ? donor.donorId.profile:''}/>
                                                            </ListItemAvatar>
                                                            <ListItemText sx={{lineBreak:'auto'}} primary={donor ? donor.donorId.username:''} secondary={donor ? donor.note:''} />
                                                            <ListItemText sx={{lineBreak:'auto'}} secondary={`donated ${donor.amount}$ for you`} />
                                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                                        </ListItem>   
                                                    )
                                                })
                                            }    
                                        </List> 
                                        
                                        </Box>
                                    </Box>
                                </Grid>
                            :(
                                <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{
                                    borderRadius:'15px',
                                    border:'1px solid #dedede',
                                    lineBreak:'auto',
                                    textAlign:'center',
                                }}
                                >
                                    <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                    <Typography sx={{fontWeight:600,color:'#333232'}}>You dont have any supporters yet</Typography>
                                    <Typography mt={1} sx={{color:'#333232'}}>Share your page with your audience to get started.</Typography>
                                </Grid>
                            )}
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
 
export default Supporters;