import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotelOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import SquareFootOutlinedIcon from "@material-ui/icons/SquareFootOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { green, orange, red, yellow } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "../ProjectCard/ProjectCard";
import FormControl from "../../../molecules/FormControl/FormControl";
import {
  GrievanceCategoryList, GrievanceTypeList
} from "../../../../utils/MasterData";
import DefaultMessageBox from "../../../atoms/DefaultMessageBox/DefaultMessageBox";
import { getApplication, applicationSelector } from "../../../../redux/features/application/ApplicationSlice";
import {
  setDummyProjectList,
  agentProjectDataSelector,
  clearProjectList,
  getProjectsData,
  getLocationData
} from "../../../../redux/features/agent/AgentProjectDataSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const useStyles = makeStyles((theme) => ({
  grievanceFilterSec: {
    marginBottom: theme.spacing(1.5),
    "& .MuiGrid-item": {
      [theme.breakpoints.only("xs")]: {
        marginBottom: theme.spacing(2),
      }
    }
  },
  cardRoot: {
    padding: theme.spacing(1),
    margin: theme.spacing(0, 0, 3, 0),
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
    },
  },
  cover: {
    width: 200,
    height: 180,
    borderRadius: 5,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      height: "170px"
    },
  },
  dataCotainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.only("xs")]: {
      "& > *": {
        margin: 0,
        padding: "5px",
        flex: "0 0 50%"
      },
    },
  },
  chipCotainer: {
    display: "flex",
    alignItems: "center"
  },
  chipsUi: {
    background: "#EDF5FF",
    borderRadius: 60,
    display: "inline-block",
    padding: "2px 10px",
    color: "#45688D",
    fontSize: "0.7rem",
    margin: "10px 10px 10px 0",
    "&.filled": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff"
    }
  },
  wrapIcon: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  button: {
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 10,
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  amountView: {
    float: "right",
    backgroundColor: "#65707d",
    color: "#ffffff",
    cursor: "default",
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
  cardFoot: {
    padding: theme.spacing(2, 0, 1)
  },
  filterInputBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 0,
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px"
    },
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      transform: "translate(14px, 12px) scale(1)"
    }
  }
}));

