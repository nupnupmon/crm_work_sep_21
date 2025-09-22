"use client";

import StatCard from "@/components/StatCards";
import AssetTable from "components/AssetTable";
import { AssetData } from "@/src/types";
import CustomerTable from "@/components/CustomerTable";

const assets: AssetData[] = [
  {
    id: "1001",
    name: "Dell XPS 15",
    category: "Laptop",
    purchaseDate: "10/02/2023",
    value: "₹ 127,500",
    status: "active",
  },
  {
    id: "1002",
    name: "iPhone 13",
    category: "Mobile",
    purchaseDate: "12/05/2022",
    value: "₹ 85,000",
    status: "in repair",
  },
  {
    id: "1003",
    name: "Canon EOS R5",
    category: "Camera",
    purchaseDate: "03/01/2021",
    value: "₹ 340,000",
    status: "retired",
  },
  {
    id: "1004",
    name: "HP LaserJet Pro",
    category: "Printer",
    purchaseDate: "07/07/2023",
    value: "₹ 34,000",
    status: "active",
  },
  {
    id: "1005",
    name: "MacBook Pro",
    category: "Laptop",
    purchaseDate: "15/11/2022",
    value: "₹ 187,000",
    status: "active",
  },
  {
    id: "1006",
    name: "Samsung Galaxy S21",
    category: "Mobile",
    purchaseDate: "20/03/2023",
    value: "₹ 76,500",
    status: "in repair",
  },
];

export default function Manager() {
  return (
    <div className="px-6">
      <div className="pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Leads"
            value="100"
            subtext="View entire list"
            icon="💰"
            bgColor="bg-gradient-to-br from-cyan-400 to-cyan-500"
          />
          <StatCard
            title="Clients"
            value="20"
            subtext="View entire list"
            icon="📱"
            bgColor="bg-gradient-to-br from-yellow-400 to-yellow-500"
          />
          <StatCard
            title="Potential Clients"
            value="30"
            subtext="View entire list"
            icon="👸"
            bgColor="bg-gradient-to-br from-pink-400 to-purple-500"
          />
        </div>
      </div>

      <AssetTable assets={assets} />
      <CustomerTable />
    </div>
  );
}
