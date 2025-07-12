// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { LiveBidSelector, clearPlaceBidState, clearRecentBidsState, getRecentBids, placeBid } from '../../../../redux/features/eauction/liveBidSlice';
// import Alert from "@material-ui/lab/Alert";
// import moment from 'moment';
// import { Box, Button, FormLabel, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
// import { Form, Formik } from 'formik';
// import FormControl from '../../../molecules/FormControl/FormControl';
// import * as yup from "yup";
// import { LiveBidStyles } from './LiveBid.styles';
// import Loading from '../../../atoms/Loading/Loading';

// const Broadcast = {
//     POST: 'post',
//     BROADCAST_URL: 'resteauctiondev.cidcohomes.com',
//     BROADCAST_PORT: '443',
// };

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//         backgroundColor: "#0038C0",
//         color: theme.palette.common.white,
//         padding: theme.spacing(1)
//     },
//     body: {
//         fontSize: 13,
//         padding: "0px 24px",
//         lineHeight: "3",
//         fontWeight: 600
//     },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//     },
// }))(TableRow);

// function Connection2(url, onMessageReceived, handleNewPost, addSystemMessage, projectData) {
//     const [open, setOpen] = useState(false);
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         // const newSocket = new WebSocket(`ws://${url}`);
//         // const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
//         // console.log(protocol);
//         const newSocket = new WebSocket(`wss:${url}`);
//         newSocket.onopen = () => {
//             setOpen(true);
//             addSystemMessage('Connected');
//             console.log('Connected');
//         };

//         newSocket.onmessage = (evt) => {
//             try {
//                 const data = JSON.parse(evt.data);
//                 const msgData = JSON.parse(data.msg)
//                 const ProjectId = localStorage.getItem('productId')
//                 console.log('Received WebSocket data:', msgData);
//                 if (ProjectId == msgData.data[0].ProjectId) {
//                     addChatMessage(data.msg);
//                 }
//             } catch (error) {
//                 console.error('Error parsing WebSocket data:', error);
//             }

//         };

//         newSocket.onclose = () => {
//             setOpen(false);
//             addSystemMessage('Disconnected');
//         };

//         setSocket(newSocket);

//         return () => {
//             // if (newSocket) {
//             //     newSocket.close();
//             // }
//             if (newSocket.readyState === 1) {
//                 newSocket.close();
//             }
//         };
//     }, [url]);

//     //     const sendMsg = (message) => {
//     //         if (socket) {
//     //             socket.send(JSON.stringify({ msg: message }));
//     //         }
//     //     };

//     // };

//     const sendMsg = (message) => {
//         if (socket && socket.readyState === WebSocket.OPEN) {
//             socket.send(JSON.stringify({ msg: message }));
//         } else {
//             console.error('WebSocket is not open. Message not sent.');
//         }
//     };

//     const addChatMessage = (data) => {
//         const Data = JSON.parse(data)
//         switch (Data.broadType) {
//             case Broadcast.POST:
//                 addNewPost(Data);
//                 console.log("case post");
//                 break;
//             default:
//                 console.log('nothing to do');
//         }
//     };

//     const addNewPost = (data) => {
//         const newPost = data.data[0];
//         handleNewPost(newPost);
//     };

//     return {
//         sendMsg,
//     };
// }

// function LiveBid(props) {
//     const { projectData } = props;
//     const [postText, setPostText] = useState('');
//     const [posts, setPosts] = useState([]);
//     const [systemMessage, setSystemMessage] = useState([]);
//     const dispatch = useDispatch();
//     const formikRef = useRef();
//     const classes = LiveBidStyles();
//     const { isFetchingRecentBids,
//         isSuccessRecentBids,
//         isErrorRecentBids,
//         recentBidsData,
//         errorMessageRecentBids,

//         isFetchingPlaceBid,
//         isSuccessPlaceBid,
//         isErrorPlaceBid,
//         placeBidData,
//         errorMessagePlaceBid } = useSelector(LiveBidSelector);


