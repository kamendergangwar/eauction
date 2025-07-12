import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
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
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@material-ui/core";
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
  ExpandImgIcon,
  RupeePriceIcon,
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
import FlatImagesViewBox from "../../../molecules/DialogBoxes/SetFlatPreferenceDialogBox/FlatImagesViewBox/FlatImagesViewBox";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(1, 81, 202, 0.1)",
    borderRadius: 5,
    marginBottom: theme.spacing(2),
    border: "1px solid #0151CA"
  },
  selectedProjectRoot: {
    backgroundColor: "#eaf2fc42",
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
  selectedImageCon: {

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
    color: "#65707D",
    fontWeight: 600,
    fontSize: "0.8rem",
  },
  dataValue: {
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
  selectedChip: {
    "& .MuiChip-outlined": {
      backgroundColor: "rgba(33, 150, 83, 0.1);",
      border: "1px solid rgba(33, 150, 83, 0.12)",
      "& .MuiChip-label": {
        color: "#039824",
        fontSize: "0.8rem",
        fontWeight: 600,
        padding: theme.spacing(1, 2),
      },
    },
  },
  selectedCatCont: {
    padding: theme.spacing(0, 1, 0, 0),
    marginRight: 20
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
    marginRight: "6.5%",
    width: "20%",
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
  projectDetailsCon: {
    margin: 15,
    background: "#0038c00f",
    borderRadius: 5,
    padding: 10,
    border: "1px solid rgb(1 81 202 / 17%)",
  },
  selectedProjectDetailCon: {
    margin: 15,
    background: "#0038c005",
    borderRadius: 5,
    padding: 10,
    border: "1px solid rgb(1 81 202 / 17%)",
  },
  mainDetailCon: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },
  },
  imgContainer: {
    cursor: "pointer",
    "&:hover $imageBoxHover": {
      visibility: "visible"
    }
  },
  imageBoxHover: {
    visibility: "hidden",
    "& .MuiImageListItemBar-title": {
      fontSize: "0.8rem"
    },
  },
  planImages: {
    border: "1px solid rgba(101, 112, 125, 0.4)",
    borderRadius: "10px",
    width: 220,
    height: 107,
    objectFit: "contain"
  }
}));

