import { getAuthStorage } from "./utils";


const { user } = getAuthStorage();

const APP_ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: (userId) => userId ? `/u/${userId}/dashboard` : '/u/4r7rwtp357363030/dashboard'
}

export default APP_ROUTES
