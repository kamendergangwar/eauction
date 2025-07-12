import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    position: "absolute",
  },
}));

const CompLoading = (props) => {
  const { isOpen } = props;
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
      </Box> */}
    </>
  );
};

export default CompLoading;
