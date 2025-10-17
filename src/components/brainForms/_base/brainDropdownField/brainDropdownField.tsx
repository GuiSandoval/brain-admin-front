import { KeyValue } from "@/services/models/keyValue";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";

interface IBrainDropdownFieldProps extends Omit<SelectProps, "error"> {
  id?: string;
  label: string;
  options: KeyValue[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

function BrainDropdownField({
  label,
  options,
  placeholder = "Selecione uma opção",
  error = false,
  helperText,
  fullWidth = true,
  size = "small",
  ...selectProps
}: IBrainDropdownFieldProps) {
  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select {...selectProps} label={label} size={size}>
        <MenuItem value="">{placeholder}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default BrainDropdownField;
