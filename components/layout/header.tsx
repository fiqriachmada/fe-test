"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogin } from "@/hooks/login/index/useLogin";
import { useAuthStore } from "@/stores/login/auth-stores";
import { cn } from "@/lib/utils";

export function Header({ onToggle }: { onToggle: () => void }) {
  const { logout } = useLogin();
  const { user } = useAuthStore();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[65px] px-4 flex items-center justify-between bg-transparent shadow-sm",
        "backdrop-blur-xs"
      )}>
      {/* Logo as Toggle */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={onToggle}>
        <Image
          src="/logo.png"
          alt="Logo"
          className="h-auto w-24 dark:invert"
          width={300}
          height={300}
        />
      </div>

      {/* User Info + Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-sm  dark:text-zinc-700">
          <AccountCircleIcon className="text-zinc-500 dark:text-zinc-300" />
          <span>{user?.username}</span>
        </div>

        <Button
          onClick={logout}
          variant="outlined"
          size="small"
          color="error"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 flex items-center">
          <LogoutIcon className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
