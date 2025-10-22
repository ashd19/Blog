"use client";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "better-auth";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut, PenSquare, UserIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: User;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const UserMenu = ({ user }: UserMenuProps) => {
  const [isloading, setisloading] = useState<boolean>(); // what should be the default value ?
  const router = useRouter();
  const handleLogout = async () => {
    setisloading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast("You have been logged out successfully!");
            router.push("/");
            router.refresh(); // not hard refresh of the whole page
          },
        },
      });
    } catch (e) {
      console.log("Error : ", e);
      toast("Failed to logout!");
    } finally {
      setisloading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback className="h-12 w-12">
              <h1 className="font-extrabold text-2xl">
                {getInitials(user?.name) || "User"}
              </h1>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/post/create">
            <PenSquare className="mr-2 h-4 w-4" />
            <span>Create Post</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isloading}
          className="cursor-pointer"
          asChild
        >
          <Link href="/post/create">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isloading ? "Logging out" : "Logout"}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
