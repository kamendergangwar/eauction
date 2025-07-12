import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Loading = (props) => {
  const { isOpen } = props;
  const classes = useStyles();
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setError('Something Went Wrong. Please try again!');
  //   }, 60000);
  //   return () => clearTimeout(timeoutId);
  // }, []);

  return (
    <>
      <Backdrop className={classes.backdrop} open={isOpen}>
        <CircularProgress color="inherit" />
        {/* {error && <p>{error}</p>} */}
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

export default Loading;
