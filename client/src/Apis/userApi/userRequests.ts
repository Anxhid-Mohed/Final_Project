import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";


export const createrRequest = async (category:string,token:string) => {
    try { 
        const {data} = await userApi.post('/request',{'categories':category},{headers:{'accesstoken':token}});
        return data;
    } catch (error) {
        console.log(error);  
    }
}

export const ApprovedDonation = async (info:any,creatorId:any) => {
    try {
        const {data} = await userApi.post('/donate',{info,creatorId});
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const userWallet = async () => {
    try {
        const {data} = await userApi.get('/wallet')
        return data;
    } catch (error) {
        console.log(error)
    }
}