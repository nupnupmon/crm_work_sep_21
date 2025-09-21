"use client";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatCard from "../../components/StatCards";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Manager from "@/src/Components/pages/manager";

export default function ManagerPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("🚫 User not authenticated, redirecting to login");
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />

      <div className="ml-20">
        <Header user={user} onLogout={() => {}} title={"Manager"} />
        <Manager />
      </div>
    </div>
  );
}
