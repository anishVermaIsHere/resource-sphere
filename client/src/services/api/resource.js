import axiosInstance from "../interceptor";
import AppConfig from "../../config/app.config";


async function resourceCreate(spreadsheetId){
    try {
        return await axiosInstance.post(`/api/v1/resources`,{ spreadsheetId });
    } catch (error) {
        console.log('API resource creation error', error);
    }
};

export {
    resourceCreate
}