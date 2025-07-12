import React from "react";
import PaymentSuccessLayout from "../Layout/PaymentSuccessLayout";
//import ApplicationPaymentSuccessful from "../../organisms/ApplicationPaymentSuccessPage/ApplicationPaymentSuccessful";
import EauctionFeeSuccessful from "../../organisms/EauctionFeePaymentSuccessful/EauctionFeeSuccessful";

const EauctionFeePage = () => {
  return (
    <PaymentSuccessLayout>
     <EauctionFeeSuccessful/>
    </PaymentSuccessLayout>
  );
};

export default EauctionFeePage;