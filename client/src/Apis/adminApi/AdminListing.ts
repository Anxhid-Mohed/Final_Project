import { adminApi } from "@/utils/apis";
import { AxiosError } from "axios";


export const usersList = async() => {
    try {
        const {data} = await adminApi.get('/users')
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}