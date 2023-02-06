import { adminApi } from "@/utils/apis";
import { AxiosError } from "axios";


export const adminSignin = async(formData:any) => {
    try {
        const {data} = await adminApi.post('/signin',formData)
        console.log(data);
        return data;
    } catch (error:any) {
        if(error instanceof AxiosError){
            const errMessage = error?.response?.data?.message
            return errMessage;
        }
    }
}