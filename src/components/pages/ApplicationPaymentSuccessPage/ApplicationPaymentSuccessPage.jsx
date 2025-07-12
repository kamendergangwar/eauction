import React from "react";
import PaymentSuccessLayout from "../Layout/PaymentSuccessLayout";
import ApplicationPaymentSuccessful from "../../organisms/ApplicationPaymentSuccessPage/ApplicationPaymentSuccessful";

const ApplicationPaymentSuccessPage = () => {
  return (
    <PaymentSuccessLayout>
     <ApplicationPaymentSuccessful/>
    </PaymentSuccessLayout>
  );
};

export default ApplicationPaymentSuccessPage;
