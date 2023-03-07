import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";


export const createChat = async (senderId:string,receiverId:string) => {
    try {
        const {data} = await userApi.post('/chat',{senderId,receiverId})
        return data;
    } catch (error) {
        return error
    }
}

export const userChats = async (userId:string) => {
    try {
        const {data} = await userApi.get(`/chat/${userId}`);
        return data;
    } catch (error) {
        return error
    }
}

export const fetchMessages = async (chatId:string) => {
    try {
        const {data} = await userApi.get(`/messages/${chatId}`);
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}


export const addMessage = async (formData:any) => {
    try {
        const {data} = await userApi.post('/messages/',formData);
        return data;
    } catch (error) {
        return error;
    }
}

export const readUserMessages = async (chatId:string,userId:string) => {
    try {
        const {data} = await userApi.patch(`/messages/${chatId}/${userId}`);
        return data;
    } catch (error) {
        return error;
    }
}