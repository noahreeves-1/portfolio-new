"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      // Import PostHog client
      import("posthog-js").then(({ default: posthog }) => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
          api_host:
            process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
          // In development, log to the console
          debug: process.env.NODE_ENV !== "production",
        });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      import("posthog-js").then(({ default: posthog }) => {
        // Track page views
        posthog.capture("$pageview");
      });
    }
  }, [pathname, searchParams]);

  return null;
}
