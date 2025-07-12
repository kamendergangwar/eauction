import React from "react";
import Layout from "../Layout/Layout";
import MyAllotmentLetter from "../../organisms/ProfilePageComponents/MyAllotmentLetter/MyAllotmentLetter";

function MyAllotmentLetterPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <MyAllotmentLetter />
        </Layout>
    );
}

export default MyAllotmentLetterPage;
