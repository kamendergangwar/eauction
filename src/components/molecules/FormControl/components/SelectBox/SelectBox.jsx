import React from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { Box, CircularProgress, MenuItem } from "@material-ui/core";

const SelectBox = (props) => {
  const { label, name, options, isNone, isFetching = false, ...rest } = props;

  return (
    <Field
      name={name}
      label={label}
      component={TextField}
      fullWidth
      margin="normal"
      select

      {...rest}
    >
      {isNone && (
        <MenuItem value="None">
          <em>None</em>
        </MenuItem>
      )}
      {!isFetching && options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      {isFetching && <Box height='50px' display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>}
    </Field>
  );
};

export default SelectBox;
