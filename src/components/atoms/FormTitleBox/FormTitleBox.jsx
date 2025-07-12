import React from "react";
import Grid from "@material-ui/core/Grid";
import { BlackBackArrowIcon } from "../SvgIcons/SvgIcons";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const styles = makeStyles((theme) => ({
  title: {
    color: "#00437E",
    fontWeight: 700,
    marginLeft: theme.spacing(2),
    "& small": {
      color: "#7a7a7a"
    }
  },
  container: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2),
    position: "relative"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "start"
    }
  },
  backBtn: {
    position: "absolute",
    top: "50%",
    left: theme.spacing(2),
    transform: "translateY(-50%)",
  }
}));

function FormTitleBox(props) {
  const { title, backUrl, titleIcon, optionalTxt } = props;
  const classes = styles();
  const history = useHistory();

  const goBackCallBackFun = () => {
    if (backUrl) {
      if (backUrl === "back") {
        history.goBack();
      } else {
        history.push(backUrl);
      }
    }
  };

  return (
    <Grid className={classes.container}>
      {backUrl &&
        <Hidden smDown>
          <IconButton className={classes.backBtn} onClick={() => goBackCallBackFun()}>
            <BlackBackArrowIcon fontSize="small" />
          </IconButton>
        </Hidden>
      }
      <Box className={classes.headerContainer}>
        <Hidden smDown>
          {titleIcon}
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          {title} {optionalTxt && <small>({optionalTxt})</small>}
        </Typography>
      </Box>
    </Grid>
  );
}

export default FormTitleBox;
