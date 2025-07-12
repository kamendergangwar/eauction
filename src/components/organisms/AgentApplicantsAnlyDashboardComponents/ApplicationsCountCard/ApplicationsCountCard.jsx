import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import Popover from '@material-ui/core/Popover';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import {
  TotalApplicationsIcon, TotalSubmittedIcon,
  ApplicationsInProgressIcon
} from "../../../atoms/SvgIcons/SvgIcons";

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    color: "#0F2940",
    fontWeight: "normal",
    lineHeight: "normal",
    fontSize: "0.8rem",
    marginBottom: theme.spacing(2)
  },
  titleDot: {
    backgroundColor: "#0F2940",
    display: "inline-block",
    width: 10,
    height: 10,
    marginRight: theme.spacing(1.2)
  },
  amountView: {
    color: "#0F2940",
    fontWeight: "bold",
    lineHeight: "normal",
    fontSize: "2rem",
  },
  iconView: {
    width: 40,
    height: 40,
  },
  dropdownBtnView: {
    marginTop: theme.spacing(1),
    textAlign: "right"
  },
  popoverContainer: {
    "& .MuiPopover-paper": {
      minWidth: 400
    }
  },
  popoverTitle: {
    color: "#0F2940",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    lineHeight: 1
  },
  applicationList: {
    width: "100%"
  },
  applicationTxt: {
    color: "#65707D",
    fontWeight: "500",
    fontSize: "1rem",
    "& span": {
      backgroundColor: "#65707D",
      borderRadius: "50%",
      display: "inline-block",
      width: 5,
      height: 5,
      verticalAlign: "middle",
      marginRight: theme.spacing(1)
    },
    /* "&.link": {
      color: "#007AE7",
      cursor: "pointer",
      textAlign: "right"
    } */
  }
}));

