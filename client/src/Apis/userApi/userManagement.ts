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


export const accountDisable = async (formData:any) => {
    try {
        const {data} = await userApi.patch('/disable',formData)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}