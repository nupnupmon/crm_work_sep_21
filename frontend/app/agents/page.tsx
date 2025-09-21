"use client";

import Agent from "@/src/Components/pages/agent";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AgentsPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <div className="ml-20">
        <Header user={user} onLogout={() => {}} title={"Agents"} />
        <Agent />
      </div>
    </div>
  );
}
