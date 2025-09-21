"use client";

import StatCard from "@/components/StatCards";
import CustomerTable from "components/CustomerTable";

export default function Manager() {
  return (
    <div className="px-6">
      <div className="pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <CustomerTable />
    </div>
  );
}
