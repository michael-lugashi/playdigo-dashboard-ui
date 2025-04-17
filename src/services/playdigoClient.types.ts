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

interface TableDataCell {
  formatted: string;
  value: number;
}

export type TableDataRow = TableDataCell[];

export interface DashboardData {
  tableData: TableDataRow[];
  graphData: GraphDataPoint[];
  headers: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
  institutionName: string;
  graphAccess: string[];
}
