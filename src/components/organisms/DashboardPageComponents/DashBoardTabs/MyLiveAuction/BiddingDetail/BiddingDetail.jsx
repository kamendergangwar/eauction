import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Dialog,
  Box,
  DialogActions,
  Grid,
  DialogTitle,
  DialogContent,
  Paper,
  Divider,
} from "@material-ui/core";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import LiveBid from "./LiveBid";
import { DashboardStyle } from "../../DashboardTabs.style";
import { EauctionSelector, clearEauctionSingleProjectData, getSingleAuctionProject } from "../../../../../../redux/features/eauction/eauctionSlice";

import DataTableBox from "../../../../../atoms/DataTableBox/DataTableBox";
import { numberWithCommas } from "../../../../../../utils/util";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { LiveBidSelector, getRecentBids } from "../../../../../../redux/features/eauction/liveBidSlice";
import { updateDifferenceTime } from "../../../../../../redux/features/eauction/countTimerSlice";


const BiddingDetail = ({ onTabChange }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { t } = useTranslation("ProfilePageTrans");
  const classes = DashboardStyle();
  const projectData = data;

  const [recentBids, setRecentBids] = useState();
  const { isFetchingRecentBids,
    isSuccessRecentBids,
    isErrorRecentBids,
    recentBidsData,
    errorMessageRecentBids,

    isFetchingPlaceBid,
    isSuccessPlaceBid,
    isErrorPlaceBid,
    placeBidData,
    errorMessagePlaceBid } = useSelector(LiveBidSelector);


  useEffect(() => {
    dispatch(getSingleAuctionProject());
    return () => {
      dispatch(clearEauctionSingleProjectData());
    };
  }, []);
 
  const {
    //MyProject Listing Variable state
    isFetchingSingleProject,
    isSuccessSingleProject,
    isErrorSingleProject,
    singleprojectData,
    errorMessageSingleProject,
  } = useSelector(EauctionSelector);
  useEffect(() => {
    if (projectData) {
      
      dispatch(getRecentBids(projectData.id))
    }
  }, [projectData]);

  useEffect(() => {
    if (isSuccessRecentBids && recentBidsData) {
      setRecentBids(recentBidsData.lastTopTenBids)
    }
  }, [isSuccessRecentBids, recentBidsData])

  useEffect(() => {
    if (isSuccessSingleProject && singleprojectData) {
      setData(singleprojectData);
    }
  }, [isSuccessSingleProject, singleprojectData]);

  {console.log(projectData.FinBidAmount,"sdsdsds")}

  return (
    <Grid container justifyContent="space-around">
      <Grid
        xs={5}
        item
        className={classes.detailBox}
      >
        <Grid
          container
          justifyContent="flex-start"
        >
          <Typography className={classes.boxTitle}>
            Tender Detail
          </Typography>
        </Grid>
        <DataTableBox
          label={"Scheme Brief"}
          value={projectData.eventID}
        />
        <DataTableBox
          label={"Shop no."}
          value={projectData.shopNo}
        />
        <DataTableBox
          label={"Auto Increment Factor"}
          value={`₹ ${numberWithCommas(projectData.auctionIncrementValue)}`}
        />
        {/* <Grid
          container
          justifyContent="flex-start"
        >
          <Typography className={classes.boxTitle}>
            e-Auction schedule date
          </Typography>
        </Grid> */}
        <DataTableBox
          label={"Auction Start Date"}
          value={projectData.eauctionStartDate}
        />
        <DataTableBox
          label={"Auction End Date"}
          value={projectData.eauctionEndDate}
        />
        <DataTableBox
          label={"Result Opening"}
          value={projectData.eauctionResultOpenDate}
        />
        <DataTableBox
          label={"Your Close Bid"}
          // value={`₹ ${numberWithCommas(projectData.closeBid)}`}
          value={`₹ ${projectData.FinBidAmount}`}
        />
        <DataTableBox
          label={"Base Price"}
          value={`₹ ${numberWithCommas(projectData.auctionBasePrice)}`}
        />
      </Grid>
      <Divider orientation="vertical" flexItem />

      <Grid xs={5} container alignItems="flex-end">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={240}
            data={recentBids}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="CreatedAt" />
            {/* <YAxis /> */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="BidValue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={12}>
        <LiveBid projectData={projectData} />
      </Grid>
    </Grid>
  );
};

export default BiddingDetail;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   Grid,
//   Paper,
//   Box,
//   makeStyles,
// } from "@material-ui/core";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { EauctionSelector, clearEauctionSingleProjectData, getSingleAuctionProject } from "../../../../../../redux/features/eauction/eauctionSlice";
// import { LiveBidSelector, getRecentBids } from "../../../../../../redux/features/eauction/liveBidSlice";
// import { numberWithCommas } from "../../../../../../utils/util";
// import LiveBid from "./LiveBid";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(1.5),
//     background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
//     minHeight: "100vh",
//   },
//   card: {
//     borderRadius: theme.spacing(1),
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     transition: "transform 0.2s ease-in-out",
//     "&:hover": {
//       transform: "translateY(-3px)",
//     },
//     backgroundColor: "#ffffff",
//     padding: theme.spacing(1.5),
//   },
//   title: {
//     fontWeight: 700,
//     color: theme.palette.primary.dark,
//     marginBottom: theme.spacing(1),
//     fontSize: "1.2rem",
//   },
//   dataBox: {
//     marginBottom: theme.spacing(1),
//     padding: theme.spacing(1),
//     backgroundColor: theme.palette.grey[50],
//     borderRadius: theme.spacing(0.5),
//     border: `1px solid ${theme.palette.grey[200]}`,
//   },
//   label: {
//     fontWeight: 600,
//     color: theme.palette.text.secondary,
//     fontSize: "0.8rem",
//   },
//   value: {
//     fontWeight: 500,
//     color: theme.palette.text.primary,
//     fontSize: "0.9rem",
//   },
//   chartContainer: {
//     padding: theme.spacing(1.5),
//     backgroundColor: "#ffffff",
//     borderRadius: theme.spacing(1),
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     marginTop: theme.spacing(1),
//   },
//   divider: {
//     margin: theme.spacing(1.5, 0),
//     backgroundColor: theme.palette.primary.light,
//   },
//   liveBidContainer: {
//     marginTop: theme.spacing(1.5),
//   },
// }));

// const BiddingDetail = ({ onTabChange }) => {
//   const dispatch = useDispatch();
//   const { t } = useTranslation("ProfilePageTrans");
//   const classes = useStyles();
//   const [data, setData] = useState({});
//   const [recentBids, setRecentBids] = useState([]);
  
//   const {
//     isFetchingSingleProject,
//     isSuccessSingleProject,
//     isErrorSingleProject,
//     singleprojectData,
//     errorMessageSingleProject,
//   } = useSelector(EauctionSelector);

//   const {
//     isFetchingRecentBids,
//     isSuccessRecentBids,
//     isErrorRecentBids,
//     recentBidsData,
//     errorMessageRecentBids,
//   } = useSelector(LiveBidSelector);

//   useEffect(() => {
//     dispatch(getSingleAuctionProject());
//     return () => {
//       dispatch(clearEauctionSingleProjectData());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (data?.id) {
//       dispatch(getRecentBids(data.id));
//     }
//   }, [data, dispatch]);

//   useEffect(() => {
//     if (isSuccessRecentBids && recentBidsData) {
//       setRecentBids(recentBidsData.lastTopTenBids || []);
//     }
//   }, [isSuccessRecentBids, recentBidsData]);

//   useEffect(() => {
//     if (isSuccessSingleProject && singleprojectData) {
//       setData(singleprojectData);
//     }
//   }, [isSuccessSingleProject, singleprojectData]);

//   const projectData = data;

//   return (
//     <Container maxWidth="lg" className={classes.root}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={12}>
//           <Card className={classes.card}>
//             <CardContent>
//               <Typography className={classes.title}>
//                 {t("Tender Details")}
//               </Typography>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Scheme Brief</Typography>
//                 <Typography className={classes.value}>{projectData.eventID || "N/A"}</Typography>
//               </Box>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Shop No.</Typography>
//                 <Typography className={classes.value}>{projectData.shopNo || "N/A"}</Typography>
//               </Box>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Auto Increment Factor</Typography>
//                 <Typography className={classes.value}>
//                   {projectData.auctionIncrementValue 
//                     ? `₹ ${numberWithCommas(projectData.auctionIncrementValue)}` 
//                     : "N/A"}
//                 </Typography>
//               </Box>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Auction Start Date</Typography>
//                 <Typography className={classes.value}>{projectData.eauctionStartDate || "N/A"}</Typography>
//               </Box>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Auction End Date</Typography>
//                 <Typography className={classes.value}>{projectData.eauctionEndDate || "N/A"}</Typography>
//               </Box>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Result Opening</Typography>
//                 <Typography className={classes.value}>{projectData.eauctionResultOpenDate || "N/A"}</Typography>
//               </Box>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Your Close Bid</Typography>
//                 <Typography className={classes.value}>
//                   {projectData.FinBidAmount 
//                     ? `₹ ${numberWithCommas(projectData.FinBidAmount)}` 
//                     : "N/A"}
//                 </Typography>
//               </Box>
//               <Box className={classes.dataBox}>
//                 <Typography className={classes.label}>Base Price</Typography>
//                 <Typography className={classes.value}>
//                   {projectData.auctionBasePrice 
//                     ? `₹ ${numberWithCommas(projectData.auctionBasePrice)}` 
//                     : "N/A"}
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={12}>
//           <Paper className={classes.chartContainer}>
//             <Typography className={classes.title}>Recent Bids Trend</Typography>
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart
//                 data={recentBids}
//                 margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                 <XAxis 
//                   dataKey="CreatedAt" 
//                   tick={{ fill: "#666", fontSize: 10 }}
//                   tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 />
//                 <YAxis 
//                   tickFormatter={(value) => `₹${numberWithCommas(value)}`}
//                   tick={{ fill: "#666", fontSize: 10 }}
//                 />
//                 <Tooltip 
//                   formatter={(value) => `₹${numberWithCommas(value)}`}
//                   labelFormatter={(label) => new Date(label).toLocaleString()}
//                 />
//                 <Legend wrapperStyle={{ fontSize: 10 }} />
//                 <Line 
//                   type="monotone" 
//                   dataKey="BidValue" 
//                   stroke="#3f51b5" 
//                   strokeWidth={2}
//                   activeDot={{ r: 6 }} 
//                   name="Bid Value"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} className={classes.liveBidContainer}>
//           <Divider className={classes.divider} />
//           <LiveBid projectData={projectData} />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default BiddingDetail;