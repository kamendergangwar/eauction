import React from "react";
import AgentHeader from "../../atoms/AgentHeader/AgentHeader";
import StepperBar from "../../atoms/StepperBar/StepperBar";
// import StepperDrawer from "../../atoms/StepperDrawer/StepperDrawer";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
// import Typography from "@material-ui/core/Typography";
// import { useTranslation } from "react-i18next";
import { AgentLayoutStyles } from "./AgentLayout.styles";

const AgentLayout = (props) => {
  const { children, width } = props;
  const classes = AgentLayoutStyles();

  return (
    <>
      <AgentHeader />
      <div className={classes.background}>
        <Container
          maxWidth={width === "sm" ? "md" : width}
          className={classes.root}
        >
          {children}
        </Container>
      </div>
    </>
  );
};

export default withWidth()(AgentLayout);
