import AppConfig from "../../config/app.config";
import axiosInstance from "../interceptor";

async function fetchUser(userId){
    return await axiosInstance.get(`${AppConfig.baseUrl}/api/v1/users/${userId}`);
};

async function searchUser(userName){
    return await axiosInstance.get(`${AppConfig.baseUrl}/api/v1/users/search?u=${userName}`);
};


export {
    fetchUser,
    searchUser
}
