import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { kycCardStyles } from "../KycCard/KycCard.style";

function KycCard(props) {
  const { children } = props;
  const classes = kycCardStyles();
  return (
    <div className={classes.authSectionMain}>
      <Container maxWidth="md" className={classes.containerRoot}>
        <Paper className={classes.kycPaperCont}>{children}</Paper>
      </Container>
    </div>
  );
}

export default KycCard;
