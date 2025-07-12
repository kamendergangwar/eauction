import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Button, Divider, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { TransactionDetailsStyles } from "../TransactionDetails.style";
import PendingTransactionCard from "./PendingTransactionCard/PendingTransactionCard";
import { NoDataFoundVector } from "../../../../atoms/SvgIcons/SvgIcons";


function PendingTransactionDetail(props) {
  const { setTransactionScreen, pendingTransData } = props;
  const classes = TransactionDetailsStyles();
  const { t } = useTranslation("ProfilePageTrans");
  const [historyData, setHistoryData] = useState([])
  const history = useHistory();
  const dispatch = useDispatch();



  return (
    <Box>
      <Grid container alignItems="center" style={{ marginBottom: 16, marginTop: 16 }}>
        <IconButton
          aria-label="close"
          onClick={() => setTransactionScreen(1)}
          style={{ marginRight: 8 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h6' className={classes.cancelTittle}>
          Pending Transaction Details
          <br />
          <Typography variant='body2'>All your Pending Transactions will appear here.</Typography>
        </Typography>
      </Grid>
      <Divider variant="middle" />
      {
        pendingTransData.length > 0 ? <PendingTransactionCard setTransactionScreen={setTransactionScreen} pendingTransData={pendingTransData} /> :
          <Box className={classes.NoDetailsCon} style={{ marginTop: 65 }}>
            <NoDataFoundVector className={classes.NoDetailsSvg} />
            <Typography className={classes.nodetailHeading}>It's Empty</Typography>
            <Typography className={classes.nodetailSubHeading}>It appears that you do not have any pending transactions.</Typography>
          </Box>
      }
    </Box >
  );
}

export default PendingTransactionDetail;