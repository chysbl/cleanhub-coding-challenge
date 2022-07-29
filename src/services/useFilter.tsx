import { useState, useEffect } from "react";
import { intersectionBy } from "lodash";
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
    setFilteredData(initialData);
  }, [initialData]);

  useEffect(() => {
    const minKgAsNum = parseInt(filters.minKg);
    const filteredByMinKg = initialData.filter(
      (f) => f.totalRecoveredQuantity >= (minKgAsNum || 0)
    );

    const filteredByPortfolio = initialData.filter((f) => {
      if (filters.includePortfolio && !f.parentHubName) return false;
      return true;
    });

    const filterByLocation = initialData.filter((f) => {
      if (!filters.location) return true;

      if (f.location?.includes(filters.location)) return true;

      const isGlobal = filters.location === GLOBAL_LOCATION;
      if (isGlobal && f.location === null) return true;

      return false;
    });

    setFilteredData(
      intersectionBy(
        filteredByMinKg,
        filteredByPortfolio,
        filterByLocation,
        "uuid"
      )
    );
  }, [filters, initialData]);

  return { filteredData, filterConfig: { filters, setFilters } };
}
