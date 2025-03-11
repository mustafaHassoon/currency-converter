import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ValueInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      type="number"
      fullWidth
      margin="normal"
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
    />
  );
};
