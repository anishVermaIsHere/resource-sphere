import Login from "../../components/login/login";
import AppConfig from "../../config/app.config";

export const metadata = {
  title: `Home | ${AppConfig.appName}`,
  description: `Home | ${AppConfig.appName}`,
};


export default async function HomePage() {
  return (
      <Login />
  );
}
