import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  currencyNames: { [key: string]: string };
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
  currencyNames,
}) => {
  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={`${label}-currency-label`}
        value={value}
        onChange={onChange}
        label={label}
      >
        {Object.entries(currencyNames).map(([code, name]) => (
          <MenuItem key={code} value={code}>
            {name} ({code})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
