import GatesPageDetail from "@/components/gates/detail";
import React, { Suspense } from "react";

type Props = {};

function page({}: Props) {
  return (
    <Suspense>
      <GatesPageDetail />
    </Suspense>
  );
}

export default page;
