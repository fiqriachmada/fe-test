import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

export interface DataRow {
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
  grandTotal: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  key: keyof DataRow;
  color: string;
  visible: boolean;
}

interface LalinState {
  data: DataRow[];
  filteredData: DataRow[];
  searchTerm: string;
  dateRange: {
    start: Dayjs | null;
    end: Dayjs | null;
  };
  currentPage: number;
  count: number;
  itemsPerPage: number;
  isLoading: boolean;
  sidebarOpen: boolean;
  activeTab: string;
  paymentMethods: PaymentMethod[];

  // Actions
  setSearchTerm: (term: string) => void;
  setSearchCount: (count: number) => void;
  setDateRange: (start: Dayjs | null, end: Dayjs | null) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setActiveTab: (tab: string) => void;
  togglePaymentMethodVisibility: (id: string) => void;
  filterData: () => void;
  resetFilters: () => void;
  toggleSidebar: () => void;
  initializeData: () => void;
}

export const useLalinStore = create<LalinState>((set, get) => ({
  data: [],
  filteredData: [],
  searchTerm: "",
  dateRange: {
    start: dayjs("2023-11-01"),
    end: dayjs("2023-11-01"),
  },
  currentPage: 1,
  itemsPerPage: 2000,
  count: 0,
  isLoading: false,
  sidebarOpen: true,
  activeTab: "tunai",
  paymentMethods: [
    {
      id: "tunai",
      name: "Tunai",
      key: "Tunai",
      color: "#4caf50",
      visible: true,
    },
    {
      id: "dinasOpr",
      name: "Dinas Operator",
      key: "DinasOpr",
      color: "#ff9800",
      visible: true,
    },
    {
      id: "dinasMitra",
      name: "Dinas Mitra",
      key: "DinasMitra",
      color: "#f44336",
      visible: true,
    },
    {
      id: "dinasKary",
      name: "Dinas Karyawan",
      key: "DinasKary",
      color: "#9c27b0",
      visible: true,
    },
    {
      id: "eMandiri",
      name: "e-Mandiri",
      key: "eMandiri",
      color: "#1976d2",
      visible: false,
    },
    {
      id: "eBri",
      name: "e-BRI",
      key: "eBri",
      color: "#2196f3",
      visible: false,
    },
    {
      id: "eBni",
      name: "e-BNI",
      key: "eBni",
      color: "#00bcd4",
      visible: false,
    },
    {
      id: "eBca",
      name: "e-BCA",
      key: "eBca",
      color: "#009688",
      visible: false,
    },
    {
      id: "eNobu",
      name: "e-Nobu",
      key: "eNobu",
      color: "#795548",
      visible: false,
    },
    {
      id: "eDKI",
      name: "e-DKI",
      key: "eDKI",
      color: "#607d8b",
      visible: false,
    },
    {
      id: "eMega",
      name: "e-Mega",
      key: "eMega",
      color: "#ff5722",
      visible: false,
    },
    {
      id: "eFlo",
      name: "e-Flo",
      key: "eFlo",
      color: "#3f51b5",
      visible: true,
    },
    {
      id: "grandTotal",
      name: "Total Keseluruhan",
      key: "grandTotal",
      color: "#3f51b5",
      visible: true,
    },
  ],
  setSearchCount(count) {
    set({ count });
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term, currentPage: 1 });
    get().filterData();
  },

  setDateRange: (start: Dayjs | null, end: Dayjs | null) => {
    set({ dateRange: { start, end }, currentPage: 1 });
    get().filterData();
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  setItemsPerPage: (items: number) => {
    set({ itemsPerPage: items, currentPage: 1 });
  },

  setActiveTab: (tab: string) => {
    set({ activeTab: tab, currentPage: 1 });
  },

  togglePaymentMethodVisibility: (id: string) => {
    set((state) => ({
      paymentMethods: state.paymentMethods.map((method) =>
        method.id === id ? { ...method, visible: !method.visible } : method
      ),
    }));
  },

  filterData: () => {
    const { data, searchTerm, dateRange } = get();
    let filtered = [...data];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) => {
          console.log("value", value);
          value.toString().toLowerCase().includes(searchLower);
          return;
        })
      );
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.Tanggal);
        return itemDate >= dateRange.start! && itemDate <= dateRange.end!;
      });
    }

    set({ filteredData: filtered });
  },

  resetFilters: () => {
    set({
      searchTerm: "",
      dateRange: { start: null, end: dayjs("2023-11-01") },
      currentPage: 1,
      filteredData: get().data,
    });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  initializeData: () => {
    set({ data: [], filteredData: [] });
  },
}));
