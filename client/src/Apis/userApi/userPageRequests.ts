import { userApi } from "@/utils/apis";

import { AxiosError } from "axios";


export const userPages = async (username:string) => {
    try {
        const {data} = await userApi.get(`/page?username=${username}`)
        return data
    } catch (error) {
        console.log(error);
        
    }
}

export const uploadCoverImage = async (img:string,token:string) =>{
    try {
        const {data} = await userApi.patch('/upload-cover',{'image':img},{headers:{'accesstoken':token}})
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}