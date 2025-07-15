import DashboardPageIndex from "@/components/dashboard";

import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<></>}>
      <DashboardPageIndex></DashboardPageIndex>
    </Suspense>
  );
}
