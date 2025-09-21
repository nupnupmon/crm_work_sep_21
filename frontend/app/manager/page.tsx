"use client";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatCards from "../../components/StatCards";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/login");
    return;
  }
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />

      <div className="ml-20">
        <Header user={user} onLogout={() => {}} />

        <div className="p-6">
          {/* Stats Cards */}
          <StatCards />
        </div>
      </div>
    </div>
  );
}
