import LoginIndexPage from "@/components/login";
import React, { Suspense } from "react";

type Props = {};

function page({}: Props) {
  return (
    <Suspense>
      <LoginIndexPage />
    </Suspense>
  );
}

export default page;
