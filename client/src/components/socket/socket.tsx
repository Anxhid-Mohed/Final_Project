import {useEffect} from 'react';
import { io } from 'socket.io-client'
import { socketDetails } from '@/redux/socketSlice';
import { useDispatch , useSelector } from 'react-redux';

const Socket = () => {
    const {user} = useSelector((state:any)=>state.userInfo)
    const {socket} = useSelector((state:any)=>state.socket)
    const dispatch = useDispatch()
    useEffect(()=>{
        const socket = io('ws://localhost:8800')
        dispatch(socketDetails(socket))
     },[])

     useEffect(()=>{
        if(socket){
            socket.emit("new-user-add",user?.userId)
        }
    },[user])  
    return (  
        <>

        </>
    );
}
 
export default Socket;