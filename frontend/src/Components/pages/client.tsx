"use client";

import CustomerTable from "components/CustomerTable";
import { AssetData } from "@/src/types";
import AssetTable from "@/components/AssetTable";

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

export default function Client() {
  return (
    <div className="px-3 py-4">
      <AssetTable assets={assets} />
    </div>
  );
}
