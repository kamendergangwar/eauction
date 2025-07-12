import React from "react";
import Layout from "../Layout/Layout";
import ScheduleAppointment from "../../organisms/SchedulerPageComponents/ScheduleAppointment";

function SchedulerPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <ScheduleAppointment />
        </Layout>
    );
}

export default SchedulerPage;
