import { cn } from "@/lib/utils";
import { useAuthStore } from "@/zustand/useAuthStore";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { buttonVariants } from "./ui/button";

const TopBar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-gradient-to-l from-zinc-950 to-black backdrop-blur-md z-10">
      <Link to={"/"} className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="size-10" />
        Music App
      </Link>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
