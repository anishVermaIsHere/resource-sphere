
"use client"
// import { getAuthStorage } from "../../../shared/utils";
import { useQuery } from "@tanstack/react-query";
import QueryProvider from "../../../providers/query-provider"
import { Dots } from "../../ui/loading-animation";
import { self } from "../../../services/api/user";


function AuthChild({ children }){
      const { data: user, isLoading, isError } = useQuery({
        queryKey: ["self"],
        queryFn: async () => {
            console.log('call self')
            const response = await self();
            console.log('response', response);
            if (!response.statusText) {
                throw new Error("Unauthenticated");
            }

            return response
        },
        retry: false,
    });

    if (isLoading) {
        return <Dots />;
    }
    return <>{children}</>
}

export default function AuthLayout({ children }) {
    return <QueryProvider><AuthChild>{children}</AuthChild></QueryProvider>
}