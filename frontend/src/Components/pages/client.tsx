"use client";

import AssetTable from "@/components/AssetTable";
import CustomerTable from "components/CustomerTable";

const assets: AssetData[] = [
  {
    id: "A1001",
    name: "Dell XPS 15",
    category: "Laptop",
    purchaseDate: "10/02/2023",
    value: "$ 1,500",
    status: "active",
  },
  {
    id: "A1002",
    name: "iPhone 13",
    category: "Mobile",
    purchaseDate: "12/05/2022",
    value: "$ 1,000",
    status: "in repair",
  },
  {
    id: "A1003",
    name: "Canon EOS R5",
    category: "Camera",
    purchaseDate: "03/01/2021",
    value: "$ 3,900",
    status: "retired",
  },
  {
    id: "A1004",
    name: "HP LaserJet Pro",
    category: "Printer",
    purchaseDate: "07/07/2023",
    value: "$ 400",
    status: "active",
  },
  {
    id: "A1005",
    name: "MacBook Pro",
    category: "Laptop",
    purchaseDate: "15/11/2022",
    value: "$ 2,200",
    status: "active",
  },
  {
    id: "A1006",
    name: "Samsung Galaxy S21",
    category: "Mobile",
    purchaseDate: "20/03/2023",
    value: "$ 900",
    status: "in repair",
  },
];

export default function Client() {
  return (
    <div className="px-6">
      <CustomerTable />
      <AssetTable assets={assets} />
    </div>
  );
}