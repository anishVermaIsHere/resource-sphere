import { SearchForm } from "./search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import CommonAvatar from "./ui/common-avatar";
import AppConfig from "../config/app.config";
import authStore from "../store/auth.store";
import ProfileDropdown from "../components/common/layout/profile-dropdown";

const { user } = authStore.getState();

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "/",
      items: [
        {
          title: "Dashboard",
          url: `/u/${user?.id}/dashboard`,
        },
        {
          title: "Resource List",
          url: `/u/${user?.id}/resources`,
        },
        {
          title: "Notes",
          url: `/u/${user?.id}/notes`,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        <div className="flex gap-2 items-center">
          <CommonAvatar className="size-10" />
          <strong className="text-gray-600">{AppConfig.appName}</strong>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="flex flexx-col justify-between items-center">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
       <SidebarFooter>
        <ProfileDropdown  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
