import React from "react";
//import ApplicationFeeView from "../../organisms/ApplicationFeePageComponent/ApplicationFeeComponent/ApplicationFeeView";
import Layout from "../Layout/Layout";
import EmdPayment from "../../organisms/E-auctionSelectProject/EmdPayment";
// import FormTemplate from "../../templates/FormTemplate/FormTemplate";

// import GenericCard from "../../molecules/Cards/GenericCard/GenericCard";

const ApplicationFeePage = () => {
  return (
    <Layout isStepper={true} step={3}>
   {/* <ApplicationFeeView/> */}
<EmdPayment/>
    </Layout>
  );
};

export default ApplicationFeePage;
