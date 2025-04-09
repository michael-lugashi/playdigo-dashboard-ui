export interface AuthResponse {
  institutionName: string;
  role: string;
  token: string;
}

export interface GraphDataPoint {
  date: string;
  impressions: number;
  spend: number;
}

export type TableDataRow = string[];

export interface DashboardData {
  tableData: TableDataRow[];
  graphData: GraphDataPoint[];
  headers: string[];
}
