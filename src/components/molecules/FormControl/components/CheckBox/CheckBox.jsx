import React from "react";
import { Field, ErrorMessage } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const CheckBox = (props) => {
  const { label, id, name, ...rest } = props;
  return (
    <FormControl error>
      <Field
        name={name}
        id={id}
        component={CheckboxWithLabel}
        {...rest}
        Label={{ label: label }}
      />
      <ErrorMessage name={name} component={FormHelperText} />
    </FormControl>
  );
};

export default CheckBox;
