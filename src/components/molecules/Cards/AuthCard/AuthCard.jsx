import React from "react";
// import Header from "../../../atoms/Header/Header";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { authCardStyles } from "./AuthCard.styles";
import { Grid } from "@material-ui/core";

const AuthCard = (props) => {
  const { children } = props;
  const classes = authCardStyles();
  
  return (
    <>
      {/* <Header /> */}
      <div className={classes.authSectionMain}>
        <Grid container>
          <Grid item lg={12} xs={12} md={12}>
            <Container maxWidth="md" className={classes.containerRoot}>
              <Paper className={classes.authRoot}>{children}</Paper>
            </Container>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AuthCard;