const ApplicationsCountCard = (props) => {
  const { cardData, agentAnalDashboardData } = props;
  // console.log("props in ApplicationsCountCard", props);
  const classes = useStyles();
  const { t } = useTranslation("AnalyDashboardPageTrans");
  const history = useHistory();
  const [boxColor, setBoxColor] = useState("#0F2940");
  const [boxIconView, setBoxIconView] = useState(<TotalApplicationsIcon className={classes.iconView} />);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popDropdownList, setPopDropdownList] = React.useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (cardData.cardType == "submitted") {
      setBoxColor("#007AE7");
      setBoxIconView(<TotalSubmittedIcon className={classes.iconView} />);
    }
    if (cardData.cardType == "inProgress") {
      setBoxColor("#F27807");
      setBoxIconView(<ApplicationsInProgressIcon className={classes.iconView} />);
    }

    let popArrList = [];
    for (const property in agentAnalDashboardData) {
      if (property == "PersonalDetailsApplicationInProgress") {
        let applicationCount = 0;
        if (agentAnalDashboardData[property].length > 0) {
          applicationCount = agentAnalDashboardData[property][0]?.ApplicationCount;
        }
        let obj = {
          name: t("appCardGroup.card3Popover.personalDetailsTxt"),
          appCount: applicationCount,
          percentage: agentAnalDashboardData.ApplicationProgress ? parseFloat(((applicationCount / agentAnalDashboardData.ApplicationProgress) * 100).toFixed(1)) : 0
        }
        popArrList.push(obj);
      }
      if (property == "CatergoryDetailsApplicationInProgress") {
        let applicationCount = 0;
        if (agentAnalDashboardData[property].length > 0) {
          applicationCount = agentAnalDashboardData[property][0]?.ApplicationCount;
        }
        let obj = {
          name: t("appCardGroup.card3Popover.categoryDetailsTxt"),
          appCount: applicationCount,
          percentage: agentAnalDashboardData.ApplicationProgress ? parseFloat(((applicationCount / agentAnalDashboardData.ApplicationProgress) * 100).toFixed(1)) : 0
        }
        popArrList.push(obj);
      }
      if (property == "DocumentsUploadApplicationInProgress") {
        let applicationCount = 0;
        if (agentAnalDashboardData[property].length > 0) {
          applicationCount = agentAnalDashboardData[property][0]?.ApplicationCount;
        }
        let obj = {
          name: t("appCardGroup.card3Popover.documentsUploadTxt"),
          appCount: applicationCount,
          percentage: agentAnalDashboardData.ApplicationProgress ? parseFloat(((applicationCount / agentAnalDashboardData.ApplicationProgress) * 100).toFixed(1)) : 0
        }
        popArrList.push(obj);
      }
      if (property == "MakePaymentApplicationInProgress") {
        let applicationCount = 0;
        if (agentAnalDashboardData[property].length > 0) {
          applicationCount = agentAnalDashboardData[property][0]?.ApplicationCount;
        }
        let obj = {
          name: t("appCardGroup.card3Popover.makePaymentTxt"),
          appCount: applicationCount,
          percentage: agentAnalDashboardData.ApplicationProgress ? parseFloat(((applicationCount / agentAnalDashboardData.ApplicationProgress) * 100).toFixed(1)) : 0
        }
        popArrList.push(obj);
      }
      if (property == "EStampingApplicationInProgress") {
        let applicationCount = 0;
        if (agentAnalDashboardData[property].length > 0) {
          applicationCount = agentAnalDashboardData[property][0]?.ApplicationCount;
        }
        let obj = {
          name: t("appCardGroup.card3Popover.eStampingEsigningTxt"),
          appCount: applicationCount,
          percentage: agentAnalDashboardData.ApplicationProgress ? parseFloat(((applicationCount / agentAnalDashboardData.ApplicationProgress) * 100).toFixed(1)) : 0
        }
        popArrList.push(obj);
      }
    }
    setPopDropdownList(popArrList);
  }, [agentAnalDashboardData]);

  const goToApplicationsDetails = (appType, appStatus) => {
    console.log('--goToApplicationsDetails--');
    let newObj = {
      type: appType,
      status: appStatus
    };
    console.log(newObj);
    //console.log("getItemBefore", localStorage.getItem("appDashboardFiltersParam"));
    localStorage.setItem("appDashboardFiltersParam", JSON.stringify(newObj));
    //console.log("getItem", localStorage.getItem("appDashboardFiltersParam"), JSON.stringify(newObj));
    history.push("/cfc-applicants-dashboard");
  };

  return (
    <Box component={Paper} p={1} height="100%">
      <Typography className={classes.cardTitle}>
        <span className={classes.titleDot} style={{ backgroundColor: boxColor }}></span>
        {cardData.title}
      </Typography>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography className={classes.amountView} style={{ color: boxColor }}>{cardData.count}</Typography>
        </Grid>
        <Grid item>
          {boxIconView}
        </Grid>
      </Grid>
      {cardData.cardType != "total" &&
        <Box className={classes.dropdownBtnView}>
          <Button aria-describedby={id} onClick={handleClick} size="small" endIcon={<KeyboardArrowDownOutlinedIcon />}>{t("appCardGroup.viewDetailsBtnTxt")}</Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            className={classes.popoverContainer}
          >
            {cardData.cardType == "submitted" &&
              <Box padding={1.5}>
                <Typography className={classes.popoverTitle}>{cardData.detailsTitle}</Typography>
                <table className={classes.applicationList}>
                  <tbody>
                    <tr>
                      <td><Typography className={classes.applicationTxt}><span></span> {cardData.detailsSubTitle}</Typography></td>
                      {/* <td style={{ textAlign: "right" }}><Typography className={classes.applicationTxt}><strong>100%</strong></Typography></td> */}
                      <td style={{ textAlign: "right" }}>
                        <Button color="primary" onClick={() => goToApplicationsDetails("completed", null)}>{cardData.count} {t("Applicants")}</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            }
            {cardData.cardType == "inProgress" &&
              <Box padding={1.5}>
                <Typography className={classes.popoverTitle}>{cardData.detailsTitle}</Typography>
                <table className={classes.applicationList}>
                  <tbody>
                      <tr>
                        <td><Typography className={classes.applicationTxt}><span></span> {cardData.detailsSubTitle}</Typography></td>
                        {/* <td style={{ textAlign: "right" }}><Typography className={classes.applicationTxt}><strong>{element.percentage}%</strong></Typography></td> */}
                        <td style={{ textAlign: "right" }}>
                          <Button color="primary" onClick={() => goToApplicationsDetails("inprogress", null)}>{cardData.count} {t("Applicants")}</Button>
                        </td>
                      </tr>
                    {/* {popDropdownList.map((element, i) => (
                      <tr key={i}>
                        <td><Typography className={classes.applicationTxt}><span></span> {element.name}</Typography></td>
                        <td style={{ textAlign: "right" }}><Typography className={classes.applicationTxt}><strong>{element.percentage}%</strong></Typography></td>
                        <td style={{ textAlign: "right" }}>
                          <Button color="primary" onClick={() => goToApplicationsDetails("inprogress", element.name)}>{element.appCount} {t("appCardGroup.applicationsBtnTxt")}</Button>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </Box>
            }
          </Popover>
        </Box>
      }
    </Box>
  );
};

export default ApplicationsCountCard;
