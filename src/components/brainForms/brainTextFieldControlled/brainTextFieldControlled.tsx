import { TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BrainTextField from "../_base/brainTextField/brainTextField";

interface BrainTextFieldControlledProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  size?: TextFieldProps["size"];
}

export function BrainTextFieldControlled<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required = false,
  type = "text",
  size = "small",
}: BrainTextFieldControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BrainTextField
          {...field}
          fullWidth={true}
          size={size}
          required={required}
          label={label}
          placeholder={placeholder}
          type={type}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
