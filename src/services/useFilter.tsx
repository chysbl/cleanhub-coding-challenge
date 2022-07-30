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
    const minKgAsNum = parseInt(filters.minKg);
    const filteredByMinKg = initialData.filter(
      (data) => data.totalRecoveredQuantity >= (minKgAsNum || 0)
    );

    const filteredByPortfolio = initialData.filter((data) => {
      if (filters.includePortfolio && !data.parentHubName) return false;
      return true;
    });

    const filteredByLocation = initialData.filter((data) => {
      if (!filters.location) return true;

      if (data.location?.includes(filters.location!)) return true;

      const isGlobal = filters.location === GLOBAL_LOCATION;
      if (isGlobal && data.location === null) return true;

      return false;
    });

    setFilteredData(
      intersectionBy(
        filteredByMinKg,
        filteredByPortfolio,
        filteredByLocation,
        "uuid"
      )
    );
  }, [filters, initialData]);

  return { filteredData, filterConfig: { filters, setFilters } };
}
