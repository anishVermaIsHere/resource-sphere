
"use client"
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import QueryProvider from "../../../providers/query-provider"
import { Dots } from "../../ui/loading-animation";
import AlertBox from "../../../shared/widgets/alertbox";
import { self } from "../../../services/api/user";
import ROUTES from "../../../shared/routes";
import { getAuthStorage } from "../../../shared/utils";
import authStore from "../../../store/auth.store";


const { HOME, LOGIN, DASHBOARD } = ROUTES;

function AuthChild({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { clearAuth } = authStore(s=>s);
    const { isAuthenticated, user } = getAuthStorage();
    const publicRoutes = [HOME, LOGIN];
    const protectedRoutes = ['/u/*'];

    function isPathMatched(paths){
        if(!paths.length) return
        return paths.some((route) => {
            if (route.endsWith("/*")) {
                const basePath = route.slice(0, -2);
                return pathname === basePath || pathname.startsWith(basePath + "/");
            }
            return route === pathname;
        });
    }

    const isProtectedRoute = isPathMatched(protectedRoutes);
    const isPublicRoute = isPathMatched(publicRoutes);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["self", pathname],
        queryFn: async () => {
            const response = await self();
            if (!response.data.success) {
                throw new Error("Unauthenticated");
            }
            return response
        },
        retry: false,
        enabled: !isPublicRoute
    });

    useEffect(() => {
        if (isAuthenticated && isPublicRoute) {
            console.log('DASHBOARD redirect');
            router.push(DASHBOARD(user?.id));
        } else if (!isAuthenticated && isProtectedRoute) {
            console.log('HOME redirect');
            router.push(HOME);
        }
    }, [isAuthenticated, isPublicRoute, isProtectedRoute, user, router]);

    if (isLoading) return <Dots />;
    if(isError) { 
        if(error.status === 401){
            clearAuth();
        }
        return <AlertBox variant="destructive" title={error?.response?.data?.message} statusCode={error.status} />
    }
   
    // if (isAuthenticated && isPublicRoute) {
    //     router.push(DASHBOARD(user?.id));
    //     console.log('DASHBOARD')
    //     return;
    // } 
    // if (!isAuthenticated && isProtectedRoute) {
    //     router.push(HOME);
    //     console.log('HOME')
    //     return;
    // } 
    console.log('CHILDREN')
    return <>{children}</>
}

export default function AuthLayout({ children }) {
    return <QueryProvider><AuthChild>{children}</AuthChild></QueryProvider>
}