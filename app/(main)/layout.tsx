import Layout from "@/components/layout";
import React, { Suspense } from "react";

type Props = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
