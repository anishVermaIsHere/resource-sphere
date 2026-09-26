"use client";
import { useRouter } from "next/navigation";
import Icons from "../../ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from "next/link";
import authStore from "../../../store/auth.store";
import { SidebarMenu, SidebarMenuItem } from "../../ui/sidebar";
import { logout } from "../../../services/api/auth";



export default function ProfileDropdown() {
  const { user, clearAuth } = authStore(s=>s);
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    if (res.status === 200) {
      clearAuth();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <Button variant="ghost" className="relative justify-start bg-gray-200 w-full rounded-sm">
              <Avatar className="size-6">
                {/* <AvatarImage
                  src="https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg?semt=ais_hybrid&w=740"
                  alt="avatar"
                /> */}
                <div className="flex items-center"><Icons.user className="size-6"/>{user?.firstName}</div>
                <AvatarFallback>{user?.firstName.slice(0,1)}</AvatarFallback>
              </Avatar>
              <span className="flex items-center">{user?.firstName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">Admin</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
