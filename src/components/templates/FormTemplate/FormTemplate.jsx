import React from "react";
import GenericCard from "../../molecules/Cards/GenericCard/GenericCard";
// import BackButton from "../../atoms/BackButton/BackButton";

const FormTemplate = (props) => {
  const { children } = props;
  return (
    <GenericCard>
      {/* <BackButton /> */}
      {children}
    </GenericCard>
  );
};

export default FormTemplate;
