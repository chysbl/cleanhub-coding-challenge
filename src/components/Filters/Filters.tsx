import {
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  FormControl,
  InputAdornment,
} from "@mui/material";
import React from "react";
import styles from "./Filters.module.scss";
import { Hub } from "../../types";
import { Filter, GLOBAL_LOCATION } from "../../services/useFilter";

const getHubLocations = (initialData: Hub[]): string[] => {
  const allLocations = initialData.map((hub) => {
    const loc = hub.location;
    if (!loc) return GLOBAL_LOCATION;

    return loc;
  });

  return Array.from(new Set(allLocations)).sort();
};

export default function Filters({
  initialData,
  filteredData,
  filterConfig,
}: Filter & { initialData: Hub[] }) {
  const onCheckboxUpdate = (isChecked: boolean) => {
    filterConfig.setFilters((f) => ({ ...f, includePortfolio: isChecked }));
  };

  const onLocationSelect = (val: string | null) => {
    filterConfig.setFilters((f) => ({ ...f, location: val || null }));
  };

  const filteredDataLocations = filteredData.map((f) =>
    f.location ? f.location : null
  );

  return (
    <form>
      <fieldset className={styles.fieldset}>
        Filters
        <FormControl variant="outlined">
          <TextField
            label={"Minimum plastic recovered"}
            id="min-plastic"
            type="number"
            value={filterConfig.filters.minKg}
            onChange={(m) =>
              filterConfig.setFilters((f) => ({
                ...f,
                minKg: m.target.value,
              }))
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </FormControl>
        <Autocomplete
          disablePortal
          value={filterConfig.filters.location}
          onChange={(event: any, newValue: string | null) =>
            onLocationSelect(newValue)
          }
          getOptionDisabled={(option) => {
            if (option === GLOBAL_LOCATION) {
              return !filteredDataLocations.includes(null);
            }

            return !filteredDataLocations.includes(option);
          }}
          id="location-autocomplete"
          options={getHubLocations(initialData)}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event: any, isChecked: boolean) =>
                onCheckboxUpdate(isChecked)
              }
              checked={filterConfig.filters.includePortfolio}
            />
          }
          label="Show portfolios only"
        />
      </fieldset>
    </form>
  );
}
