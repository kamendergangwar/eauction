import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { ProjectDetailsViewStyles } from "../ProjectDetailsView.styles";
import CategoryIcon from "../../../../assets/projectDetails/categoryIcon.png";

const OverviewSection = (props) => {
  const { projectDetailsData } = props;
  const classes = ProjectDetailsViewStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();
  const [projCategoryList, setProjCategorycatList] = useState([]);

  useEffect(() => {
    if (projectDetailsData) {
      // let categoryArray = projectDetailsData.projCategory.split(',');
      let cat_list = projectDetailsData.projCastCategory;
      for (let c = 0; c < projectDetailsData.projReservationCategory?.length; c++) {
        const element = projectDetailsData.projReservationCategory[c];
        cat_list.push(element);
      }
      setProjCategorycatList(cat_list);
    }
  }, [projectDetailsData]);

  return (
    <Box className={classes.sectionCover} id="overviewSecId">
      {/* <Typography variant="h2" className={classes.sectionTitle}>{t("projectDetailsPage.overviewSec.title")}</Typography> */}
      <ul className={classes.horizontalLst}>
        <li><span>{projectDetailsData?.totalTenements || "--"}</span> {t("projectDetailsPage.overviewSec.tenementsText")}</li>
        <li>{t("projectDetailsPage.overviewSec.incomeGroupText")} <span>{projectDetailsData?.incomeGroup || "--"} </span></li>
        <li>{t("projectDetailsPage.overviewSec.reraIdText")} : <span>{projectDetailsData?.reraId || "--"}</span></li>
      </ul>
      {/* <Hidden mdDown>
        <Divider className={classes.dividerCell} />
      </Hidden>
      <Grid container alignItems="center">
        <Grid item><img src={CategoryIcon} className={classes.categoryTitleIcon} alt="Cidco" /></Grid>
        <Grid item>
          <Typography className={classes.categoryTitle} variant="h6">{t("projectDetailsPage.overviewSec.categoryTitleTxt")}</Typography>
        </Grid>
      </Grid> */}
      {/* <Box className={classes.catChipContainer}>
        {projCategoryList && projCategoryList.map((element, i) => (
          <Chip label={element} key={i} />
        ))}
        <Chip label="SC" />
        <Chip label="ST" />
        <Chip label="NT" />
        <Chip label="DT" />
        <Chip label="State Govt. Employee" />
        <Chip label="Navi Mumbai Journalist" />
        <Chip label="PAP" />
        <Chip label="Handicapped" />
        <Chip label="Ex-Servicemen" />
        <Chip label="Minority" />
        <Chip label="CIDCO EMPLOYEE" />
        <Chip label="Mathadi & General" />
      </Box> */}
    </Box>
  );
};

export default OverviewSection;
