import { Typography } from "@material-ui/core";
import React from "react";
import { Box, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EStampWhiteIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import { ClockIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    fontSize: "14px",
  },
  subTitle: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#4C5D6C",
    lineHeight: "24px",
    maxWidth: "629px",
  },
}));

function EstampingPending() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      m={1}
      p={1}
      container
      spacing={1}
      style={{
        backgroundColor: "rgba(255, 0, 0, 0.05)",
        borderRadius: "5px",
        padding: "20px",
        marginLeft: "1px",
      }}
    >
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <ClockIcon fontSize="small" />
          &nbsp;
          <Typography
            color="error"
            variant="subtitle1"
            className={classes.title}
            ml={1}
          >
            E-Staping and E-Signing PENDING
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={8} p={1}>
        <Typography
          color="textPrimary"
          variant="subtitle1"
          className={classes.subTitle}
        >
          Your E-Stamping and E-Signing process is pending. Your application
          will NOT be considered untill E-Signing is completed
        </Typography>
      </Grid>
      <Grid item lg={4}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          startIcon={<EStampWhiteIcon />}
          fullWidth
          style={{ textTransform: "capitalize", wmaxWidth: "411px" }}
          onClick={() => history.push("/estamping-documents")}
        >
          Complete E-Stamping and E-Signing
        </Button>
      </Grid>
    </Grid>
  );
}

export default EstampingPending;
