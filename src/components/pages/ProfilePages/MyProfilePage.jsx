import React from "react";
import Layout from "../Layout/Layout";
import ProfileSummary from "../../organisms/ProfilePageComponents/ProfileSummary/ProfileSummary";

function MyProfilePage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <ProfileSummary />
        </Layout>
    );
}

export default MyProfilePage;
