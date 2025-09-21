"use client";
import { AssetData } from "@/src/types";

const AssetTable = ({ assets }: { assets: AssetData[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "in repair":
        return "text-yellow-400";
      case "retired":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "✅";
      case "in repair":
        return "🔧";
      case "retired":
        return "🛑";
      default:
        return "❓";
    }
  };

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Available Assets</h3>
        <div className="flex gap-4">
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            <span>Filter</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <span>Download</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700/30">
              <th className="text-left py-3 font-medium">Asset ID</th>
              <th className="text-left py-3 font-medium">Name</th>
              <th className="text-left py-3 font-medium">Category</th>
              <th className="text-left py-3 font-medium">Purchase Date</th>
              <th className="text-left py-3 font-medium">Value</th>
              <th className="text-left py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
              >
                <td className="py-4 text-gray-300 font-mono">{asset.id}</td>
                <td className="py-4 text-gray-300">{asset.name}</td>
                <td className="py-4 text-gray-300">{asset.category}</td>
                <td className="py-4 text-gray-300">{asset.purchaseDate}</td>
                <td className="py-4 text-gray-300 font-medium">
                  {asset.value}
                </td>
                <td className="py-4">
                  <span
                    className={`flex items-center gap-2 ${getStatusColor(asset.status)}`}
                  >
                    <span>{getStatusIcon(asset.status)}</span>
                    <span className="capitalize">{asset.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
        <span>Showing 1-6 of 6 results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-purple-500 text-white">
            1
          </button>
          <button className="px-3 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;
