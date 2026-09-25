const AUTH_BASE = "/auth"
const USER_BASE = "/users"
const RESOURCE_BASE = "/resources"


export const API_ENDPOINTS = {
    USER: {
        base: USER_BASE,
        main: (slug) => `${USER_BASE}/${slug}`
    },
    AUTH: {
        base: AUTH_BASE,
        main: (slug) => `${AUTH_BASE}/${slug}`,
    },
    RESOURCE: {
        base: RESOURCE_BASE
    }
}

