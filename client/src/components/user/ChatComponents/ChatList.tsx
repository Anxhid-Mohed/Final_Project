import React,{useEffect} from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText ,Box} from "@mui/material";
import { getUserData } from '@/Apis/userApi/userPageRequests'

const  ChatList = ({chat,currentUser,refresh}:{chat:any,currentUser:string,refresh:boolean}) => {

    const [userData, setUserData] = React.useState<any>()
    const [unreadMsg, setUnreadMsg] = React.useState<number>()

    useEffect(()=>{
        (
            async()=>{
                console.log(chat,'------')
                const userId = chat.members.find((id:string)=>id !== currentUser)
                const response = await getUserData(userId,chat._id)
                if(response?.status === true){{
                    setUserData(response.data)
                    setUnreadMsg(response.unread)
                }}
            }
        )()
    },[refresh])
    

    return (  
        <>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar alt='user' src={userData ? userData.profile :''}/>
                </ListItemAvatar>
                <ListItemText sx={{lineBreak:'auto'}} primary={userData ? userData.username :''} secondary={'Online'}/>
                {unreadMsg != 0 && <Box sx={{
                    width:'20px',
                    height:'20px',
                    borderRadius:'50%',
                    backgroundColor:'#eb1e44',
                    color:'#fff',
                    textAlign:'center',
                    justifyContent:'center',
                    fontSize:'14px'
                }}>{unreadMsg ? unreadMsg:''}</Box>
                }
            </ListItem>
        </>
    );
}
 
export default ChatList ;