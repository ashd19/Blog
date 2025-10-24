"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";
import Link from "next/link";
import { useTheme } from "next-themes";

function Header() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { theme, setTheme } = useTheme(); // true -> light , false -> dark , we are given useTheme hook from next/themes READ DOCS !
  const themeHandler = () => {
    // we have to toggle here
    setTheme(theme === "light" ? "dark" : "light");
  };
  const navItems = [
    {
      id: 2,
      title: "Create Post",
      href: "/post/create",
    },
    {
      id: 3,
      title: "About Us",
      href: "/about",
    },
    {
      id: 1,
      title: "Explore",
      href: "/explore",
    },
  ];

  //sort navItems based on id
  navItems.sort((a, b) => a.id - b.id);
  // why a-b -> ascending order
  // example : a=3 , b=2 -> 3-2 = positive -> b comes first

  return (
    <header className="border-b bg-background sticky top-0 z-10 ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6  ">
          <Link href="/" className="font-bold text-xl">
            BlogVerse{" "}
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((items) => (
              <Link key={items.id} href={items.href}>
                {items.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {/* keep placeholder  for search  */}
          </div>
          {/* placeholder for theme toggle , see moon  during dark... */}
          <div>
            <Button variant={"ghost"} onClick={themeHandler}>
              {/* reactive ! */}
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {/* isPending is from the useSession -> it returns a value */}
            {isPending ? null : session?.user ? (
              <UserMenu user={session?.user} />
            ) : (
              <Button
                className="cursor-pointer"
                onClick={() => {
                  router.push("/auth");
                }}
              >
                Login/Singup
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
