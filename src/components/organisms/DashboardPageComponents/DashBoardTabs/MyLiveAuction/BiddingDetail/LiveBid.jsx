import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import {
  Box,
  Button,
  DialogActions,
  Divider,
  FormLabel,
  Grid,
  Hidden,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { LiveBidStyles } from "./LiveBid.styles";
import {
  LiveBidSelector,
  clearPlaceBidState,
  clearRecentBidsState,
  getRecentBids,
  placeBid,
} from "../../../../../../redux/features/eauction/liveBidSlice";
import Loading from "../../../../../atoms/Loading/Loading";
import FormControl from "../../../../../molecules/FormControl/FormControl";
import CountdownTimer from "../../../../../molecules/CountDownTimer/CountDownTimer";
import SaveIcon from "@material-ui/icons/Save";
import SyncIcon from "@material-ui/icons/Sync";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  convertAmountToWords,
  masterDataSelector,
} from "../../../../../../redux/features/masterdata/MasterDataSlice";
import { debounce } from "lodash";
import { numberWithCommas } from "../../../../../../utils/util";
import {
  getAppliedProjectData,
  getSingleAuctionProject,
} from "../../../../../../redux/features/eauction/eauctionSlice";
import {
  countTimerSelector,
  updateCountDownTime,
  updateDifferenceTime,
} from "../../../../../../redux/features/eauction/countTimerSlice";
import ThreeminTimer from "../../../../../molecules/CountDownTimer/ThreeminTimer";

const Broadcast = {
  POST: "post",
  BROADCAST_URL: "resteauctiondev.cidcohomes.com",
  BROADCAST_PORT: "443",
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0038C0",
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  },
  body: {
    fontSize: 13,
    padding: "0px 24px",
    lineHeight: "3",
    fontWeight: 600,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Connection2(
  url,
  onMessageReceived,
  handleNewPost,
  addSystemMessage,
  projectData
) {
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = new WebSocket(`ws://${url}`);
    // const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    // console.log(protocol);
    const newSocket = new WebSocket(`wss:${url}`);
    newSocket.onopen = () => {
      setOpen(true);
      addSystemMessage("Connected");
      console.log("Connected");
    };

    newSocket.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        const msgData = JSON.parse(data.msg);
        const ProjectId = localStorage.getItem("productId");
        console.log("Received WebSocket data:", msgData);
        if (ProjectId == msgData.data[0].ProjectId) {
          addChatMessage(data.msg);
        }
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    newSocket.onclose = () => {
      setOpen(false);
      addSystemMessage("Disconnected");
      console.log("closed");
    };

    setSocket(newSocket);

    return () => {
      // if (newSocket) {
      //     newSocket.close();
      // }
      if (newSocket.readyState === 1) {
        newSocket.close();
      }
    };
  }, [url]);

  //     const sendMsg = (message) => {
  //         if (socket) {
  //             socket.send(JSON.stringify({ msg: message }));
  //         }
  //     };

  // };

  const sendMsg = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ msg: message }));
    } else {
      console.error("WebSocket is not open. Message not sent.");
    }
  };

  const addChatMessage = (data) => {
    const Data = JSON.parse(data);
    switch (Data.broadType) {
      case Broadcast.POST:
        addNewPost(Data);
        console.log("case post");
        break;
      default:
        console.log("nothing to do");
    }
  };

  const addNewPost = (data) => {
    const newPost = data.data[0];
    handleNewPost(newPost);
  };

  return {
    sendMsg,
  };
}

