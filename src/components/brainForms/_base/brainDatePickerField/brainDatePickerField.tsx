import { FormHelperText, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

interface IBrainDatePickerFieldProps {
  id?: string;
  label: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  error?: boolean;
  helperText?: string;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  format?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
  required?: boolean;
  disabled?: boolean;
}

function BrainDatePickerField({
  label,
  value,
  onChange,
  error = false,
  helperText,
  size = "small",
  required = false,
  disabled = false,
  minDate,
  maxDate,
  disableFuture = false,
  disablePast = false,
  format = "dd/MM/yyyy",
}: IBrainDatePickerFieldProps) {
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          format={format}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          disableFuture={disableFuture}
          disablePast={disablePast}
          sx={{ width: "100%" }}
          slotProps={{
            textField: {
              size,
              fullWidth: true,
              required,
              error,
              helperText: error && helperText ? helperText : undefined,
            },
          }}
        />
      </LocalizationProvider>
      {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  );
}

export default BrainDatePickerField;
