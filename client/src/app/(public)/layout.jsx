import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSelf } from "../../actions/auth";
import ROUTES from "../../shared/routes";

const { DASHBOARD } = ROUTES;

export default async function PublicLayout({ children }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_rs-ac')?.value;

    if (accessToken) {
        const response = await getSelf();
        if (response?.success) {
            redirect(DASHBOARD(response?.user.id));
        }
    }

    return <>{children}</>;
}