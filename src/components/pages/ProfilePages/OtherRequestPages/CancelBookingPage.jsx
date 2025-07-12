import React from "react";
import CancelBooking from "../../../organisms/ProfilePageComponents/OtherRequestPageComponents/CancelBookingPageComponents/CancelBooking";
import Layout from "../../Layout/Layout";

function CancelBookingPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <CancelBooking />
        </Layout>
    );
}
export default CancelBookingPage;
