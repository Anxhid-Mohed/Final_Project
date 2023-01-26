import axios from "axios";

export const userApi = axios.create({baseURL:process.env.NEXT_PUBLIC_USER_API})