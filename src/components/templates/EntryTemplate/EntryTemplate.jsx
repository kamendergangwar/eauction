import React from "react";
import Header from "../../atoms/Header/Header";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { entryTemplateStyles } from "./EntryTemplate.styles";

const EntryTemplate = (props) => {
  const { children } = props;
  const classes = entryTemplateStyles();
  return (
    <>
      <Header />
      <div className={classes.background}>
        <Container maxWidth="md" className={classes.containerRoot}>
          <Paper elevation={4}>{children}</Paper>
        </Container>
      </div>
    </>
  );
};

export default EntryTemplate;
