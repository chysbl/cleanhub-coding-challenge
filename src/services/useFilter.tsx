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

    const res = initialData.reduce(
      (result: Record<string, Hub[]>, hub: Hub) => {
        const hasMinQuantity = hub.totalRecoveredQuantity >= (minKgAsNum || 0);
        if (hasMinQuantity) {
          result.minKg.push(hub);
        }

        const shouldIncludePortfolio =
          filters.includePortfolio && !hub.parentHubName;
        if (!shouldIncludePortfolio) {
          result.portfolio.push(hub);
        }

        const noLocationSelected = !filters.location;
        const containsLocation =
          filters.location && hub.location?.includes(filters.location);

        if (noLocationSelected || containsLocation) {
          result.location.push(hub);
        }

        const isGlobal = filters.location === GLOBAL_LOCATION;
        const isGlobalLocation = isGlobal && hub.location === null;
        if (isGlobalLocation) {
          result.location.push(hub);
        }

        return result;
      },
      { minKg: [], portfolio: [], location: [] }
    );

    setFilteredData(
      intersectionBy(res.minKg, res.portfolio, res.location, "uuid")
    );
  }, [filters, initialData]);

  return { filteredData, filterConfig: { filters, setFilters } };
}
