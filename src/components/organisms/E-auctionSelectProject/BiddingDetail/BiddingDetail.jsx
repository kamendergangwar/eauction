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
} from "@material-ui/core";
import { styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EauctionSelector,
  clearEauctionSingleProjectData,
  getSingleAuctionProject,
} from "../../../../redux/features/eauction/eauctionSlice";
import { getAppliedProjectData } from "../../../../redux/features/eauction/eauctionSlice";
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
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import { UploadDocsTitleIcon } from "../../../atoms/SvgIcons/SvgIcons";
import CountdownTimer from "../../../molecules/CountDownTimer/CountDownTimer";
import { eauctionStyle } from "../eauctionStyle.style";
const StyledContainer = styled(Container)({
  textAlign: "center",
  marginTop: "20px",
});

const StyledLink = styled(Link)({
  marginBottom: "20px",
  textDecoration: "none",
});

const StyledCard = styled(Card)({
  width: "100%",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  padding: 16,
  // background: '#e7fae6',
});

const StyledCardContent = styled(CardContent)({
  flex: "1",
  display: "flex",

  flexDirection: "column",
  alignItems: "flex-start",
});

const StyledButton = styled(Button)({
  variant: "contained",
  color: "primary",
  backgroundColor: "green",
  borderColor: "green",

  marginRight: "15px",
});
const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const BiddingDetail = ({ onTabChange }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { t } = useTranslation("ProfilePageTrans");
  const classes = eauctionStyle();
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
    if (isSuccessSingleProject && singleprojectData) {
      setData(singleprojectData);
    }
  }, [isSuccessSingleProject, singleprojectData]);

  const currentDate = moment();

  const targetDate = new Date("2023-09-19T23:59:59");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={5}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={5}>
                  {" "}
                  <Typography
                    variant="h5"
                    component="span"
                    style={{ fontWeight: "600" }}
                  >
                    {data?.title}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  {data?.bid_end_date && (
                    <CountdownTimer
                      currentDate={currentDate}
                      targetDate={data?.bid_end_date}
                    />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tablehead}>
                  Description{" "}
                </TableCell>
                <TableCell colSpan={5}>{data.desription}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {" "}
              <TableRow>
                <TableCell className={classes.tablehead}>Location</TableCell>
                <TableCell>{data.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tablehead}>Type</TableCell>{" "}
                <TableCell>{data.project_type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tablehead}>BID Type</TableCell>
                <TableCell>{data.bid_type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tablehead}>
                  {" "}
                  Bidding Start At
                </TableCell>
                <TableCell>
                  {moment(data.bid_start_date).format("MMM DD, YYYY h:mm a")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tablehead}>
                  Bidding End At
                </TableCell>
                <TableCell>
                  {moment(data.bid_end_date).format("MMM DD, YYYY h:mm a")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tablehead}>
                  EMD Amount Paid
                </TableCell>
                <TableCell>₹ {data.emd_amount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} sm={4} md={7}>
        <LiveBid projectData={data} />
      </Grid>
    </Grid>
  );
};

export default BiddingDetail;
