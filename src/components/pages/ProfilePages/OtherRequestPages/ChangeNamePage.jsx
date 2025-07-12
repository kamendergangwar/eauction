import React from "react";
import Layout from "../../Layout/Layout";
import ChangeName from "../../../organisms/ProfilePageComponents/OtherRequestPageComponents/ChangeNamePageComponent/ChangeName";

function ChangeNamePage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <ChangeName />
        </Layout>
    );
}
export default ChangeNamePage;
