import { userApi } from "@/utils/apis";

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
        const {data} = await userApi.post('/signup',formData)
        return data;
    } catch (error) {
        
    }
}

export const verifyAccount = async (id:string,token:string) => {
    try {
        const {data} = await userApi.get(`/verify/${id}/${token}`);
        return data;
    } catch (error) {
        
    }
}