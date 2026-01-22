import { TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BrainDatePickerField from "../_base/brainDatePickerField/brainDatePickerField";

interface BrainDatePickerControlledProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  size?: TextFieldProps["size"];
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  format?: string;
}

export function BrainDatePickerControlled<T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  size = "small",
  disabled = false,
  minDate,
  maxDate,
  disableFuture = false,
  disablePast = false,
  format = "dd/MM/yyyy",
}: BrainDatePickerControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BrainDatePickerField
          {...field}
          value={field.value || null}
          onChange={(date) => field.onChange(date)}
          fullWidth={true}
          label={label}
          size={size}
          required={required}
          disabled={disabled}
          error={!!error}
          helperText={error?.message}
          minDate={minDate}
          maxDate={maxDate}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format}
        />
      )}
    />
  );
}
