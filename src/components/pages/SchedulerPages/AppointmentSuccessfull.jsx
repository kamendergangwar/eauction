import React from "react";
import Layout from "../Layout/Layout";
import AppointmentSucsessfull from "../../organisms/SchedulerPageComponents/AppointmentSuccessfull";

function AppointmentSuccessfullPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <AppointmentSucsessfull />
        </Layout>
    );
}

export default AppointmentSuccessfullPage;
