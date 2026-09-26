
const AppConfig = {
    appName: "Resource Sphere",
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    user: {
        defaultUsername: process.env.NEXT_PUBLIC_DEFAULT_USERNAME,
        defaultPassword: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD
    },
    oAuth: {
        clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
        clientSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET
    },
    authSecret: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET
};


export default AppConfig;