import React from "react";
import PaymentSuccessLayout from "../Layout/PaymentSuccessLayout";
import PaymentSuccessful from "../../organisms/PaymentSuccessfulPageComponents/PaymentSuccessful/PaymentSuccessful";

const PaymentSuccessfulPage = () => {
  return (
    <PaymentSuccessLayout>
      <PaymentSuccessful />
    </PaymentSuccessLayout>
  );
};

export default PaymentSuccessfulPage;
