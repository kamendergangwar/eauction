import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotelOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import SquareFootOutlinedIcon from "@material-ui/icons/SquareFootOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Collapse from "@material-ui/core/Collapse";
import ProjectDetailsTabs from "../ProjectDetailsTabs/ProjectDetailsTabs";
import Hidden from "@material-ui/core/Hidden";
import ProjectDetailsDialogBox from "../ProjectDetailsDialogBox/ProjectDetailsDialogBox";
import CategorySelectionDialogBox from "../../../molecules/DialogBoxes/CategorySelectionDialogBox/CategorySelectionDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  // getProjectsData,
  setDummyProjectList,
  projectToggle,
  // projectDataSelector,
} from "../../../../redux/features/projectdata/ProjectDataSlice";
import {
  getApplication,
  editApplication,
  applicationSelector,
} from "../../../../redux/features/application/ApplicationSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    // [theme.breakpoints.only("xs")]: {
    //   padding: theme.spacing(1),
    // },
    boxShadow: "none",
    borderRadius: 8,
    marginBottom: theme.spacing(2),
  },
  selectedProjectRoot: {
    backgroundColor: "#f2f9ff",
    borderColor: "#007ae7",
  },
  cover: {
    width: 220,
    // height: 260,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // height: 200,
  },
  // selectedOne : {
  //   width: '100%',
  // },
  // selectedDetails : {
  //   display: 'flex',
  //   flexDirection: 'columns',
  //   width: '100%',
  // },
  dataCotainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  wrapIcon: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  media: {
    height: 140,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  paper: {
    /* width: "80%",
    maxHeight: 435, */
  },
}));

