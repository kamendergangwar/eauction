import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import { IncomeDetailsIcon, ApplicationEditIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import Image from "../../../../assets/Profile.jpg";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import { useSelector } from "react-redux";

const IncomeDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const [employmentStatus, setEmploymentStatus] = React.useState("");
  // const [incomeGroupName, setIncomeGroup] = React.useState("");
  const [incomeData, setIncomeData] = React.useState("");
  const currentPathName = useLocation().pathname;
  const history = useHistory();
  const [categoryData, setCategoryData] = React.useState([]);
  const { reservationCategory, castCategory } = useSelector(masterDataSelector);
  const [castTag, setCastTag] = React.useState({});

  useEffect(() => {

    //  var value = parseFloat(applicantData?.IncomeGroup);
    //  if (value >= 0 && value <= 300000) {
    //    setIncomeGroup("EWS");
    //  } else if (value >= 300001 && value <= 600000) {
    //    setIncomeGroup("LIG");
    //  } else if (value >= 600001 && value <= 1200000) {
    //    setIncomeGroup("MIG - I");
    //  } else if (value >= 1200001 && value <= 1800000) {
    //    setIncomeGroup("MIG - II");
    //  } else if (value >= 1800001 && value <= 9999999999) {
    //    setIncomeGroup("HIG");
    //  } else {
    //    setIncomeGroup("");
    //  }

    setIncomeData(applicantData[0])
    switch (applicantData[0]?.EmploymentStatus) {
      case "1": setEmploymentStatus(t("incomeDetails.formControl.employmentStatusLabel3"));
        break;
      case "2": setEmploymentStatus(t("incomeDetails.formControl.employmentStatusLabel0"));
        break;
      case "3": setEmploymentStatus(t("incomeDetails.formControl.employmentStatusLabel1"));
        break;
      case "4": setEmploymentStatus(t("incomeDetails.formControl.employmentStatusLabel2"));
        break;
      case "5": setEmploymentStatus(t("incomeDetails.formControl.employmentStatusLabel4"));
        break;
    }

    if(applicantData.length > 0){
      setCategoryData([]);
  
      const reservationCategoryId = [];
      if (applicantData[0].RservationCatIds!=null) {
        let tempReservationCategory= "";
        tempReservationCategory = applicantData[0].RservationCatIds.split(",");
        reservationCategory.forEach((item) => {
          tempReservationCategory.forEach((element) => {
            if (item.value === element.toString()) {
              const index = reservationCategoryId.findIndex(object => object.value === element.toString());
              if (index === -1) {
                reservationCategoryId.push(item);
                setCategoryData((prevData) => [...prevData, item]);
              }
            }
          });
        });
      }
  
      if(applicantData[0]?.CasteCatId){
        castCategory?.forEach((item) => {
          if (applicantData[0].CasteCatId === item.value) {
            setCastTag(item);
          }
        });
      }
  
      }

  }, [applicantData]);

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val) ? "0" : amount_val.toString().split('.')[0].length > 3 ? amount_val.toString().substring(0, amount_val.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + amount_val.toString().substring(amount_val.toString().split('.')[0].length - 3) : amount_val.toString();
  };

  return (
    <Box className={classes.detailBoxContainer}>
      <Box>
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<IncomeDetailsIcon fontSize="large" />}
              title={t("incomeDetails.title")+' & '+t("categoryDetails.title")}
            />
          </Grid>
          <Grid item md="auto" xs={12}>
            {/* {currentPathName == "/application-details" && (<Button color="primary" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => history.push("/income-details")}>{t("incomeDetails.editButtonText")}</Button>)} */}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        <Grid container>
          {/* <Grid item md={3} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("incomeDetails.formControl.occupationLabel")}</Typography>
            <Typography className={classes.dataValView}>{incomeData?.Occupation || "--"}</Typography>
          </Grid> */}
          <Grid item md={3} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("incomeDetails.formControl.employmentStatusLabel")}</Typography>
            <Typography className={classes.dataValView}>{employmentStatus || "--"} {applicantData[0]?.EmploymentStatus == "5" && (<span> - {incomeData?.EmploymentType}</span>)}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography className={classes.dataLabel}>{t("categoryDetails.formControl.reservationCategoryLabel")}</Typography>
                {categoryData.length ?(<> {categoryData.map((item, index) => (
                  <Typography className={classes.dataValView}>{item.label}</Typography>
                ))}</>): <Typography className={classes.dataValView}>{applicantData[0]?.CasteCategory || "--"}</Typography>}
          </Grid>
          {/* <Grid item md={6} xs={12}>
            <Typography className={classes.dataLabel}>{t("incomeDetails.formControl.averageMonthlyFamilyIncomeLabel")}</Typography>
            <Typography className={classes.dataValView} style={{ marginBottom: 12 }}> ₹ {numberWithCommas(incomeData?.AnnualFamilyIncome || "--")} </Typography>
            <Typography className={classes.dataValView}>{t("incomeDetails.formControl.incomeGroupLabel")} : <span className="primary">{incomeData?.IncomeGroup || "--"}</span></Typography>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default withWidth()(IncomeDetails);
