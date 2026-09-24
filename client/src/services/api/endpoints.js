const AUTH_BASE = "/auth"
const USER_BASE = "/users"


export const API_ENDPOINTS = {
    USER: {
        base: USER_BASE,
    },
    AUTH: {
        base: AUTH_BASE,
        register: () => `${AUTH_BASE}/register`,
        login: () => `${AUTH_BASE}/login`,
        refresh: ()=> `${AUTH_BASE}/refresh`,
        logout: () => `${AUTH_BASE}/logout`
    }
}

