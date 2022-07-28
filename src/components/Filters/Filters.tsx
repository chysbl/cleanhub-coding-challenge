import {
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState } from "react";
import styles from "./Filters.module.scss";
import { CompanyType, Hub } from "../../types";

interface FiltersProps {
  hubs: Hub[];
}

const getHubNames = (hubs: Hub[]): string[] => {
  return hubs.map((hub) => hub.displayName);
};

export default function Filters({ hubs }: FiltersProps) {
  const [age, setAge] = useState("");

  const onAgeSelect = () => {
    console.log("onageselect");
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
            value={age}
            label="Company Type"
            onChange={onAgeSelect}
          >
            {Object.values(CompanyType).map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          disablePortal
          id="hub-search-field"
          options={getHubNames(hubs)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Hubs" />}
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Show only portfolio"
        />
      </fieldset>
    </form>
  );
}
