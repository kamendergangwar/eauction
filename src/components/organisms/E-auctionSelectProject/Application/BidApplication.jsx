import { Box, Card, Grid, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { clearEauctiongetProjectStepperData, clearEauctionProjectStepperData, EauctionProjectStepperSelector, getProjectProgress, ProjectStepperSave } from '../../../../redux/features/eauction/projectStepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from '../../../atoms/Loading/Loading';
import EauctionFee from '../EauctionFee';
import EmdPayment from '../EmdPayment';
import Declaration from '../Declaration';
import TechnicalBid from './TechnicalBid';
import CloseBid from './CloseBid';
import FinalSubmission from './FinalSubmission';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { EauctionSelector } from '../../../../redux/features/eauction/eauctionSlice';

const useStyles = makeStyles({
  table: {
    border: '1px solid black', // Add a border to the entire table
  },
  cell: {
    border: '1px solid black', // Add a border to table cells
  },
});


function BidApplication() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({});

  const {
    isFetchingSingleProject,
    isSuccessSingleProject,
    isErrorSingleProject,
    singleprojectData,
    errorMessageSingleProject,
  } = useSelector(EauctionSelector);
  const {
    isSuccessgetProjectStepper,
    isErrorgetProjectStepper,
    getprojectStepperData,
    errorMessagegetProjectStepper,
    isFetchProjectStepper,
    getProjectStepper,
    getProjectActiveStep
  } = useSelector(EauctionProjectStepperSelector);


  useEffect(() => {
    if (isSuccessSingleProject && singleprojectData) {
      setData(singleprojectData)
    }
  }, [isSuccessSingleProject, singleprojectData])

  useEffect(() => {
    return () => {
      dispatch(clearEauctionProjectStepperData())
    }
  }, [])

  const handleNext = () => {
    dispatch(getProjectProgress());
  };

  useEffect(() => {
    if (isSuccessgetProjectStepper && getProjectActiveStep === 7) {
      history.push("/dashboard?tab=final-submitted");
    }
  }, [getProjectActiveStep, isSuccessgetProjectStepper])

  return (
    <>
      {isFetchProjectStepper && <Loading isOpen={isFetchProjectStepper} />}
      {isSuccessgetProjectStepper &&
        <Grid container >
          <Grid item md={12} >
            {/* <TableContainer style={{ marginTop: "20px" }}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.cell} colSpan={6}>WorkSource</TableCell>
                    <TableCell className={classes.cell} colSpan={6}>{data[0].workSource}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.cell} colSpan={3}>Event Id</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>{data[0].eventId}</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>Reference No</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>{data[0].referenceNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.cell} colSpan={3}>EMD Payment Start Date</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>{data[0].startDateEMDPayment}</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>EMD Payment End Date</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>{data[0].endDateEMDPayment}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.cell} colSpan={3}> Live Bidding Start Date</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>{moment(data.bid_start_date).format("MMM DD, YYYY h:mm a")}</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>Live Bidding End Date</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>{moment(data.bid_end_date).format("MMM DD, YYYY h:mm a")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.cell} colSpan={6}> Auction Opening Date</TableCell>
                    <TableCell className={classes.cell} colSpan={6}>{data[0].auctionOpeningDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer> */}
            <>
              {getProjectActiveStep === 1 && <Declaration onNext={handleNext} />}
              {getProjectActiveStep === 2 && <EauctionFee onNext={handleNext} />}
              {getProjectActiveStep === 3 && <EmdPayment />}
              {getProjectActiveStep === 4 && <TechnicalBid onNext={handleNext} />}
              {getProjectActiveStep === 5 && <CloseBid onNext={handleNext} />}
              {getProjectActiveStep === 6 && <FinalSubmission onNext={handleNext} />}
            </>
          </Grid>
        </Grid>}
    </>
  )
}

export default BidApplication;
