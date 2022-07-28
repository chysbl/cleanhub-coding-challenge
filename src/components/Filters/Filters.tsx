import {
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Filters.module.scss";
import { CompanyType, Hub } from "../../types";

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
  const [companyType, setCompanyType] = useState("");
  const [showPortfolioOnly, setShowPortfolioOnly] = useState<boolean>(false);
  const [autocompleteValue, setAutocompleteValue] = useState<any>("");

  const onCompanyTypeSelect = (e: SelectChangeEvent<string>) => {
    const selectedCompanyType = e.target.value;
    setCompanyType(selectedCompanyType);
    const hubsOfType = hubs.filter((h) => h.type === selectedCompanyType);
    setFilteredData(hubsOfType);
  };

  const setCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setShowPortfolioOnly(value);

    if (value) {
      const portfolioItems = hubs.filter((h) => h.parentHubName);
      setFilteredData(portfolioItems);
      return;
    }

    setFilteredData(hubs);
  };

  const onHubSelect = (val: string | null) => {
    setAutocompleteValue(val);
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
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="company-type-select-label">Company type</InputLabel>
          <Select
            labelId="company-type-select"
            id="company-type-select"
            value={companyType}
            label="Company Type"
            onChange={onCompanyTypeSelect}
          >
            {Object.values(CompanyType).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          disablePortal
          value={autocompleteValue}
          onChange={(event: any, newValue: string | null) => {
            onHubSelect(newValue);
          }}
          id="hub-search-field"
          options={Array.from(getHubLocations(hubs))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Hubs" />}
        />
        <FormControlLabel
          control={
            <Checkbox onChange={setCheckbox} checked={showPortfolioOnly} />
          }
          label="Show only portfolio"
        />
      </fieldset>
    </form>
  );
}
