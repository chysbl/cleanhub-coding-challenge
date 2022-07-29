import { useState, useEffect } from "react";
import { Hub } from "../types";

export const GLOBAL_LOCATION = "Global";

export interface FilterConfig {
  minKg: string;
  includePortfolio: boolean;
  location: string | null;
}

export interface Filter {
  filteredData: Hub[];
  filterConfig: {
    filters: FilterConfig;
    setFilters: React.Dispatch<React.SetStateAction<FilterConfig>>;
  };
}

export default function useFilters(initialData: Hub[]): Filter {
  const [filteredData, setFilteredData] = useState<Hub[]>(initialData);
  const [filters, setFilters] = useState<FilterConfig>({
    minKg: "",
    includePortfolio: false,
    location: null,
  });

  useEffect(() => {
    const { minKg, includePortfolio, location } = filters;

    const isDefaultState =
      minKg === "" && includePortfolio === false && location === null;
    if (isDefaultState) {
      return setFilteredData(initialData);
    }

    const updatedData = initialData.filter((h) => {
      if (h.parentHubName && filters.includePortfolio) {
        return true;
      }

      const isGlobal = filters.location === GLOBAL_LOCATION;
      if (isGlobal && h.location === null) return true;

      const hasLocation = filters.location !== null;
      if (hasLocation && h.location?.includes(filters.location!)) return true;

      const minKgAsNum = parseInt(filters.minKg);
      if (h.totalRecoveredQuantity >= minKgAsNum) return true;

      return false;
    });

    if (updatedData.length !== initialData.length) {
      setFilteredData(updatedData);
    }
  }, [filters, initialData]);

  return { filteredData, filterConfig: { filters, setFilters } };
}
