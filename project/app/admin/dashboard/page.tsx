"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Dashboard } from "@/components/admin/dashboard";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingScreen />
  }

  if (!session) {
    return null;
  }

  return <Dashboard />;
}
