import { redirect } from "next/navigation";
import ROUTES from "../../../shared/routes";
import { getSelf } from "../../../actions/auth";





const { HOME, LOGIN, DASHBOARD } = ROUTES;



export default async function AuthLayout({ children }) {
    console.log('line 1');
    const response = await getSelf();
    console.log('line 2')
    console.log("RESPONSE", response);


    if (!response.ok) {
        // redirect(DASHBOARD(response?.data?.user?.id));
        console.log('call redirect')
        redirect(HOME);
        return
    }

    return <>{children}</>
}
