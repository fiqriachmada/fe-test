export interface RootGates {
  status: boolean;
  message: string;
  code: number;
  data: DataGates;
}

export interface DataGates {
  total_pages: number;
  current_page: number;
  count: number;
  rows: Rows;
}

export interface Rows {
  count: number;
  rows: Row[];
}

export interface Row {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}
