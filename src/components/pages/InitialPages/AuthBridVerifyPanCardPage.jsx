import React, { useState } from "react";
import AuthBridgeVerifyPanCard from "../../organisms/InitialPagesComponents/AuthBridge/AuthBridgeVerifyPanCard/AuthBridgeVerifyPanCard";
import { useEffect } from "react";
import { getApplicant } from "../../../redux/features/applicant/ApplicantSlice";
import { useDispatch } from "react-redux";

const AuthBridVerifyPanCardPage = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getApplicant());
    },[])
  return <AuthBridgeVerifyPanCard />;
};

export default AuthBridVerifyPanCardPage;
