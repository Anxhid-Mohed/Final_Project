import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";


export const createrRequest = async (token:string) => {
    try { 
        const {data} = await userApi.post('/request',{},{headers:{'accesstoken':token}});
        return data;
    } catch (error) {
        console.log(error);  
    }
}