"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

function Header() {
  const router = useRouter();

  const navItems = [
    {
      id: 1,
      title: "Create Post",
      href: "/post/create",
    },
    {
      id: 2,
      title: "About me",
      href: "/about",
    },
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth"); // redirect to login page
          },
        },
      });
      toast("logged out successfully ! ");
    } catch (e) {
      console.log("Error : ", e);
      toast("error while logging out ");
    }
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10 ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6  ">
          <Link href="/" className="font-bold text-xl">
            BlogApp{" "}
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
          {/* placeholder for theme toggle  */}
          <div className="flex items-center gap-2">
            <Button
              className="cursor-pointer"
              onClick={() => {
                router.push("/auth");
              }}
            >
              Login/Singup
            </Button>
            <Button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
