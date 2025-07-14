"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";

export function Header({ onToggle }: { onToggle: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-[65px] flex items-center justify-between px-4 py-8 bg-transparent backdrop-blur-lg border-b z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Image
            src="/logo/logo.svg"
            alt="Octopoda logo"
            className="h-20 w-20 dark:filter dark:invert"
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
        {/* <LanguageToggle />
        <ThemeToggle /> */}
      </div>
    </header>
  );
}
