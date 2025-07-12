import React from "react";
import Layout from "../Layout/Layout";
import AgreementLetter from "../../organisms/ProfilePageComponents/AgreementLetter/AgreementLetter";

function AgreementLetterPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <AgreementLetter />
        </Layout>
    );
}

export default AgreementLetterPage;
