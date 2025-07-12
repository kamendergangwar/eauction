import React from "react";
import Header from "../../atoms/Header/Header";
import StepperBar from "../../atoms/StepperBar/StepperBar";
// import StepperDrawer from "../../atoms/StepperDrawer/StepperDrawer";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
// import Typography from "@material-ui/core/Typography";
// import { useTranslation } from "react-i18next";
import { layoutStyles } from "./Layout.styles";

const NotificationPageLayout = (props) => {
  const { isStepper, children, width, step } = props;
  const classes = layoutStyles();

  return (
    <>
      <div className={`${classes.background} loggedIn`}>
        <Header />
        <div className={classes.mainSection}>
          <Container
            className={`${classes.root} notifyPage noInnerScroll`}
          >
            {children}
          </Container>
        </div>
      </div>
    </>
  );
};

export default withWidth()(NotificationPageLayout);
