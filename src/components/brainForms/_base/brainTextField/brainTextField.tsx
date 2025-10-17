import { TextField } from "@mui/material";
import React from "react";

interface IBrainTextFieldProps extends React.ComponentProps<typeof TextField> {
  id?: string;
}

function BrainTextField(props: IBrainTextFieldProps) {
  return <TextField {...props} fullWidth={true} type={"text"} error={!!props.error} />;
}

export default BrainTextField;
