import React, { useEffect, useRef } from 'react';
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import { userChats } from '@/Apis/userApi/userChatRequests';
import Navbar from "@/components/user/NavBar/NavBar";
import SideBar from "@/components/user/SideBar/SideBar";
import Style from "@/styles/Explore.module.css";
import { Avatar, Box, Container, Grid, Link, List } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { userDetails } from '@/redux/userSlice';
import ChatList from '@/components/user/ChatComponents/ChatList';
import ChatBox from '@/components/user/ChatComponents/ChatBox';
import { io } from 'socket.io-client';

const Chat = () => {

    const {user} = useSelector((state:any)=>state.userInfo)
    const {socket} = useSelector((state:any)=>state.socket)
    const dispatch = useDispatch()
    
    const [data,setData] = React.useState<[{members:any[]}]>()
    const [ currentChat , setCurrentChat ] = React.useState()
    const [ onlineUsers , setOnlineUsers ] = React.useState<any[]>([])
    const [sendMessage, setSendMessage ] = React.useState()
    const [recieveMessage, setRecieveMessage ] = React.useState()
    const router = useRouter()
    
    console.log("socket connection",socket)
    useEffect(()=>{
         if(socket){
            socket.on('get-users',(users:any)=>{
                setOnlineUsers(users)
            })
         }
     },[socket])  

    useEffect(()=>{
        if(sendMessage !== null && socket){
            socket.emit('send-message', sendMessage)
        }
    },[sendMessage,socket ])

    //Receive message
    useEffect(()=>{
        if(socket){
            socket.on('recieve-message', (data:any)=>{
                setRecieveMessage(data)
            })
        }
    },[socket])


    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {

                    const response = await tokenVerification(token);
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



    // console.log(user,'reducxxxx')

    useEffect(()=>{
        (
            async()=>{
                const response = await userChats(user?.userId)
                if(response?.status === true){
                    setData(response?.data);
                }
            }
        )()
    },[user])

    return (  
        <>
           <Navbar/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Message</h3>
                                {/* <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}></Grid> */}
                                <Grid item xs={12} sx={{display:'flex'}} >
                                    <Grid item mt={3} mb={2} xs={4} p={2} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}>
                                        <h2>chats</h2>
                                        <Box className={Style.scrollBar} sx={{height:'65vh',overflow:'scroll'}}>
                                            
                                            {/* <Link legencyBehavior > */}
                                            {
                                                data?.map((chat:any)=>{
                                                    return(
                                                    <List onClick={()=>setCurrentChat(chat)} key={chat._id} sx={{borderBottom:'1px solid #d6d6d6'}} >
                                                        <ChatList chat={chat} currentUser={user?.userId} />
                                                    </List>
                                                    )
                                                })
                                            } 
                                            {/* </Link> */}
                                            
                                        </Box>
                                    </Grid>
                                    <Grid item mt={3} mb={2} xs={8} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto',ml:1}}>
                                        <ChatBox chat={currentChat} currentUser={user?.userId} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>   
                    </Grid>            
                </Grid>           
            </Container>          
        </>
    );
}
 
export default Chat;
