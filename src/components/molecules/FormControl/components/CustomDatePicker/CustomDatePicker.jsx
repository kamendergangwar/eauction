import React from "react";
import { Field } from "formik";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CustomDatePicker = (props) => {
  const { name, label, ...rest } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Field
        component={KeyboardDatePicker}
        name={name}
        label={label}
        views={["year", "month", "date"]}
        format="dd/MM/yyyy"
        margin="normal"
        
        {...rest}
        style={{ width: "100%" }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
