"use client";

import { Button } from "@mui/material";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export function Sidebar({ onToggle }: { onToggle: () => void }) {
  const pathname = usePathname();

  const isActive = (item: any) => {
    if (pathname === item.href) return true;
    if (item.children?.some((child: any) => pathname.startsWith(child.href))) {
      return true;
    }
    return false;
  };

  const [mounted, setMounted] = useState(false);

  //   const menuItems = useMenuItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-[280px] bg-card border-r flex flex-col overflow-hidden"></div>
    );
  }

  return (
    <div className="h-full w-[280px] backdrop-blur-lg border-r flex flex-col overflow-hidden">
      {/* <div className="p-6 flex items-center justify-between border-b shrink-0"> */}
        {/* <h1 className="text-xl font-bold">
          {t?.adminShared?.sidebar?.title || "Admin Panel"}
        </h1> */}
        {/* <Button
          variant="outlined"
          size="small"
          onClick={onToggle}
          className="lg:flex hidden">
          <ChevronLeftIcon className="h-5 w-5" />
        </Button> */}
      {/* </div> */}

      {/* User Profile Section */}
      {/* <UserProfile onLogout={logout} /> */}

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
        {/* {menuItems.map((item) => (
          <div key={item.href} className="space-y-1">
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",

                isActive(item)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              )}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>

              {item.children && (
                <div className="ml-auto">
                  {
                    <ChevronUp
                      className={cn(
                        !isActive(item) ? "rotate-180" : "rotate-0",
                        "size-4"
                      )}
                    />
                  }
                </div>
              )}
            </Link>
            {item.children && isActive(item) && (
              <div className="ml-4 space-y-1">
                {item.children.map((child) => {
                  const isChildActive = pathname === child.href;

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",

                        isChildActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      )}>
                      <child.icon className="h-4 w-4" />
                      <span>{child.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))} */}
      </nav>

    </div>
  );
}
