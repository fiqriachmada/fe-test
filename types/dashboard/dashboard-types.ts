export interface RootDashboard {
  status: boolean;
  message: string;
  code: number;
  data: DataDashboard;
}

export interface DataDashboard {
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
  IdGerbang: number;
  Tanggal: string;
  Shift: number;
  IdGardu: number;
  Golongan: number;
  IdAsalGerbang: number;
  Tunai: number;
  DinasOpr: number;
  DinasMitra: number;
  DinasKary: number;
  eMandiri: number;
  eBri: number;
  eBni: number;
  eBca: number;
  eNobu: number;
  eDKI: number;
  eMega: number;
  eFlo: number;
}

export interface PaymentMethodData {
  method: string;
  total: number;
  color?: string;
}

export interface ShiftData {
  id: number;
  value: number;
  label: string;
  color?: string;
}