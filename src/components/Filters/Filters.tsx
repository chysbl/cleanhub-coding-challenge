import {
  FormControlLabel,
  Checkbox,
  FormControl,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Filters.module.scss";
import { Hub } from "../../types";

interface FiltersProps {
  hubs: Hub[];
  setFilteredData: (f: Hub[]) => void;
}

const getHubLocations = (hubs: Hub[]): Set<string> => {
  const countries = hubs.map((hub) => {
    const loc = hub.location;
    if (!loc) return "";

    const splitLocation = loc.split(",");
    return splitLocation.length > 1 ? splitLocation[1] : splitLocation.join("");
  });

  return new Set(countries.filter(Boolean));
};

export default function Filters({ hubs, setFilteredData }: FiltersProps) {
  const [filters, setFilters] = useState({
    type: "",
    showPortfolioOnly: false,
    location: "",
  });

  const setCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setFilters((f) => ({ ...f, showPortfolioOnly: value }));

    if (value) {
      const portfolioItems = hubs.filter((h) => h.parentHubName);
      setFilteredData(portfolioItems);
      return;
    }

    setFilteredData(hubs);
  };

  const onHubSelect = (val: string | null) => {
    setFilters((f) => ({ ...f, location: val || "" }));
    if (val) {
      const selectedHub = hubs.filter(
        (h) => h.location && h.location.includes(val)
      );
      setFilteredData(selectedHub);
      return;
    }

    setFilteredData(hubs);
  };

  return (
    <form>
      <fieldset className={styles.fieldset}>
        Filters
        <FormControl variant="outlined">
          <TextField
            label={"Minimum plastic recovered"}
            id="min-plastic"
            value={""}
            onChange={() => console.log("weight")}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </FormControl>
        <Autocomplete
          disablePortal
          value={filters.location}
          onChange={(event: any, newValue: string | null) => {
            onHubSelect(newValue);
          }}
          id="hub-search-field"
          options={Array.from(getHubLocations(hubs))}
          renderInput={(params) => <TextField {...params} label="Hubs" />}
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={setCheckbox}
              checked={filters.showPortfolioOnly}
            />
          }
          label="Show only portfolio"
        />
      </fieldset>
    </form>
  );
}
