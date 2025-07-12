import React from "react";
import { Field, ErrorMessage } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box"; // Import Box

const CheckBoxGroup = (props) => {
  const { name, options, direction, ...rest } = props;
  return (
    <FormControl error>
      <Field name={name} {...rest}>
        {({ field }) => {
          return (
            <Box display="flex" flexDirection={direction}>
              {options.map((item) => {
                return (
                  <React.Fragment key={item.value}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name={name}
                      value={item.value}
                      id={item.value}
                      disabled={item.disabled}
                      Label={{ label: item.label }}
                      color="primary"
                    />
                  </React.Fragment>
                );
              })}
            </Box>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={FormHelperText} />
    </FormControl>
  );
};

export default CheckBoxGroup;
