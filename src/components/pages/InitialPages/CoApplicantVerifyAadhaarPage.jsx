import React, { useEffect, useState } from "react";
import AuthBridgeVerifyAadhaar from "../../organisms/InitialPagesComponents/CoApplicantAuthBridge/AuthBridgeVerifyAadhaar/AuthBridgeVerifyAadhaar";
import AuthBridgeOTPVerify from "../../organisms/InitialPagesComponents/CoApplicantAuthBridge/AuthBridgeOTPVerify/AuthBridgeOTPVerify";
import { useDispatch, useSelector } from "react-redux";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CoApplicantVerifyAadhaarPage = () => {
  const [next, setNext] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory();
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [sentOTPResponseData, setSentOTPResponseData] = useState({});
  const [mahaItFailed, setMahaItFailed] = useState(false);
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);

  useEffect(() => {
    dispatch(getApplicantProgress());
  }, []);

  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach((item) => {
        if (item.StepId == "8" && item.Status == "completed") {
          history.push("/dashboard");
        }
      });
    }
  }, [isSuccessProgressResStepper]);


  const handleOnChange = (value) => {
    setNext(value);
  };

  const MainSection = () => {
    if (!next) {
      return <AuthBridgeVerifyAadhaar onValueChange={handleOnChange} mahaItFailed={mahaItFailed} setMahaItFailed={setMahaItFailed} customErrorMsg={customErrorMsg} setCustomErrorMsg={setCustomErrorMsg} setSentOTPResponseData={setSentOTPResponseData} />;
    } else {
      return <AuthBridgeOTPVerify onValueChange={handleOnChange} mahaItFailed={mahaItFailed} setMahaItFailed={setMahaItFailed} setCustomErrorMsg={setCustomErrorMsg} sentOTPResponseData={sentOTPResponseData} />;
    }
  };

  return <MainSection />;
};

export default CoApplicantVerifyAadhaarPage;
