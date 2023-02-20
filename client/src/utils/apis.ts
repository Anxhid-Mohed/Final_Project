import axios from "axios";

//User API
export const userApi = axios.create({baseURL:process.env.NEXT_PUBLIC_USER_API})

userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("userToken")) {
      req.headers.accesstoken = localStorage.getItem("userToken");
    }
    return req;
});

export const userApis = axios.create({baseURL:process.env.NEXT_PUBLIC_USER_API})

//Admin API
export const adminApi = axios.create({baseURL:process.env.NEXT_PUBLIC_ADMIN_API})