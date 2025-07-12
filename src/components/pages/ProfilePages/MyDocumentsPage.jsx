import React from "react";
import Layout from "../Layout/Layout";
import MyDocuments from "../../organisms/ProfilePageComponents/MyDocuments/MyDocuments";

function MyDocumentsPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <MyDocuments />
        </Layout>
    );
}

export default MyDocumentsPage;
