import React from "react";
import Layout from "../Layout/Layout";
// import TermsConditions from "../../organisms/InitialPagesComponents/TermsConditions/TermsConditions";
import NonIndividualBidderForm from "../../organisms/E-auctionSelectProject/NonIndividual/NonIndividualBidderForm";

const AuthVerifyCinPage = () => {
  return (
    
     <Layout isStepper={true} step={0}>
     <NonIndividualBidderForm />
   
   </Layout>
  );
};

export default AuthVerifyCinPage;
