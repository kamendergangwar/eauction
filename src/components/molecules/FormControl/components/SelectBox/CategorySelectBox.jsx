import React from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import {
  DialogContent,
  Grid,
  Box,
  MenuItem,
  Tooltip,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { QuestionMarkIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import { InfoOutlined } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  customTextField: {
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  castDropDown: {
    padding: "10px",
    "& ul": {
      paddingLeft: "20px",

      "& li": {
        paddingBottom: "8px",
        fontSize: "1rem"
      }
    }
  }
});
const CustomTooltip = withStyles({
  tooltip: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
    borderRadius: "8px",
    border: "1px solid rgba(0, 56, 192, 1)",
  },
  arrow: {
    "&:before": {
      border: "1px solid rgba(0, 56, 192, 1)",
    },
    color: "#FFFFFF",
  },
})(Tooltip);

const CategorySelectBox = (props) => {
  const { label, name, options, isNone, ...rest } = props;
  const [customOption, setCustomOption] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation("CategoryDetailsPageTrans");

  useEffect(() => {
    if (options) {
      const order = ['1', '2', '3', '4', '5', '11', '10', '13', '9', '7', '12', '8', '6'];
      const sortedOptions = options.sort((a, b) => order.indexOf(a.value) - order.indexOf(b.value));
      const result = sortedOptions.reduce((acc, curr, index) => {
        acc.push(curr);
        // if (index == 4) {
        //   acc.push({
        //     value: "-",
        //     label: "----------------------------------------------------------------------------------",
        //     disabled: true,
        //     weight: 700,
        //     color: "black"
        //   });
        // }
        // if (index == 5) {
        //   acc.push({
        //     value: "-",
        //     label: `---------------${t("categoryForm.castCategoryForm.formControl.notStatutoryCatTxt")}---------------`,
        //     disabled: true,
        //     weight: 700,
        //     color: "black"
        //   });
        // }
        return acc;
      }, []);
      setTimeout(() => {
        setCustomOption(result);
      }, 100);
    }
  }, [options]);


  return (
    <Field
      name={name}
      label={label}
      component={TextField}
      fullWidth
      margin="normal"
      className={classes.customTextField}
      select
      {...rest}
    >
      {isNone && (
        <MenuItem value="None">
          <em>None</em>
        </MenuItem>
      )}
      <MenuItem
        disabled={true}
        style={{
          justifyContent: "space-between",
          fontSize: "1em",
          fontWeight: "600",
          color: "rgb(0, 39, 134)",
          opacity: 1
        }}
      >
        <>
          {/* <Grid>{t("categoryForm.castCategoryForm.formControl.categoryHeading")}</Grid> */}
          {/* <Grid>{t("categoryForm.castCategoryForm.formControl.flatCountHeading")}</Grid> */}
        </>
      </MenuItem>
      {/* <MenuItem
        disabled={true}
        style={{ justifyContent: "center", fontSize: "0.8em", fontWeight: "700", color: "black", opacity: 1 }}
      >
        ---------------{t("categoryForm.castCategoryForm.formControl.statutoryCatTxt")}---------------
      </MenuItem> */}
      {customOption.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          style={{
            justifyContent: option.disabled ? "center" : "space-between",
            fontSize: option.disabled ? "0.8em" : "",
            fontWeight: option.weight,
            color: option.color,
            opacity: 1
          }}
        >
          <>
            <Grid>
              <Box display="flex" alignItems="center">
                {option.label}
                {option.infoDetail &&
                  <CustomTooltip
                    arrow
                    enterTouchDelay={0}
                    title={
                      <DialogContent className={classes.castDropDown}>
                        <Typography color="primary">{option.infoDetail?.heading || ""}</Typography>
                        <ul>
                          {option.infoDetail.values?.map((value) =>
                            <li>{value}</li>
                          )}
                        </ul>
                      </DialogContent>
                    }
                    style={{
                      display: "inline-block",
                      paddingLeft: "12px",
                      lineHeight: "10px",
                    }}>
                    <Typography className={classes.toolTipTittle}>
                      <InfoOutlined color="primary" style={{ fontSize: "1.2rem" }} />
                    </Typography>
                  </CustomTooltip>
                }
              </Box>
            </Grid>
            {/* <Grid
              style={{
                color: "rgba(33, 150, 83, 1)",
                border: "1px solid rgba(33, 150, 83, 0.12)",
                borderRadius: "40px",
                minWidth: "55px",
                textAlign: "center",
                fontWeight: "600",
                display: option.disabled ? "none" : "",
              }}
            >
              {option.flatCount ? option.flatCount : "--"}
            </Grid> */}
          </>
        </MenuItem>
      ))}
    </Field>
  );
};
export default CategorySelectBox;
