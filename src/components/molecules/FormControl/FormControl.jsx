import React from "react";
import Input from "./components/Input/Input";
import CheckBox from "./components/CheckBox/CheckBox";
import CheckBoxGroup from "./components/CheckBoxGroup/CheckBoxGroup";
import SelectBox from "./components/SelectBox/SelectBox";
import AutoCompleteMultiple from "./components/AutoCompleteMultiple/AutoCompleteMultiple";
import CustomDatePicker from "./components/CustomDatePicker/CustomDatePicker";
import MultipleSelect from "./components/MultpleSelect/MultipleSelect";
import CategorySelectBox from "./components/SelectBox/CategorySelectBox";
import MultipleSelectBox from "./components/SelectBox/MultipleSelectBox";

const FormControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "selectbox":
      return <SelectBox {...rest} />;
      case "multipleselectbox":
        return <MultipleSelectBox {...rest} />;
    case "autocompletemultiple":
      return <AutoCompleteMultiple {...rest} />;
    case "checkbox":
      return <CheckBox {...rest} />;
    case "checkboxgroup":
      return <CheckBoxGroup {...rest} />;
    case "datepicker":
      return <CustomDatePicker {...rest} />;
    case "multiselect":
      return <MultipleSelect {...rest} />;
    case "categoryselectbox":
      return <CategorySelectBox {...rest} />;
    
    default:
      return null;
  }
};

export default FormControl;
