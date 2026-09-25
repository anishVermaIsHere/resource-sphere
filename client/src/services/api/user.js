import axiosInstance from "../interceptor";
import { API_ENDPOINTS } from "./endpoints";

const { AUTH } = API_ENDPOINTS;

export async function self(){
    return await axiosInstance.post(AUTH.me('self'));
}

