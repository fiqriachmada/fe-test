import LalinPageIndex from "@/components/lalin";
import React, { Suspense } from "react";

type Props = {};

function page({}: Props) {
  return (
    <Suspense fallback={<></>}>
      <LalinPageIndex />
    </Suspense>
  );
}

export default page;
