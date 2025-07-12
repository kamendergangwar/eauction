import React from "react";
import { ThoughtrainsLogo, HeliosAdvisoryLogo } from "../../atoms/SvgIcons/SvgIcons";
import { initialPagesStyles } from "../../organisms/InitialPagesComponents/InitialPages.styles"
import LogInWithOtp from "../../organisms/InitialPagesComponents/LogInWithOtp/LogInWithOtp";

const LogInWithOtpPage = () => {
  const classes = initialPagesStyles();
  return <>
    <LogInWithOtp />
    {/* <Box className={classes.footerContainer}>Powered by <ThoughtrainsLogo />  <span>&</span> <HeliosAdvisoryLogo/> </Box> */}
  </>;
};

export default LogInWithOtpPage;
