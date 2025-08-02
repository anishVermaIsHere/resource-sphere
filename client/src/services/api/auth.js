import AppConfig from "../../config/app.config";
import axios from "axios";

async function login(credentials){
    return await axios.post(`${AppConfig.baseUrl}/api/v1/auth`, credentials);
};

async function logout(){
    
};

async function refresh(){
    return 
};



export {
    login,
    logout,
    refresh
};