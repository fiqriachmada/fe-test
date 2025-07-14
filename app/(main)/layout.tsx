import Layout from '@/components/layout';
import React from 'react'

type Props = {}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}