import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ProfileSummary from "../ProfileSummary/ProfileSummary";
import ProfileDetailContainer from "../ProfileDetailContainer/ProfileDetailContainer";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { MenuPersonalDtlsIcon, MenuTransactionDtlsIcon, MenuMyDocumentsIcon, MenuLanguageSettingIcon, MenuNocIcon, MenuAllotmentLetterIcon, LOIMenuIcon, CancelFlatIcon, EditCoApplicantIcon, EditDetailIcon, AgreementIcon } from "../../../atoms/SvgIcons/SvgIcons";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import { ProfileWrapStyles } from "./ProfileWrap.style";
import { AccountBalanceWalletOutlined, ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  getApplicant,
  applicantSelector,
  clearApplicantState,
  applicationFilter,
} from "../../../../redux/features/applicant/ApplicantSlice";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "@material-ui/core";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import EditIcon from '@material-ui/icons/Edit';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SubjectIcon from '@material-ui/icons/Subject';
import RestorePageOutlinedIcon from '@material-ui/icons/RestorePageOutlined';

/* import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  fileUploadSelector,
  setImageUrl,
  clearImageUrl,
} from "../../../../redux/features/file/FileUploadSlice"; */

function ProfileWrap(props) {
  const { children } = props;
  const { t } = useTranslation("ProfilePageTrans");
  const classes = ProfileWrapStyles();
  const history = useHistory();
  const currentPathName = useLocation().pathname;
  const [userData, setUserData] = useState([]);
  // const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [isPmay, setIsPmay] = useState(false);
  const [isFinalPaymentDone, setIsFinalPaymentDone] = useState(false);
  const [isLoiGenerated, setIsLoiGenerated] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [collapseItemPath, setCollapseItemPath] = useState(['/cancel-booking', '/edit-coapplicant', '/change-name', '/start-fresh'])
  const [applPaymentDone, setApplPaymentDone] = useState(false);
  const [docverificationDone, setDocVerificationDone] = useState(false);
  const [allotmentGenrated, setAllotmentGenrated] = useState(false);
  const [installmentDone, setInstallmentDone] = useState(false);
  const [loiGenrated, setLoiGenrated] = useState(false);
  const [isPreviousCancel, setIsPreviousCancel] = useState(true); //temp to true

  const handleExpand = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (collapseItemPath.includes(currentPathName)) {
      setOpen(true)
    }
  }, [currentPathName])
  const {
    isFetchingApplicant,
    isSuccessResApplicantGet,
    applicantData,
  } = useSelector(applicantSelector);
  const { ApplicantStepperData, isSuccessProgressResStepper, isFetchingStepper } = useSelector(ApplicantProgressSelector);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getApplicantProgress())
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.is_pmy == 0) {
        setIsPmay(true)
      }
      if (applicantData.ApplicationNo) {
        const number = applicantData.ApplicationNo?.slice(2, 3);
        if (number > 1) {
          setIsPreviousCancel(true);
        }
      }
    }
  }, [isSuccessResApplicantGet, applicantData])


  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach((item) => {
        if (item.StepId == "10") {
          item.Status == "completed"
            ? setIsFinalPaymentDone(true)
            : setIsFinalPaymentDone(false);
        }

        if (item.StepId == "11") {
          item.Status == "completed"
            ? setIsLoiGenerated(true)
            : setIsLoiGenerated(false);
        }
        if (item.StepId == "7") {
          item.Status == "completed"
            ? setApplPaymentDone(true)
            : setApplPaymentDone(false);
        }
        if (item.StepId == "8") {
          item.Status == "completed"
            ? setDocVerificationDone(true)
            : setDocVerificationDone(false);
        }
        if (item.StepId == "11") {
          item.Status == "completed"
            ? setLoiGenrated(true)
            : setLoiGenrated(false);
        }
        if (item.StepId == "12") {
          item.Status == "completed"
            ? setAllotmentGenrated(true)
            : setAllotmentGenrated(false);
        }
        if (item.StepId == "13") {
          item.Status == "completed"
            ? setInstallmentDone(true)
            : setInstallmentDone(false);
        }
        // if (item.StepId == "5" && item.Status == "pending") {
        //   history.push("/dashboard");
        // }
      });
    }
  }, [isSuccessProgressResStepper]);
  // useEffect(() => {
  //   setSelectedValue(applicantData);
  // }, [applicantData]);
  const submenuList = [{
    value: "cancelBooking",
    pathName: "/cancel-booking",
    icon: <CancelFlatIcon style={{ fontSize: "22px" }} stroke={currentPathName == "/cancel-booking" ? "#0038c0" : "#1d3d62"} />,
    label: t("Cancel Booking"),
    display: "loiLetter",
  },
  {
    value: "editCoApplicant",
    pathName: "/edit-coapplicant",
    icon: <EditCoApplicantIcon style={{ fontSize: "22px" }} stroke={currentPathName == "/edit-coapplicant" ? "#0038c0" : "#1d3d62"} />,
    label: t("Edit Co-Applicant"),
    display: "afterApplPayment",
  }, {
    value: "changeName",
    pathName: "/change-name",
    icon: <EditDetailIcon style={{ fontSize: "22px" }} stroke={currentPathName == "/change-name" ? "#0038c0" : "#1d3d62"} />,
    label: t("Change Name"),
    display: "allotmentLetter",
  }, {
    value: "changeCategory",
    pathName: "/start-fresh",
    icon: <RestorePageOutlinedIcon style={{ fontSize: "22px" }} />,
    label: t("Change Category"),
    display: "afterDocVerification",
  }
  ]

  return (
    <FormCard>
      {isFetchingApplicant && isFetchingStepper && <Loading isOpen={isFetchingApplicant || isFetchingStepper} />}
      {/* {isError && (
        <AlertBox severity="error">
          {"Something went wrong,Try again in some time"}
        </AlertBox>
      )} */}
      {/* {selectedValue && <ProfileSummary selectedValue={selectedValue} />}
      <ProfileDetailContainer selectedValue={selectedValue} /> */}

      <Grid container>
        <Hidden smDown>
          <Grid item md="auto">
            <Box className={classes.leftSideNavContainer}>
              <List className={classes.profileNavList}>
                <ListItem button className={currentPathName == "/my-profile" ? "active" : ""} onClick={() => history.push("/my-profile")}>
                  <ListItemIcon><MenuPersonalDtlsIcon /></ListItemIcon>
                  <ListItemText primary={t("tabs.tab1")} />
                </ListItem>
                <ListItem button className={currentPathName == "/transaction-details" ? "active" : ""} onClick={() => history.push("/transaction-details")}>
                  <ListItemIcon><MenuTransactionDtlsIcon /></ListItemIcon>
                  <ListItemText primary={t("tabs.tab2")} />
                </ListItem>
                <ListItem button className={currentPathName == "/my-documents" ? "active" : ""} onClick={() => history.push("/my-documents")}>
                  <ListItemIcon><MenuMyDocumentsIcon /></ListItemIcon>
                  <ListItemText primary={t("tabs.tab3")} />
                </ListItem>
                {/* <ListItem button className={currentPathName == "/language-setting" ? "active" : ""} onClick={() => history.push("/language-setting")}>
                  <ListItemIcon><MenuLanguageSettingIcon /></ListItemIcon>
                  <ListItemText primary={t("tabs.tab4")} />
                </ListItem> */}
                {isFinalPaymentDone && <><ListItem button className={currentPathName == "/my-loi" ? "active" : ""} onClick={() => history.push("/my-loi")}>
                  <ListItemIcon><LOIMenuIcon style={{ fill: "transparent", fontSize: "x-large" }} stroke={currentPathName == "/my-loi" ? "#0038c0" : "#1d3d62"} /></ListItemIcon>
                  <ListItemText primary={t("tabs.tab6")} />
                </ListItem>
                  <ListItem button className={currentPathName == "/my-allotment-letter" ? "active" : ""} onClick={() => history.push("/my-allotment-letter")}>
                    <ListItemIcon><MenuAllotmentLetterIcon style={{ fill: "transparent", fontSize: "22px" }} stroke={currentPathName == "/my-allotment-letter" ? "#0038c0" : "#1d3d62"} /></ListItemIcon>
                    <ListItemText primary={t("tabs.tab5")} />
                  </ListItem>
                  {isLoiGenerated && <ListItem button className={currentPathName == "/loan-application" ? "active" : ""} onClick={() => history.push("/loan-application")}>
                    <ListItemIcon><MenuNocIcon style={{ fill: "transparent", fontSize: "x-large" }} stroke={currentPathName == "/loan-application" ? "#0038c0" : "#1d3d62"} /></ListItemIcon>
                    <ListItemText primary={t("Request NOC")} />
                  </ListItem>}
                  {allotmentGenrated && <ListItem button className={currentPathName == "/make-house-payment" ? "active" : ""} onClick={() => history.push("/make-house-payment")}>
                    <ListItemIcon><AccountBalanceWalletOutlined style={{ fontSize: "22px" }} /></ListItemIcon>
                    <ListItemText primary={t("Installments")} />
                  </ListItem>}
                  {installmentDone && <ListItem button className={currentPathName == "/agreement-letter" ? "active" : ""} onClick={() => history.push("/agreement-letter")}>
                    <ListItemIcon><AgreementIcon style={{ fontSize: "24px" }} stroke={currentPathName == "/agreement-letter" ? "#0038c0" : "#1d3d62"} /></ListItemIcon>
                    <ListItemText primary={t("Agreement")} />
                  </ListItem>}
                </>}

                <ListItem button onClick={handleExpand}>
                  <ListItemIcon>
                    <SubjectIcon style={{ fontSize: "22px" }} />
                  </ListItemIcon>
                  <ListItemText primary={t("Other Request")} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {submenuList.map((element, i) => {
                      if (element.display === 'always') {
                        return (
                          <ListItem button onClick={() => history.push(element.pathName)} className={`${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                            <ListItemIcon>
                              {element.icon}
                            </ListItemIcon>
                            <ListItemText primary={element.label} />
                          </ListItem>
                        )
                      }
                      if (element.display === 'loiLetter' && (isLoiGenerated || isPreviousCancel)) {
                        return (
                          <ListItem button onClick={() => history.push(element.pathName)} className={`${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                            <ListItemIcon>
                              {element.icon}
                            </ListItemIcon>
                            <ListItemText primary={element.label} />
                          </ListItem>
                        )
                      }
                      if (element.display === 'afterApplPayment' && applPaymentDone) {
                        return (
                          <ListItem button onClick={() => history.push(element.pathName)} className={`${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                            <ListItemIcon>
                              {element.icon}
                            </ListItemIcon>
                            <ListItemText primary={element.label} />
                          </ListItem>
                        )
                      }
                      if (element.display === 'afterDocVerification' && !isFinalPaymentDone && docverificationDone) {
                        return (
                          <ListItem button onClick={() => history.push(element.pathName)} className={`${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                            <ListItemIcon>
                              {element.icon}
                            </ListItemIcon>
                            <ListItemText primary={element.label} />
                          </ListItem>
                        )
                      }
                      if (element.display === 'allotmentLetter' && allotmentGenrated) {
                        return (
                          <ListItem button onClick={() => history.push(element.pathName)} className={`${currentPathName == element.pathName ? "active" : ""} ${'nested'}`}>
                            <ListItemIcon>
                              {element.icon}
                            </ListItemIcon>
                            <ListItemText primary={element.label} />
                          </ListItem>
                        )
                      }
                    })}
                  </List>
                </Collapse>
                {/* <ListItem button className={currentPathName == "/language-setting" ? "active" : ""} onClick={() => history.push("/language-setting")}>
                  <ListItemIcon><MenuLanguageSettingIcon /></ListItemIcon>
                  <ListItemText primary={t("Language Setting")} />
                </ListItem> */}
              </List>
            </Box>
          </Grid>
        </Hidden>
        <Grid item md xs={12}>
          {children}
        </Grid>
      </Grid>
    </FormCard>
  );
}

export default ProfileWrap;
