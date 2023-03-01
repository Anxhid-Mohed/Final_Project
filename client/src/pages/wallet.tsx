import React from "react";
import Navbar from "@/components/user/NavBar/NavBar"
import SideBar from "@/components/user/SideBar/SideBar";
import styles from '@/styles/Explore.module.css';
import {BsCurrencyDollar} from 'react-icons/bs';
import {FcCurrencyExchange,FcOk} from 'react-icons/fc'
import { BsEmojiFrown } from 'react-icons/bs'
import { Avatar, Box, Button, Container, CssBaseline, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useEffect } from "react";
import { userWallet } from "@/Apis/userApi/userRequests";
import { useDispatch, useSelector } from "react-redux";
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import { useRouter } from "next/router";
import { userDetails } from "@/redux/userSlice";
import moment from "moment";
import { getPayouts } from "@/Apis/userApi/userPageRequests";


const Wallet = () => {

    const {user} = useSelector((state:any)=>state.userInfo)
    const dispatch = useDispatch()

    const router = useRouter()
    const [data,setData] = React.useState<{userId: string; amount: number; donators:any}>()
    const [payouts, setPayouts] = React.useState([])

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
                    setData(response.data);
                }
            }
        )()
    },[])

    useEffect(()=>{
        (
            async()=>{
                if(user){
                    const response = await getPayouts(user?.userId)
                    if(response?.status === true){
                        console.log(response.data)
                        setPayouts(response.data)
                    }
                }
            }
        )()
    },[user])

    const style = {fontSize:'41px'}
    return (  
        <>
            <Navbar/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <SideBar userData={user?.username}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Wallet And Payouts</h3>
                            </Grid>
                            <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}>
                                <Grid item xs={12} sx={{display:'flex',alignItems:'center'}}>
                                    <FcCurrencyExchange style={{fontSize:'23px'}}/>
                                    <Typography sx={{fontSize:'24px',fontWeight:'600',ml:0.3}} letterSpacing={1.5}>
                                        Earnings
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',alignItems:'center',mt:1}}>
                                    <BsCurrencyDollar style={style}/>
                                    <Typography sx={{fontSize:'44px',fontWeight:'600'}} letterSpacing={1.5}>
                                        {data ? data?.amount : 0}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',alignItems:'center',mt:1}}>
                                    <Typography> 
                                      <span>{data ? data?.donators?.length : 0}</span>  Donations
                                    </Typography>
                                </Grid>
                            </Grid>
                            {payouts.length > 0 ? 
                            (<>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Payouts</h3>
                                <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}>
                                    <Box className={styles.scrollBar} mt={2} sx={{overflowY:'scroll',overflowX:'hidden'}}>
                                        <Box sx={{ pb: 3,height: "450px" }}>
                                        <CssBaseline />  
                                        {
                                            payouts?.map((payout:any) =>{
                                                return(
                                                    <List key={payout._id} sx={{borderBottom:'1px solid #d6d6d6'}} >
                                                        <ListItem button >
                                                            <ListItemText sx={{lineBreak:'auto'}} secondary={`Your $${payout.amount} payout is successfull`} />
                                                            <ListItemText sx={{lineBreak:'auto'}} secondary={moment(payout.createdAt).format("DD/MM/YYYY")}/>
                                                            <ListItemText sx={{lineBreak:'auto'}} primary={'Completed'}/>
                                                            <FcOk style={{fontSize:'25px'}}/>
                                                        </ListItem>       
                                                    </List>     
                                                )
                                            })
                                        }
                                        </Box>
                                    </Box>
                                </Grid>
                            </> ):
                            (<Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{
                                borderRadius:'15px',
                                border:'1px solid #dedede',
                                lineBreak:'auto',
                                textAlign:'center',
                            }}>
                                <BsEmojiFrown style={{fontSize:'30px'}}/>
                                <Typography sx={{fontWeight:600,color:'#333232'}}>Nothing here just yet! ☕</Typography>
                                <Typography mt={1} sx={{color:'#333232'}}>Share your page with your audience to get started.</Typography>
                            </Grid>)}
                        </Container>
                    </Grid>
                </Grid>
            </Container>                        
        </>
    );
}
 
export default Wallet;