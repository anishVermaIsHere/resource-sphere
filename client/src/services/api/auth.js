import axiosInstance from "../interceptor"
import { API_ENDPOINTS } from "./endpoints"

const { AUTH } = API_ENDPOINTS;

async function login(credentials){
    return await axiosInstance.post(AUTH.login(), credentials);
};

async function logout(){
    return await axiosInstance.post(AUTH.logout());
};

async function refresh(){
    return await axiosInstance.post(AUTH.refresh());
};



export {
    login,
    logout,
    refresh
};