import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import PersonalDetailsForm from "../../organisms/PersonalDetailsPageComponents/PersonalDetailsForm/PersonalDetailsForm";
import { applicantSelector, getApplicant } from "../../../redux/features/applicant/ApplicantSlice";
import { useDispatch, useSelector } from "react-redux";
import NonIndividualBidderForm from "../../organisms/E-auctionSelectProject/NonIndividual/NonIndividualBidderForm";
import Loading from "../../atoms/Loading/Loading";

const PersonalDetailsPage = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getApplicant());

  },[])
 
  const {
    isFetchingApplicant,
    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,

  } = useSelector(applicantSelector);
  return (
    <>
      {isFetchingApplicantGet && <Loading isOpen={isFetchingApplicantGet} />}
    <Layout isStepper={true} step={0}>
     {applicantData?.register_type === 'individual' && <PersonalDetailsForm />}
     {applicantData?.register_type === 'company' && <NonIndividualBidderForm />}
    </Layout>
    </>
  );
};

export default PersonalDetailsPage;
