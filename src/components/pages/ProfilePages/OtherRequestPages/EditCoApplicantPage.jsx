import React from "react";
import Layout from "../../Layout/Layout";
import EditCoApplicant from "../../../organisms/ProfilePageComponents/OtherRequestPageComponents/EditCoApplicantPageComponent/EditCoApplicant";

function EditCoApplicantPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <EditCoApplicant />
        </Layout>
    );
}
export default EditCoApplicantPage;
