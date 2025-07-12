import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import ImportantDates from "../ImportantDates/ImportantDates";
import RecentPosts from "../RecentPosts/RecentPosts";
import Notifications from "../Notifications/Notifications";
import UserProjects from "../UserProjects/UserProjects";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { DashboardStyles } from "./Dashboard.styles";
import GavelIcon from '@material-ui/icons/Gavel';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {
  getApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getReservationCategories,
  masterDataSelector,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  docDeclarationSelector,
  getDocumentsList,
  getUploadDocumentsList,
  clearDocDeclarationState,
  clearDocDeclarationtData
} from "../../../../redux/features/file/DocDeclarationSlice";
import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import { ApplicantProgressSelector } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import DashboardBox from "../../../molecules/DashboardBoxes/DashboardBox";
import { AlltenderIcon, PendingIcon, SubmittedIcon, VerifiedDocIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { CircularProgress, Divider } from "@material-ui/core";
import MyLiveAuctionTab from "../DashBoardTabs/MyLiveAuction/MyLiveAuction";
import WinnerPage from "../DashBoardTabs/WinnerTab/WinnerPage";
import MyPendingTenders from "../DashBoardTabs/PendingTenders/MyPendingTenders";
import LiveTender from "../DashBoardTabs/LiveTenderTab/LiveTender";
import FinalSubmittedTenders from "../DashBoardTabs/FinalSubmittedTenders/MyFinalSubmittedTenders";
import AllTendersTab from "../DashBoardTabs/AllTenders/AllTenderTab";
import { dashboardCountSelector, getDashboardCounts } from "../../../../redux/features/dashboard/DashboardCountsSlice";

const Dashboard = (props) => {
  const { width } = props;
  const { t } = useTranslation("DashboardPageTrans");
  const classes = DashboardStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedList, setSelectedList] = useState(1);
  const search = window.location.search;
  const tab = new URLSearchParams(search).get("tab");

  const {
    applicantData,
    isSuccessResApplicantGet,
    isFetchingApplicantGet,
    isErrorApplicantGet,
    errorMessageGet
  } = useSelector(applicantSelector);

  const { isFetchingDashboardCounts,
    isSuccessDashboardCounts,
    isErrorDashboardCounts,
    errorMessageDashboardCounts,
    dashboardCountsData } = useSelector(dashboardCountSelector)

  const { isFetchingStepper } = useSelector(ApplicantProgressSelector);
  const { stepperData, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );

  useEffect(() => {
    dispatch(getStepperDetails());
    // dispatch(getReservationCategories())
    dispatch(getApplicant());
    dispatch(getDashboardCounts());
    // let sendData = {
    //   ApplicantId: localStorage.getItem("applicantId"),
    //   Lang: localStorage.getItem("i18nextLng"),
    // };
    // dispatch(getUploadDocumentsList(sendData))
  }, [dispatch, t]);


  // useEffect(() => {
  //   if (isSuccessResStepper) {
  //     let pageUrl;
  //     stepperData.superStepper.forEach(item => {
  //       if (item.step == 1) {
  //         if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
  //           if (item.applicantKycStepper[0].status != "completed") {
  //             pageUrl = "/auth-verify-aadhaar";
  //           }
  //         }

  //         if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
  //           if (item.applicantKycStepper[1].status != "completed") {
  //             pageUrl = "/verify-pancard";
  //           }
  //         }
  //       }

  // if (item.step == 1 && pageUrl == undefined) {
  //   if (item.status != "completed") {
  //     pageUrl = "/personal-details";
  //   }
  // }

  //     })
  //     history.push(pageUrl)
  //   }
  // }, [isSuccessResStepper])

  // useEffect(() => {
  //   if (isSuccessResApplicantGet && applicantData) {
  //     let sendData = {
  //       ApplicantId: applicantData.ApplicantId,
  //       CasteCatId: applicantData.CasteCatId,
  //       ReservationCatIds: applicantData.RservationCatIds,
  //       IncomeGroup: applicantData.IncomeGroup,
  //     };
  //     // dispatch(getDocumentsList(sendData));
  //   }
  // }, [isSuccessResApplicantGet, applicantData]);

  useEffect(() => {
    switch (tab) {
      case 'all-tenders':
        setSelectedList(1)
        break;
      case 'live-tenders':
        setSelectedList(2)
        break;
      case 'live-auctions':
        setSelectedList(3)
        break;
      case 'pending-tenders':
        setSelectedList(4)
        break;
      case 'final-submitted':
        setSelectedList(5)
        break;
      case 'completed-tenders':
        setSelectedList(6)
        break;
      default:
        setSelectedList(1)
        break;
    }
  }, [tab]);

  const handleSelectList = (listNumber) => {
    setSelectedList(listNumber);
    let tabValue;
    switch (listNumber) {
      case 1:
        tabValue = 'all-tenders';
        break;
      case 2:
        tabValue = 'live-tenders';
        break;
      case 3:
        tabValue = 'live-auctions';
        break;
      case 4:
        tabValue = 'pending-tenders';
        break;
      case 5:
        tabValue = 'final-submitted';
        break;
      case 6:
        tabValue = 'completed-tenders';
        break;
      default:
        tabValue = 'all-tenders';
        break;
    }
    history.push(`/dashboard?tab=${tabValue}`);
  }

  return (
    <div className={classes.mainRoot}>
      {(isFetchingApplicantGet ||
        isFetchingStepper) && (
          <Loading
            isOpen={
              isFetchingApplicantGet || isFetchingStepper
            }
          />
        )}
      {isErrorApplicantGet && (
        <AlertBox severity="error">{errorMessageGet}</AlertBox>
      )}
      {/* <Typography variant="h4" className={classes.pageInfoText}>{t("dashboard.titleTxt1")} <strong>{applicantData?.FirstName}<Hidden smDown>,</Hidden></strong> {t("dashboard.titleTxt2")}</Typography> */}
      <FormCard>
        <Box className={classes.tabsection}>
          <Grid item className={classes.dashboardHeadingCon}>
            <Typography className={classes.secText}>My Dashboard</Typography>
          </Grid>
          <Box className={classes.topTabSection}>
            <DashboardBox
              title={"All Tenders"}
              count={isFetchingDashboardCounts ? <CircularProgress/> :dashboardCountsData?.AllTender?.count}
              color="#00B0F0"
              selectedColor="#F6FCF9"
              icon={<AlltenderIcon />}
              handleClick={() => handleSelectList(1)}
              selected={selectedList === 1 ? true : false}
              tooltipContent={"All tenders will be visible here"}
              isFetching={isFetchingDashboardCounts}
            />
            <DashboardBox
              title={"Live Tenders"}
              count={dashboardCountsData?.liveTender?.count}
              color="#4B38B3"
              selectedColor="#F6F5FB"
              icon={<EventAvailableIcon style={{ color: "#fff" }} />}
              handleClick={() => handleSelectList(2)}
              selected={selectedList === 2 ? true : false}
              tooltipContent={"Only live tenders will be visible here"}
              isFetching={isFetchingDashboardCounts}
            />
            <DashboardBox
              title={"My Live Auctions"}
              count={dashboardCountsData?.liveAuction?.count}
              color="#F06548"
              selectedColor="#FEF7F6"
              icon={<GavelIcon style={{ color: "#fff" }} />}
              handleClick={() => handleSelectList(3)}
              selected={selectedList === 3 ? true : false}
              tooltipContent={
                "Your tenders which you have applied whose live auction is started will be visible here"
              }
              isFetching={isFetchingDashboardCounts}
            />
            <DashboardBox
              title={"My Pending Tenders"}
              count={dashboardCountsData?.pendingTender?.count}
              color="#FFBE0B"
              selectedColor="#FFFCF3"
              icon={<PendingIcon />}
              handleClick={() => handleSelectList(4)}
              selected={selectedList === 4 ? true : false}
              tooltipContent={"Your incomplete tenders will be visible here"}
              isFetching={isFetchingDashboardCounts}
            />
            <DashboardBox
              title={"Final submitted Tenders"}
              count={dashboardCountsData?.finalSubmittedTender?.count}
              color="#04D3BC"
              selectedColor="#F2FDFC"
              icon={<SubmittedIcon />}
              handleClick={() => handleSelectList(5)}
              selected={selectedList === 5 ? true : false}
              tooltipContent={
                "Your final submitted tenders whose live auction is not started yet will be visible here"
              }
              isFetching={isFetchingDashboardCounts}
            />
            <DashboardBox
              title={"My Completed Tenders"}
              count={dashboardCountsData?.mycompleteteTender?.count}
              color="#45CB85"
              selectedColor="#F6FCF9"
              icon={<VerifiedDocIcon />}
              handleClick={() => handleSelectList(6)}
              selected={selectedList === 6 ? true : false}
              tooltipContent={
                "Your tenders whose live auction is completed will be visible here"
              }
              isFetching={isFetchingDashboardCounts}
            />
            {/* isPendingDocUpload={isPendingDocUpload} */}
            {/* <UserProjects applicantData={applicantData} reservationCategory={allCategory} doclist = {documentUploaded} isDataSuccess={isSuccessResApplicantGet} /> */}
          </Box>
          <Divider style={{ margin: 16 }} />
          {selectedList === 1 && <AllTendersTab />}
          {selectedList === 2 && <LiveTender />}
          {selectedList === 3 && <MyLiveAuctionTab />}
          {selectedList === 4 && <MyPendingTenders />}
          {selectedList === 5 && <FinalSubmittedTenders />}
          {selectedList === 6 && <WinnerPage />}
        </Box>
        <Divider />
        <Box className={classes.latestUpdatesSection}>
          <Typography variant="h4" className={classes.sectionTitle}>
            {t("dashboard.latestUpdatesTitleTxt")}
          </Typography>
          <Grid container>
            <Grid item md={8} className={classes.impDatesSec}>
              <ImportantDates />
            </Grid>
            <Grid item md={4}>
              <Notifications />
            </Grid>
          </Grid>
        </Box>
        {/* <Box className={classes.recentPostsSection}>
          <Typography variant="h4" className={`${classes.sectionTitle} rcntPost`}>{t("dashboard.recentPostTitleTxt")}</Typography>
          <RecentPosts />
        </Box> */}
      </FormCard>
    </div>
  );
};

export default withWidth()(Dashboard);
