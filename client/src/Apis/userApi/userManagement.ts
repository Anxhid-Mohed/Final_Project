import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";

export const userProfileUpdate = async (formData:any) => {
    try {
        const {data} = await userApi.patch('/manage',formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const accountDisable = async (token:string) => {
    try {
        const {data} = await userApi.patch('/disable',{},{headers:{'accesstoken':token}})
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const accountEnable = async (token:string) => {
    try {
        const {data} = await userApi.patch('/enable',{},{headers:{'accesstoken':token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const accountDelete = async (password:string,token:string) => {
    try {
        const {data} = await userApi.post('/terminate',{'password':password},{headers:{'accesstoken':token}})
        return data
    } catch (error) {
        console.log(error);
    }
}