import React from "react";
//import Dashboard from "../../../organisms/DashboardPageComponents/Dashboard/Dashboard";
import BidApplication from "../../organisms/E-auctionSelectProject/Application/BidApplication";
import ApplyTenderLayout from "../Layout/ApplyTenderLayout";


const ApplynowPage = () => {
  return (
    <ApplyTenderLayout isStepper={true} noScrollIs={true}>
      {/* <Dashboard /> */}
      {/* <ApplicationCard/> */}
      <BidApplication/>
    </ApplyTenderLayout>
  );
};

export default ApplynowPage;
