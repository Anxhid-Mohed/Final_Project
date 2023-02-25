import { addMessage, fetchMessages } from "@/Apis/userApi/userChatRequests";
import { getUserData } from "@/Apis/userApi/userPageRequests";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Grid, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import Style from '@/styles/Message.module.css'
import style from '@/styles/Explore.module.css';
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'


const ChatBox = ({chat,currentUser,setSendMessage,recieveMessage}:{chat:any,currentUser:string,setSendMessage:any,recieveMessage:any}) => {
   
    const [userData, setUserData] = React.useState<any>()
    const [messages , setMessages] = React.useState<any>([])
    const [newMessages , setNewMessages] = React.useState<string>("")
    console.log("The recieve Messages",recieveMessage)
    useEffect(()=>{
        if(recieveMessage !== null && recieveMessage?.chatId===chat?._id){
            setMessages([...messages,recieveMessage])
        }
    },[recieveMessage])

    // fetching data for header
    useEffect(()=>{
        (
            async()=>{
                const userId = chat?.members.find((id:string)=>id !== currentUser)
                const response = await getUserData(userId)
                if(response?.status === true){{
                    setUserData(response.data)
                }}
            }
        )()
    },[chat,currentUser])

    // fetching data for messages
    useEffect(()=>{
        (
            async()=>{
                try {
                    const response = await fetchMessages(chat?._id)
                    if(response?.status === true){
                        setMessages(response?.data)
                    }
                } catch (error) {
                   console.log(error) 
                } 
            }
        )()
    },[chat])

    const handleChange = (newMessages:any) =>{
        setNewMessages(newMessages)
    }

    const handleSend = async (e:any)=>{
        e.preventDefault();
        const message = {
            senderId : currentUser,
            text: newMessages,
            chatId : chat?._id
        }

        //Send message to dataBase
        try {
            const response = await addMessage(message);
            setMessages([...messages,response?.data])
            setNewMessages('')

        } catch (error) {
            console.log(error)
        }

        const receiverId = chat?.members.find((id:any)=> id !== currentUser)
        setSendMessage({...message,receiverId})
    }

    return (
        <>
            {chat ? (<Box>
                <Grid item xs={12}>
                    <ListItem  style={{borderBottom:'1px solid #dedede'}}>
                        <ListItemAvatar >
                            <Avatar alt="Profile Picture" src={userData ? userData.profile :''}/>
                        </ListItemAvatar>
                        <ListItemText sx={{lineBreak:'auto'}} primary={userData ? userData.username :'Unknown user'} secondary={'Online'} />
                    </ListItem> 
                </Grid>
                <Box className={style.scrollBar} sx={{display:'flex',flexDirection:'column',gap:'0.5rem',p:1.5,overflow:'scroll' ,height:'57vh'}}>
                    {
                        messages?.map((message:any) =>(
                            <>
                                <Box className={message.senderId === currentUser ? 
                                    `${Style.messages}  ${Style.own}` 
                                    :`${Style.messages}` }>


                                    {/* <Box sx={{fontSize:'15px',color:'black', p:2}}> */}
                                        <span>{message.text}</span><br />
                                        <span style={{fontSize:'12px'}}>{format(message.createdAt)}</span>
                                    {/* </Box> */}
                                </Box>
                            
                            </>
                        ))
                    }
                </Box>
                <Box p={1.5}>
                    <Box sx={{
                        display:'flex',
                        height:'3.5rem',
                        backgroundColor:'#dedede',
                        justifyContent:'space-between',
                        gap:'.5rem',
                        borderRadius:'1.2rem',
                        alignSelf:'end',
                        pr:2
                    }}>
                        <InputEmoji
                        value={newMessages}
                        onChange={handleChange}
                        />
                        <Button 
                        onClick={handleSend}
                        sx={{ 
                            mt: 1,
                            color:'white',
                            borderRadius:'20px',
                            height:'40px',
                            backgroundColor:'#eb1e44',
                            "&:hover": { backgroundColor: "#eb1e44"},
                            textTransform: 'none'
                        }}>Send</Button>
                    </Box>
                </Box>  
            </Box>)
            :(
                <Box sx={{
                    textAlign:'center',
                    alignItems:'center',
                    color:'#dedede',
                    marginTop:'inherit'
                }}>
                    <h3>Tap On a chat to start a conversation...</h3>
                </Box>

            )}    
        </> 
    );
}
 
export default ChatBox;