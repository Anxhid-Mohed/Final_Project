import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";

export const signup = async (formData:any) => {
    try {
        const {data} = await userApi.post('/verify-auth',formData);
        return data;
    } catch (error) {
        return error 
    }
}

export const userSignupData = async (formData:any) => {
    try {
        const {data} = await userApi.post('/signup',formData);
        return data;
    } catch (error) {
        return error
    }
}

export const accountVerification = async (id:string,token:string) => {
    try {
        const {data} = await userApi.post(`/verify`,{id,token});
        return data;
    } catch (error) {
        return error
    }
}

export const signin = async (formData:any) => {
    try {
        const {data} = await userApi.post('/signin',formData)
        return data;
    } catch (error: any) {
        if(error instanceof AxiosError){
          const errMessage = error?.response?.data?.message
          return errMessage;
        }
    }
}

export const resendEmail = async (userId:string) => {
    try {
        const {data} = await userApi.post('/resend',{userId})
        return data;
    } catch (error) {
        return error
    }
}


export const tokenVerification = async (token:string) => {
    try {
        const {data} = await userApi.post(`/verify-token`,{headers:{'accessToken':token}})
        return data;      
    }catch(error){
        return error
    }
}