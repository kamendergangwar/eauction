import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import NotInterestedOutlinedIcon from "@material-ui/icons/NotInterestedOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { green, orange, red, yellow } from "@material-ui/core/colors";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import { AppDetailsViewStyles } from "./AppDetailsView.styles";
import ApplicantsDetails from "../ApplicantsDetails/ApplicantsDetails";
import FamilyDetails from "../FamilyDetails/FamilyDetails";
import ContactInformation from "../ContactInformation/ContactInformation";
import CategoryDetails from "../CategoryDetails/CategoryDetails";
import SelectedScheme from "../SelectedScheme/SelectedScheme";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getApplication,
  applicationSelector,
} from "../../../../redux/features/application/ApplicationSlice";
import {
  getFamilyMembers,
  familyMemberSelector,
  deleteFamilyMember,
  clearFamilyState,
  clearFamilyData,
} from "../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import {
  setDummyProjectList,
  projectDataSelector,
  clearProjectList,
} from "../../../../redux/features/projectdata/ProjectDataSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { jsPDF } from "jspdf";

const AppDetailsView = (props) => {
  const { width } = props;
  const { t } = useTranslation("AgentAppDetailsViewPageTrans");
  const classes = AppDetailsViewStyles();
  const dispatch = useDispatch();
  const { applicantData } = useSelector(applicantSelector);
  const {
    isFetchingFamilyMember,
    isSuccessFamilyMembers,
    isErrorFamilyMember,
    errorMsgFamilyMember,
    familyMembersData,
  } = useSelector(familyMemberSelector);
  const {
    applicationData,
    isFetchingApplication,
    isErrorApplication,
    errorMsgApplication,
  } = useSelector(applicationSelector);
  const {
    isProjectDataFetching,
    isProjectDataError,
    projectDataErrorMessage,
    demoProjectList,
    schemeData,
  } = useSelector(projectDataSelector);
  const [applicationStatus, setApplicationStatus] = React.useState("");
  const [appliedApplicationStatus, setAppliedApplicationStatus] =
    React.useState("");
  const [printIs, setPrintIs] = React.useState(false);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getApplication());
    dispatch(getFamilyMembers());
  }, [dispatch, t]);

  useEffect(() => {
    if (applicationData.length > 0) {
      applicationData.forEach((innerItem) => {
        if (!Array.isArray(innerItem.ProjectDetails)) {
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
            case "0":
              newItem.appStatusTxt = "Saved";
              break;
            case "1":
              newItem.appStatusTxt = "Completed";
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
            newItem.parking = innerItem.ProjectDetails.attributes["Parking"];
            newItem.elevator = innerItem.ProjectDetails.attributes["Elevator"];
            newItem.cctv = innerItem.ProjectDetails.attributes["CCTV"];
          }
          dispatch(setDummyProjectList(newItem));
        }
      });
    }
  }, [applicationData, schemeData.value]);

  useEffect(() => {
    switch (applicantData.AppliedApplication) {
      case "0":
        setAppliedApplicationStatus("Saved");
        break;
      case "1":
        setAppliedApplicationStatus("Completed");
        break;
      case "2":
        setAppliedApplicationStatus("Rejected");
        break;
      case "3":
        setAppliedApplicationStatus("Verified");
        break;
      case "4":
        setAppliedApplicationStatus("Winner");
        break;
      case "5":
        setAppliedApplicationStatus("Waiting");
        break;
      case "6":
        setAppliedApplicationStatus("Lost");
        break;
      case "7":
        setAppliedApplicationStatus("");
        break;
      case "8":
        setAppliedApplicationStatus("");
        break;
      case "9":
        setAppliedApplicationStatus("Delete");
        break;
    }
  }, [applicantData]);

  const printDocument = () => {
    setPrintIs(true);
    var printMainContainer = document.getElementsByClassName(
      "MuiContainer-maxWidthLg"
    )[0];
    printMainContainer.style.maxWidth = "initial";
    var printMainSection = document.getElementById("mainPrintSection");
    printMainSection.style.backgroundColor = "#ffffff";
    printMainSection.style.margin = "0 auto";
    var allEditBtns = document.getElementsByClassName("MuiButton-textPrimary");
    // console.log("allEditBtns", allEditBtns);
    for (let h = 0; h < allEditBtns.length; h++) {
      const element = allEditBtns[h];
      element.style.display = "none";
    }
    var allTitleElms = document.getElementsByClassName("MuiTypography-h6");
    // console.log("allTitleElms", allTitleElms);
    for (let h = 0; h < allTitleElms.length; h++) {
      const element = allTitleElms[h];
      element.style.whiteSpace = "nowrap";
    }
    setTimeout(() => {
      var node = document.getElementById("mainPrintSection");
      htmlToImage.toJpeg(node, { quality: 1 }).then(function (dataUrl) {
        const pdf = new jsPDF({
          format: [500, 841.89],
        });
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "jpeg", 0, 0);
        pdf.save("download.pdf");
        /* var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click(); */
        printMainContainer.removeAttribute("style");
        printMainSection.removeAttribute("style");
        for (let h = 0; h < allEditBtns.length; h++) {
          const element = allEditBtns[h];
          element.style.display = "inline-flex";
        }
        for (let h = 0; h < allTitleElms.length; h++) {
          const element = allTitleElms[h];
          element.removeAttribute("style");
        }
        setPrintIs(false);
      });
    }, 500);
  };

  return (
    <div className={classes.root} id="mainPrintSection">
      {isProjectDataFetching && <Loading isOpen={isProjectDataFetching} />}
      {isProjectDataError && (
        <AlertBox severity="error">{projectDataErrorMessage}</AlertBox>
      )}
      <FormCard>
        <Paper elevation={0} style={{ backgroundColor: "#F2F9FF" }}>
          <Grid container spacing={3} className={classes.applicationHeader}>
            <Grid item>
              <Typography style={{ marginBottom: "15px" }}>
                {t(
                  "applicatntProfilePage.applicationDetail.formControl.applicantNoLabel"
                )}
                : <strong>{applicantData.ApplicantId || "--"}</strong>
              </Typography>
              <Typography style={{ marginBottom: "15px" }}>
                {t(
                  "applicatntProfilePage.applicationDetail.formControl.appliedDateLabel"
                )}
                :{" "}
                <strong>
                  {applicantData.CreatedAt &&
                  applicantData.CreatedAt != "0000-00-00"
                    ? moment(applicantData.CreatedAt).format("DD MMM, YYYY")
                    : "--"}
                </strong>
              </Typography>
              <Typography>
                {t(
                  "applicatntProfilePage.applicationDetail.formControl.applicationStatus"
                )}
                :{" "}
                <strong>
                  {appliedApplicationStatus == "Approved" && (
                    <CheckCircleOutlineIcon
                      fontSize="small"
                      style={{ color: green[500] }}
                    />
                  )}
                  {appliedApplicationStatus == "Rejected" && (
                    <NotInterestedOutlinedIcon
                      fontSize="small"
                      style={{ color: red[500] }}
                    />
                  )}
                  {appliedApplicationStatus == "Verified" && (
                    <HistoryOutlinedIcon
                      fontSize="small"
                      style={{ color: orange[500] }}
                    />
                  )}
                  {appliedApplicationStatus == "Waiting" && (
                    <ScheduleOutlinedIcon
                      fontSize="small"
                      style={{ color: orange[500] }}
                    />
                  )}
                  {appliedApplicationStatus == "Winner" && (
                    <ThumbUpAltOutlinedIcon
                      fontSize="small"
                      style={{ color: yellow[500] }}
                    />
                  )}
                  &nbsp;
                  {appliedApplicationStatus || "--"}
                </strong>
              </Typography>
            </Grid>
            <Grid item md xs={12}>
              <Box textAlign="right">
                <Grid container justify="flex-end" spacing={2}>
                  {/* <Grid item md="auto" xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.topButton}
                    >
                      {t("applicatntProfilePage.applicationDetail.formControl.editButtonText")}
                    </Button>
                  </Grid> */}
                  {!printIs && (
                    <Grid item md="auto" xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.topButton}
                        style={{ marginRight: 0 }}
                        onClick={() => printDocument()}
                      >
                        {t(
                          "applicatntProfilePage.applicationDetail.formControl.downloadButtonText"
                        )}
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <div className={`${classes.container} ${printIs ? "print" : ""}`}>
          <ApplicantsDetails applicantData={applicantData} />
          <Box borderTop={1} borderColor="grey.400" marginY={2} />
          <FamilyDetails familyMembersData={familyMembersData} />
          <Box borderTop={1} borderColor="grey.400" marginY={2} />
          <ContactInformation applicantData={applicantData} />
          <Box borderTop={1} borderColor="grey.400" marginY={2} />
          <CategoryDetails applicantData={applicantData} />
          <Box borderTop={1} borderColor="grey.400" marginY={2} />
          <SelectedScheme
            applicantData={applicantData}
            schemeDetails={demoProjectList}
          />
        </div>
      </FormCard>
    </div>
  );
};

export default withWidth()(AppDetailsView);
