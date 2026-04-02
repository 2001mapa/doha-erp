"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, pathname, router]);

  // If there's no user and we're not on the login page, we can show nothing while redirecting
  if (!user && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
}
