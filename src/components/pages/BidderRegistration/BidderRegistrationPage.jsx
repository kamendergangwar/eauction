import React from "react";

import Layout from "../Layout/Layout";
import BidderRegistration from "../../organisms/RegistrationComponents/BidderRegistration";
//import BiddingDetail from "../../organisms/DashboardPageComponents/BiddingDetail/BiddingDetail";

const BidderRegistrationPage = () => {
    return (
        <Layout isStepper={true} step={1} width='1300px' noScrollIs={true} bidder={true} >

            <BidderRegistration />

        </Layout>
    );
};

export default BidderRegistrationPage;