import React,{useEffect} from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { getUserData } from '@/Apis/userApi/userPageRequests'

const  ChatList = ({chat,currentUser}:{chat:any,currentUser:string}) => {

    // console.log(chat,"----------------",currentUser)

    const [userData, setUserData] = React.useState<any>()

    useEffect(()=>{
        (
            async()=>{
                const userId = chat.members.find((id:string)=>id !== currentUser)
                const response = await getUserData(userId)
                if(response?.status === true){{
                    setUserData(response.data)
                }}
            }
        )()
    },[])
    

    return (  
        <>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar alt='user' src={userData ? userData.profile :''}/>
                </ListItemAvatar>
                <ListItemText sx={{lineBreak:'auto'}} primary={userData ? userData.username :''} secondary={'Online'} />
            </ListItem>
        </>
    );
}
 
export default ChatList ;