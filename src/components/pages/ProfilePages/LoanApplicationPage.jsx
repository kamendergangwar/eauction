import React from "react";
import Layout from "../Layout/Layout";
import LoanApplication from "../../organisms/ProfilePageComponents/LoanApplication/LoanApplication";

function LoanApplicationPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <LoanApplication />
        </Layout>
    );
}

export default LoanApplicationPage;
