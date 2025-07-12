import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import { SelectedProjectsIcon, ApplicationEditIcon, ScaleIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import Image from "../../../../assets/building_images/sample.jpg";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import { Chip, Divider } from "@material-ui/core";

const SelectedProjects = (props) => {
  const { width, projectDetailsObjct, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const [projectList, setProjectList] = React.useState([]);
  const [reservationTag, setReservationTag] = React.useState([]);
  const { reservationCategory, castCategory } = useSelector(masterDataSelector);
  const currentPathName = useLocation().pathname;
  const history = useHistory();

  useEffect(() => {
    if (applicantData[0]?.selected_projects) {
      setProjectList(applicantData[0]?.selected_projects);
    }
    setReservationTag([]);
    const reservationCategoryId = [];
    if (applicantData[0]?.ReservationCategoryName) {
      const tempReservationCategory = applicantData[0]?.ReservationCategoryName.split(",");
      reservationCategory.forEach((item) => {
        tempReservationCategory.forEach((element) => {
          const index = reservationCategoryId.findIndex(object => object.label === element.toString());
          if (item.label === element.toString()) {
            if (index === -1) {
              reservationCategoryId.push(item);
              setReservationTag((prevData) => [...prevData, item]);
            }
          }
        });
      });
    }
  }, [applicantData]);

  const formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e5) return +(n / 1e3).toFixed(2) + " " + t("selectedProjects.projectCard.kTxt")//" K";
    if (n >= 1e5 && n < 1e7) return +(n / 1e5).toFixed(2) + " " + t("selectedProjects.projectCard.lackTxt")//" L";
    if (n >= 1e7 && n < 1e9) return +(n / 1e7).toFixed(2) + " " + t("selectedProjects.projectCard.crkTxt")//" Cr";
  };

  return (
    <Box className={classes.detailBoxContainer}>
      <Box>
        <Grid container alignItems="center">
          <Grid item md xs={12}>
            <IconTitle
              icon={<SelectedProjectsIcon fontSize="large" />}
              title={t("selectedProjects.title")}
            />
          </Grid>
          <Grid item md="auto" xs={12}>
            {/* {currentPathName == "/application-details" && (<Button color="primary" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />} onClick={() => history.push("/select-projects")}>{t("selectedProjects.editButtonText")}</Button>)} */}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        {projectList.map((element, i) => (
          <Box className={classes.projectCard} key={i}>
            <Grid container>
              <Grid item md="auto" xs={12} style={{ position: "relative" }}>
                <CardMedia
                  className={classes.projImgCover}
                  image={element?.images[0]}
                  title="Profile Cover"
                  referrerPolicy="no-referrer"
                />
                {/* <Hidden smUp>
                  <Typography className={classes.projectPriceView}>₹{" "}{formatCash(element.attributes.base_price)}
                    {t("selectedProjects.projectCard.lacsText")}
                  </Typography>
                </Hidden> */}
              </Grid>
              <Grid item md xs={12}>
                <Box className={classes.projCardHeader}>
                  <Grid container alignItems="center">
                    <Grid item md xs={12}>
                      <Typography className={classes.projectTitle}>{element.attributes.title}</Typography>
                    </Grid>
                    {/* <Hidden smDown>
                      <Grid item>
                        <Typography className={classes.projectPriceView}>₹{" "}{formatCash(element.attributes.base_price)}
                           {t("selectedProjects.projectCard.lacsText")}
                        </Typography>
                      </Grid>
                    </Hidden> */}
                  </Grid>
                </Box>
                <Box className={classes.cardDataCont}>
                  <Grid container spacing={10}>
                    <Grid item md="auto" xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <ScaleIcon className={classes.scaleIconView} />
                        </Grid>
                        <Grid item>
                          <Typography className={classes.dataTitle}>{t("selectedProjects.projectCard.typeLabel")}</Typography>
                          <Typography className={classes.dataValue}>{element.attributes.type}  {t("selectedProjects.projectCard.bhkText")}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md="auto" xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          <ScaleIcon className={classes.scaleIconView} />
                        </Grid>
                        <Grid item>
                          <Typography className={classes.dataTitle}>{t("selectedProjects.projectCard.carpetAreaLabel")}</Typography>
                          <Typography className={classes.dataValue}>{element.attributes.carpet_area} {t("selectedProjects.projectCard.sqmtText")}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box>
                    <Box className={classes.projChipCard}>
                      
                      <Box className={classes.chipsList}>
                        <Box className={classes.catChipView}>{element?.ApplicationCategory?.ReservationName[0]?.name}</Box>
                      </Box>

                      <Box className={classes.catChipCont}>
                        <Box className={classes.selectedCatCont}>
                          {projectDetailsObjct && projectDetailsObjct.map((item) => (
                            <>
                              <Typography className={classes.chipsTitle}>
                                {t("projectCard.selectedPreferencesText")}
                              </Typography>
                              <Box className={classes.selectedDetail}>
                                <Typography>
                                {t("projectCard.tower")} : <span>{item.Wing}</span>
                                </Typography>
                                <Divider
                                  variant="middle"
                                  orientation="vertical"
                                  flexItem
                                />
                                <Typography>
                                {t("projectCard.floorText")} : <span>{item.FloorNo}</span>
                                </Typography>
                                <Divider
                                  variant="middle"
                                  orientation="vertical"
                                  flexItem
                                />
                                <Typography>
                                {t("projectCard.unit")} : <span>{item.FlatNo}</span>
                                </Typography>
                                <Divider
                                  variant="middle"
                                  orientation="vertical"
                                  flexItem
                                />
                                <Typography>
                                {t("projectCard.type")} : <span>{item.flat_type}</span>
                                </Typography>
                              </Box>
                            </>
                          ))} 
                         
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default withWidth()(SelectedProjects);
