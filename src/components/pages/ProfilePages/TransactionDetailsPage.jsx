import React from "react";
import Layout from "../Layout/Layout";
import TransactionDetails from "../../organisms/ProfilePageComponents/TransactionDetails/TransactionDetails";

function TransactionDetailsPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <TransactionDetails />
        </Layout>
    );
}

export default TransactionDetailsPage;
