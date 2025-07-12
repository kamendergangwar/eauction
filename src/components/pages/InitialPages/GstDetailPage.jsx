import React, { useEffect, useState } from "react";
import GstDetails from "../../organisms/E-auctionSelectProject/GstDetails";
import { getApplicant } from "../../../redux/features/applicant/ApplicantSlice";
import { useDispatch } from "react-redux";

const GstDetailPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplicant());
  }, [])
  return (
    <>
      <GstDetails />
    </>
  )
}





export default GstDetailPage;
