import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSelf } from "../../actions/auth";
import ROUTES from "../../shared/routes";
import ClientAuthLayout from "../../components/common/layout/client-auth-layout";



const { DASHBOARD } = ROUTES;

export default async function PublicLayout({ children }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('resource_sphere:auth:ac')?.value;

    if (accessToken) {
        const response = await getSelf();
        if (response?.success) {
            redirect(DASHBOARD(response?.user.id));
        }
    }

    return <ClientAuthLayout>{children}</ClientAuthLayout>;
}