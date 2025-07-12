import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import BeenhereOutlinedIcon from "@material-ui/icons/BeenhereOutlined";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import Popover from "@material-ui/core/Popover";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  TotalApplicationsIcon,
  TotalSubmittedIcon,
  ApplicationsInProgressIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import { masterDataSelector, getReservationCategories } from "../../../../redux/features/masterdata/MasterDataSlice";

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    fontWeight: 600,
    color: "#0F2940",
    lineHeight: "normal",
    fontSize: "0.8rem",
    width: "100%",
  },
  root: {
    borderLeft: "8px solid",
    "&._0": {
      borderLeft: "8px solid #2196F3",   // Unattented - Blue
    },
    "&._1": {
      borderLeft: "8px solid #FF9800",   // Call Back - Yellow
    },
    "&._2": {
      borderLeft: "8px solid #a5493b",   // Reminder - brown
    },
    "&._3": {
      borderLeft: "8px solid #8BC34A",   // Call Successful - Blue
    },
    "&._4": {
      borderLeft: "8px solid #F44336",   // Call not Picked up - Red
    },
    "&._5": {
      borderLeft: "8px solid #9E9E9E",   // Not interested - Grey
    },
    "&._6": {
      borderLeft: "8px solid #d434d7",   // Not connected - Orange
    },
    "&._8": {
      borderLeft: "8px solid #da03ff",   // site visit - violet
    },
    "&.selectedAll": {
      background: "#d3d3d357"
    },
    "&.unattended": {
      background: "#2196f31a"
    },
    "&.callBack": {
      background: "#ff980040"
    },
    "&.reminder": {
      background: "#a5493b3d"
    },
    "&.callSuccess": {
      background: "#8bc34a45"
    },
    "&.callNotPicked": {
      background: "#f443362e"
    },
    "&.notConnected": {
      background: "#ff980040"
    },
    "&.notIntrested": {
      background: "#9e9e9e24"
    },
    "&.siteVisit": {
      background: "#da03ff1f"
    },
  },
  titleDot: {
    backgroundColor: "#0F2940",
    display: "inline-block",
    width: 10,
    height: 10,
    marginRight: theme.spacing(1.2),
    "&._0": {
      background: "#2196F3",   // Unattented - Blue
    },
    "&._1": {
      background: "#FF9800",   // Call Back - Yellow
    },
    "&._2": {
      background: "#a5493b",   // Reminder - brown
    },
    "&._3": {
      background: "#8BC34A",   // Call Successful - Blue
    },
    "&._4": {
      background: "#F44336",   // Call not Picked up - Red
    },
    "&._5": {
      background: "#9E9E9E",   // Not interested - Grey
    },
    "&._6": {
      background: "#d434d7",   // Not connected - Orange
    },
    "&._8": {
      background: "#da03ff",   // Not connected - Orange
    },
  },
  amountView: {
    color: "#0F2940",
    fontWeight: "bold",
    lineHeight: "normal",
    fontSize: "1.5rem",
    "&._0": {
      color: "#2196F3",   // Unattented - Blue
    },
    "&._1": {
      color: "#FF9800",   // Call Back - Yellow
    },
    "&._2": {
      color: "#a5493b",   // Reminder - brown
    },
    "&._3": {
      color: "#8BC34A",   // Call Successful - Blue
    },
    "&._4": {
      color: "#F44336",   // Call not Picked up - Red
    },
    "&._5": {
      color: "#9E9E9E",   // Not interested - Grey
    },
    "&._6": {
      color: "#d434d7",   // Not connected - Orange
    },
    "&._8": {
      color: "#da03ff",   // Not connected - Orange
    },
  },
  iconView: {
    width: 40,
    height: 40,
  },
  dropdownBtnView: {
    marginTop: theme.spacing(1),
    textAlign: "right",
  },
  popoverContainer: {
    "& .MuiPopover-paper": {
      minWidth: 400,
    },
  },
  popoverTitle: {
    color: "#0F2940",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    lineHeight: 1,
  },
  applicationList: {
    width: "100%",
  },
  applicationTxt: {
    color: "#65707D",
    fontWeight: "500",
    fontSize: "0.9rem",

    "& span": {
      backgroundColor: "#65707D",
      borderRadius: "50%",
      display: "inline-block",
      width: 5,
      height: 5,
      verticalAlign: "middle",
      marginRight: theme.spacing(1),
    },
    /* "&.link": {
      color: "#007AE7",
      cursor: "pointer",
      textAlign: "right"
    } */
  },
}));

