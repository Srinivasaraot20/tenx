"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as gtag from "@/lib/gtag";

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = pathname;
      if (searchParams && searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
      gtag.pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GATracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
