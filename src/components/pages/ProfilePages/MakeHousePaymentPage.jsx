import React from "react";
import Layout from "../Layout/Layout";
import MakeHousePayment from "../../organisms/ProfilePageComponents/MakeHousePayment/MakeHousePayment";

function MakeHousePaymentPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <MakeHousePayment />
        </Layout>
    );
}

export default MakeHousePaymentPage;
