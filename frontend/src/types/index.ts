export interface AssetData {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  value: string;
  status: "active" | "in repair" | "retired";
}
