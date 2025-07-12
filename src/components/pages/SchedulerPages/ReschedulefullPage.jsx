import React from "react";
import Layout from "../Layout/Layout";
import Reschedule from "../../organisms/SchedulerPageComponents/Reschedule";

function ReschedulefullPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <Reschedule />
        </Layout>
    );
}

export default ReschedulefullPage;