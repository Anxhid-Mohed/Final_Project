import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";


export const createrRequest = async (category:string,token:string) => {
    try { 
        const {data} = await userApi.post('/request',{'categories':category});
        return data;
    } catch (error) {
        return error  
    }
}

export const ApprovedDonation = async (info:any,creatorId:any) => {
    try {
        const {data} = await userApi.post('/donate',{info,creatorId});
        return data;
    } catch (error) {
        return error
    }
}

export const userWallet = async () => {
    try {
        const {data} = await userApi.get('/wallet')
        return data;
    } catch (error) {
        return error
    }
}

export const notification = async (formData:any) => {
    try {
        const {data} = await userApi.post('/notification',formData);
        return data;
    } catch (error) {
        return error
    }
}