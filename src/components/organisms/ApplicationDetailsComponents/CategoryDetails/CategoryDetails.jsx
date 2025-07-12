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
import { CategoryDetailsIcon, ApplicationEditIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import Image from "../../../../assets/Profile.jpg";
import { useSelector, useDispatch } from "react-redux";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
const CategoryDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const [castTag, setCastTag] = React.useState({});
  const [categoryData, setCategoryData] = React.useState([]);
  const currentPathName = useLocation().pathname;
  const history = useHistory();
  const { reservationCategory, castCategory } = useSelector(masterDataSelector);

   useEffect(() => {
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

  return (
    <Box className={classes.detailBoxContainer}>
      <Box>
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<CategoryDetailsIcon fontSize="large" />}
              title={t("categoryDetails.title")}
            />
          </Grid>
          <Grid item md="auto" xs={12}>
          {currentPathName=="/application-details" && (<Button color="primary" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => history.push("/category-details")}>{t("categoryDetails.editButtonText")}</Button>)}	
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        <Grid container>
          {/* <Grid item md={6} xs={12} className={classes.dataResCell}>
            <Typography className={classes.dataLabel}>{t("categoryDetails.formControl.castCategoryLabel")}</Typography>
              {applicantData[0]?.CasteCategory!=undefined ? (<Box className={classes.chipsList}><Box className={classes.catChipView}>{applicantData[0]?.CasteCategory || "--"}</Box></Box>):("--")}            
          </Grid> */}
          <Grid item md={6} xs={12}>
            <Typography className={classes.dataLabel}>{t("categoryDetails.formControl.reservationCategoryLabel")}</Typography>
                {categoryData.length ?(<> {categoryData.map((item, index) => (
                  <Box className={classes.chipsList} key={index}>
                    <Box className={classes.catChipView}>{item.label}</Box>
                  </Box>
                ))}</>): <Box className={classes.chipsList}><Box className={classes.catChipView}>{applicantData[0]?.CasteCategory || "--"}</Box></Box>}
                
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default withWidth()(CategoryDetails);