const AgentLeadDetailCard = (props) => {
  const { storeLeadData, leadsCounts, allLeadData, setSelectedStatus, selectedStatus } = props;
  // console.log("props in AgentLeadDetailCard", props);
  const classes = useStyles();
  const { t } = useTranslation("AgentLeadPageTrans");
  const history = useHistory();
  const [boxColor, setBoxColor] = useState("#0F2940");
  const [boxIconView, setBoxIconView] = useState(
    <TotalApplicationsIcon className={classes.iconView} />
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popDropdownList, setPopDropdownList] = React.useState([]);
  const [filterCategoryData, setFilterCategoryData] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    allCategory,
    isSuccessMasterData
  } = useSelector(masterDataSelector);


  useEffect(() => {
    if (isSuccessMasterData) {
      setFilterCategoryData(allCategory);
    }
  }, [t, isSuccessMasterData, allCategory])

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // useEffect(() => {
  //   let category1 = 0,
  //     category2 = 0,
  //     category3 = 0,
  //     category4 = 0,
  //     category5 = 0,
  //     category6 = 0,
  //     category7 = 0,
  //     category8 = 0,
  //     category9 = 0,
  //     category10 = 0,
  //     category11 = 0,
  //     category12 = 0,
  //     category13 = 0;

  //   for (const property in storeLeadData) {
  //     if (storeLeadData[property].category == "1") {
  //       category1 += 1;
  //     }
  //     if (storeLeadData[property].category == "2") {
  //       category2 += 1;
  //     }
  //     if (storeLeadData[property].category == "3") {
  //       category3 += 1;
  //     }
  //     if (storeLeadData[property].category == "4") {
  //       category4 += 1;
  //     }
  //     if (storeLeadData[property].category == "5") {
  //       category5 += 1;
  //     }
  //     if (storeLeadData[property].category == "6") {
  //       category6 += 1;
  //     }
  //     if (storeLeadData[property].category == "7") {
  //       category7 += 1;
  //     }
  //     if (storeLeadData[property].category == "8") {
  //       category8 += 1;
  //     }
  //     if (storeLeadData[property].category == "9") {
  //       category9 += 1;
  //     }
  //     if (storeLeadData[property].category == "10") {
  //       category10 += 1;
  //     }
  //     if (storeLeadData[property].category == "11") {
  //       category11 += 1;
  //     }
  //     if (storeLeadData[property].category == "12") {
  //       category12 += 1;
  //     }
  //     if (storeLeadData[property].category == "13") {
  //       category13 += 1;
  //     }
  //   }
  //   let obj1 = {
  //     name: t("General (GP)"),
  //     appCount: category1,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category1 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj2 = {
  //     name: t("Scheduled caste (SC)"),
  //     appCount: category2,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category2 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj3 = {
  //     name: t("Scheduled Tribes (ST)"),
  //     appCount: category3,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category3 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj4 = {
  //     name: t("Nomadic tribes (NT)"),
  //     appCount: category4,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category4 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj5 = {
  //     name: t("Denotified Tribes (DT)"),
  //     appCount: category5,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category5 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj6 = {
  //     name: t("Religious Minorities"),
  //     appCount: category6,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category6 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj7 = {
  //     name: t("State Goverment Employees"),
  //     appCount: category7,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category7 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj8 = {
  //     name: t("Journalist of Navi Mumbai"),
  //     appCount: category8,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category8 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj9 = {
  //     name: t("CIDCO Employees"),
  //     appCount: category9,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category9 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj10 = {
  //     name: t("Project affected person of Navi Mumbai"),
  //     appCount: category10,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category10 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj11 = {
  //     name: t("Divyang/Handicapped person"),
  //     appCount: category11,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category11 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj12 = {
  //     name: t("Ex-Servicemen/Defence Personal"),
  //     appCount: category12,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category12 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let obj13 = {
  //     name: t("Mathadi kamgar working in markets in Navi Mumbai"),
  //     appCount: category13,
  //     percentage: storeLeadData.length
  //       ? parseFloat(((category13 / storeLeadData.length) * 100).toFixed(1))
  //       : 0,
  //   };
  //   let popArrList = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13];
  //   setPopDropdownList(popArrList);
  //   // console.log(popDropdownList);
  // }, [storeLeadData, t]);

  //   const goToApplicationsDetails = (appType, appStatus) => {
  //     console.log('--goToApplicationsDetails--');
  //     let newObj = {
  //       type: appType,
  //       status: appStatus
  //     };
  //     console.log(newObj);
  //     //console.log("getItemBefore", localStorage.getItem("appDashboardFiltersParam"));
  //     localStorage.setItem("appDashboardFiltersParam", JSON.stringify(newObj));
  //     //console.log("getItem", localStorage.getItem("appDashboardFiltersParam"), JSON.stringify(newObj));
  //     history.push("/cfc-application-dashboard");
  //   };


  return (
    <>
      <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} ${selectedStatus === "" && "selectedAll"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot}`}
          ></span>
          Total Leads
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView}`}
            >
              {allLeadData.AllLeadsCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus("")}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} _0 ${selectedStatus === 0 && "unattended"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _0`}
          ></span>
          Unattended
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _0`}
            >
              {allLeadData?.StatusWiseCount[0]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(0)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} _1 ${selectedStatus == 1 && "callBack"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _1`}
          ></span>
          Call Back
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _1`}
            >
              {allLeadData?.StatusWiseCount[1]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(1)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} _2 ${selectedStatus == 2 && "reminder"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _2`}
          ></span>
          Reminder
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _2`}
            >
              {allLeadData.StatusWiseCount[2]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(2)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box> */}

      <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} _3 ${selectedStatus == 3 && "callSuccess"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _3`}
          ></span>
          Call Successful
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _3`}
            >
              {allLeadData?.StatusWiseCount[3]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(3)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} _4 ${selectedStatus == 4 && "callNotPicked"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _4`}
          ></span>
          Call Not Picked
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _4`}
            >
              {allLeadData?.StatusWiseCount[4]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(4)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} _6 ${selectedStatus == 6 && "notConnected"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _6`}
          ></span>
          Not Connected
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _6`}
            >
              {allLeadData.StatusWiseCount[6]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(6)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box> */}

      <Box component={Paper} px={2.5} py={1} marginTop="20px" width='170px' className={`${classes.root} _8 ${selectedStatus == 8 && "siteVisit"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _8`}
          ></span>
          Site Visit
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _8`}
            >
              {allLeadData?.StatusWiseCount[8]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(8)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box component={Paper} px={2.5} py={1} marginTop="20px" marginBottom="20px" width='170px' className={`${classes.root} _5 ${selectedStatus == 5 && "notIntrested"}`}>
        <Typography className={classes.cardTitle}>
          <span
            className={`${classes.titleDot} _5`}
          ></span>
          Not Intrested
        </Typography>
        <Grid container alignItems="center" justify="space-between">
          <Grid item >
            <Typography
              className={`${classes.amountView} _5`}
            >
              {allLeadData?.StatusWiseCount[5]?.LeadCount}
            </Typography>
          </Grid>
          <Grid item >
            <Button
              aria-describedby={id}
              onClick={() => setSelectedStatus(5)}
              size="small"
              endIcon={<VisibilityIcon />} color="primary"
              style={{ minWidth: 0 }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </Box>


      {/* <Box className={classes.dropdownBtnView}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          className={classes.popoverContainer}
        >
          <Box padding={1.5}>
            <Typography className={classes.popoverTitle}>
              {t("detailCardSection.summaryTxt")}
            </Typography>
            <table className={classes.applicationList}>
              <tbody>
                {popDropdownList.map((element, i) => (
                  <tr key={i}>
                    <td>
                      <Typography className={classes.applicationTxt}>
                        <span></span> {element.name}
                      </Typography>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Typography className={`${classes.applicationTxt} link`}>{element.appCount} Applications</Typography>
                      <Button color="primary">
                        {element.appCount} {t("detailCardSection.leadsTxt")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Popover>
      </Box> */}
    </>
  );
};

export default AgentLeadDetailCard;
