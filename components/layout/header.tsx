"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { useLogin } from "@/hooks/login/index/useLogin";

import LogoutIcon from "@mui/icons-material/Logout";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthStore } from "@/stores/login/auth-stores";

export function Header({ onToggle }: { onToggle: () => void }) {
  const { logout } = useLogin();
  const { user } = useAuthStore();
  return (
    <header className="fixed top-0 left-0 right-0 h-[65px] flex items-center justify-between px-4 py-8 bg-transparent backdrop-blur-lg border-b z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Octopoda logo"
            className="h-auto w-24 dark:filter dark:invert"
            width={300}
            height={300}
          />
        </div>
        <h1 className="text-xl font-bold">
          {/* {t.adminShared.header.title} ayam */}
        </h1>
        <Button variant="outlined" size="small" onClick={onToggle}>
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-4">
          <AccountCircleIcon></AccountCircleIcon>
          <>{user?.username!}</>
        </div>
        <div className="border-t p-4 shrink-0">
          <Button
            variant="outlined"
            color="error"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={logout}>
            <LogoutIcon className="mr-2 h-4 w-4 text-red-500" />
            {/* {"Logout"} */}
          </Button>
        </div>
        {/* <LanguageToggle />
        <ThemeToggle /> */}
      </div>
    </header>
  );
}
