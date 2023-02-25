import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";


export const userChats = async (userId:string) => {
    try {
        const {data} = await userApi.get(`/chat/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchMessages = async (chatId:string) => {
    try {
        const {data} = await userApi.get(`/messages/${chatId}`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const addMessage = async (formData:any) => {
    try {
        const {data} = await userApi.post('/messages/',formData);
        return data;
    } catch (error) {
        console.log(error);
    }
}