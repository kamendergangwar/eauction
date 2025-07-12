import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Snackbar,
  Zoom,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
/* import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotelOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import SquareFootOutlinedIcon from "@material-ui/icons/SquareFootOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Collapse from "@material-ui/core/Collapse";
import ProjectDetailsTabs from "../ProjectDetailsTabs/ProjectDetailsTabs"; */
import Hidden from "@material-ui/core/Hidden";
// import ProjectDetailsDialogBox from "../ProjectDetailsDialogBox/ProjectDetailsDialogBox";
import CategorySelectionDialogBox from "../../../molecules/DialogBoxes/CategorySelectionDialogBox/CategorySelectionDialogBox";
import SetFlatPerferenceDialogBox from "../../../molecules/DialogBoxes/SetFlatPreferenceDialogBox/SeltFlatPreferenceDialogBox";
import { useSelector, useDispatch } from "react-redux";
/* import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice"; */
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";
/* import {
  // getProjectsData,
  setDummyProjectList,
  projectToggle,
  projectDataSelector,
} from "../../../../redux/features/projectdata/ProjectDataSlice"; */
/* import {
  getApplication,
  editApplication,
  applicationSelector,
  clearApplicationState
} from "../../../../redux/features/application/ApplicationSlice"; */
import {
  ScaleIcon,
  NonCheckOutlinedIcon,
  CheckedOutlinedIcon,
  AmenitiesMoreMenuIcon,
  DeleteIcon,
  RoomTypeIcon,
  UnitTypeIcon,
  WingIcon,
  FloorStepIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import AmenitiesIcon1 from "../../../../assets/amenities/icon1.png";
import AmenitiesIcon2 from "../../../../assets/amenities/icon2.png";
import AmenitiesIcon3 from "../../../../assets/amenities/icon3.png";
import AmenitiesIcon4 from "../../../../assets/amenities/icon4.png";
// import ProjectSelectBtnBg from "../../../../assets/projectSelectBtnBg.png";

import SolarPanelsIcon from "../../../../assets/amenities/icon1.png";
import FootballFieldIcon from "../../../../assets/amenities/icon2.png";
import GarderForSeniorsIcon from "../../../../assets/amenities/icon3.png";
import RainwaterHarvestingIcon from "../../../../assets/amenities/icon4.png";
import CricketGroundIcon from "../../../../assets/amenities/icon5.png";
import ParkingAreaIcon from "../../../../assets/amenities/icon6.png";
import DifferentSpclsTreesIcon from "../../../../assets/amenities/icon7.png";
import BasketBallCourtIcon from "../../../../assets/amenities/icon8.png";
// import FitnessClubIcon from "../../../../assets/amenities/icon9.png";
import FitnessClubIcon from "../../../../assets/amenities/Gym.png";
import CommercialShopsIcon from "../../../../assets/amenities/icon10.png";
import BusTerminusIcon from "../../../../assets/amenities/icon11.png";
import RailwayForcourtIcon from "../../../../assets/amenities/icon12.png";
// import MultipurposeGroundIcon from "../../../../assets/amenities/icon13.png";
import MultipurposeGroundIcon from "../../../../assets/amenities/MultipurposeCourt.png";
import AmphitheaterIcon from "../../../../assets/amenities/Amphitheatre.png";
import LawnIcon from "../../../../assets/amenities/Lawn.png";
import YogaLawnIcon from "../../../../assets/amenities/YogaLawn.png";
import FootballCourtIcon from "../../../../assets/amenities/FootballCourt.png";
import GardenIcon from "../../../../assets/amenities/Garden.png";
import AwaitingAreaIcon from "../../../../assets/amenities/AwaitingArea.png";
import PicnicAreaIcon from "../../../../assets/amenities/PicnicArea.png";
import KidsPlayAreaIcon from "../../../../assets/amenities/KidsPlayArea.png";
import ReflexologyPathwayIcon from "../../../../assets/amenities/ReflexologyPathway.png";
import SandPlayCourtIcon from "../../../../assets/amenities/SandPlayCourt.png";
import ShoppingPlazzaIcon from "../../../../assets/amenities/ShoppingPlazza.png";
import ImageMapper from 'react-img-mapper';
import { Tooltip } from "@material-ui/core";

import LocationImage from "../../../../assets/image_mapping/taloja.jpg";
import TowerImage from "../../../../assets/image_mapping/taloja_towers.jpg";
import pinPng from "../../../../assets/image_mapping/pinPng2.png"
import { Alert } from "@material-ui/lab";



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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
    borderRadius: 5,
    border: 0,
    marginBottom: theme.spacing(2),
  },
  selectedProjectRoot: {
    backgroundColor: "#EAF2FC",
    border: "2px solid #0151CA",
  },
  /* projectCardCont: {
    display: "flex",
    flexWrap: "wrap"
  }, */
  projectCoverImgSec: {
    position: "relative",
    width: 250,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cover: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 200,
    },
  },
  cardContentCont: {
    padding: "0 !important",
    flex: "auto",
  },
  cardHeaderCont: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  schemeNameView: {
    color: "#0151CA",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  schemePriceView: {
    color: "#0151CA",
    fontWeight: "bold",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      color: "#FFFFFF",
      position: "absolute",
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      fontWeight: "bold",
      fontSize: "1.2rem",
      textShadow: "0px 0px 8px rgba(0, 0, 0, 0.6)",
    },
  },
  dividerLine: {
    backgroundColor: "rgba(1, 81, 202, 0.1)",
  },
  dataContainer: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  dataValueViewBox: {
    marginLeft: theme.spacing(1.5),
  },
  scaleIconView: {
    fontSize: "2rem",
  },
  dataTitle: {
    textAlign: "center",
    color: "#65707D",
    fontWeight: 600,
    fontSize: "0.8rem",
  },
  dataValue: {
    textAlign: "center",
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  typeContainer: {
    display: "flex",
  },
  amenitiesIconCont: {
    marginTop: theme.spacing(3),
    "&>.MuiGrid-item": {
      padding: theme.spacing(0, 1),
    },
    "& img": {
      width: 30,
      height: 30,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.9rem",
    },
  },
  amenitiesLabel: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  catChipCont: {
    marginTop: theme.spacing(1.5),
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    "& .MuiChip-root": {
      backgroundColor: "#fff",
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      "& .MuiChip-label": {
        color: "#00437E",
        fontSize: "0.8rem",
        fontWeight: 600,
        padding: theme.spacing(1, 2),
        maxWidth: 350,
      },
      "& .MuiChip-deleteIcon:hover": {
        color: "#FA3D5D",
      },
    },
  },
  selectedCatCont: {
    padding: theme.spacing(0, 2),
  },
  chipsTitle: {
    color: "#65707D",
    fontWeight: 600,
    fontSize: "0.8rem",
    margin: "8px 0 12px",
  },
  popoverMainCont: {
    "& .MuiPopover-paper": {
      width: 300,
      maxWidth: 300,
      padding: theme.spacing(2),
      boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
      borderRadius: 10,
    },
  },
  catChipList: {
    padding: theme.spacing(2),
    listStyle: "none",
    margin: 0,
    "&>li": {
      color: "#00437E",
      whiteSpace: "normal",
      fontWeight: 600,
      fontSize: "0.9rem",
      marginBottom: theme.spacing(2),
      "&>span": {
        color: "#E5E5E5",
        fontWeight: 100,
      },
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
  mobileCheckboxSec: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  interestedTxt: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(5),
    },
  },
  selectProjBtn: {
    marginRight: "5%",
    width: "35%",
    backgroundColor: "transparent",
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      marginRight: "10%",
    },
    "&.MuiButton-contained": {
      background:
        "linear-gradient(326deg, rgb(0 13 199) 0%, rgb(16 147 245) 70%)",
      border: 0,
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1.2),
      fontSize: "2rem",
      fill: "none",
    },
  },
  removeBtn: {
    "& .MuiSvgIcon-root": {
      fill: "rgba(0 0 0 / 26%) !important",
      fontSize: "1rem",
    },
    "&:hover": {
      "& .MuiSvgIcon-root": {
        fill: "#FA3D5D !important",
      },
    },
  },
  selectedDetail: {
    display: "flex",
    alignItems: "center",
    padding: "2px 12px",
    background: "#FFFFFF",
    borderRadius: "40px",
    width: "fit-content",
    color: "#65707D",
    fontWeight: "600",
    fontSize: "12px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    "& span": {
      color: "#00437E",
      fontWeight: "700",
      fontSize: "14px",
    },
  },
  mapTooltip: {
    textAlign: "center",
    position: "absolute",
    color: "#fff",
    padding: "10px",
    background: "rgb(49 113 24 / 91%)",
    transform: "translate3d(-50%, -50%, 0)",
    borderRadius: "5px",
    pointerEvents: "none",
    zIndex: "1000",
    animation: "$pulse 1.5s ease-in-out infinite"
  },
  tooltipTittle: {
    color: "#0038C0",
    fontSize: "0.8rem",
    fontWeight: "700",
  },
  areatooltip: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: "24px",
    border: "5px solid #5494db",
    padding: "10px 15px",
    backgroundColor: "#F7FFF7",
    width: "15vw",
    margin: "2em auto",
    textAlign: "center",
    zIndex: "1000"
  },
  areatooltipLeft: {
    borderRadius: 10,
    border: "2px solid #0151CA",
    position: "absolute",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "10px 15px",
    backgroundColor: "#F7FFF7",
    width: "20vw",
    margin: "2em auto",
    textAlign: "center",
    zIndex: "1000",
    "&:before": {
      content: "",
      position: "absolute",
      display: "block",
      width: "20px",
      left: 3,
      top: "50%",
      border: "15px solid transparent",
      borderLeft: "0",
      borderRight: "15px solid #0151CA",
      transform: "translate(calc(-100% - 5px), -50%)",
      zIndex: "1000"
    }
  },
  areatooltipTop: {
    "&:before": {
      content: '',
      position: 'absolute',
      display: 'block',
      width: '0px',
      left: '50%',
      top: 3,
      border: '15px solid transparent',
      borderTop: '0',
      borderBottom: '15px solid #0151CA',
      transform: 'translate(-50%, calc(-100% - 5px))'
    }
  },
  areatooltipRight: {
    borderRadius: 10,
    border: "2px solid #0151CA",
    position: "absolute",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "10px 15px",
    backgroundColor: "white",
    width: "20vw",
    margin: "2em auto",
    textAlign: "center",
    zIndex: "1000",
    "&:before": {
      content: "''",
      position: 'absolute',
      display: 'block',
      width: '0px',
      right: 3,
      top: '50%',
      border: '15px solid transparent',
      borderRight: '0',
      borderLeft: '15px solid #0151CA',
      transform: 'translate(calc(100% + 5px), -50%)'
    }
  },
  areatooltipBottom: {
    "&:before": {
      content: '',
      position: 'absolute',
      display: 'block',
      width: '0px',
      left: '50%',
      bottom: '0',
      border: '15px solid transparent',
      borderBottom: '0',
      borderTop: '15px solid #5494db',
      transform: 'translate(-50%, calc(100% + 5px))'
    }
  },
  areaPingMarker: {
    position: "absolute",
    pointerEvents: "none",
    zIndex: "1000",

  },
  btnHover: {
    display: "flex",
    position: 'absolute',
    top: '0%',
    zIndex: '1000',
    left: '10px',
    width: "100%",
    justifyContent: "space-between"
    // opacity: '0.5',
    // "&:hover": {
    //   opacity: '1'
    // }
  },
  dataValueView: {
    background: "#EEEEEE",
    padding: "10px",
    margin: "9px 9px 9px 0",
    borderRadius: " 5px"
  },
  highlighted: {
    border: `2px solid ${theme.palette.primary.main}`,
    animation: "$pulse 1.5s ease-in-out infinite"
  },
  "@keyframes pulse": {
    "0%": {
      boxShadow: "0 0 0 0 rgb(11 45 237)"
    },
    "70%": {
      boxShadow: "0 0 0 10px rgba(63, 81, 181, 0)"
    },
    "100%": {
      boxShadow: "0 0 0 0 rgba(63, 81, 181, 0)"
    }
  },
  pinAnimation: {
    height: 45,
    width: 45,
    animation: "$pulse2 1.2s infinite ease-in-out",
  },
  "@keyframes pulse2": {
    "0%": {
      opacity: 1,
      transform: "scale(1)",
    },
    "50%": {
      opacity: 1,
      transform: "scale(1.2)",
    },
  },
  "@keyframes pulse3": {
    "0%": {
      boxShadow: "0 0 0 0 rgb(237 11 11)"
    },
    "70%": {
      boxShadow: "0 0 0 10px rgba(63, 81, 181, 0)"
    },
    "100%": {
      boxShadow: "0 0 0 0 rgba(63, 81, 181, 0)"
    }
  },
  '@keyframes opacity-animation': {
    '0%': {
      opacity: 0,
    },
  },
  '@keyframes live-animation': {
    '0%': {
      transform: 'translate(-50%, -50%) scale(0)',
      opacity: 0.8,
    },
    '70%': {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(3)',
    },
    to: {
      transform: 'translate(-50%, -50%) scale(0)',
      opacity: 0,
    },
  },
  towerStatusTag: {
    pointerEvents: "none",
    position: "absolute",
    display: 'inline-block',
    verticalAlign: '1px',
    width: '15px',
    height: '15px',
    margin: '0 6px',
    background: '#ffdd40',
    color: 'transparent',
    borderRadius: '100%',
    flex: '0 0 auto',
    zIndex: "1000",
    animation: '$opacity-animation 1s linear',
    '&.red': {
      background: '#e60000',
    },
    '&.orange': {
      background: '#ff9900',
    },
    '&.green': {
      background: '#00e600',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      background: '#f9e9a2',
      borderRadius: '100%',
      opacity: 0.5,
      transform: 'translate(-50%,-50%) scale(3)',
      animation: '$live-animation 3s infinite',
    },
  },
  container: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2),
    position: "relative"
  },
}));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const ProjectMap = (props) => {
  const {
    projectDetails,
    afterSelectedCatEvent,
    deSelectingProject,
    setOpenFlatDialog,
    openFlatDialog,
    selectedFlat,
    afterSelectingFlat,
    disabledBtnState,
    allProject
  } = props;
  const classes = useStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();
  // const [expanded, setExpanded] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [openPrefrenceDialog, setOpenPrefrenceDialog] = useState(false);
  const [selecedCategory, setSelecedCategory] = useState([]);
  const [projectDetailsObjct, setProjectDetailsObjct] = useState(null);
  const { height, width } = useWindowDimensions();
  const [towerSelected, setTowerSelected] = useState(1);
  const [showToasterMsg, setShowToasterMsg] = React.useState(false);
  const [toasterMsg, setToasterMsg] = useState("")
  const [showTowerImage, setShowTowerImage] = useState(false);
  const [sectorHoverArea, setSectorHoverArea] = useState("");
  const [towerHoverArea, setTowerHoverArea] = useState("");
  const [dynamicSectorMap, setDynamicSectorMap] = useState();
  const [dynamicTowerMap, setDynamicTowerMap] = useState()
  const [towerImage, setTowerImage] = useState()
  const [tooltip, setTooltip] = useState(null);
  const [towerTooltip, setTowerTooltip] = useState(null)
  const dispatch = useDispatch();
  // const { applicantData } = useSelector(applicantSelector);
  const {
    reservationCategoriesData,
    reservationCategory,
    castCategory,
    isErrorScheme,
  } = useSelector(masterDataSelector);

  const handleClickCategoryList = () => {
    setCategoryModalOpen(true);
  };

  const projectSelection = (value) => {
    setOpenPrefrenceDialog(true);
    if (!value.isSelected) {
      handleClickCategoryList();
    } else {
      var a = [];
      let sessionData = JSON.parse(localStorage.getItem("ReservationCatIds"));

      sessionData?.forEach((item) => a.push(item));

      let count = 0;
      for (var i = 0; i < a.length; i++) {
        if (a[i] === value.castCategory && count == 0) {
          var spliced = a.splice(i, 1);
          count++;
        }
      }

      localStorage.setItem("ReservationCatIds", JSON.stringify(a));

      const requestData = {
        ApplicationId: value.applicationId,
        // SchemeId: value.schemeId,
        // ProjectId: value.projectId,
        // ReservationId: value.castCategory,
        // Type: "Project Details",
        ApplicationStatus: "9",
        Lang: localStorage.getItem("i18nextLng"),
      };
      // deSelectingProject(requestData);
      /* if (value.applicationId) {
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
      } */
    }
  };

  const handleClose = (newValue) => {
    setCategoryModalOpen(false);
    setOpenPrefrenceDialog(false);
    afterSelectingFlat();
    if (newValue) {
      afterSelectedCatEvent(projectDetailsObjct, newValue);
    }
    /* if (newValue) {
      const projectData = {
        ...projectDetails,
        reservationIds: newValue,
        isSelected: true,
      };
      dispatch(projectToggle(projectData));
    } */
  };

  const handleMouseEnter = (area) => {
    const tooltipContent = (
      <span style={{ maxWidth: "20vw" }}>
        <Typography style={{ fontWeight: "700", padding: 5, color: "#00437E", textAlign: "start" }}>{projectDetailsObjct.ProjectName}</Typography>
        <CardMedia className={classes.imgContainer}
          style={{ borderRadius: "5px", maxWidth: 400 }}
          component="img"
          image={projectDetailsObjct?.images[0] || ""}
          alt={"taloja"}
        />
        <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly">
          <Typography className={classes.dataTitle}>
            {/* {t("projectMap.totalUnitsTxt")} */}
            Total Shops
            <br />
            <span className={classes.dataValue}>
              {/* {projectDetailsObjct.No_Of_Units} */}
              124
            </span>
          </Typography>
          <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
          <Typography className={classes.dataTitle}>
            {t("projectCard.legends.available")}
            <br />
            <span className={classes.dataValue} style={{ color: "#0DC143", fontWeight: "900", textShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)" }}>
              {/* {projectDetailsObjct.No_Of_Units_Available} */}
              124
            </span>
          </Typography>
        </Grid>

        {/* <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly" >
          <Typography className={classes.dataTitle}>
            {t("projectCard.numberOfFloors")}
            <br />
            <span className={classes.dataValue}>
              {projectDetailsObjct.No_Of_Floors}
            </span>
          </Typography>
          <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
          <Typography className={classes.dataTitle}>
            {t("projectCard.numberOfTower")}
            <br />
            <span className={classes.dataValue}>
              {projectDetailsObjct.No_Of_Towers}
            </span>
          </Typography>
          <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
          <Typography className={classes.dataTitle}>
            {t("projectCard.typeLabel")}
            <br />
            <span className={classes.dataValue}>
              {projectDetailsObjct.Flat_Type?.map(
                (type, index) => (
                  <>
                    {`${type} ` || "--"}
                    {(index != projectDetailsObjct.Flat_Type.length - 1) && <span>, </span>}

                  </>
                )
              )}
            </span>
          </Typography>
        </Grid> */}
      </span>
    );
    setTooltip({ tooltipContent, coords: area.coords });
  };

  const handleMouseEnterTower = (area) => {
    const tooltipContent = (
      <span style={{ maxWidth: "20vw" }}>
        <Typography style={{ fontWeight: "700", padding: 5, color: "#00437E", textAlign: "start" }}>{area.name}</Typography>
        {area.href != 'NONE' &&
          <CardMedia className={classes.imgContainer}
            style={{ borderRadius: "5px", maxWidth: 400, maxHeight: 150, width: "100%" }}
            component="img"
            image={area.TowerImage || ""}
            alt={"taloja"}
          />}
        <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly">
          {area.href != 'NONE' &&
            <>
              <Typography className={classes.dataTitle}>
                {/* {t("projectMap.totalUnitsTxt")} */}
                Total Shops
                <br />
                <span className={classes.dataValue}>
                  {/* {area.totalFlat} */}
                  8
                </span>
              </Typography>
              <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
            </>}
          <Typography className={classes.dataTitle}>
            {t("projectCard.legends.available")}
            <br />
            <span className={classes.dataValue} style={{ color: "#0DC143", fontWeight: "900", textShadow: "0px 6px 12px rgba(15, 41, 64, 0.06)" }}>
              {/* {area.AvlFlats} */}
              8
            </span>
          </Typography>
        </Grid>
        {/* {area.href != 'NONE' && <Grid container className={classes.dataValueView} alignItems="center" justifyContent="space-evenly" >
          <Typography className={classes.dataTitle}>
            {t("projectCard.numberOfFloors")}
            <br />
            <span className={classes.dataValue}>
              {area.totalFloors}
            </span>
          </Typography>
          <Divider style={{ marginLeft: "3px", marginRight: "3px" }} orientation="vertical" flexItem />
          <Typography className={classes.dataTitle}>
            {t("projectCard.typeLabel")}
            <br />
            <span className={classes.dataValue}>
              {area.FlatTypes?.map(
                (type, index) => (
                  <>
                    {`${type} ` || "--"}
                    {(index != projectDetailsObjct.Flat_Type.length - 1) && <span>, </span>}

                  </>
                )
              )}
            </span>
          </Typography>
        </Grid>
        } */}
      </span>
    );
    setTowerTooltip({ tooltipContent, coords: area.coords });
  }

  useEffect(() => {
    if (projectDetailsObjct) {
      handleMouseEnter(sectorHoverArea);
    }
  }, [projectDetailsObjct]);

  useEffect(() => {
    if (towerHoverArea && dynamicTowerMap && projectDetailsObjct) {
      handleMouseEnterTower(towerHoverArea)
    }
  }, [dynamicTowerMap, towerHoverArea])

  const handleMouseLeave = () => {
    setTooltip(null);
  };
  const sectorClicked = (area) => {
    if (area.href.length) {
      setSectorHoverArea(null);
      setShowTowerImage(true);
    }
    else {
      setToasterMsg(t("Project not activated"))
      setShowToasterMsg(true)
    }

    setTimeout(() => {
      //alert(area);
      document.getElementById('imageMap').scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      //const element = document.getElementById('img-mapper');
      //const y = element.getBoundingClientRect().bottom + window.scrollY;
      // window.scroll({
      //   top: 650,
      //   behavior: 'smooth'
      // });
      //alert('hmmm');
      // window.scroll({
      //   top: 650,
      //   behavior: 'smooth'
      // });
      // console.log("=towerContainerRef=", towerContainerRef);
    }, 100)
  }

  const towerClicked = (area, value) => {
    if (area.href != "NONE") {
      setTowerSelected(area?.name);
      projectSelection(value);
    }
    else if (area.href == "NONE") {
      setToasterMsg(t("projectMap.noFlatTxt"))
      setShowToasterMsg(true)
    }
  }
  const handleAlertClose = () => {
    setShowToasterMsg(false);
  };

  const sectorEnterArea = (area) => {
    setSectorHoverArea(area);
    const temp_project_objt = allProject.filter((project) => project.projectId == area.projectId);
    setProjectDetailsObjct(temp_project_objt[0])
  }
  useEffect(() => {
    if (projectDetailsObjct) {
      const towerImgArray = JSON.parse(projectDetailsObjct.towerImgCordinate);
      const TEMP_TOWER_AREAS_MAP = {
        name: 'Tower_Image',
        areas: towerImgArray.map((tower, index) => ({
          id: tower.id,
          name: tower.name,
          shape: tower.shape,
          coords: JSON.parse(tower.coords),
          preFillColor: tower.preFillColor,
          href: "#"
        }))
      };
      let TEMP_AREAS = [];
      TEMP_TOWER_AREAS_MAP.areas.map((area) => {
        let foundMatch = false;
        Object.keys(projectDetailsObjct.TowerWiseFlatCount).map((key) => {
          if (area.name == key) {
            let tempOBj = {
              id: area.id,
              name: area.name,
              shape: area.shape,
              coords: area.coords,
              preFillColor: area.preFillColor,
              href: "#",
              AvlFlats: projectDetailsObjct.TowerWiseFlatCount[key].AvailableFlat,
              totalFlat: projectDetailsObjct.TowerWiseFlatCount[key].TotalFlats,
              totalFloors: projectDetailsObjct.TowerWiseFlatCount[key].TotalFloors,
              FlatTypes: projectDetailsObjct.TowerWiseFlatCount[key].FlatTypes,
              TowerImage: projectDetailsObjct.TowerWiseFlatCount[key].TowerImage
            }
            TEMP_AREAS.push(tempOBj)
            foundMatch = true;
          }
        });
        if (!foundMatch) {
          let tempObj = {
            id: area.id,
            name: area.name,
            shape: area.shape,
            coords: area.coords,
            preFillColor: "rgb(238, 10, 10, 48%)",
            href: "NONE",
            AvlFlats: 0
          };
          TEMP_AREAS.push(tempObj);
        }
      });
      let FINAL_TOWER_AREA = {
        name: 'Tower_Image',
        areas: TEMP_AREAS
      }
      setDynamicTowerMap(FINAL_TOWER_AREA);
    }
  }, [projectDetailsObjct]);


  //show all project use this
  // useEffect(() => {
  //   if (allProject) {
  //     const TEMP_SECTOR_AREAS_MAP = {
  //       name: 'Sector_Image',
  //       areas: allProject.map((sector, index) => ({
  //         id: `${index + 1}`,
  //         projectId: sector.projectId,
  //         name: sector.ProjectName,
  //         shape: sector.shape,
  //         coords: JSON.parse(sector.mainCordinates),
  //         preFillColor: sector.preFillColor,
  //         href: "#"
  //       }))
  //     }
  //     const TEMP2_SECTOR_AREA_MAP = {
  //       name: 'Sector_Image',
  //       areas: SECTOR_AREAS_MAP.areas.map((sector, index) => ({
  //         id: `${index + 1}`,
  //         projectId: sector.projectId,
  //         name: sector.ProjectName,
  //         shape: sector.shape,
  //         coords: sector.coords,
  //         preFillColor: sector.preFillColor,
  //         href: TEMP_SECTOR_AREAS_MAP.areas.filter((areaObj) => sector.projectId == areaObj.projectId)
  //       }))
  //     }
  //     setDynamicSectorMap(TEMP2_SECTOR_AREA_MAP);   //show all project uncomment this
  //   }
  // }, [allProject]);


  //show only available project comming from api use this
  useEffect(() => {
    if (allProject) {
      const TEMP_SECTOR_AREAS_MAP = {
        name: 'Sector_Image',
        areas: allProject.map((sector, index) => ({
          id: `${index + 1}`,
          projectId: sector.projectId,
          name: sector.ProjectName,
          shape: sector.shape,
          coords: JSON.parse(sector.mainCordinates),
          preFillColor: sector.preFillColor,
          href: "#"
        }))
      }
      setDynamicSectorMap(TEMP_SECTOR_AREAS_MAP);
    }
  }, [allProject]);



  const sectorLeaveArea = (area) => {
    setSectorHoverArea(null);
    setProjectDetailsObjct(null);
    setTooltip(null);
  }

  const towerEnterArea = (area) => {
    setTowerHoverArea(area);
  }

  const towerLeaveArea = (area) => {
    setTowerHoverArea(null);
    setTowerTooltip(null)
  }

  const getTipPosition = (area, x, y) => {
    let x1 = area.coords[0]
    let y1 = area.coords[1]
    let x2 = area.coords[2]
    let y2 = area.coords[3]
    const centerX = (x1 + x2) / 2
    const centerY = (y1 + y2) / 2
    const center = [centerX, centerY]
    if (center) {
      return { top: `${center[1] - x}px`, left: `${center[0] - y}px` };
    }
  }

  function tooltipCenter(coords) {
    const vertices = [];
    for (let i = 0; i < coords.length; i += 2) {
      vertices.push([coords[i], coords[i + 1]]);
    }
    let x = 0;
    let y = 0;
    for (let i = 0; i < vertices.length; i++) {
      x += vertices[i][0];
      y += vertices[i][1];
    }
    x /= vertices.length;
    y /= vertices.length;
    const center = [x, y]
    return { top: `${center[1] - 23}px`, left: `${center[0] - 20}px` };
  }


  const getToolTipPosition = (area) => {
    if (area) {
      if (area.hasOwnProperty('center')) {
        return { top: `${area.center[1] - 180}px`, left: `${area.center[0] - 335}px` };
      }
    }
  }
  // const getToolTipPosition = (area) => {
  //   console.log("area", area, width, height)
  //   if (area) {
  //     if (area.hasOwnProperty('center')) {
  //       const left = area.center[0] - (350);
  //     const top = area.center[1] - (170);

  //     // adjust left and top positions to prevent tooltip from going off-screen
  //     const adjustedLeft = Math.max(Math.min(left, width), 0);
  //     const adjustedTop = Math.max(Math.min(top, height), 0);

  //     return {top: `${adjustedTop}px`, left: `${adjustedLeft}px` };
  //     }
  //   }
  // }

  const getPingPostion = (area) => {
    let imageWidth = width;
    let imageHeight = height
    const minX = Math.min(...area.coords.filter((_, index) => index % 2 === 0));
    const minY = Math.min(...area.coords.filter((_, index) => index % 2 !== 0));

    return { left: `${(minX / imageWidth) * 100}%`, top: `${(minY / imageHeight) * 100}%` }
  }

  const SECTOR_AREAS_MAP = {
    name: 'Sector_Image',
    areas: [
      {
        id: '1',
        name: 'Kharghar East, Sector 28',
        projectId: "26",
        shape: "poly",
        coords: [834, 352, 824, 353, 812, 357, 803, 364, 796, 375, 787, 351, 793, 334, 800, 325, 812, 314, 820, 330],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '2',
        name: 'Kharghar East, Sector 37',
        projectId: "27",
        shape: "poly",
        coords: [692, 511, 684, 494, 719, 471, 738, 507],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '3',
        name: 'Kharghar East, Sector 39',
        projectId: "52",
        shape: "poly",
        coords: [702, 697, 719, 688, 653, 577, 618, 545, 637, 582, 641, 592, 694, 680],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '4',
        name: 'Kharghar East, Sector 31',
        projectId: "23",
        shape: "poly",
        coords: [875, 367, 887, 380, 897, 390, 903, 399, 914, 394, 910, 378, 914, 374, 922, 374, 925, 390, 936, 387, 949, 387, 960, 387, 959, 374, 958, 360, 956, 347, 934, 351, 917, 355, 898, 360],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      // {
      //   id: '5',
      //   name: 'Kharghar East, Sector 29',
      //   projectId: "22",
      //   shape: "poly",
      //   coords: [869, 353, 858, 338, 840, 347, 827, 325, 857, 311, 900, 299, 912, 287, 944, 267, 997, 260, 979, 310, 961, 307, 944, 311, 950, 334, 929, 334, 906, 338, 886, 345],
      //   preFillColor: "rgba(0, 0, 0, 0.1)",
      //   href: "#"
      // }
    ]
  };

  const TOWER_AREAS_MAP37 = {
    name: 'Tower_Image',
    areas: [
      {
        id: '1',
        name: "LA-01",
        shape: "rect",
        coords: [329, 121, 476, 265],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '2',
        name: "LA-02",
        shape: "rect",
        coords: [475, 241, 623, 389],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '3',
        shape: "rect",
        name: "LA-03",
        coords: [696, 242, 844, 390],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '4',
        name: "LA-04",
        shape: "rect",
        coords: [845, 113, 993, 261],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      }
    ]
  };

  const SECTOR39_blockwise_AREAS_MAP = {
    name: 'Tower_Image',
    areas: [
      {
        id: '1',
        name: "Block 1",
        shape: "poly",
        coords: [263, 265, 263, 344, 455, 354, 454, 250],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '2',
        name: "Block 2",
        shape: "poly",
        coords: [464, 249, 464, 351, 625, 364, 631, 236],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '3',
        shape: "poly",
        name: "Block 3",
        coords: [641, 236, 634, 365, 808, 370, 813, 219, 788, 232],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '4',
        name: "BLock 4",
        shape: "poly",
        coords: [823, 215, 819, 368, 1106, 375, 1110, 131, 952, 155],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '5',
        name: "Block 4",
        shape: "poly",
        coords: [1123, 129, 1116, 374, 1273, 382, 1266, 112],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      }
    ]
  };

  const TOWER_AREAS_MAP39 = {
    name: 'Tower_Image',
    areas: [
      {
        id: '1',
        name: 'EB-01',
        shape: 'poly',
        coords: [53, 325, 55, 349, 89, 347, 86, 322],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '2',
        name: 'EB-02',
        shape: 'poly',
        coords: [96, 324, 99, 346, 130, 343, 127, 321],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '3',
        name: 'EB-03',
        shape: 'poly',
        coords: [133, 318, 136, 343, 168, 340, 167, 316],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '4',
        name: 'EB-04',
        shape: 'poly',
        coords: [174, 315, 175, 339, 206, 336, 205, 314],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '5',
        name: 'EB-05',
        shape: 'poly',
        coords: [212, 311, 212, 336, 247, 335, 247, 309],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '6',
        name: 'EB-06',
        shape: 'poly',
        coords: [271, 305, 271, 330, 308, 328, 307, 301],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '7',
        name: 'EB-07',
        shape: 'poly',
        coords: [311, 301, 312, 327, 346, 323, 344, 298],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '8',
        name: 'EB-08',
        shape: 'poly',
        coords: [351, 298, 353, 323, 386, 320, 383, 295],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '9',
        name: 'EB-09',
        shape: 'poly',
        coords: [389, 295, 390, 319, 424, 316, 421, 292],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '10',
        name: 'EB-10',
        shape: 'poly',
        coords: [427, 291, 430, 316, 467, 315, 464, 288],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '11',
        name: 'EB-11',
        shape: 'poly',
        coords: [489, 286, 489, 311, 525, 311, 523, 284],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '12',
        name: 'EB-12',
        shape: 'poly',
        coords: [530, 284, 530, 311, 564, 310, 563, 284],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '13',
        name: 'EB-13',
        shape: 'poly',
        coords: [570, 283, 571, 310, 602, 308, 602, 282],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '14',
        name: 'EB-14',
        shape: 'poly',
        coords: [608, 283, 609, 308, 642, 307, 642, 282],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '15',
        name: 'EB-15',
        shape: 'poly',
        coords: [761, 268, 761, 292, 795, 292, 795, 269],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '16',
        name: 'EB-29',
        shape: 'poly',
        coords: [1024, 318, 1025, 355, 1051, 355, 1051, 320],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '17',
        name: 'EB-35',
        shape: 'poly',
        coords: [757, 371, 757, 393, 791, 395, 791, 371],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '18',
        name: 'EB-41',
        shape: 'poly',
        coords: [390, 359, 387, 385, 423, 386, 424, 361],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '19',
        name: 'EB-42',
        shape: 'poly',
        coords: [352, 357, 349, 381, 382, 384, 383, 358],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '20',
        name: 'EB-43',
        shape: 'poly',
        coords: [312, 354, 311, 380, 344, 382, 345, 356],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '21',
        name: 'EB-44',
        shape: 'poly',
        coords: [271, 351, 269, 377, 307, 380, 308, 353],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '22',
        name: 'EC-01',
        shape: 'poly',
        coords: [666, 304, 648, 304, 648, 281, 689, 281, 689, 327, 666, 327],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '23',
        name: 'EC-02',
        shape: 'poly',
        coords: [713, 309, 713, 266, 754, 266, 754, 289, 734, 287, 734, 309],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '24',
        name: 'EC-03',
        shape: 'poly',
        coords: [1028, 293, 1010, 293, 1010, 271, 1051, 273, 1051, 314, 1028, 314],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
      {
        id: '25',
        name: 'EC-11',
        shape: 'poly',
        coords: [711, 392, 711, 350, 731, 350, 731, 373, 751, 373, 751, 394],
        preFillColor: 'rgba(0, 0, 0, 0.1)',
        href: '#'
      },
    ]
  };

  const SECTOR_26_TOWER_MAP = {
    name: 'Tower_Image',
    areas: [
      {
        id: '1',
        name: 'EA01',
        shape: "poly",
        coords: [477, 228, 544, 228, 546, 289, 477, 289],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '2',
        name: 'EA02',
        shape: "poly",
        coords: [549, 179, 549, 240, 618, 238, 617, 178],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '3',
        name: 'EA03',
        shape: "poly",
        coords: [621, 189, 621, 128, 687, 128, 689, 190],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '4',
        name: 'EA04',
        shape: "poly",
        coords: [692, 139, 692, 77, 761, 77, 762, 139],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '5',
        name: 'EA05',
        shape: "poly",
        coords: [819, 129, 837, 61, 897, 77, 878, 146],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '6',
        name: 'EA06',
        shape: "poly",
        coords: [849, 210, 867, 147, 926, 163, 909, 227],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '7',
        name: 'EA07',
        shape: "poly",
        coords: [878, 293, 897, 228, 956, 244, 939, 310],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '8',
        name: 'EA08',
        shape: "poly",
        coords: [823, 405, 842, 347, 905, 366, 890, 425],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '9',
        name: 'EA09',
        shape: "poly",
        coords: [740, 432, 757, 374, 822, 393, 803, 451],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '10',
        name: 'EA10',
        shape: "poly",
        coords: [658, 459, 675, 401, 738, 420, 721, 478],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
      {
        id: '11',
        name: 'EA11',
        shape: "poly",
        coords: [573, 486, 590, 428, 655, 447, 638, 506],
        preFillColor: "rgba(0, 0, 0, 0.1)",
        href: "#"
      },
    ]
  }

  const towerMapLoaded = (obj) => {
    // console.log(obj);
    // console.log(ImageMapper);
  }

  const backToLocationsMap = () => {
    setShowTowerImage(false);
  }

  const sectorOnload = () => {
    document.getElementById('imageMap').scrollIntoView({ behavior: "smooth", block: "center", inline: "center", })
  }

  const towerOnload = () => {
    //document.getElementById('imageMap').scrollIntoView({ behavior: "smooth", block: "center"})
  }

  const sectorContainerRef = useRef();
  const towerContainerRef = useRef();

  const dc_date = new Date();
  const dc_time = dc_date.getTime();
  return (
    <>
      <Snackbar open={showToasterMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="warning" sx={{ width: '100%' }}>
          {toasterMsg}
        </Alert>
      </Snackbar>
      {allProject && (
        <div id="imageMap" style={{ position: "relative", width: "100%" }}>

          {!showTowerImage && (
            <ImageMapper onLoad={() => sectorOnload()} areaClass={classes.highlighted} containerRef={sectorContainerRef} lineWidth={2} strokeColor={"#0151CA"} src={LocationImage} map={dynamicSectorMap} natural={true} responsive={false} parentWidth={1300} fillColor="#ffff005c" onClick={area => sectorClicked(area)} onMouseEnter={area => { sectorEnterArea(area) }} onMouseLeave={area => { sectorLeaveArea(area); handleMouseLeave(area) }} />
          )}
          {
            !showTowerImage && <div style={{ position: 'fixed', top: '14.5%', zIndex: '1000', left: '1vw', background: "yellow", padding: 5, borderRadius: 5, border: "2px solid black" }}>
              <Typography style={{ fontWeight: "700" }} >{t("projectMap.clickLocationTxt")}</Typography>
            </div>
          }
          {
            (!showTowerImage && dynamicSectorMap) && dynamicSectorMap.areas.map((area) => {
              return <span style={{ ...tooltipCenter(area.coords) }} className={classes.areaPingMarker}>
                <img src={pinPng} className={classes.pinAnimation} width="70" height="70" alt="pin" />
              </span>
            })
          }
          {
            (tooltip && projectDetailsObjct && !showTowerImage && (
              <CustomTooltip
                title={tooltip.tooltipContent}
                TransitionComponent={Zoom}
                open={Boolean(tooltip)}
                leaveDelay={300}
                arrow
                placement={projectDetailsObjct.ProjectId == 52 ? "top" : "left"}
              >
                <span
                  style={{
                    position: "absolute",
                    top: tooltip.coords[1],
                    left: tooltip.coords[0],
                    zIndex: 9999,
                  }}
                />
              </CustomTooltip>
            ))
          }
          {showTowerImage && projectDetailsObjct && (
            <ImageMapper id="imageMapTower" onLoad={() => towerOnload()} containerRef={towerContainerRef} lineWidth={2} strokeColor={"blue"} src={projectDetailsObjct.towerImg} map={dynamicTowerMap} natural={true} responsive={false} parentWidth={1052} fillColor="rgba(0, 0, 0, 0.1)" onClick={area => towerClicked(area, projectDetailsObjct)} width={1000} onMouseEnter={area => towerEnterArea(area)} onMouseLeave={area => towerLeaveArea(area)} />
          )}
          {
            dynamicTowerMap && showTowerImage && projectDetailsObjct.ProjectId != 52 &&
            dynamicTowerMap.areas.map((area) => {
              return <span className={classes.mapTooltip}
                style={{ ...getTipPosition(area, 0, 0), background: area.href == "NONE" ? "rgb(120 31 31 / 91%)" : "" }}>
                <span>{area && area.name}</span>
                {/* <br />
                <span>Available Flats</span>
                <br />
                <span>{area && area.AvlFlats}</span> */}
              </span>
            })
          }
          {
            dynamicTowerMap && showTowerImage && projectDetailsObjct.ProjectId == 52 &&
            dynamicTowerMap.areas.map((area) => {
              return <span className={`${classes.towerStatusTag} ${area.href == "NONE" ? 'red' : 'green'}`}
                style={{ ...getTipPosition(area, 7, -3), background: area.href == "NONE" ? "rgb(120 31 31 / 91%)" : "" }}>
              </span>
            })
          }
          {
            (towerTooltip && dynamicTowerMap && showTowerImage && (
              <CustomTooltip
                title={towerTooltip.tooltipContent}
                TransitionComponent={Zoom}
                open={Boolean(towerTooltip)}
                leaveDelay={300}
                arrow
                placement={projectDetailsObjct.ProjectId == 26 ? "top" : "left"}
              >
                <span
                  style={{
                    position: "absolute",
                    top: towerTooltip.coords[1],
                    left: towerTooltip.coords[0],
                    zIndex: 9999,
                  }}
                />
              </CustomTooltip>
            ))
          }
          {/* {
            showTowerImage && <div style={{ position: 'fixed', top: '12.5%', zIndex: '1000', left: '70%', background: "yellow", padding: 3, borderRadius: 5, border: "2px solid black" }}>
              <Typography style={{ fontWeight: "700" }} >{t("projectMap.clickTowerTxt")}</Typography>
            </div>
          } */}
          {/* {projectDetailsObjct && showTowerImage && <div style={{ position: 'absolute', top: '6.5%', zIndex: '1000', left: '42%', background: "#0038C0", padding: 10, borderRadius: 5,color:"white" }}>
            </div>
          } */}
          {
            showTowerImage && projectDetailsObjct && <span className={classes.btnHover}>
              <Button startIcon={<ArrowBackIcon />} onClick={() => { backToLocationsMap(); setProjectDetailsObjct(null); setTooltip(null) }} variant="contained" color="primary">{t("projectMap.backLocationBtn")}</Button>
              <Typography style={{ fontWeight: "700", fontSize: "1.2rem", background: "#0038C0", padding: 10, borderRadius: 5, color: "white" }} >{projectDetailsObjct.ProjectName}</Typography>
              <Typography style={{ fontWeight: "700", background: "yellow", padding: 3, borderRadius: 5, border: "2px solid black", marginRight: 25, height: 35 }} >{t("projectMap.clickTowerTxt")}</Typography>
            </span>
          }
        </div >
      )}
      {
        categoryModalOpen && (
          <CategorySelectionDialogBox
            classes={{
              paper: classes.paper,
            }}
            id="ringtone-menu"
            keepMounted
            open={categoryModalOpen}
            onClose={handleClose}
            projectobj={projectDetailsObjct}
            categoryList={projectDetailsObjct.catForSelect}
          />
        )
      }

      {
        openPrefrenceDialog && (
          <SetFlatPerferenceDialogBox
            open={openPrefrenceDialog}
            onClose={handleClose}
            projectDetails={projectDetailsObjct}
            selectedFlat={selectedFlat}
            TowerSelected={towerSelected}
          />
        )
      }
    </>
  );
};

export default ProjectMap;
