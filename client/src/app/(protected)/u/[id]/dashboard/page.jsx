import AppLayout from "../../../../../components/common/layout"
import AppConfig from "../../../../../config/app.config";
import Dashboard from "../../../../../features/user/components/dashboard";

export const metadata = {
  title: `Dashboard | ${AppConfig.appName}`,
  description: `Dashboard | ${AppConfig.appName}`,
};


export default async function DashboardPage() {
  return (
      <AppLayout>
        <Dashboard />
      </AppLayout>
  )
}

