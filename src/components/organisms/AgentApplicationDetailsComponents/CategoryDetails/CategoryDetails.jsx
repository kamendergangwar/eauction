import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
  CategoryIcon, UploadFileIcon, IncomeIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { useHistory } from "react-router-dom";
import { AppDetailsViewStyles } from "../AppDetailsView/AppDetailsView.styles";
import { useSelector, useDispatch } from "react-redux";
import { getReservationCategories, masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";

const CategoryDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("AgentAppDetailsViewPageTrans");
  const classes = AppDetailsViewStyles();
  const dispatch = useDispatch();
  const {
    isFetchingMasterData,
    isSuccessMasterData,
    isErrorMasterData,
    reservationCategoriesData
  } = useSelector(masterDataSelector);
  const [incomeGroupName, setIncomeGroup] = React.useState("");
  const [castCategoryForView, setCastCategoryForView] = React.useState([]);
  const [reservationCategoryForView, setReservationCategoryForView] = React.useState([]);
  const [employmentStatus, setEmploymentStatus] = React.useState("");
  const [occupationText, setOccupationText] = React.useState("");
  const history = useHistory();

  /* useEffect(() => {
    dispatch(getReservationCategories());
  }, [dispatch]); */

  useEffect(() => {
    var resCatIdsList = [];
    if (applicantData.RservationCatIds) {
      resCatIdsList = applicantData.RservationCatIds.split(",");
    }
    var castCatList = [];
    var resCatList = [];
    for (let i = 0; i < reservationCategoriesData.length; i++) {
      const element = reservationCategoriesData[i];
      if (applicantData.CasteCatId) {
        if (element.ResrevationCatId == applicantData.CasteCatId) {
          castCatList.push(element);
        }
      }
      if (applicantData.RservationCatIds) {
        for (let x = 0; x < resCatIdsList.length; x++) {
          const innerArrElem = resCatIdsList[x];
          if (element.ResrevationCatId == innerArrElem) {
            resCatList.push(element);
          }
        }
      }
    }
    setCastCategoryForView(castCatList);
    setReservationCategoryForView(resCatList);
  }, [reservationCategoriesData]);

  useEffect(() => {
    var value = parseFloat(applicantData.IncomeGroup);
    if (value >= 0 && value <= 300000) {
      setIncomeGroup("EWS");
    } else if (value >= 300001 && value <= 600000) {
      setIncomeGroup("LIG");
    } else if (value >= 600001 && value <= 1200000) {
      setIncomeGroup("MIG - I");
    } else if (value >= 1200001 && value <= 1800000) {
      setIncomeGroup("MIG - II");
    } else if (value >= 1800001 && value <= 9999999999) {
      setIncomeGroup("HIG");
    } else {
      setIncomeGroup("");
    }
    switch (applicantData.EmploymentStatus) {
      case "1": setEmploymentStatus("Salaried");
        break;
      case "2": setEmploymentStatus("Regular Wage");
        break;
      case "3": setEmploymentStatus("Labour");
        break;
      case "4": setEmploymentStatus("Self Employed");
        break;
      case "5": setEmploymentStatus("Other");
        break;
    }
    if (applicantData.Occupation) {
      if (applicantData.Occupation === "Agriculture") {
        setOccupationText(t("applicatntProfilePage.incomeInformation.occupationOptions.agriculture"));
      } else if (applicantData.Occupation === "Business") {
        setOccupationText(t("applicatntProfilePage.incomeInformation.occupationOptions.business"));
      } else if (applicantData.Occupation === "Self-Employed") {
        setOccupationText(t("applicatntProfilePage.incomeInformation.occupationOptions.selfEmployed"));
      } else if (applicantData.Occupation === "Service") {
        setOccupationText(t("applicatntProfilePage.incomeInformation.occupationOptions.service"));
      } else {
        setOccupationText(t("applicatntProfilePage.incomeInformation.occupationOptions.other"));
      }
    }
  }, [applicantData]);

  return (
    <Box className={classes.secContainer}>
      <Grid container alignItems="center">
        <Grid item>
          <AgentIconTitle
            icon={<CategoryIcon fontSize="large" />}
            title={t("applicatntProfilePage.categoryDetails.title")}
          />
        </Grid>
        <Grid item style={{ paddingLeft: 15 }}>
          <Button
            startIcon={<EditOutlinedIcon />}
            color="primary"
            component="span"
            style={{ fontSize: 12 }}
            onClick={() => history.push("/category-details")}
          >
            {t("applicatntProfilePage.categoryDetails.editButtonText")}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "15px" }}>
        <Grid item md={4} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.categoryDetails.formControl.castCategoryLabel")}
          </Typography>
          <Grid style={{ marginTop: 15 }}>
            {castCategoryForView.map((element, index) => (
              <Box className={classes.chipsUi} key={index}>{element.ReservationCategoryName}</Box>
            ))}
            {castCategoryForView.length == 0 &&
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>--</Typography>
            }
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.categoryDetails.formControl.otherCategoryLabel")}
          </Typography>
          <Grid style={{ marginTop: 15 }}>
            {reservationCategoryForView.map((element, index) => (
              <Box className={classes.chipsUi} key={index}>{element.ReservationCategoryName}</Box>
            ))}
            {reservationCategoryForView.length == 0 &&
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>--</Typography>
            }
          </Grid>
        </Grid>
      </Grid>

      <Box borderTop={1} borderColor="grey.400" marginY={2} />
      <Grid container alignItems="center">
        <Grid item>
          <AgentIconTitle
            icon={<IncomeIcon fontSize="large" />}
            title={t("applicatntProfilePage.incomeInformation.title")}
          />
        </Grid>
        <Grid item style={{ paddingLeft: 15 }}>
          <Button
            startIcon={<EditOutlinedIcon />}
            color="primary"
            component="span"
            style={{ fontSize: 12 }}
            onClick={() => history.push("/category-details")}
          >
            {t("applicatntProfilePage.incomeInformation.editButtonText")}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "15px" }}>
        <Grid item md={4} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.incomeInformation.formControl.occupationLabel")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{occupationText || "--"}</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.incomeInformation.formControl.employmentStatusLabel")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{employmentStatus || "--"}</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="subtitle1"
            className={classes.infoLabel}
          >
            {t("applicatntProfilePage.incomeInformation.formControl.annualIncomeLabel")}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>{applicantData.AnnualFamilyIncome || "--"}</Typography>
          <Box display="flex" alignItems="center">
            <Typography className={classes.incomeGroupTxt}>{t("applicatntProfilePage.incomeInformation.formControl.incomeGroupLabel")}:</Typography>
            <Typography className={classes.incomeGroupVal}>{incomeGroupName || "--"}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withWidth()(CategoryDetails);
