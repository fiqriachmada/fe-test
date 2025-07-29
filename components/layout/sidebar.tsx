"use client";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useRoutes } from "@/routes/routes";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Sidebar({ onToggle }: { onToggle: () => void }) {
  const pathname = usePathname();

  const isActive = ({ item }: { item: any }) => {
    if (pathname === item.href) return true;
    if (item.children?.some((child: any) => pathname.startsWith(child.href))) {
      return true;
    }
    return false;
  };

  const [mounted, setMounted] = useState(false);

  //   const menuItems = useMenuItems();

  const { routes } = useRoutes();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-[280px] bg-card border-r flex flex-col overflow-hidden"></div>
    );
  }

  return (
    <div
      className={cn(
        "h-full w-[280px] flex flex-col overflow-hidden",
        "hover:shadow-2xl",
        "backdrop-blur-xs"
        // "backdrop-blur-lg"
      )}>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
        {routes.map((item) => (
          <div key={item.href} className="space-y-1">
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",

                isActive({ item })
                  ? "bg-yellow-300 text-primary-foreground text-zinc-700"
                  : "hover:bg-yellow-50 text-zinc-500"
              )}>
              {/* <item.icon className="h-4 w-4" /> */}
              {item.icon}
              <span>{item.title}</span>

              {item.children && (
                <div className="ml-auto">
                  {
                    <ExpandLessIcon
                      className={cn(
                        !isActive({ item }) ? "rotate-180" : "rotate-0",
                        "size-4"
                      )}
                    />
                  }
                </div>
              )}
            </Link>
            {item.children && isActive({ item }) && (
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
                          ? "bg-yellow-300 text-primary-foreground"
                          : "hover:bg-yellow-50"
                      )}>
                      {child.icon}
                      <span>{child.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
