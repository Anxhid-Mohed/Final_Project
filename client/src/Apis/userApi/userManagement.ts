import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";

export const userProfileUpdate = async (formData:any) => {
    try {
        const {data} = await userApi.patch('/manage',formData)
        return data;
    } catch (error) {
        return error;
    }
}


export const accountDisable = async (token:string) => {
    try {
        const {data} = await userApi.patch('/disable',{})
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
}

export const accountEnable = async (token:string) => {
    try {
        const {data} = await userApi.patch('/enable',{})
        return data;
    } catch (error) {
        return error;
    }
}

export const accountDelete = async (password:string,token:string) => {
    try {
        const {data} = await userApi.post('/terminate',{'password':password})
        return data
    } catch (error) {
        return error;
    }
}

export const integrateAcc = async (formData:any,token:string) => {
    try {
        const {data} = await userApi.post('/integrate',formData)
        return data
    } catch (error) {
        return error;
    }
}

export const getBankInfo = async (token:string) => {
    try {
        const {data} = await userApi.get('/integrate')
        return data;
    } catch (error) {
        return error;
    }
}

export const editBankInfos = async (formData:any,token:string) => {
    try {
        const {data} = await userApi.patch('/edit-bankInfo',formData,{headers:{'accesstoken':token}})
        return data;
    } catch (error) {
        return error;
    }
}