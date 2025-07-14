"use client";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Fixed */}
      <Header onToggle={() => setIsSidebarVisible(!isSidebarVisible)} />

      {/* Content area - Scrollable */}
      <div className="flex flex-1 pt-[65px]">
        {/* Sidebar */}
        <div
          className={`
          fixed top-[65px] bottom-0 
          ${isSidebarVisible ? `lg:sticky` : "lg:absolute"} lg:top-[65px]
          h-[calc(100vh-65px)]
          transition-transform duration-300 ease-in-out
          z-40
          ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
        `}>
          <Sidebar onToggle={() => setIsSidebarVisible(false)} />
        </div>

        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarVisible(false)}
          />
        )}

        {/* Main content */}
        <main
          className={`
          flex-1
          w-full
          min-h-[calc(100vh-65px)]
          overflow-auto
          transition-all duration-300 ease-in-out
          relative
          px-4 py-8
        `}>
          {/* ${isSidebarVisible ? 'lg:ml-[280px]' : ''} */}
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
