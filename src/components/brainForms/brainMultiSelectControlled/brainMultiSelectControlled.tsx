import { KeyValue } from "@/services/models/keyValue";
import { SelectProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BrainMultiSelectField from "../_base/brainMultiSelectField/brainMultiSelectField";

interface BrainMultiSelectControlledProps<T extends FieldValues>
  extends Omit<SelectProps, "name" | "error" | "multiple"> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: KeyValue[];
  placeholder?: string;
  required?: boolean;
}

export function BrainMultiSelectControlled<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Selecione uma ou mais opções",
  required = false,
  size = "small",
  fullWidth = true,
  ...selectProps
}: BrainMultiSelectControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BrainMultiSelectField
          {...field}
          {...selectProps}
          value={field.value || []}
          label={label}
          options={options}
          placeholder={placeholder}
          required={required}
          size={size}
          fullWidth={fullWidth}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
