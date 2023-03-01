import React,{useEffect} from 'react';
import { io } from 'socket.io-client'
import { socketDetails } from '@/redux/socketSlice';
import { useDispatch , useSelector } from 'react-redux';
import {MdDeleteOutline, MdFavoriteBorder} from 'react-icons/md'
import {message} from 'antd'
import { notification } from '../user/NavBar/NavBar';

const Socket = () => {
    const {user} = useSelector((state:any)=>state.userInfo)
    const {notifications} = useSelector((state:any)=>state.userNotifications)
    const {socket} = useSelector((state:any)=>state.socket)
    const dispatch = useDispatch()

    const [notify,setNotify] = React.useState<any>()
    const [ntn,setNtn] = React.useState(false)

    useEffect(()=>{
        const socket = io('ws://localhost:8800')
        dispatch(socketDetails(socket))
    },[])

    useEffect(()=>{
        if(socket){
            socket.emit("new-user-add",user?.userId)
        }
    },[user])  

    useEffect(()=>{
        if(socket && notifications != null){
            socket.emit("user-notification", notifications)
        }
    },[notifications])

    useEffect(()=>{
        if(socket){
            socket.on('recieve-notification', (data:any)=>{
                console.log(data,'---')
                if(data?.id !== user?.userId){
                    // setNotify(data)
                    // setNtn(true)
                    notification(data?.message)
                }
            })
        }
    },[socket])

    return (  
        <>
        {/* {ntn ? message.success(notify?.message):""} */}
        </>
    );
}

export default Socket;