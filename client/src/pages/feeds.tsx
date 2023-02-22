import React from "react";
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import { getAllFeeds } from "@/Apis/userApi/userPageRequests";
import { userDetails } from "@/redux/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/user/NavBar/NavBar";
import { Container, Grid } from "@mui/material";
import SideBar from "@/components/user/SideBar/SideBar";
import FeedCard from "@/components/user/Feeds/FeedCard";


const Feeds = () => {

    const {user} = useSelector((state:any)=> state.userInfo)
    const dispatch = useDispatch();
    const router = useRouter()

    const [feeds, setFeeds] = React.useState([])
    const [upload, setUpload] = React.useState(false)

    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {

                    const response = await tokenVerification(token);
                    console.log(response);
                    if(response?.status == false || response?.isBanned === true){
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
                const response = await getAllFeeds();
                console.log(response.data);
                setFeeds(response.data)
            }
        )()
    },[upload])
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
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Feeds</h3>
                                <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',lineBreak:'auto'}}>
                                    {
                                        feeds.map((feed:any) =>{
                                            return(
                                                <FeedCard key={feed._id} data={feed} setUpload={setUpload} upload={upload}/>
                                            )
                                        })
                                    }  
                                </Grid>
                            </Grid>
                        </Container>   
                    </Grid>            
                </Grid>           
            </Container>                
        </>
    );
}
 
export default Feeds;