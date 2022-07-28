import {
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  FormControl,
  InputAdornment,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./Filters.module.scss";
import { Hub } from "../../types";

interface FiltersProps {
  hubs: Hub[];
  setFilteredData: (f: Hub[]) => void;
}

const GLOBAL_LOCATION = "Global";
const getHubLocations = (hubs: Hub[]): Set<string> => {
  const countries = hubs.map((hub) => {
    const loc = hub.location;
    if (!loc) return GLOBAL_LOCATION;

    return loc;
  });

  return new Set(countries.sort().filter(Boolean));
};

interface FilterConfig {
  minKg: number;
  hasParentHub: boolean;
  location: string | null;
}

export default function Filters({ hubs, setFilteredData }: FiltersProps) {
  const [filters, setFilters] = useState<FilterConfig>({
    minKg: 0,
    hasParentHub: false,
    location: null,
  });

  useEffect(() => {
    const { minKg, hasParentHub, location } = filters;

    const isDefaultState =
      minKg === 0 && hasParentHub === false && location === null;
    if (isDefaultState) {
      return setFilteredData(hubs);
    }

    const updatedData = hubs.filter((h) => {
      if (h.parentHubName && filters.hasParentHub) {
        return true;
      }

      const isGlobal = filters.location === GLOBAL_LOCATION;
      if (isGlobal && h.location === null) return true;

      const hasLocation = filters.location !== null;
      if (hasLocation && h.location?.includes(filters.location!)) return true;

      const hasMinValue = filters.minKg !== 0;
      if (hasMinValue && h.totalRecoveredQuantity >= filters.minKg!)
        return true;

      return false;
    });

    setFilteredData(updatedData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const setCheckbox = (isChecked: boolean) => {
    setFilters((f) => ({ ...f, hasParentHub: isChecked }));
  };

  const onLocationSelect = (val: string | null) => {
    setFilters((f) => ({ ...f, location: val || null }));
  };

  return (
    <form>
      <fieldset className={styles.fieldset}>
        Filters
        <FormControl variant="outlined">
          <TextField
            label={"Minimum plastic recovered"}
            id="min-plastic"
            value={filters.minKg}
            onChange={(m) =>
              setFilters((f) => ({
                ...f,
                minKg: parseInt(m.target.value || "0"),
              }))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </FormControl>
        <Autocomplete
          disablePortal
          value={filters.location}
          onChange={(event: any, newValue: string | null) =>
            onLocationSelect(newValue)
          }
          id="location-autocomplete"
          options={Array.from(getHubLocations(hubs))}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event: any, isChecked: boolean) =>
                setCheckbox(isChecked)
              }
              checked={filters.hasParentHub}
            />
          }
          label="Show portfolios only"
        />
      </fieldset>
    </form>
  );
}