const AgentProjectCard = () => {
  const classes = useStyles();
  const { t } = useTranslation(["AgentDashboardPageTrans","ProjectDetailsPageTrans","AgentApplicationDashboardPageTrans"]);
  const dispatch = useDispatch();
  const { applicationData } = useSelector(applicationSelector);
  const {
    isProjectDataFetching,
    isProjectDataError,
    projectDataErrorMessage,
    demoProjectList,
    schemeData,
    schemeProjectList,
    locationProjectList
  } = useSelector(agentProjectDataSelector);
  const formikRef = useRef();
  const [tempLocFilterList, setTempLocFilterList] = useState([]);
  const [tempTypeFilterList, setTempTypeFilterList] = useState([]);
  const [locationFilterList, setLocationFilterList] = useState([]);
  const [typeFilterList, setTypeFilterList] = useState([]);
  const [projectFiltersList, setProjectFiltersList] = useState([]);
  const [isActiveFilter, setActiveFilter] = useState(false);
  
  const projectTypeList = [
    {
      value: "1",
      label: t(
        "projectForm.formControl.projectType.options.kh1BHK",
        {ns:"ProjectDetailsPageTrans"}
      ),
    },
    {
      value: "2",
      label: t(
        "projectForm.formControl.projectType.options.kh2BHK",
        {ns:"ProjectDetailsPageTrans"}
      ),
    },
    {
      value: "3",
      label: t(
        "projectForm.formControl.projectType.options.kh3BHK",
        {ns:"ProjectDetailsPageTrans"}
      ),
    },
  ];
  
  const priceRangeeList = [
    {
      value: "100000-1000000",
      label: "1-10 " + t("projectForm.formControl.priceRange.lackTxt",
      {ns:"ProjectDetailsPageTrans"}),
    },
    {
      value: "1000000-2000000",
      label: "10-20 " + t("projectForm.formControl.priceRange.lackTxt",
      {ns:"ProjectDetailsPageTrans"}),
    },
    {
      value: "2000000-3000000",
      label: "20-30 " + t("projectForm.formControl.priceRange.lackTxt",
      {ns:"ProjectDetailsPageTrans"}),
    },
    {
      value: "3000000-4000000",
      label: "30-40 " + t("projectForm.formControl.priceRange.lackTxt",
      {ns:"ProjectDetailsPageTrans"}),
    },
    {
      value: "4000000-5000000",
      label: "40-50 " + t("projectForm.formControl.priceRange.lackTxt",
      {ns:"ProjectDetailsPageTrans"}),
    },
    {
      value: "5000000-10000000",
      label: "50-100 " + t("projectForm.formControl.priceRange.lackTxt",
      {ns:"ProjectDetailsPageTrans"}),
    }
  ];
  
  //console.log("projectTypeList : ", projectTypeList);
  const initialValues = {
    location: "",
    subLocation: "",
    projectType: "",
    priceRange: "",
  };

  useEffect(() => {
    //dispatch(getApplication());
    dispatch(getLocationData());
    dispatch(getProjectsData());    
  }, [dispatch, t]);

  useEffect(() => {
    dispatch(clearProjectList());
    setTempLocFilterList([]);
    setTempTypeFilterList([]);
    console.log("Inn hererer",schemeProjectList);
    schemeProjectList.forEach((item) => {
      // setTempLocFilterList((prevData) => [
      //   ...prevData,
      //   { value: item.address, label: item.address },
      // ]);
      let newItem = {
        schemeName: schemeData.value,
        schemeId: item.category_id,
        projectId: item.idlisting,
        location: item.address,
        gps: item.gps,
        lat: item.lat,
        lng: item.lng,
        images: item.images,
        isSelected: false,
      };
      if (item.attributes) {
        newItem.title = item.attributes["Title"];
        newItem.price = item.attributes["Base Price"];
        newItem.carpetArea = item.attributes["Carpet Area"];
        newItem.bhk = item.attributes["Type"];
        newItem.status = item.attributes["Development Status"];
        newItem.reraId = item.attributes["Rera Id"];
        newItem.about = item.attributes["About"];
        newItem.incomeGroup = item.attributes["Income Group"];
        newItem.amenities = item.attributes["amenities"];
        newItem.floorPlan = item.attributes["floor_plan"];
        setTempTypeFilterList((prevData) => [
          ...prevData,
          {
            value: item.attributes["Type"],
            label: item.attributes["Type"] + t("agentBrowseProjects.filterSection.bhkText"),
          },
        ]);
      }
      dispatch(setDummyProjectList(newItem));
    });
  }, [dispatch, schemeData.value, schemeProjectList, t]);

  useEffect(() => {
    console.log("locationProjectList",locationProjectList);
    var temp_loc_arr = [];
    locationProjectList.forEach((item) => {
      console.log("item",item);
      temp_loc_arr.push({ value: item.location_id, label: item.location_name});      
    });
    if(temp_loc_arr.length > 0) {
      //setTempLocFilterList((prevData) => temp_loc_arr);
      setLocationFilterList(temp_loc_arr);
    }
  }, [locationProjectList]);

  /* useEffect(() => {
    dispatch(clearProjectList());
    applicationData.forEach((innerItem, i) => {
      if (!Array.isArray(innerItem.ProjectDetails)) {
        if (
          innerItem.ApplicationStatus != "0" &&
          innerItem.ApplicationStatus != "9"
        ) {
          let newItem = {
            schemeName: schemeData.value,
            schemeId: innerItem.schemeId,
            idlisting: innerItem.ProjectDetails.idlisting,
            projectId: innerItem.ProjectId,
            gps: innerItem.ProjectDetails.gps,
            lat: innerItem.ProjectDetails.lat,
            lng: innerItem.ProjectDetails.lng,
            images: innerItem.ProjectDetails.images,
            location: innerItem.ProjectDetails.address,
          };
          switch (innerItem.ApplicationStatus) {
            case "1":
              newItem.appStatusTxt = "Approved";
              break;
            case "2":
              newItem.appStatusTxt = "Rejected";
              break;
            case "3":
              newItem.appStatusTxt = "Verified";
              break;
            case "4":
              newItem.appStatusTxt = "Winner";
              break;
            case "5":
              newItem.appStatusTxt = "Waiting";
              break;
            case "6":
              newItem.appStatusTxt = "Lost";
              break;
            case "7":
              newItem.appStatusTxt = "";
              break;
            case "8":
              newItem.appStatusTxt = "";
              break;
            case "9":
              newItem.appStatusTxt = "Delete";
              break;
            default:
              newItem.appStatusTxt = "";
              break;
          }
          
          if (innerItem.ProjectDetails.attributes) {
            newItem.title = innerItem.ProjectDetails.attributes["Title"];
            newItem.price = innerItem.ProjectDetails.attributes["Base Price"];
            newItem.carpetArea =
              innerItem.ProjectDetails.attributes["Carpet Area"];
            newItem.bhk = innerItem.ProjectDetails.attributes["Type"];
            newItem.status =
              innerItem.ProjectDetails.attributes["Development Status"];
            newItem.reraId = innerItem.ProjectDetails.attributes["Rera Id"];
            newItem.about = innerItem.ProjectDetails.attributes["About"];
            newItem.incomeGroup =
              innerItem.ProjectDetails.attributes["Income Group"];
            newItem.amenities =
              innerItem.ProjectDetails.attributes["amenities"];
            newItem.floorPlan =
              innerItem.ProjectDetails.attributes["floor_plan"];
            newItem.category = innerItem.ProjectDetails.attributes["Category"];
          }
          dispatch(setDummyProjectList(newItem));
        }
      }
    });
  }, [applicationData, schemeData.value]); */

  // useEffect(() => {
  //   const removeDuplicateLoc = tempLocFilterList.filter((v, i) => {
  //     return tempLocFilterList.map((val) => val.value).indexOf(v.value) === i;
  //   });
  //   setLocationFilterList(removeDuplicateLoc);
  //   const removeDuplicateType = tempTypeFilterList.filter((v, i) => {
  //     return tempTypeFilterList.map((val) => val.value).indexOf(v.value) === i;
  //   });
  //   setTypeFilterList(removeDuplicateType);
  // }, [tempLocFilterList, tempTypeFilterList]);

  const onSubmit = (values, { setSubmitting }) => {
    console.log("requestData11", values);
    setSubmitting(false);
    var location      = values.location;
    var priceRange    = values.priceRange;
    var projectType   = values.projectType;
    if(location    === 'None') location    = "";
    if(priceRange  === 'None') priceRange  = "";
    if(projectType === 'None') projectType = "";
    let params_string = "";
    if(location != "" && location != undefined && location != null)
      params_string += "location=" + location;
    if(priceRange != "" && priceRange != undefined && priceRange != null) {
      if(params_string != "") { params_string += "&"; }
      params_string += "price_range=" + priceRange;
    }
    if(projectType != "" && projectType != undefined && projectType != null) {
      if(params_string != "") { params_string += "&"; }
      params_string += "roomType=" + projectType;
    }
    dispatch(getProjectsData(params_string)).then((resp) => {
      console.log("resp",resp);
    });
  };

  //console.log("locationProjectList",locationProjectList);
  //console.log("schemeProjectList",schemeProjectList);
  return (
    <div>
      <a id="browse-projects" name="browse-projects" href="#">&nbsp;</a> 
      <Typography variant="h6" style={{ marginBottom: 20 }}>{t("agentBrowseProjects.title")}</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, values }) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={1} className={classes.grievanceFilterSec}>
              <Grid item md={3} xs={12}>
                <FormControl
                  control="selectbox"
                  variant="outlined"
                  label={t("agentBrowseProjects.filterSection.locationLabel")}
                  placeholder={t("agentBrowseProjects.filterSection.locationLabel")}
                  name="location"
                  id="location"
                  options={locationFilterList}
                  className={classes.filterInputBox}
                  isNone={true}
                  onChange={(e) => {
                    setFieldValue("location", e.target.value);
                    // if (e.target.value !== "None") {
                    //   setActiveFilter(true);
                    //   setProjectFiltersList([]);
                    //   demoProjectList.forEach((item) => {
                    //     if (e.target.value === item.location) {
                    //       setProjectFiltersList((prevData) => [
                    //         ...prevData,
                    //         item,
                    //       ]);
                    //     }
                    //   });
                    // } else {
                    //   setActiveFilter(false);
                    // }
                  }}
                />
              </Grid>
              {/* <Grid item md={3} xs={12}>
                <FormControl
                  control="selectbox"
                  variant="outlined"
                  label={t("agentBrowseProjects.filterSection.subLocationLabel")}
                  placeholder={t("agentBrowseProjects.filterSection.subLocationLabel")}
                  name="subLocation"
                  id="subLocation"
                  options={locationFilterList}
                  className={classes.filterInputBox}
                />
              </Grid> */}
              <Grid item md={3} xs={12}>
                <FormControl
                  control="selectbox"
                  variant="outlined"
                  label={t("agentBrowseProjects.filterSection.projectTypeLabel")}
                  placeholder={t("agentBrowseProjects.filterSection.projectTypeLabel")}
                  name="projectType"
                  id="projectType"
                  options={projectTypeList}
                  className={classes.filterInputBox}
                  isNone={true}
                  onChange={(e) => {
                    setFieldValue("projectType", e.target.value);
                    // if (e.target.value !== "None") {
                    //   setActiveFilter(true);
                    //   setProjectFiltersList([]);
                    //   demoProjectList.forEach((item) => {
                    //     if (values.location) {
                    //       if (
                    //         e.target.value === item.bhk &&
                    //         values.location === item.location
                    //       ) {
                    //         setProjectFiltersList((prevData) => [
                    //           ...prevData,
                    //           item,
                    //         ]);
                    //       }
                    //     } else {
                    //       if (e.target.value === item.bhk) {
                    //         setProjectFiltersList((prevData) => [
                    //           ...prevData,
                    //           item,
                    //         ]);
                    //       }
                    //     }
                    //   });
                    // } else {
                    //   setActiveFilter(false);
                    // }
                  }}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <FormControl
                  control="selectbox"
                  variant="outlined"
                  label={t("agentBrowseProjects.filterSection.priceRangeLabel")}
                  placeholder={t("agentBrowseProjects.filterSection.priceRangeLabel")}
                  name="priceRange"
                  id="priceRange"
                  options={priceRangeeList}
                  className={classes.filterInputBox}
                  isNone={true}
                  onChange={(e) => {
                    setFieldValue("priceRange", e.target.value);
                    // if (e.target.value !== "None") {
                    //   setActiveFilter(true);
                    //   setProjectFiltersList([]);
                    //   demoProjectList.forEach((item) => {
                    //     if (e.target.value === item.price) {
                    //       setProjectFiltersList((prevData) => [
                    //         ...prevData,
                    //         item,
                    //       ]);
                    //     }
                    //   });
                    // } else {
                    //   setActiveFilter(false);
                    // }
                  }}
                />
              </Grid>
              <Grid item sm={"auto"} xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    >
                    {t("filterSection.filterBtnText",{ns:"AgentApplicationDashboardPageTrans"})}
                  </Button>
                </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {isProjectDataFetching && <Loading isOpen={isProjectDataFetching} />}
      {isProjectDataError && <AlertBox severity="error">{projectDataErrorMessage}</AlertBox>}
      {demoProjectList.length == 0 &&
        <DefaultMessageBox firstLineMsg={t("agentBrowseProjects.firstLineErrorMsg")} secdLineMsg={t("agentBrowseProjects.secondLineErrorMsg")} actionBtnTxt={t("agentBrowseProjects.actionButtonText")} action={() => { console.log("Nothing...") }} />
      }

      {!isActiveFilter && (
        <>
          {demoProjectList.map((item, index) => (
            <React.Fragment key={`Deselected` + index}>
              {!item.isSelected && (
                <ProjectCard
                  key={index}
                  isSelected={item.isSelected}
                  projectDetails={item}
                />
              )}
            </React.Fragment>
          ))}
        </>
      )}
      {isActiveFilter && (
        <>
          {projectFiltersList.map((item, index) => (
            <React.Fragment key={`DeselectedLoc` + index}>
              {!item.isSelected && (
                <ProjectCard
                  key={index}
                  isSelected={item.isSelected}
                  projectDetails={item}
                />
              )}
            </React.Fragment>
          ))}
          {projectFiltersList.length === 0 && (
            <Box textAlign="center" marginY={5}>
              <Typography variant="h6" gutterBottom>
                No Project Data
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* {demoProjectList.map((projectDetails, index) => (
        <Card className={classes.cardRoot} key={index}>
          <div className={classes.cardContainer}>
            <CardMedia
              className={classes.cover}
              image={projectDetails.images[0]}
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <Grid container direction="row" justify="space-between">
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="body2"
                    style={{ color: "#f27807", fontWeight: "bold" }}
                    gutterBottom
                  >
                    {projectDetails.schemeName ? projectDetails.schemeName : "--"}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontWeight: "bold" }}
                    gutterBottom
                  >
                    {projectDetails.title ? projectDetails.title : "--"}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Button
                    type="button"
                    variant="contained"
                    size="small"
                    disableElevation
                    disableFocusRipple
                    disableTouchRipple
                    className={classes.amountView}
                  >
                    ₹ {projectDetails.price ? projectDetails.price : "--"}
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.dataCotainer}>
                <Typography variant="body2" className={classes.wrapIcon}>
                  <LocationOnOutlinedIcon fontSize="small" />
                  &nbsp; {projectDetails.location ? projectDetails.location : "--"}
                </Typography>
                <Typography variant="body2" className={classes.wrapIcon}>
                  <LocalHotelOutlinedIcon fontSize="small" />
                  &nbsp; {projectDetails.bhk ? projectDetails.bhk : "--"} BHK Appartment
                </Typography>
                <Typography variant="body2" className={classes.wrapIcon}>
                  <AssignmentTurnedInOutlinedIcon fontSize="small" />
                  &nbsp; {projectDetails.status ? projectDetails.status : "--"}
                </Typography>
                <Typography variant="body2" className={classes.wrapIcon}>
                  <SquareFootOutlinedIcon fontSize="small" />
                  &nbsp; {projectDetails.carpetArea ? projectDetails.carpetArea : "--"} Sqft
                </Typography>
              </div>
              <div className={classes.chipCotainer}>
                <Box>
                  <Box className={`${classes.chipsUi} filled`}>{projectDetails.category || "--"}</Box>
                  <Box className={classes.chipsUi}>{projectDetails.parking || "--"}</Box>
                  <Box className={classes.chipsUi}>{projectDetails.elevator || "--"}</Box>
                  <Box className={classes.chipsUi}>{projectDetails.cctv || "--"}</Box>
                </Box>
              </div>
              <Divider />
              <Box className={classes.cardFoot}>
                <Button
                  type="button"
                  size="small"
                  color="primary"
                >{t("agentBrowseProjects.viewMoreDetailsBtnTxt")}</Button>
              </Box>
            </div>
          </div>
        </Card>
      ))
      } */}
    </div >
  );
};

export default AgentProjectCard;
