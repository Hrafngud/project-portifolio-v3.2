"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/admin/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}