//     const addSystemMessage = (msg) => {
//         setSystemMessage((prevMessages) => [...prevMessages, msg]);
//     };

//     useEffect(() => {
//         if (projectData) {
//             dispatch(getRecentBids(projectData.id))
//         }
//     }, [projectData])

//     useEffect(() => {
//         return () => {
//             dispatch(clearRecentBidsState());
//             dispatch(clearPlaceBidState());
//         }
//     }, [])

//     const handleWebSocketMessage = (data) => {
//     };

//     const handleNewPost = (newPost) => {
//         setPosts((prevPosts) => {
//             const updatedPosts = [newPost, ...prevPosts].slice(0, 10);
//             return updatedPosts;
//         });
//     };

//     const conn = Connection2(
//         Broadcast.BROADCAST_URL + ':' + Broadcast.BROADCAST_PORT,
//         handleWebSocketMessage, handleNewPost, addSystemMessage, projectData
//     );
//     console.log(projectData);

//     const initialValues = {
//         postText: ''
//     }

//     useEffect(() => {
//         if (isSuccessRecentBids && recentBidsData) {
//             setPosts((prevPosts) => [...recentBidsData, ...prevPosts]);
//         }
//     }, [isSuccessRecentBids, recentBidsData]);

//     const validationSchema = yup.object().shape({
//         postText: yup.string().required("Please Enter a bid amount")
//     });

//     const onSubmit = (values, { setSubmitting }) => {
//         setSubmitting(false);
//         const requestData = {
//             ApplicantId: localStorage.getItem('applicantId'),
//             ProjectId: projectData.id,
//             BidValue: values.postText
//         }
//         dispatch(placeBid(requestData));

//     };

//     useEffect(() => {
//         if (isSuccessPlaceBid && placeBidData) {
//             const typeData = { broadType: Broadcast.POST, data: placeBidData };
//             //conn.sendMsg(typeData);
//             conn.sendMsg(JSON.stringify(typeData));
//             formikRef.current.resetForm();
//             console.log(placeBidData)
//         }
//     }, [isSuccessPlaceBid, placeBidData]);

//     return (
//         <div>
//             <Snackbar open={isSuccessPlaceBid}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//                 autoHideDuration={3000}
//                 onClose={() => dispatch(clearPlaceBidState())}
//             >
//                 <Alert onClose={() => dispatch(clearPlaceBidState())} severity="success" variant="filled">
//                     {errorMessagePlaceBid}
//                 </Alert>
//             </Snackbar>
//             {(isFetchingPlaceBid || isFetchingRecentBids) && <Loading isOpen={isFetchingPlaceBid || isFetchingRecentBids} />}
//             {isErrorPlaceBid && <Alert severity='error' style={{ margin: 8 }}>{errorMessagePlaceBid}</Alert>}
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={onSubmit}
//                 innerRef={formikRef}
//             >
//                 {({ submitForm }) => (
//                     <Form noValidate autoComplete="off">
//                         <Grid container marginBottom={4} spacing={2} alignItems='center'>
//                             <Grid item xs={8}>
//                                 <FormControl
//                                     type="number"
//                                     control="input"
//                                     variant="outlined"
//                                     label="Enter your Bidding Amount"
//                                     placeholder="Enter your Bidding Amount"
//                                     name="postText"
//                                     id="postText"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={4}>
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                 // endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
//                                 // className={classes.proceedBtn}
//                                 >
//                                     Place Bid
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </Form>)}
//             </Formik>
//             {posts.length > 0 && <TableContainer component={Paper}>
//                 <Table
//                     className="tableView"
//                     aria-labelledby="tableTitle"
//                     aria-label="enhanced table"
//                 >
//                     <TableHead>
//                         <StyledTableRow>
//                             <StyledTableCell align="center" >Date</StyledTableCell>
//                             <StyledTableCell align="center">Name</StyledTableCell>
//                             <StyledTableCell align="center">Amount</StyledTableCell>
//                         </StyledTableRow>
//                     </TableHead>
//                     <TableBody>
//                         {posts.map((row, index) => {
//                             return (
//                                 <StyledTableRow
//                                     hover
//                                     role="checkbox"
//                                     tabIndex={-1}
//                                     key={index}
//                                     className={`${index == 0 ? classes.highBidHead : ""}`}
//                                     style={{ background: index === 0 ? '#f44336' : "" }}
//                                 >
//                                     <StyledTableCell align="left" style={{ color: index === 0 ? '#fff' : "" }}>
//                                         {row.CreatedAt ? <strong>{moment(row.CreatedAt).format("Do MMM YYYY, h:mm a")}</strong> : "--"}
//                                     </StyledTableCell>
//                                     <StyledTableCell style={{ color: index === 0 ? '#fff' : "" }}>
//                                         {row.FirstName || "--"}
//                                     </StyledTableCell>
//                                     <StyledTableCell align="left" style={{ color: index === 0 ? '#fff' : "" }}>
//                                         {row.BidValue || "--"}
//                                     </StyledTableCell>
//                                 </StyledTableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>}
//             {posts.length == 0 && <Typography>No Bid yet. Enter amount to start bidding.</Typography>}
//         </div>
//     );
// }

