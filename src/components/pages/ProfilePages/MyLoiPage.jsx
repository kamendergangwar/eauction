import React from "react";
import Layout from "../Layout/Layout";
import MyLoi from "../../organisms/ProfilePageComponents/MyLoi/MyLoi";

function MyLoiPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <MyLoi />
        </Layout>
    );
}

export default MyLoiPage;
