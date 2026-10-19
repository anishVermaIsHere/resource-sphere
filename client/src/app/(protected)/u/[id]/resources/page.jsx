
import AppLayout from "../../../../../components/common/layout"
import AppConfig from "../../../../../config/app.config";
import Resources from "../../../../../features/user/components/resources";

export const metadata = {
  title: `Resources | ${AppConfig.appName}`,
  description: `Resources | ${AppConfig.appName}`,
};


export default async function ResourcesPage() {
  return (
      <AppLayout>
        <Resources />
      </AppLayout>
  )
}

