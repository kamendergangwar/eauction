import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GrievanceTabStyles } from "./GrievanceTab.styles";
import DefaultMessageBox from "../../../../atoms/DefaultMessageBox/DefaultMessageBox";
import RaiseGrievance from "../RaiseGrievance/RaiseGrievance";
import GrievanceForm from "../GrievanceForm/GrievanceForm";
import GrievanceUploadImageForm from "../GrievanceUploadImageForm/GrievanceUploadImage";
import GrievanceThankuForm from "../GrievanceThankuForm/GrievanceThankuForm";
import TrackGrievanceTable from "../TrackGrievanceTable/TrackGrievanceTable";
import GrievanceDetailsView from "../GrievanceDetailsView/GrievanceDetailsView";
import { useSelector, useDispatch } from "react-redux";
import {
  applicantSelector,
  getApplicant,
} from "../../../../../redux/features/applicant/ApplicantSlice";
import {
  grievanceSelector,
  searchGrievance,
  getGrievanceCategories,
  getGrievanceType,
  getGrievanceStatus,
} from "../../../../../redux/features/Grievance/GrievanceSlice";

const GrievanceTab = () => {
  const classes = GrievanceTabStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const [grievanceSecStates, setGrievanceSecStates] = React.useState("default");
  const [griDetailsData, setGriDetailsData] = React.useState("");
  const [phnNumber, setPhnNumber] = useState("");
  const [formData, setformData] = useState({});
  const [isInitial, setIsInitial] = React.useState(true);
  const dispatch = useDispatch();
  const { isFetchingApplicant, isSuccessResApplicant, applicantData } =
    useSelector(applicantSelector);
  const { issearchSuccess, searchData } = useSelector(grievanceSelector);

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getGrievanceCategories());
    dispatch(getGrievanceType());
    dispatch(getGrievanceStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessResApplicant) {
      // console.log(applicantData.MobileNo);
      setPhnNumber(
        applicantData?.MobileNo.length > 0 && applicantData.MobileNo
      );
      const tempObj = {
        mobile: applicantData.MobileNo,
      };
      // dispatch(searchGrievance(tempObj));
    }
  }, [isSuccessResApplicant]);

  // useEffect(() => {
  //   console.log(searchData, "searchData");
  //   if (issearchSuccess && searchData.length) {
  //     if (searchData?.length > 0) {
  //       setGrievanceSecStates("table");
  //     } else {
  //       setGrievanceSecStates("default");
  //     }
  //   }
  // }, [issearchSuccess]);

  const setStateEvent = (state) => {
    if(state=="form"){
      setGrievanceSecStates("form");
    }else if(state=="table"){
      setGrievanceSecStates("table");
    }
    
  };

  return (
    <div className={classes.root}>
      {/* {isProjectDataFetching && <Loading isOpen={isProjectDataFetching} />}
      {isProjectDataError && <AlertBox severity="error">{projectDataErrorMessage}</AlertBox>} */}
      {grievanceSecStates === "default" && (
        // <DefaultMessageBox
        //   firstLineMsg={t("grievanceTabDefaultSection.firstLineErrorMsg")}
        //   secdLineMsg={t("grievanceTabDefaultSection.secondLineErrorMsg")}
        //   actionBtnTxt={t("grievanceTabDefaultSection.actionButtonText")}
        //   action={setStateEvent}
        // />
        <RaiseGrievance  action={setStateEvent} />
      )}
      {grievanceSecStates === "form" && (
        <GrievanceForm setGrievanceSecStates={setGrievanceSecStates} />
      )}

      {grievanceSecStates === "uploadImageForm" && (
        <GrievanceUploadImageForm setGrievanceSecStates={setGrievanceSecStates} setformData={setformData} />
      )}

      {grievanceSecStates === "thankYou" && (
        <GrievanceThankuForm setGrievanceSecStates={setGrievanceSecStates} grievanceResponse={formData} />
      )}
      {grievanceSecStates === "table" && (
        <TrackGrievanceTable
          setGriDetailsData={setGriDetailsData}
          setGrievanceSecStates={setGrievanceSecStates}
          phnNumber={phnNumber}
        />
      )}
      {grievanceSecStates === "details" && (
        <GrievanceDetailsView
          setGrievanceSecStates={setGrievanceSecStates}
          itemDetails={griDetailsData}
          phnNumber={phnNumber}
        />
      )}
    </div>
  );
};

export default GrievanceTab;
