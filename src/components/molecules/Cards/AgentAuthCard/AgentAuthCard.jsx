import React from "react";
// import Header from "../../../atoms/Header/Header";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { AgentAuthCardStyles } from "./AgentAuthCard.styles";

const AgentAuthCard = (props) => {
  const { children } = props;
  const classes = AgentAuthCardStyles();
  return (
    <>
      {/* <Header /> */}
      <div className={classes.background}>
        <Container maxWidth="md" className={classes.containerRoot}>
          <Paper elevation={4}>{children}</Paper>
        </Container>
      </div>
    </>
  );
};

export default AgentAuthCard;
