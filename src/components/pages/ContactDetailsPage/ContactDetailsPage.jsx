import React from "react";
import Layout from "../Layout/Layout";
import ContactDetailsForm from "../../organisms/ContactDetailsPageComponents/ContactDetailsForm/ContactDetailsForm";

const ContactDetailsPage = () => {
  return (
    <Layout isStepper={true} step={0}>
      <ContactDetailsForm />
    </Layout>
  );
};

export default ContactDetailsPage;
