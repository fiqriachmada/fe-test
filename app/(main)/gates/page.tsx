import GatesPageIndex from "@/components/gates";
import React, { Suspense } from "react";

type Props = {};

function page({}: Props) {
  return (
    <Suspense>
      <GatesPageIndex />
    </Suspense>
  );
}

export default page;
