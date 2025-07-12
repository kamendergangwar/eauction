import React from "react";
import Layout from "../../Layout/Layout";
import StartFresh from "../../../organisms/ProfilePageComponents/OtherRequestPageComponents/StartFreshPageComponents/StartFresh";

function StartFreshPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <StartFresh/>
        </Layout>
    );
}
export default StartFreshPage;
