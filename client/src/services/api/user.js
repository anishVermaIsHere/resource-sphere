import axiosInstance from "../interceptor";
import { API_ENDPOINTS } from "./endpoints";

const { USER } = API_ENDPOINTS;

export async function self(){
    return await axiosInstance.get(USER.me());
}

