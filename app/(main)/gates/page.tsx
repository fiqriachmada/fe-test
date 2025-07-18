import GatesPageIndex from "@/components/gates";
import React, { Suspense } from "react";

type Props = {};

function page({}: Props) {
  return (
    <Suspense fallback={<></>}>
      <GatesPageIndex />
    </Suspense>
  );
}

export default page;