const ProjectCard = (props) => {
  const { isSelected, projectDetails } = props;
  const classes = useStyles();
  const { t } = useTranslation("AgentDashboardPageTrans");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState([]);

  const dispatch = useDispatch();

  const { applicantData } = useSelector(applicantSelector);
  const { reservationCategoriesData, reservationCategory, castCategory } =
    useSelector(masterDataSelector);
  const { isSuccessReqEditApplication } = useSelector(applicationSelector);

  // useEffect(() => {
  //   dispatch(getApplicant());
  // }, [dispatch]);

  useEffect(() => {
    if (isSuccessReqEditApplication) {
      // dispatch(setDummyProjectList(projectDetails));
      dispatch(getApplication());
    }
  }, [dispatch, isSuccessReqEditApplication]);

  useEffect(() => {
    setCategory([]);
    if (applicantData.RservationCatIds) {
      const tempReservationCategory = applicantData.RservationCatIds.split(",");
      reservationCategory.forEach((item) => {
        tempReservationCategory.forEach((element) => {
          if (item.value === element.toString()) {
            setCategory((prevData) => [...prevData, item]);
          }
        });
      });
    }
    if (applicantData.CasteCatId) {
      castCategory.forEach((item) => {
        if (applicantData.CasteCatId === item.value) {
          setCategory((prevData) => [...prevData, item]);
        }
      });
    }
  }, [applicantData, castCategory, reservationCategory]);

  const handleClickCategoryList = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
      const projectData = {
        ...projectDetails,
        reservationIds: newValue,
        isSelected: true,
      };
      dispatch(projectToggle(projectData));
    }
  };

  useEffect(() => {
    const reservationIds = projectDetails.reservationIds;
    if (reservationIds) {
      setSelecedCategory([]);
      reservationIds.forEach((item) => {
        const result = reservationCategoriesData.find(
          (x) => x.ResrevationCatId === item.toString()
        ).ReservationCategoryName;
        setSelecedCategory((prevData) => [
          ...prevData,
          { value: item, label: result },
        ]);
      });
    }
  }, [projectDetails.reservationIds, reservationCategoriesData]);

  const projectSelection = (value) => {
    if (!value.isSelected) {
      handleClickCategoryList();
    } else {
      if (value.applicationId) {
        const requestData = {
          ApplicationId: value.applicationId,
          SchemeId: value.schemeId,
          ProjectId: value.projectId,
          ReservationId: value.reservationIds[0],
          ApplicationStatus: "9",
          Type: "Project Details",
        };
        dispatch(editApplication(requestData));
        const projectData = {
          ...projectDetails,
          reservationIds: [],
          isSelected: false,
        };
        dispatch(setDummyProjectList(projectData));
      } else {
        const projectData = {
          ...projectDetails,
          reservationIds: [],
          isSelected: false,
        };
        dispatch(projectToggle(projectData));
      }
    }
  };

  // const deselectProject = () => {
  //   const projectData = {
  //     ...projectDetails,
  //     reservationIds: [],
  //     isSelected: false,
  //   };
  //   dispatch(projectToggle(projectData));
  // };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val) ? "0" : amount_val.toString().split('.')[0].length > 3 ? amount_val.toString().substring(0, amount_val.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + amount_val.toString().substring(amount_val.toString().split('.')[0].length - 3) : amount_val.toString();
  };

  return (
    <>
      <Card
        className={clsx(classes.root, {
          [classes.selectedProjectRoot]: isSelected,
        })}
        variant="outlined"
      >
        <Hidden only={["xs", "sm"]}>
          <Box display="flex">
            <CardMedia
              className={classes.cover}
              // image={Image}
              image={projectDetails.images[0]}
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent>
                <Grid container direction="row" justify="space-between">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="body2"
                      style={{ color: "#f27807", fontWeight: "bold" }}
                      gutterBottom
                    >
                      {projectDetails.schemeName}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      {projectDetails.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      type="button"
                      style={{
                        float: "right",
                        backgroundColor: "#65707d",
                        color: " #ffffff",
                        cursor: "default",
                      }}
                      variant="contained"
                      size="small"
                      disableElevation
                      disableFocusRipple
                      disableTouchRipple
                    >
                      ₹ {numberWithCommas(projectDetails.price)}
                    </Button>
                  </Grid>
                </Grid>
                <div className={classes.dataCotainer}>
                  {selecedCategory.map((item, index) => (
                    <React.Fragment key={`SelectedCat` + index}>
                      <Chip
                        size="small"
                        style={{ backgroundColor: "#edf5ff", color: "#456b8d" }}
                        label={item.label}
                      />
                    </React.Fragment>
                  ))}
                </div>
                <div className={classes.dataCotainer}>
                  <Typography variant="body2" className={classes.wrapIcon}>
                    <LocationOnOutlinedIcon fontSize="small" />
                    &nbsp; {projectDetails.location}
                  </Typography>
                  &nbsp;
                  <Typography variant="body2" className={classes.wrapIcon}>
                    <LocalHotelOutlinedIcon fontSize="small" />
                    &nbsp; {projectDetails.bhk} &nbsp;
                    {t("projectForm.bhkText")}
                  </Typography>
                  &nbsp;
                  <Typography variant="body2" className={classes.wrapIcon}>
                    <AssignmentTurnedInOutlinedIcon fontSize="small" />
                    &nbsp; {projectDetails.status}
                  </Typography>
                  &nbsp;
                  <Typography variant="body2" className={classes.wrapIcon}>
                    <SquareFootOutlinedIcon fontSize="small" />
                    &nbsp; {projectDetails.carpetArea} &nbsp;
                    {t("projectForm.sqftText")}
                  </Typography>
                  <Typography variant="body2" className={classes.wrapIcon}>
                    <HomeOutlinedIcon fontSize="small" />
                    &nbsp; {projectDetails.reraId}
                  </Typography>
                </div>
                <Box borderTop={1} borderColor="grey.400" marginY={1} />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={3}>
                    <Button
                      color="primary"
                      style={{ fontSize: 14 }}
                      onClick={handleExpandClick}
                    >
                      {expanded
                        ? t("projectForm.lessDetailButtonText")
                        : t("projectForm.moreDetailButtonText")}
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12} sm={3}>
                    <Button
                      variant={isSelected ? "contained" : "outlined"}
                      color="primary"
                      size="small"
                      style={{
                        float: "right",
                        fontSize: 14,
                        fontWeight: 700,
                        borderRadius: 10,
                      }}
                      startIcon={isSelected ? null : <CheckOutlinedIcon />}
                      // onClick={
                      //   isSelected ? deselectProject : handleClickCategoryList
                      // }
                      onClick={() => projectSelection(projectDetails)}
                    >
                      {isSelected
                        ? t("projectForm.deSelectButtonText")
                        : t("projectForm.selectButtonText")}
                    </Button>
                  </Grid> */}
                </Grid>
              </CardContent>
            </div>
          </Box>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <ProjectDetailsTabs moreDetails={projectDetails} />
          </Collapse>
        </Hidden>
        <Hidden only={["md", "lg"]}>
          <CardMedia
            className={classes.media}
            image={projectDetails.images[0]}
            title="Building Image"
          />
          <Box padding={2}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography
                  variant="body2"
                  style={{ color: "#f27807", fontWeight: "bold" }}
                  gutterBottom
                >
                  {projectDetails.schemeName}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontWeight: "bold" }}
                  gutterBottom
                >
                  {projectDetails.title}
                </Typography>
              </Box>
              <Box>
                <Button
                  type="button"
                  style={{
                    float: "right",
                    backgroundColor: "#65707d",
                    color: " #ffffff",
                    cursor: "default",
                  }}
                  variant="contained"
                  size="small"
                  disableElevation
                  disableFocusRipple
                  disableTouchRipple
                >
                  ₹ {numberWithCommas(projectDetails.price)}
                </Button>
              </Box>
            </Box>
            <div className={classes.dataCotainer}>
              <Typography variant="body2" className={classes.wrapIcon}>
                <LocationOnOutlinedIcon fontSize="small" />
                &nbsp; {projectDetails.location}
              </Typography>
              &nbsp;
              <Typography variant="body2" className={classes.wrapIcon}>
                <LocalHotelOutlinedIcon fontSize="small" />
                &nbsp; {projectDetails.bhk} BHK
              </Typography>
              &nbsp;
              <Typography variant="body2" className={classes.wrapIcon}>
                <AssignmentTurnedInOutlinedIcon fontSize="small" />
                &nbsp; {projectDetails.status}
              </Typography>
              &nbsp;
              <Typography variant="body2" className={classes.wrapIcon}>
                <SquareFootOutlinedIcon fontSize="small" />
                &nbsp; {projectDetails.carpetArea} Sqft
              </Typography>
              <Typography variant="body2" className={classes.wrapIcon}>
                <HomeOutlinedIcon fontSize="small" />
                &nbsp; {projectDetails.reraId}
              </Typography>
            </div>
            <Box marginTop={2}>
              {/* <Box>
                <Button
                  fullWidth
                  variant={isSelected ? "contained" : "outlined"}
                  color="primary"
                  size="small"
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: 10,
                  }}
                  startIcon={isSelected ? null : <CheckOutlinedIcon />}
                  onClick={() => projectSelection(projectDetails)}
                // onClick={
                //   isSelected ? deselectProject : handleClickCategoryList
                // }
                >
                  {isSelected
                    ? t("projectForm.deSelectButtonText")
                    : t("projectForm.selectButtonText")}
                </Button>
              </Box> */}
              <Box paddingTop={1}>
                <Button
                  fullWidth
                  color="primary"
                  style={{ fontSize: 14 }}
                  onClick={handleExpandClick}
                >
                  {expanded
                    ? t("projectForm.lessDetailButtonText")
                    : t("projectForm.moreDetailButtonText")}
                </Button>
              </Box>
            </Box>
          </Box>
          <ProjectDetailsDialogBox
            open={expanded}
            onClose={handleExpandClick}
            selectedValue={isSelected}
            projectDetails={projectDetails}
          />
        </Hidden>
      </Card>
      {open && (
        <CategorySelectionDialogBox
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          categoryList={category}
        />
      )}
    </>
  );
};

export default ProjectCard;
