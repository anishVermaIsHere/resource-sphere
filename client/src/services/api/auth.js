import axiosInstance from "../interceptor"
import { API_ENDPOINTS } from "./endpoints"

const { AUTH } = API_ENDPOINTS;

export async function login(credentials){
    return await axiosInstance.post(AUTH.main('login'), credentials);
};

export async function logout(){
    return await axiosInstance.post(AUTH.main('logout'));
};

export async function refresh(){
    return await axiosInstance.post(AUTH.main('refresh'));
};

