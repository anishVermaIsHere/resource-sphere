import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ROUTES from "../../shared/routes";
import { getSelf } from "../../actions/auth";
import ClientAuthLayout from "../../components/common/layout/client-auth-layout";



const { HOME } = ROUTES;

export default async function AuthLayout({ children }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('resource_sphere:auth:ac')?.value;

    if (!accessToken) {
        redirect(HOME);
    }

    const response = await getSelf(); 
    const user = response?.user;

    if (!response.success) {
        redirect(HOME); 
    }

    return <ClientAuthLayout user={user}>{children}</ClientAuthLayout>;
}
