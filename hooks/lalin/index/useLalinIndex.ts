import { useLalinStore } from "@/stores/lalin/lalin-store";
import { useGetLalin } from "../useGetLalin";
import { useEffect } from "react";
import dayjs from "dayjs";

function useLalinIndex() {
  const { data, filteredData, itemsPerPage, currentPage, dateRange } =
    useLalinStore();

  const dataLalin = useGetLalin({
    limit: itemsPerPage!,
    page: currentPage,
    tanggal: dayjs(dateRange.end).format("YYYY-MM-DD"),
  });

  const rowsDataLalin = dataLalin.data?.data?.rows?.rows!;
  const rowsCountLalin = dataLalin.data?.data?.count!;

  useEffect(() => {
    // Initialize data with the full mock data
    useLalinStore.setState({
      data: rowsDataLalin,
      filteredData: rowsDataLalin,
      count: rowsCountLalin,
    });
  }, [rowsDataLalin]);
  return {};
}

export { useLalinIndex };
