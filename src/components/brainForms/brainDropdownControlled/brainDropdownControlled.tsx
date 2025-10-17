import { KeyValue } from "@/services/models/keyValue";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface BrainDropdownControlledProps<T extends FieldValues>
  extends Omit<SelectProps, "name" | "error"> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: KeyValue[];
  placeholder?: string;
  required?: boolean;
}

export function BrainDropdownControlled<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Selecione uma opção",
  required = false,
  size = "small",
  fullWidth = true,
  ...selectProps
}: BrainDropdownControlledProps<T>) {
  const displayLabel = required ? `${label} *` : label;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth={fullWidth} error={!!error}>
          <InputLabel>{displayLabel}</InputLabel>
          <Select {...field} {...selectProps} label={displayLabel} size={size}>
            <MenuItem value="">{placeholder}</MenuItem>
            {options.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
