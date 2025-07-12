import React, { useState } from "react";
import AuthBridgeVerifyAadhaar from "../../organisms/InitialPagesComponents/AuthBridge/AuthBridgeVerifyAadhaar/AuthBridgeVerifyAadhaar";
import AuthBridgeOTPVerify from "../../organisms/InitialPagesComponents/AuthBridge/AuthBridgeOTPVerify/AuthBridgeOTPVerify";

const AuthBridVerifyAadhaarPage = () => {
  const [next, setNext] = useState(false);

  const handleOnChange = (value) => {
    setNext(value);
  };

  const MainSection = () => {
    if (!next) {
      return <AuthBridgeVerifyAadhaar onValueChange={handleOnChange} />;
    } else {
      return <AuthBridgeOTPVerify onValueChange={handleOnChange} />;
    }
  };

  return <MainSection />;
};

export default AuthBridVerifyAadhaarPage;