function LiveBid(props) {
  const { projectData } = props;
  const [systemMessage, setSystemMessage] = useState([]);
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [value, setValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [countdownEnded, setCountdownEnded] = useState(false);
  const [extend, setExtend] = useState(false);
  const [bidclose, setBidClose] = useState(false);
  const [isManualBid, setIsManualBid] = useState(false); // ack if the bid is manual
  const [isRecievedNewBid, setIsRecievedNewBid] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const classes = LiveBidStyles();
  const {
    isFetchingRecentBids,
    isSuccessRecentBids,
    isErrorRecentBids,
    recentBidsData,
    errorMessageRecentBids,

    isFetchingPlaceBid,
    isSuccessPlaceBid,
    isErrorPlaceBid,
    placeBidData,
    errorMessagePlaceBid,
  } = useSelector(LiveBidSelector);

  const { isSuccessAmountToWords, dataAmountToWords } = useSelector(masterDataSelector);

  const {
    isFetchingCountTimer,
    isSuccessCountTimer,
    isErrorCountTimer,
    errorMsgCountTimer,
    countTimerData,
    serverTimerData
  } = useSelector(countTimerSelector);

  const addSystemMessage = (msg) => {
    setSystemMessage((prevMessages) => [...prevMessages, msg]);
  };

  useEffect(() => {
    dispatch(getSingleAuctionProject());
    return () => {
      dispatch(clearRecentBidsState());
      dispatch(clearPlaceBidState());
      handleRefresh();
    };
  }, []);

  useEffect(() => {
    if (projectData) {

      console.log(projectData?.auction_Increment_Timer_Status, "status");
      setExtend(
        projectData?.auction_Increment_Timer_Status === "1" ? true : false
      );

    }
  }, [projectData]);





  useEffect(() => {
    if (newValue) {
      dispatch(convertAmountToWords(newValue));
    }
  }, [newValue]);
  const [timerDifference, setTimerDifference] = useState(serverTimerData?.timediff);
  
  useEffect(() => {
    if (serverTimerData)
      setTimerDifference(serverTimerData.timediff);
  }, [serverTimerData])

  useEffect(() => {
    if (bidclose) {
      const data = {
        ApplicantId: localStorage.getItem("applicantId"),
        ProjectId: localStorage.getItem("productId"),
        eauctionEndDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        auction_Increment_Timer_Status: "2",
      };
      dispatch(updateCountDownTime(data));
      setExtend(false);
    }
  }, [bidclose]);

  useEffect(() => {
    if (isSuccessCountTimer && countTimerData)
      dispatch(getSingleAuctionProject());
  }, [isSuccessCountTimer, countTimerData]);

  const handleWebSocketMessage = (data) => { };

  const handleNewPost = (newPost) => {
    // setPosts((prevPosts) => {
    //     const updatedPosts = [newPost, ...prevPosts].slice(0, 10);
    //     return updatedPosts;
    // });
    setEndTime(newPost?.eauctionEndDate);

    dispatch(getRecentBids(newPost.ProjectId));
    dispatch(getSingleAuctionProject());

    if (newPost.ApplicantId !== localStorage.getItem("applicantId")) {
      setIsRecievedNewBid(true);
    }
  };

  const conn = Connection2(
    Broadcast.BROADCAST_URL + ":" + Broadcast.BROADCAST_PORT,
    handleWebSocketMessage,
    handleNewPost,
    addSystemMessage,
    projectData,

  );

  const initialValues = {
    postText: "",
    confirmBid: false,
  };

  useEffect(() => {
    if (isSuccessRecentBids && recentBidsData && !isManualBid) {
      // setPosts((prevPosts) => [...recentBidsData, ...prevPosts]);
      formikRef.current.setFieldValue(
        "postText",
        recentBidsData?.nextIncrementBidValue
      );
      dispatch(convertAmountToWords(recentBidsData?.nextIncrementBidValue));
    }
  }, [isSuccessRecentBids, recentBidsData]);

  const validationSchema = yup.object().shape({
    postText: yup
      .string()
      .required("Please Enter a bid amount")
      .test(
        "is-higher-than-next-value",
        `Please enter a amount greater than ${recentBidsData?.nextIncrementBidValue}`,
        (value) => {
          if (!value) return false;
          const parsedValue = parseInt(value, 10);
          return parsedValue >= recentBidsData?.nextIncrementBidValue;
        }
      ),
    confirmBid: yup
      .boolean()
      .oneOf([true], "Please confirm your bid before submitting"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      ApplicantId: localStorage.getItem("applicantId"),
      ProjectId: projectData.id,
      BidValue: values.postText,
    };
    dispatch(placeBid(requestData));
    setIsManualBid(false);

  };

  useEffect(() => {
    if (isSuccessPlaceBid && placeBidData) {
      const typeData = { broadType: Broadcast.POST, data: placeBidData };
      conn.sendMsg(JSON.stringify(typeData));
      formikRef.current.resetForm();
      // if (extend) {
      //   const data = {
      //     ApplicantId: localStorage.getItem("applicantId"),
      //     ProjectId: localStorage.getItem("productId"),
      //     eauctionEndDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      //     auction_Increment_Timer_Status: "1",
      //   };
      //   dispatch(updateCountDownTime(data));
      // }
      handleRefresh();


    }
  }, [isSuccessPlaceBid, placeBidData]);

  const debounceFn = useMemo(() => debounce(handleDebounce, 500), []);

  function handleDebounce(inputValue) {
    setNewValue(inputValue);
  }

  function handleChange(event) {
    setValue(event.target.value);
    debounceFn(event.target.value);
    setIsManualBid(true);
  }

  const handleCountdownEnd = () => {
    if (!countdownEnded) {
      console.log("Countdown reached 0. Calling handleRefresh...");
      const data = {
        ApplicantId: localStorage.getItem("applicantId"),
        ProjectId: localStorage.getItem("productId"),
        eauctionEndDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        auction_Increment_Timer_Status: "1",
      };
      dispatch(updateCountDownTime(data));
      setExtend(true);
      setCountdownEnded(true);
    }
    // setShowTimer(true);
  };
  const handleRefresh = () => {
    dispatch(getRecentBids(projectData.id));
    // dispatch(getAppliedProjectData());
    dispatch(getSingleAuctionProject());
    setIsManualBid(false);
  };
  const handleBidClose = () => {
    // Perform actions when bidding is closed

    setBidClose(true);
  };

  return (
    <div>
      <Snackbar
        open={isSuccessPlaceBid}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={3000}
        onClose={() => dispatch(clearPlaceBidState())}
      >
        <Alert
          onClose={() => dispatch(clearPlaceBidState())}
          severity="success"
          variant="filled"
        >
          {errorMessagePlaceBid}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isRecievedNewBid}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={1000}
        onClose={() => setIsRecievedNewBid(false)}
      >
        <Alert
          onClose={() => setIsRecievedNewBid(false)}
          severity="warning"
          variant="filled"
        >
          New Bid added by someone.
        </Alert>
      </Snackbar>
      {isFetchingPlaceBid && <Loading isOpen={isFetchingPlaceBid} />}
      {isErrorPlaceBid && (
        <Alert severity="error" style={{ margin: 8 }}>
          {errorMessagePlaceBid}
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
      >
        {({ submitForm, values, errors, isValid }) => (
          <Form noValidate autoComplete="off">
            <Grid
              container
              xs={12}
              marginBottom={4}
              spacing={2}
              alignItems="center"
            >
              <Grid container direction="column" style={{ gap: 28 }} xs={4}>
                <Grid item>
                  {/* {showTimer && <Grid item>
                                        <Alert severity='warning'> <Typography variant='h6' fontWeight="500" align='center'>Current Highest Bid <strong>{isSuccessRecentBids && <span>₹&nbsp;{numberWithCommas(recentBidsData?.topHighestBid?.BidValue)}</span>}</strong><br /> valid for</Typography> <br /> <ThreeminTimer reset={reset} /></Alert>
                                    </Grid>} */}

                  {extend && !bidclose && (
                    <Grid item>
                      <Alert severity="warning">
                        {" "}
                        <Typography
                          variant="h6"
                          fontWeight="500"
                          align="center"
                        >
                          Current Highest Bid{" "}
                          <strong>
                            {isSuccessRecentBids && (
                              <span>
                                ₹&nbsp;
                                {numberWithCommas(
                                  recentBidsData?.topHighestBid?.BidValue
                                )}
                              </span>
                            )}
                          </strong>
                          <br /> valid for
                        </Typography>
                      </Alert>
                    </Grid>
                  )}
                  {console.log(timerDifference, "differender")}
                  {serverTimerData.timediff && (
                    <CountdownTimer
                      onBidClose={handleBidClose}
                      //targetDate={projectData.eauctionEndDate}
                      // serverTime={projectData?.server_time}
                      onTimerEnd={handleCountdownEnd}
                      isExtended={extend}
                      apiResponse={timerDifference}

                    />
                  )}
                  {/* {showTimer && <ThreeminTimer reset={reset} />
                                    } */}
                </Grid>

                {extend && !bidclose && (
                  <Grid item>
                    <Alert severity="info">
                      <strong>
                        Bid time extends by{" "}
                        {projectData?.auction_Increment_Timer} minutes with each
                        new bid,
                      </strong>{" "}
                      closing only when no bids are placed within that timeframe
                    </Alert>
                  </Grid>
                )}
                {projectData?.eauctionEndDate && !extend && !bidclose && (
                  <Grid item>
                    <Alert severity="info">
                      <strong>Bid already started!</strong> You can bid in this
                      auction before end date and time{" "}
                      <strong>
                        {moment(projectData.eauctionEndDate).format(
                          "MMMM DD, YYYY, h:mm A"
                        )}
                      </strong>
                    </Alert>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={7}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-around"
                  style={{ margin: 8 }}
                >
                  <Grid xs="auto" md={5}>
                    <Typography>Current Highest Bid</Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item xs="auto">
                      <Box className="colonTxt">:</Box>
                    </Grid>
                  </Hidden>
                  <Grid
                    className={`${classes.bidTextBox} large`}
                    md={6}
                    xs={12}
                  >
                    {isSuccessRecentBids && (
                      <span>
                        ₹&nbsp;
                        {numberWithCommas(
                          recentBidsData?.topHighestBid?.BidValue
                        )}
                      </span>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-around"
                  style={{ margin: 8 }}
                >
                  <Grid item xs="auto" md={5}>
                    <Typography>Enter your Bidding Amount</Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item xs="auto">
                      <Box className="colonTxt">:</Box>
                    </Grid>
                  </Hidden>
                  <Grid item md={6} xs={12}>
                    <FormControl
                      type="number"
                      control="input"
                      variant="outlined"
                      label="Enter your Bidding Amount"
                      placeholder="Enter your Bidding Amount"
                      name="postText"
                      onInput={handleChange}

                      id="postText"
                      autoFocus={true}
                      // InputProps={{ inputProps: { step: '1000' } }}
                      required
                      margin="dense"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <b>₹</b>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-around"
                  style={{ margin: 8 }}
                >
                  <Grid item xs="auto" md={5}>
                    <Typography>Confirm Final Bid Amount</Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item xs="auto">
                      <Box className="colonTxt">:</Box>
                    </Grid>
                  </Hidden>
                  <Grid
                    item
                    className={`${classes.bidTextBox} large`}
                    md={6}
                    xs={12}
                  >
                    {!errors.postText && (
                      <span>₹&nbsp;{numberWithCommas(values.postText)}</span>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-around"
                  style={{ margin: 8 }}
                >
                  <Grid item xs="auto" md={5}>
                    <Typography>Confirm Amount In Words</Typography>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item xs="auto">
                      <Box className="colonTxt">:</Box>
                    </Grid>
                  </Hidden>
                  <Grid className={classes.bidTextBox} md={6} xs={12}>
                    {!errors.postText && isSuccessAmountToWords && (
                      <span>{dataAmountToWords}</span>
                    )}
                  </Grid>
                </Grid>
                <FormControl
                  style={{ marginLeft: 5 }}
                  control="checkbox"
                  type="checkbox"
                  name="confirmBid"
                  id="confirmBid"
                  disabled={bidclose}
                  label={
                    <Typography
                      variant="body1"
                      className={classes.termsNdCondiCheckBoxLabel}
                    >
                      Please confirm Final Bid Amount before submit.
                    </Typography>
                  }
                  color="primary"
                />
                <DialogActions>
                  <Button
                    startIcon={
                      isFetchingRecentBids ? (
                        <SyncIcon className={classes.rotate} />
                      ) : (
                        <SyncIcon />
                      )
                    }
                    onClick={handleRefresh}
                    disabled={bidclose}
                    variant="outlined"
                    color="secondary"
                  >
                    Refresh
                  </Button>
                  <Button
                    disabled={bidclose}
                    startIcon={<SaveIcon />}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save Bid
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LiveBid;
