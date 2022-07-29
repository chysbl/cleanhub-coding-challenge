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

const getHubLocations = (hubs: Hub[]): Set<string> => {
  const countries = hubs.map((hub) => {
    const loc = hub.location;
    if (!loc) return GLOBAL_LOCATION;

    return loc;
  });

  return new Set(countries.filter(Boolean).sort());
};

export default function Filters({ filteredData, filterConfig }: Filter) {
  const onCheckboxUpdate = (isChecked: boolean) => {
    filterConfig.setFilters((f) => ({ ...f, includePortfolio: isChecked }));
  };

  const onLocationSelect = (val: string | null) => {
    filterConfig.setFilters((f) => ({ ...f, location: val || null }));
  };

  return (
    <form>
      <fieldset className={styles.fieldset}>
        Filters
        <FormControl variant="outlined">
          <TextField
            label={"Minimum plastic recovered"}
            id="min-plastic"
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
          id="location-autocomplete"
          options={Array.from(getHubLocations(filteredData))}
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
