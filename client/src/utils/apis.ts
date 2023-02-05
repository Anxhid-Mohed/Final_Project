import axios from "axios";

//User API
export const userApi = axios.create({baseURL:process.env.NEXT_PUBLIC_USER_API})

//Admin API
export const adminApi = axios.create({baseURL:process.env.NEXT_PUBLIC_ADMIN_API})