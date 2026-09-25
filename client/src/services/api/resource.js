import axiosInstance from "../interceptor";
import { API_ENDPOINTS } from "./endpoints";


const { RESOURCE } = API_ENDPOINTS

export async function resourceCreate(spreadsheetId){
    try {
        return await axiosInstance.post(RESOURCE.base,{ spreadsheetId });
    } catch (error) {
        console.log('API resource creation error', error);
    }
};

