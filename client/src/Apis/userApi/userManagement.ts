import { userApi } from "@/utils/apis";
import { AxiosError } from "axios";

export const userProfileUpdate = async (formData:any) => {
    try {
        const {data} = await userApi.patch('/manage',formData)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}