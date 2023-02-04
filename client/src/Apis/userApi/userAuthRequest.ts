import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";

export const signup = async (formData:any) => {
    try {
        const {data} = await userApi.post('/verify-auth',formData);
        return data;
    } catch (error) {
        console.log(error);   
    }
}

export const userSignupData = async (formData:any) => {
    try {
        const {data} = await userApi.post('/signup',formData);
        return data;

    } catch (error) {
        
    }
}

export const accountVerification = async (id:string,token:string) => {
    try {
        const {data} = await userApi.post(`/verify`,{id,token});
        return data;
    } catch (error) {
        
    }
}

export const signin = async (formData:any) => {
    try {
        const {data} = await userApi.post('/signin',formData)
        return data;
    } catch (err: any) {
        console.log(err);
        if(err instanceof AxiosError){
          const errMessage = err?.response?.data?.message
          return errMessage;
        }
    }
}


export const tokenVerification = async (token:string) => {
    try {
        const {data} = await userApi.post(`/verify-token`,{},{headers:{'accesstoken':token}})
        return data;      
    }catch(error){
        console.log(error);
    }
}