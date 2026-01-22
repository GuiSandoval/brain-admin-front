import { KeyValue } from "@/services/models/keyValue";
import {
  FormHelperText,
  InputLabel,
  SelectProps,
  Chip,
  Box,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import React from "react";
import { StyledFormControl, StyledSelect } from "../brainDropdownField/styles";

interface IBrainMultiSelectFieldProps extends Omit<SelectProps, "error" | "multiple"> {
  id?: string;
  label: string;
  options: KeyValue[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

function BrainMultiSelectField({
  label,
  options,
  placeholder = "Selecione uma ou mais opções",
  error = false,
  helperText,
  fullWidth = true,
  size = "small",
  required = false,
  value = [],
  ...selectProps
}: IBrainMultiSelectFieldProps) {
  const selectedValues = Array.isArray(value) ? value : [];

  return (
    <StyledFormControl fullWidth={fullWidth} error={error} size={size}>
      <InputLabel required={required}>{label}</InputLabel>
      <StyledSelect
        {...selectProps}
        value={selectedValues}
        label={label}
        size={size}
        required={required}
        multiple
        renderValue={(selected) => {
          const selectedArray = Array.isArray(selected) ? selected : [];
          if (selectedArray.length === 0) {
            return <em>{placeholder}</em>;
          }
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedArray.map((selectedKey) => {
                const option = options.find((opt) => opt.key === selectedKey);
                return <Chip key={selectedKey} label={option?.value || selectedKey} size="small" />;
              })}
            </Box>
          );
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            <Checkbox checked={selectedValues.indexOf(option.key) > -1} />
            <ListItemText primary={option.value} />
          </MenuItem>
        ))}
      </StyledSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
}

export default BrainMultiSelectField;
