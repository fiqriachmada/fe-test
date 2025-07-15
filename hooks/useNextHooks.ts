"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

function useNextHooks() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const { id } = params;
  return { router, params, id, pathname, searchParams };
}

export default useNextHooks;
