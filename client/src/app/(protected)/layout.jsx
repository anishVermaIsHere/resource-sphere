import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ROUTES from "../../shared/routes";
import { getSelf } from "../../actions/auth";




const { HOME } = ROUTES;

export default async function AuthLayout({ children }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_rs-ac')?.value;

    if (!accessToken) {
        redirect(HOME);
    }

    const response = await getSelf(); 
    if (!response.success) {
        redirect(HOME); 
    }

    return <>{children}</>
}
