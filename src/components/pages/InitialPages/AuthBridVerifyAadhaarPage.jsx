import React, { useEffect, useState } from "react";
import AuthBridgeVerifyAadhaar from "../../organisms/InitialPagesComponents/AuthBridge/AuthBridgeVerifyAadhaar/AuthBridgeVerifyAadhaar";
import AuthBridgeOTPVerify from "../../organisms/InitialPagesComponents/AuthBridge/AuthBridgeOTPVerify/AuthBridgeOTPVerify";
import { getApplicant } from "../../../redux/features/applicant/ApplicantSlice";
import { useDispatch } from "react-redux";

const AuthBridVerifyAadhaarPage = () => {
  const [next, setNext] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [mahaItFailed , setMahaItFailed] = useState(false);
const dispatch =useDispatch();
  const handleOnChange = (value) => {
    setNext(value);
  };
  useEffect(()=>{
    dispatch(getApplicant());
    },[])
  const MainSection = () => {
    if (!next) {
      return <AuthBridgeVerifyAadhaar onValueChange={handleOnChange} mahaItFailed={mahaItFailed} setMahaItFailed={setMahaItFailed} customErrorMsg={customErrorMsg} setCustomErrorMsg={setCustomErrorMsg} />;
    } else {
      return <AuthBridgeOTPVerify onValueChange={handleOnChange} setCustomErrorMsg={setCustomErrorMsg}  mahaItFailed={mahaItFailed} setMahaItFailed={setMahaItFailed}/>;
    }
  };

  return <MainSection />;
};

export default AuthBridVerifyAadhaarPage;
