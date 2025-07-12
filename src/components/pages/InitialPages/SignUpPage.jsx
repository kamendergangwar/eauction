import React from "react";
import SignUp from "../../organisms/InitialPagesComponents/SignUp/SignUp";
import Box from "@material-ui/core/Box";
import { ThoughtrainsLogo, HeliosAdvisoryLogo } from "../../atoms/SvgIcons/SvgIcons";
import { initialPagesStyles } from "../../organisms/InitialPagesComponents/InitialPages.styles"

const SignUpPage = () => {
  const classes = initialPagesStyles();
  return <>
    <SignUp />
    {/* <Box className={classes.footerContainer}>Powered by <ThoughtrainsLogo />  <span>&</span> <HeliosAdvisoryLogo/> </Box> */}
    <Box className={classes.footerContainer}>Version 0.1.0</Box>
  </>;
};

export default SignUpPage;