// export default LiveBid;


import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LiveBidSelector, clearPlaceBidState, clearRecentBidsState, getRecentBids, placeBid } from '../../../../redux/features/eauction/liveBidSlice';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import { Box, Button, FormLabel, Grid, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import { Form, Formik } from 'formik';
import FormControl from '../../../molecules/FormControl/FormControl';
import * as yup from 'yup';
import { LiveBidStyles } from './LiveBid.styles';
import Loading from '../../../atoms/Loading/Loading';

// Environment-based WebSocket URL
const BROADCAST_URL = process.env.REACT_APP_WEBSOCKET_URL || 'resteauctiondev.cidcohomes.com:443';
const WEBSOCKET_PROTOCOL = window.location.protocol === 'https:' ? 'wss://' : 'ws://';

const StyledTableCell = withStyles((theme) => ({
  head: { backgroundColor: '#0038C0', color: theme.palette.common.white, padding: theme.spacing(1) },
  body: { fontSize: 13, padding: '0px 24px', lineHeight: '3', fontWeight: 600 },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } },
}))(TableRow);

function Connection2(url, handleNewPost, addSystemMessage, projectData) {
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(`${WEBSOCKET_PROTOCOL}${url}`);
    newSocket.onopen = () => {
      setOpen(true);
      addSystemMessage('Connected to bidding server');
      console.log('WebSocket connected');
    };

    newSocket.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (!data.msg) throw new Error('Invalid message format');
        const msgData = JSON.parse(data.msg);
        const projectId = localStorage.getItem('productId');
        if (projectId == msgData.data?.[0]?.ProjectId) {
          handleNewPost(msgData.data[0]);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        addSystemMessage('Error receiving bid update');
      }
    };

    newSocket.onclose = () => {
      setOpen(false);
      addSystemMessage('Disconnected from bidding server');
      // Optional: Implement reconnection logic
    };

    newSocket.onerror = () => {
      setOpen(false);
      addSystemMessage('WebSocket connection error');
    };

    setSocket(newSocket);

    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [url, handleNewPost, addSystemMessage]);

  const sendMsg = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ msg: message }));
    } else {
      console.error('WebSocket is not open');
      addSystemMessage('Cannot send bid: Not connected');
    }
  };

  return { sendMsg };
}

