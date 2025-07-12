import React from "react";
import Layout from "../Layout/Layout";
import BookSlot from "../../organisms/SchedulerPageComponents/BookSlot/BookSlot";

function SelectSlotPage() {
    return (
        <Layout isStepper={false} noScrollIs={true}>
            <BookSlot />
        </Layout>
    );
}

export default SelectSlotPage;