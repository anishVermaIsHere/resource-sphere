import axiosInstance from "../interceptor";
import { API_ENDPOINTS } from "./endpoints";


const { RESOURCE } = API_ENDPOINTS

export async function createSheet(payload){
    try {
        return await axiosInstance.post(RESOURCE.base, payload);
    } catch (error) {
        console.log('API: resource creation error', error);
    }
};

export async function getSheet(payload){
    try {
        return await axiosInstance.get(RESOURCE.base);
    } catch (error) {
        console.log('API: resource fetching error', error);
    }
};
