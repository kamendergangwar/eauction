import React from "react";
import { ThoughtrainsLogo, HeliosAdvisoryLogo } from "../../atoms/SvgIcons/SvgIcons";
import { initialPagesStyles } from "../../organisms/InitialPagesComponents/InitialPages.styles"
import QuestionOneFamilyIncome from "../../organisms/InitialPagesComponents/BankKyc/QuestionOneFamilyIncome/QuestionOneFamilyIncome";

function Question1FamilyIncomePage() {
  const classes = initialPagesStyles();
  return <>
    <QuestionOneFamilyIncome />
    {/* <Box className={classes.footerContainer}>Powered by <ThoughtrainsLogo />  <span>&</span> <HeliosAdvisoryLogo /> </Box> */}
  </>;
}

export default Question1FamilyIncomePage;
