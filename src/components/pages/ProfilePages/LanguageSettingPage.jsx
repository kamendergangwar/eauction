import React from "react";
import Layout from "../Layout/Layout";
import LanguageSetting from "../../organisms/ProfilePageComponents/LanguageSetting/LanguageSetting";

function LanguageSettingPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <LanguageSetting />
        </Layout>
    );
}

export default LanguageSettingPage;
