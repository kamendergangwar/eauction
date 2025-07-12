import React from "react";
import { Field } from "formik";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDateTimePicker } from "formik-material-ui-pickers";

const CustomDateTimePicker = (props) => {
    const { name, label, ...rest } = props;
    const currentDateTime = new Date();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Field
                component={KeyboardDateTimePicker}
                name={name}
                label={label}
                inputVariant="outlined"
                minDate={currentDateTime}
                // views={["year", "month", "date"]}
                // views={["year", "month", "date", "hours", "minutes"]}
                // format="yyyy-MM-dd h:mm a"
                margin="normal"
                {...rest}
                style={{ width: "100%" }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default CustomDateTimePicker;
