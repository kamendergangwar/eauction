import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { Autocomplete } from "formik-material-ui-lab";
import MuiTextField from "@material-ui/core/TextField";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
    // marginTop: "15px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  menuItem: {
    padding: 0,
    fontSize: "12px",
  },
  textField: {
    borderRadius: "10px",
  },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon color="primary" fontSize="small" />;

function MultipleSelect(props) {
  const {
    name,
    label,
    options,
    setSelectVal,
    touched,
    errors,
    selectVal,
    ...rest
  } = props;
  const classes = useStyles();

  const theme = useTheme();

  const handleChange = (event) => {
    setSelectVal(event.target.value);
    console.log(selectVal);
  };

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [inputLabel]);

  const variant = "outlined";

  // source: https://github.com/mui-org/material-ui/issues/14203#issuecomment-487690935

  return (
    <>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel
          htmlFor="demo-simple-select-outlined"
          ref={inputLabel}
          shrink={label && (!!label || selectVal !== undefined)}
        >
          {label}
        </InputLabel>

        <Select
          id="demo-simple-select-outlined"
          // id={name}
          multiple
          value={selectVal}
          onChange={handleChange}
          variant="outlined"
          input={
            variant === "outlined" ? (
              <OutlinedInput
                id="select-multiple-chip"
                labelWidth={labelWidth}
                notched={Boolean(label)}
              />
            ) : (
              <Input id="select-multiple-chip" />
            )
          }
          renderValue={(selected) => selected.join(", ")}
          className={classes.textField}
        >
          {options.map((name) => (
            <MenuItem
              key={name.value}
              value={name.value}
              className={classes.menuItem}
            >
              <Checkbox
                checked={selectVal.indexOf(name.value) > -1}
                color="primary"
              />
              <ListItemText primary={name.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default MultipleSelect;
