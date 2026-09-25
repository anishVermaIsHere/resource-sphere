
const AppConfig = {
    appName: "Resource Sphere",
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    oAuth: {
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
    },
    authSecret: process.env.BETTER_AUTH_SECRET
};


export default AppConfig;