const ProjectCard = (props) => {
  const {
    projectDetails,
    afterSelectedCatEvent,
    deSelectingProject,
    setOpenFlatDialog,
    openFlatDialog,
    selectedFlat,
    afterSelectingFlat,
    disabledBtnState,
    isFlatSelected,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const history = useHistory();
  // const [expanded, setExpanded] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [openPrefrenceDialog, setOpenPrefrenceDialog] = useState(false);
  const [selecedCategory, setSelecedCategory] = useState([]);
  const [projectDetailsObjct, setProjectDetailsObjct] = useState();
  const [showPlanImage, setshowPlanImage] = React.useState(false);
  const [imgCarouselPos, setImgCarouselPos] = React.useState(1);
  const [imgCarouselType, setImgCarouselType] = React.useState("");
  const [curImg, setCurImg] = React.useState("")
  const [value, setValue] = React.useState(0);
  const [selectedUnit, setSelectedUnit] = React.useState([]);
  const [selectedFloor, setSelectedFloor] = React.useState();
  const [commonPlanImg, setCommonPlanImg] = useState("");
  const [PlanImageType, setPlanImageType] = React.useState([]);
  const dispatch = useDispatch();
  // const { applicantData } = useSelector(applicantSelector);
  const {
    reservationCategoriesData,
    reservationCategory,
    castCategory,
    isErrorScheme,
  } = useSelector(masterDataSelector);
  const [moreAmtsIs, setMoreAmtsIs] = useState(false);
  // const { isSuccessReqEditApplication } = useSelector(applicationSelector);
  // const { schemeData, schemeProjectList, isSchemeFetching, isSchemeSuccess } = useSelector(projectDataSelector);
  // const [catMoreChipAnchorEl, setCatMoreChipAnchorEl] = useState(null);

  /* const moreChipPopoverHandleClick = (event) => {
    setCatMoreChipAnchorEl(event.currentTarget);
  };
  const moreChipPopoverHandleClose = () => {
    setCatMoreChipAnchorEl(null);
  }; */

  // const catMoreChipOpenIs = Boolean(catMoreChipAnchorEl);
  // const catMoreChipPopId = catMoreChipOpenIs ? 'simple-cat-popover' : undefined;

  const selectedFlatImg = (type, index, form) => {
    setPlanImageType(type);
    setshowPlanImage(true);
    setImgCarouselPos(index);
    setImgCarouselType(form);
  }
  useEffect(() => {
    if (projectDetails) {
      let amnts_list = projectDetails.amenities;
      // let amnts_list = projectDetails.amenitiesEnglish;
      let amnts_new_list = [];
      for (let i = 0; i < amnts_list?.length; i++) {
        const element = amnts_list[i];
        let icon_url = "";
        switch (element) {
          case "Amphitheater":
          case "अँफिथिएटर":
          case "एम्फ़ीथिएटर":
            icon_url = AmphitheaterIcon;
            break;
          case "Basketball Court":
          case "बास्केटबॉल कोर्ट":
            icon_url = BasketBallCourtIcon;
            break;
          case "Cricket Pitch":
          case "क्रिकेट खेळपट्टी":
          case "क्रिकेट पिच":
            icon_url = CricketGroundIcon;
            break;
          case "Lawn":
          case "हिरवळ":
          case "हरियाली":
            icon_url = LawnIcon;
            break;
          case "Yoga Lawn":
          case "योगा लॉन":
            icon_url = YogaLawnIcon;
            break;
          case "Football Field":
          case "फुटबॉल मैदान":
            icon_url = FootballFieldIcon;
            break;
          case "Solar Panels":
          case "सौरपत्रे":
          case "सौर पेनल्स":
            icon_url = SolarPanelsIcon;
            break;
          case "Football Ground":
          case "फुटबाल मैदान":
            icon_url = FootballCourtIcon;
            break;
          case "Garden":
          case "उद्यान":
            icon_url = GardenIcon;
            break;
          case "Multipurpose Court":
          case "बहुउद्देशीय मैदान":
            icon_url = MultipurposeGroundIcon;
            break;
          case "Seating Area":
          case "बसायची जागा":
          case "बैठने की जगह":
            icon_url = AwaitingAreaIcon;
            break;
          case "Outdoor Gym":
          case "आउटडोर जिम":
            icon_url = FitnessClubIcon;
            break;
          case "Picnic Area":
            icon_url = PicnicAreaIcon;
            break;
          case "Kids Play Area":
          case "लहान मुलांचे क्रीडांगण":
          case "किड्स प्ले एरिया":
            icon_url = KidsPlayAreaIcon;
            break;
          case "Reflexology Pathway":
          case "रिफ्लेक्सोलॉजी रास्ता":
          case "रिफ्लेक्सोलॉजी पायवाट":
            icon_url = ReflexologyPathwayIcon;
            break;
          case "Sand Play Court":
            icon_url = SandPlayCourtIcon;
            break;
          case "Shopping Plaza":
          case "खरेदी संकुल":
          case "खरीदारी प्लाजा":
            icon_url = ShoppingPlazzaIcon;
            break;
          case "Fitness Center":
          case "स्वास्थ्य केंद्र":
          case "फिटनेस सेंटर":
            icon_url = FitnessClubIcon;
            break;
          case "Parking":
          case "पार्किंग":
            icon_url = ParkingAreaIcon;
            break;
          case "Garden for Seniors":
          case "ज्येष्ठांसाठी बाग":
          case "वरिष्ठों के लिए उद्यान":
            icon_url = GarderForSeniorsIcon;
            break;
          default:
            icon_url = "";
            break;
        }
        let new_obj = {
          name: element,
          icon: icon_url,
        };
        amnts_new_list.push(new_obj);
      }
      if (amnts_new_list.length > 4) {
        setMoreAmtsIs(true);
        amnts_new_list = amnts_new_list.slice(0, 4);
      } else {
        setMoreAmtsIs(false);
      }
      let new_obj = {
        ...projectDetails,
        amenitiesList: amnts_new_list,
      };
      setProjectDetailsObjct(new_obj);
    }
  }, [projectDetails]);

  const handleClickCategoryList = () => {
    setCategoryModalOpen(true);
  };

  /* useEffect(() => {
    console.log("reservationCategoriesData", reservationCategoriesData);
  }, [reservationCategoriesData]); */

  /* useEffect(() => {
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
  }, [projectDetails.reservationIds, reservationCategoriesData]); */

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
      afterSelectedCatEvent(projectDetails, newValue);
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

  // const deselectProject = () => {
  //   const projectData = {
  //     ...projectDetails,
  //     reservationIds: [],
  //     isSelected: false,
  //   };
  //   dispatch(projectToggle(projectData));
  // };

  const handleExpandClick = () => {
    // setExpanded(!expanded);
    localStorage.setItem("projectDetailsObj", JSON.stringify(projectDetails));
    history.push("/project-details");
  };

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e5)
      return +(n / 1e3).toFixed(2) + " " + t("projectCard.kTxt"); //" K";
    if (n >= 1e5 && n < 1e7)
      return +(n / 1e5).toFixed(2) + " " + t("projectCard.lackTxt"); //" L";
    if (n >= 1e7 && n < 1e9)
      return +(n / 1e7).toFixed(2) + " " + t("projectCard.crkTxt"); //" Cr";
  };

  const categoryTag = (id) => {
    let catName = "";
    for (let i = 0; i < reservationCategoriesData.length; i++) {
      const element = reservationCategoriesData[i];
      if (element.ResrevationCatId === id) {
        catName = element.ReservationCategoryName;
      }
    }
    return <Chip label={catName} />;
    /* let categoryArray = categoryData.split(',');
    return <div>
      <Chip label={categoryArray[4]} />
      <Chip label={categoryArray[5]} />
      <Button
        onClick={moreChipPopoverHandleClick}
        aria-describedby={catMoreChipPopId}
      >
        +3 {t("projectCard.moreBtnLabel")}
      </Button>
      <Popover id={catMoreChipPopId}
        open={catMoreChipOpenIs}
        anchorEl={catMoreChipAnchorEl}
        onClose={moreChipPopoverHandleClose}
        className={classes.popoverMainCont}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <ul className={classes.catChipList}>
          {categoryArray.map(url => (
            <li>{url}</li>
          ))}
        </ul>
      </Popover>
    </div>; */
  };

  const handleDelete = (item) => {
    const requestData = {
      ApplicationId: item.ApplicationId,
      ApplicationStatus: "9",
      Type: "Project Details",
    };
    deSelectingProject(requestData);
  };

  const editSelectedCategoryList = (item) => {
    handleClickCategoryList();
  };

  return (
    <div style={{ padding: "0 16px" }}>
      {projectDetailsObjct?.title && (
        <Card
          className={clsx(classes.root, {
            [classes.selectedProjectRoot]: projectDetailsObjct.isSelected,
          })}
          variant="outlined"
        >
          <Grid container>
            <Grid item md="auto" xs={12}>
              <div className={classes.projectCoverImgSec}>
                {projectDetailsObjct?.title && (
                  <CardMedia
                    component="img"
                    className={classes.cover}
                    // image={Image}
                    image={projectDetailsObjct?.images[0]}
                    title={projectDetailsObjct.title}
                    referrerPolicy="no-referrer"
                  />
                )}
                {/* <Hidden mdUp>
                  <Typography className={classes.schemePriceView}>₹{" "}{formatCash(projectDetailsObjct.price)}</Typography>
                </Hidden> */}
              </div>
            </Grid>
            <Grid item md xs={12}>
              <CardContent className={classes.cardContentCont}>
                <Box className={classes.cardHeaderCont}>
                  <Grid container justify="space-between">
                    <Grid container justifyContent="space-between" xs={12} md="auto">
                      <Typography
                        variant="body2"
                        className={classes.schemeNameView}
                      >
                        {projectDetailsObjct.title}
                      </Typography>
                      {projectDetailsObjct.isSelected == true && <div className={classes.selectedChip}>
                        <Chip
                          label={t("projectCard.selectedChip")}
                          variant="outlined"
                        />
                      </div>}
                    </Grid>
                    {/* <Hidden smDown>
                      <Grid item xs={12} md="auto">
                        <Typography className={classes.schemePriceView}>₹{" "}{formatCash(projectDetailsObjct.price)}</Typography>
                      </Grid>
                    </Hidden> */}
                  </Grid>
                </Box>
                <Divider className={classes.dividerLine} />

                <div className={classes.dataContainer}>
                  <Grid container spacing={1} className={classes.mainDetailCon} justify="space-between">
                    <Grid item xs={12} md={projectDetailsObjct.isSelected == true ? 6 : 12} >
                      {selectedFlat != undefined &&
                        projectDetailsObjct.isSelected == true &&
                        projectDetailsObjct.ProjectId ==
                        selectedFlat[0].ProjectId ?
                        <>
                          {selectedFlat.map((item) => (
                            <>
                              {/* <Typography className={classes.chipsTitle}>
                                {t("projectCard.selectedPreferencesText")}
                              </Typography> */}
                              <Grid container alignItems="center" style={{ margin: 0 }} justifyContent="space-between" className={classes.selectedProjectDetailCon}>
                                <Grid item>
                                  <Grid container alignItems="center">
                                    <UnitTypeIcon className={classes.scaleIconView} />
                                    <Box className={classes.dataValueViewBox}>
                                      <Typography className={classes.dataTitle}>
                                        {t("projectCard.unitNo")}
                                      </Typography>
                                      <Typography className={classes.dataValue}>
                                        {item.FlatNo}{" "}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid container alignItems="center">
                                    <RoomTypeIcon className={classes.scaleIconView} />
                                    <Box className={classes.dataValueViewBox}>
                                      <Typography className={classes.dataTitle}>
                                        {t("projectCard.typeLabel")}
                                      </Typography>
                                      <Typography className={classes.dataValue}>
                                        {item.flat_type}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid container alignItems="center">
                                    <FloorStepIcon className={classes.scaleIconView} />
                                    <Box className={classes.dataValueViewBox}>
                                      <Typography className={classes.dataTitle}>
                                        {t("projectCard.floorNo")}
                                      </Typography>
                                      <Typography className={classes.dataValue}>
                                        {item.FloorNo}{" "}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid container alignItems="center">
                                    <ScaleIcon className={classes.scaleIconView} />
                                    <Box className={classes.dataValueViewBox}>
                                      <Typography className={classes.dataTitle}>
                                        {t("projectCard.carpetAreaLabel")}
                                      </Typography>
                                      <Typography className={classes.dataValue}>
                                        {item.CarpetArea}{" "}
                                        {t("projectCard.sqftText")}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid container alignItems="center">
                                    <WingIcon className={classes.scaleIconView} />
                                    <Box className={classes.dataValueViewBox}>
                                      <Typography className={classes.dataTitle}>
                                        {t("projectCard.towerNo")}
                                      </Typography>
                                      <Typography className={classes.dataValue}>
                                        {item.Wing}{" "}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid container alignItems="center">
                                    <RupeePriceIcon className={classes.scaleIconView} />
                                    <Box className={classes.dataValueViewBox}>
                                      <Typography className={classes.dataTitle}>
                                        {t("projectCard.unitPriceLabel")}
                                      </Typography>
                                      <Typography className={classes.dataValue}>
                                        {/* ₹ {item.Cost}{" "} */}
                                        ₹ {"xxxxx"}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </>
                          ))}
                        </> :
                        <>
                          <Grid container xs={11} alignItems="center" justifyContent="space-between" className={classes.projectDetailsCon}>
                            <Grid item>
                              <Grid container alignItems="center">
                                <Grid item>
                                  <RoomTypeIcon
                                    className={classes.scaleIconView}
                                  />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("projectCard.typeLabel")}
                                    </Typography>
                                    <Box className={classes.typeContainer}>
                                      {projectDetailsObjct.Flat_Type?.map(
                                        (type, index) => (
                                          <>
                                            <Typography
                                              className={classes.dataValue}
                                            >
                                              {type || "--"}
                                            </Typography>
                                            {(index != projectDetailsObjct.Flat_Type.length - 1) && <Divider style={{ marginLeft: "8px", marginRight: "8px" }} orientation="vertical" flexItem />}
                                          </>
                                        )
                                      )}
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item >
                              <Grid container alignItems="center">
                                <Grid item>
                                  <ScaleIcon
                                    className={classes.scaleIconView}
                                  />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("projectCard.carpetAreaLabel")}
                                    </Typography>
                                    <Typography className={classes.dataValue}>
                                      {projectDetailsObjct.carpetArea || "--"}{" "}
                                      {t("projectCard.sqftText")}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item >
                              <Grid container alignItems="center">
                                <Grid item>
                                  <UnitTypeIcon
                                    className={classes.scaleIconView}
                                  />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("projectCard.numberOfUnits")}
                                    </Typography>
                                    <Typography className={classes.dataValue}>
                                      {projectDetailsObjct.No_Of_Units || "--"}{" "}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item >
                              <Grid container alignItems="center">
                                <Grid item>
                                  <WingIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("projectCard.numberOfTower")}
                                    </Typography>
                                    <Typography className={classes.dataValue}>
                                      {projectDetailsObjct.No_Of_Towers || "--"}{" "}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item >
                              <Grid container alignItems="center">
                                <Grid item>
                                  <FloorStepIcon className={classes.scaleIconView} />
                                </Grid>
                                <Grid item>
                                  <Box className={classes.dataValueViewBox}>
                                    <Typography className={classes.dataTitle}>
                                      {t("projectCard.numberOfFloors")}
                                    </Typography>
                                    <Typography className={classes.dataValue}>
                                      {projectDetailsObjct.No_Of_Floors || "--"}{" "}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid></>}
                      <Grid container className={classes.catChipCont}>
                        <Grid className={classes.selectedCatCont}>
                          {projectDetailsObjct.applicantCategory != undefined && (
                            <Typography className={classes.chipsTitle}>
                              {t("projectCard.appliedUnderCategories")}
                            </Typography>
                          )}
                          {projectDetailsObjct.applicantCategory != undefined && (
                            <>
                              {projectDetailsObjct.applicantCategory.map(
                                (categories) => (
                                  <>
                                    <Chip
                                      label={categories.name}
                                      key={categories.id}
                                      variant="outlined"
                                    // onDelete={() => handleDelete(categories)}
                                    />
                                  </>
                                )
                              )}
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Divider style={{ marginLeft: "8px", marginRight: "8px" }} orientation="vertical" flexItem /> */}
                    <Grid xs={12} md={6}>
                      {selectedFlat != undefined &&
                        projectDetailsObjct.isSelected == true &&
                        projectDetailsObjct.ProjectId ==
                        selectedFlat[0].ProjectId &&
                        <Grid container xs={12}>
                          <Grid container xs={12} justifyContent="center">
                            <ImageList sx={{ height: 107, width: 220, }} gap={20} cols={2} rowHeight={107}>
                              <ImageListItem className={classes.imgContainer} onClick={() => { selectedFlatImg(selectedFlat[0].keyplan); setCurImg(selectedFlat[0].keyplan); setValue(1) }}>
                                <img className={classes.planImages}
                                  src={selectedFlat[0].keyplan}
                                  alt={"img"}
                                  loading="lazy"
                                />
                                <ImageListItemBar
                                  title={t('selectFlatDialog.viewKeyLbl')}
                                  sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,selectedUnit?.FrdId 0,0) 100%)', }}
                                  actionIcon={
                                    <IconButton>
                                      <ExpandImgIcon />
                                    </IconButton>
                                  }
                                  position="bottom"
                                  style={{ height: "30px", borderRadius: "0 0 10px 10px" }}
                                  className={classes.imageBoxHover}
                                />
                              </ImageListItem>
                              <ImageListItem className={classes.imgContainer} onClick={() => { selectedFlatImg(selectedFlat[0].unitplan, 1, "unitPlanArray"); setCurImg(selectedFlat[0].unitplan[1]); setValue(0) }}>
                                <img
                                  className={classes.planImages}
                                  src={selectedFlat[0].unitplan[1]}
                                  alt={"img"}
                                  loading="lazy"
                                />
                                <ImageListItemBar
                                  title={t('selectFlatDialog.viewUnitLbl')}
                                  sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,selectedUnit?.FrdId 0,0) 100%)' }}
                                  actionIcon={
                                    <IconButton>
                                      <ExpandImgIcon />
                                    </IconButton>
                                  }
                                  position="bottom"
                                  style={{ height: "30px", borderRadius: "0 0 10px 10px" }}
                                  className={classes.imageBoxHover}
                                />
                              </ImageListItem>
                            </ImageList>
                          </Grid>
                          <Grid xs={6} container justifyContent="center">
                            <Typography style={{ padding: 5 }} className={classes.chipsTitle}>{t("projectCard.unitPlan")}</Typography>
                          </Grid>
                          <Grid xs={6} container justifyContent="center">
                            <Typography style={{ padding: 5 }} className={classes.chipsTitle}>{t("projectCard.keyPlan")}</Typography>
                          </Grid>
                          <Grid xs={12}>
                            {/* <Divider className={classes.dividerLine} /> */}
                            <Box padding={1.5} textAlign="center">
                              <Grid container justify="space-around">
                                {projectDetailsObjct.isSelected == true && (
                                  <>
                                    <Grid
                                      item
                                      xs={12}
                                      md="auto"
                                      className={classes.mobileCheckboxSec}
                                    >
                                      {projectDetailsObjct.isSelected == true && (
                                        <Button
                                          type="button"
                                          color="primary"
                                          startIcon={<EditIcon />}
                                          onClick={() => projectSelection(projectDetails)}
                                        >
                                          {t("projectCard.editPreferencesText")}
                                        </Button>
                                      )}
                                    </Grid>
                                  </>
                                )}
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      }
                    </Grid>
                    <Grid
                      container
                      xs={12}
                      md="auto"
                      className={classes.mobileCheckboxSec}
                    >
                      {projectDetailsObjct.isSelected == false && (
                        <Button
                          className={classes.selectProjBtn}
                          variant={"contained"}
                          color="primary"
                          onClick={() => projectSelection(projectDetails)}
                          disabled={disabledBtnState}
                        >
                          {t("projectCard.selectButtonText")}
                        </Button>
                      )}

                      {/* {projectDetailsObjct.isSelected == true && <Button
                        type="button"
                        color="primary"
                        startIcon={<DeleteIcon />}
                        className={classes.removeBtn}
                        onClick={() => projectSelection(projectDetails)}
                      >
                        {t("projectCard.deSelectButtonText")}
                      </Button>} */}
                    </Grid>
                  </Grid>
                </div>

              </CardContent>
            </Grid>
          </Grid>
          {/* <Hidden only={["xs", "sm"]}> */}
          {/* <Box className={classes.projectCardCont}> */}

          {/* </Box> */}
          {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <ProjectDetailsTabs moreDetails={projectDetails} />
        </Collapse> */}
          {/* </Hidden> */}
          {/* <Hidden only={["md", "lg"]}>
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
                  ₹{" "}{numberWithCommas(projectDetails.price)}
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
              <Box>
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
              </Box>
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
        </Hidden> */}
        </Card>
      )}
      {categoryModalOpen && (
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
      )}

      {openPrefrenceDialog && (
        <SetFlatPerferenceDialogBox
          open={openPrefrenceDialog}
          onClose={handleClose}
          projectDetails={projectDetailsObjct}
          selectedFlat={selectedFlat}
        />
      )}
      <FlatImagesViewBox showPlanImage={showPlanImage} selectedFlatImg={selectedFlatImg} setValue={setValue} setshowPlanImage={setshowPlanImage} setCurImg={setCurImg} imgCarouselPos={imgCarouselPos} curImg={curImg} setImgCarouselPos={setImgCarouselPos} value={value} selectedFloor={selectedFlat[0]} selectedUnit={selectedFlat[0]} imgCarouselType={imgCarouselType} PlanImageType={PlanImageType} commonPlanImg={commonPlanImg} />
    </div>
  );
};

export default ProjectCard;
