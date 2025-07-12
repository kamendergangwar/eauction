import React from "react";
import { Field } from "formik";
import MuiTextField from "@material-ui/core/TextField";
import { Autocomplete } from "formik-material-ui-lab";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

const AutoCompleteMultiple = (props) => {
  const { label, name, options, touched, errors, ...rest } = props;
  return (
    <>
      <Field
        name={name}
        multiple
        component={Autocomplete}
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </React.Fragment>
        )}
        renderTags={() => null}
        renderInput={(params) => (
          <MuiTextField
            {...params}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
            label={label}
            margin="normal"
            {...rest}
          />
        )}
        {...rest}
      />
    </>
  );
};

export default AutoCompleteMultiple;
