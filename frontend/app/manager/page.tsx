"use client";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import StatCard from "../../components/StatCards";
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

        <div className="m-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Weekly Balance"
            value="$20k"
            subtext="View entire list"
            icon="💰"
            bgColor="bg-gradient-to-br from-cyan-400 to-cyan-500"
          />
          <StatCard
            title="Orders In Line"
            value="750"
            subtext="View entire list"
            icon="📱"
            bgColor="bg-gradient-to-br from-yellow-400 to-yellow-500"
          />
          <StatCard
            title="New Clients"
            value="150"
            subtext="View entire list"
            icon="👸"
            bgColor="bg-gradient-to-br from-pink-400 to-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
