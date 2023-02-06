import { adminApi } from "@/utils/apis";
import { AxiosError } from "axios";

//---> Users Listing <---//
export const usersList = async () => {
    try {
        const {data} = await adminApi.get('/users')
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> User Blocking <---//
export const userBlocked = async (userId:string) => {
    try {
        console.log('here fun',userId);
        const {data} = await adminApi.patch(`/block?id=${userId}`)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> User Unblocking <---//
export const userUnBlocked = async (userId:string) => {
    try {
        console.log('here fun',userId);
        const {data} = await adminApi.patch(`/unblock?id=${userId}`)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

//---> Requests Listing <---//
export const userRequests = async () => {
    try {
        const {data} = await adminApi.get('/requests')
        return data;
    } catch (error) {
        console.log(error);
    }
}