function LiveBid({ projectData }) {
  const [posts, setPosts] = useState([]);
  const [systemMessage, setSystemMessage] = useState([]);
  const dispatch = useDispatch();
  const formikRef = useRef();
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

  const addSystemMessage = (msg) => {
    setSystemMessage((prev) => [...prev, msg].slice(-5)); // Limit to last 5 messages
  };

  useEffect(() => {
    if (projectData?.id) {
      dispatch(getRecentBids(projectData.id));
    }
  }, [projectData, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearPlaceBidState());
      // Only clear recentBidsState if necessary
    };
  }, [dispatch]);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => {
      const updatedPosts = [newPost, ...prevPosts].slice(0, 10);
      return updatedPosts.sort((a, b) => b.BidValue - a.BidValue); // Sort by bid amount
    });
  };

  const conn = Connection2(BROADCAST_URL, handleNewPost, addSystemMessage, projectData);

  const initialValues = { postText: '' };
  const validationSchema = yup.object().shape({
    postText: yup
      .number()
      .required('Please enter a bid amount')
      .positive('Bid amount must be positive')
      .min(projectData?.minBid || 1, `Bid must be at least ${projectData?.minBid || 1}`),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      ApplicantId: localStorage.getItem('applicantId'),
      ProjectId: projectData.id,
      BidValue: Number(values.postText),
    };
    dispatch(placeBid(requestData));
  };

  useEffect(() => {
    if (isSuccessPlaceBid && placeBidData) {
      const typeData = { broadType: 'post', data: placeBidData };
      conn.sendMsg(JSON.stringify(typeData));
      formikRef.current.resetForm();
    }
  }, [isSuccessPlaceBid, placeBidData, conn]);

  useEffect(() => {
    if (isSuccessRecentBids && recentBidsData) {
      setPosts((prev) => [...recentBidsData, ...prev].sort((a, b) => b.BidValue - a.BidValue));
    }
  }, [isSuccessRecentBids, recentBidsData]);

  return (
    <div>
      <Snackbar
        open={isSuccessPlaceBid}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={3000}
        onClose={() => dispatch(clearPlaceBidState())}
      >
        <Alert onClose={() => dispatch(clearPlaceBidState())} severity="success" variant="filled">
          Bid placed successfully!
        </Alert>
      </Snackbar>
      {isErrorPlaceBid && (
        <Alert severity="error" style={{ margin: 8 }}>
          {errorMessagePlaceBid || 'Failed to place bid'}
          <Button onClick={() => dispatch(placeBid(formikRef.current.values))}>Retry</Button>
        </Alert>
      )}
      {isFetchingPlaceBid && <Loading isOpen={isFetchingPlaceBid} />}
      {systemMessage.length > 0 && (
        <Box mb={2}>
          {systemMessage.map((msg, idx) => (
            <Typography key={idx} color="textSecondary">{msg}</Typography>
          ))}
        </Box>
      )}
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form noValidate autoComplete="off">
            <Grid container marginBottom={4} spacing={2} alignItems="center">
              <Grid item xs={8}>
                <FormControl
                  type="number"
                  control="input"
                  variant="outlined"
                  label="Enter your Bidding Amount"
                  placeholder="Enter your Bidding Amount"
                  name="postText"
                  id="postText"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || isFetchingPlaceBid}
                >
                  Place Bid
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {posts.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="bid table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {posts.map((row, index) => (
                <StyledTableRow
                  key={index}
                  className={index === 0 ? classes.highBidHead : ''}
                  style={{ background: index === 0 ? '#f44336' : '' }}
                >
                  <StyledTableCell align="left" style={{ color: index === 0 ? '#fff' : '' }}>
                    {row.CreatedAt ? moment(row.CreatedAt).format('Do MMM YYYY, h:mm a') : '--'}
                  </StyledTableCell>
                  <StyledTableCell style={{ color: index === 0 ? '#fff' : '' }}>
                    {row.FirstName || '--'}
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ color: index === 0 ? '#fff' : '' }}>
                    {row.BidValue ? `$${row.BidValue}` : '--'}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No bids yet. Enter an amount to start bidding.</Typography>
      )}
    </div>
  );
}

LiveBid.propTypes = {
  projectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    minBid: PropTypes.number,
  }).isRequired,
};

export default LiveBid;