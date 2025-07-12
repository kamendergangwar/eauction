import { Box, Button, CardMedia, Chip, Divider, Grid, Hidden, Typography } from "@material-ui/core";
import moment from "moment";
import { TransactionDetailsStyles } from "../../TransactionDetails.style";
import { MenuTransactionDtlsIcon, TransSuccessIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { useTranslation } from "react-i18next";
import { Schedule } from "@material-ui/icons";
import ErrorIcon from '@material-ui/icons/Error';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import expiredPng from "../../../../../../assets/expired.png"
import pendingPng from "../../../../../../assets/pending.png"
import completedPng from "../../../../../../assets/completed.png"
import failedPng from "../../../../../../assets/failed.png"
import bookedPng from "../../../../../../assets/booked.png"


const PendingTransactionCard = (props) => {
    const { setTransactionScreen, pendingTransData } = props;
    console.log(pendingTransData);

    const classes = TransactionDetailsStyles();
    const { t } = useTranslation("ProfilePageTrans");

    const numberWithCommas = (amount_val) => {
        return isNaN(amount_val)
            ? "0"
            : amount_val.toString().split(".")[0].length > 3
                ? amount_val
                    .toString()
                    .substring(0, amount_val.toString().split(".")[0].length - 3)
                    .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
                "," +
                amount_val
                    .toString()
                    .substring(amount_val.toString().split(".")[0].length - 3)
                : amount_val.toString();
    };

    return (
        <>
            {pendingTransData.length && pendingTransData.map((transaction) =>
                <Box className={classes.tranWrapper} marginY={2} marginX={3}>
                    <Typography className={classes.transDate}>
                        {moment(transaction.CreatedOn).format("Do MMM, h:mm a")}
                    </Typography>
                    <Box className={classes.tranCard}>
                        <Box className={classes.cardHeader}>
                            <Grid container spacing={4} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <Box className="headerleft">
                                        <MenuTransactionDtlsIcon />
                                        <Typography className={classes.TranIDTxt}>
                                            {t(
                                                "transactionDetails.transactionCards.transactionlabel"
                                            )} : <span className={`${classes.primaryColor} IDValue`}>{transaction.TransId || "--"}</span>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                        <Typography className="transTxt">
                                            {transaction.Status == 0 &&
                                                <Grid item className={classes.statusChip0}>
                                                    <Chip icon={<Schedule />} label="Transaction Pending" variant="outlined" />
                                                </Grid>
                                            }
                                            {transaction.Status == 1 &&
                                                <Grid item className={classes.statusChip1}>
                                                    <Chip icon={<TransSuccessIcon />} label="Transaction Completed" variant="outlined" />
                                                </Grid>
                                            }
                                            {transaction.Status == 2 &&
                                                <Grid item className={classes.statusChip2}>
                                                    <Chip icon={<ErrorIcon />} label="Transaction Failed" variant="outlined" />
                                                </Grid>
                                            }
                                            {transaction.Status == 3 &&
                                                <Grid item className={classes.statusChip3}>
                                                    <Chip icon={<BookmarksOutlinedIcon />} label="Challan Booked" variant="outlined" />
                                                </Grid>
                                            }
                                            {transaction.Status == 4 &&
                                                <Grid item className={classes.statusChip2}>
                                                    <Chip icon={<NewReleasesIcon />} label="Expired" variant="outlined" />
                                                </Grid>
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                        <Box className={classes.cardBody}>
                            <Grid
                                container
                                spacing={3}
                                alignItems="center"
                                justify="space-between"
                            >
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    padding={0}
                                    className={classes.borderDashed}
                                >
                                    <Box className={classes.bankDetails}>
                                        {transaction.ApplicationID && <Grid container spacing={2} alignItems="center">
                                            <Grid item xs="auto" md={4}>
                                                <Typography className="infoLabel">
                                                    Application No.
                                                </Typography>
                                            </Grid>
                                            <Hidden xsDown>
                                                <Grid item xs="auto">
                                                    <Box className="colonTxt">:</Box>
                                                </Grid>
                                            </Hidden>
                                            <Grid item xs={12} md={6}>
                                                <Typography className="infoValue" style={{ textAlign: "left", fontWeight: 600 }}>
                                                    #{transaction.ApplicationID ? `${transaction.ApplicationID}` : "--"}
                                                </Typography>
                                            </Grid>
                                        </Grid>}
                                        {transaction.PayMethod && <Grid container spacing={2} alignItems="center">
                                            <Grid item xs="auto" md={4}>
                                                <Typography className="infoLabel">
                                                    Payment Method
                                                </Typography>
                                            </Grid>
                                            <Hidden xsDown>
                                                <Grid item xs="auto">
                                                    <Box className="colonTxt">:</Box>
                                                </Grid>
                                            </Hidden>
                                            <Grid item xs={12} md={6}>
                                                <Typography className="infoValue" style={{ textAlign: "left", fontWeight: 600 }}>
                                                    {transaction.PayMethod ? `${transaction.PayMethod}` : "--"}
                                                </Typography>
                                            </Grid>
                                        </Grid>}
                                        {transaction.LoanAmount && <Grid container spacing={2} alignItems="center">
                                            <Grid item xs="auto" md={4}>
                                                <Typography className="infoLabel">
                                                    Amount
                                                </Typography>
                                            </Grid>
                                            <Hidden xsDown>
                                                <Grid item xs="auto">
                                                    <Box className="colonTxt">:</Box>
                                                </Grid>
                                            </Hidden>
                                            <Grid item xs={12} md={6}>
                                                <Typography className="infoValue" style={{ textAlign: "left", fontWeight: 600 }}>
                                                    ₹ {transaction.LoanAmount ? `${numberWithCommas(transaction.LoanAmount)}` : "--"}
                                                </Typography>
                                            </Grid>
                                        </Grid>}
                                        {transaction.ApplicationFeeGST && <Grid container spacing={2} alignItems="center">
                                            <Grid item xs="auto" md={4}>
                                                <Typography className="infoLabel">
                                                    {t("transactionDetails.transactionCards.transactionDetailsModel.GSTLabel")}
                                                </Typography>
                                            </Grid>
                                            <Hidden xsDown>
                                                <Grid item xs="auto">
                                                    <Box className="colonTxt">:</Box>
                                                </Grid>
                                            </Hidden>
                                            <Grid item xs={12} md={6}>
                                                <Typography className="infoValue" style={{ textAlign: "left", fontWeight: 600 }}>
                                                    ₹ {transaction.ApplicationFeeGST ? `${numberWithCommas(transaction.ApplicationFeeGST)}` : "--"}
                                                </Typography>
                                            </Grid>
                                        </Grid>}
                                        {transaction.Amount && <Grid container spacing={2} alignItems="center">
                                            <Grid item xs="auto" md={4}>
                                                <Typography className="infoLabel">
                                                    Total Amount
                                                </Typography>
                                            </Grid>
                                            <Hidden xsDown>
                                                <Grid item xs="auto">
                                                    <Box className="colonTxt">:</Box>
                                                </Grid>
                                            </Hidden>
                                            <Grid item xs={12} md={6}>
                                                <Typography className="infoValue" style={{ textAlign: "left", fontWeight: 600 }}>
                                                    ₹ {transaction.Amount ? `${numberWithCommas(transaction.Amount)}` : "--"}
                                                </Typography>
                                            </Grid>
                                        </Grid>}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box className={classes.paymentDetails}>
                                        <Grid item xs={12} zeroMinWidth>
                                            <Grid
                                                container
                                                alignItems="center"
                                                justify="center"
                                            >
                                                {transaction.Status == 0 && <CardMedia
                                                    style={{ height: 120, width: 120 }}
                                                    component='img'
                                                    image={pendingPng}
                                                    alt="pending"
                                                />}
                                                {transaction.Status == 1 && <CardMedia
                                                    style={{ height: 100, width: 130 }}
                                                    component='img'
                                                    image={completedPng}
                                                    alt="completed"
                                                />}
                                                {transaction.Status == 2 && <CardMedia
                                                    style={{ height: 120, width: 130 }}
                                                    component='img'
                                                    image={failedPng}
                                                    alt="failed"
                                                />}
                                                {transaction.Status == 3 && <CardMedia
                                                    style={{ height: 120, width: 120 }}
                                                    component='img'
                                                    image={bookedPng}
                                                    alt="booked"
                                                />}
                                                {transaction.Status == 4 && <CardMedia
                                                    style={{ height: 120, width: 120 }}
                                                    component='img'
                                                    image={expiredPng}
                                                    alt="expired"
                                                />}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider />
                        <Hidden smDown>
                            <Box className={classes.cardFooter}>
                                {transaction.ProjectName && <Grid
                                    container
                                    spacing={3}
                                    alignItems="center"
                                    justify="space-between"
                                >
                                    <Grid item xs={12}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justify="space-between"
                                        >
                                            <Grid item xs={3}>
                                                <Typography className={classes.TranIDTxt} display="inline" style={{ textAlign: 'center' }}>
                                                    {t("transactionDetails.transactionCards.PaymentForLabel")}
                                                    <br />
                                                    <span className="IDValue">
                                                        {t("transactionDetails.transactionCards.bookingAmtTxt")}
                                                    </span>
                                                </Typography>
                                            </Grid>
                                            <Divider variant="middle" flexItem orientation="vertical" />
                                            <Grid container direction="column">
                                                {transaction.ProjectName && <Grid item>
                                                    <Typography className={classes.footerText}>Project Name: <span>{transaction.ProjectName}</span></Typography>
                                                </Grid>}
                                                {transaction.FlatDet && <Grid item>
                                                    <Typography className={classes.footerText}>Flat No. : <span>{transaction.FlatDet.FlatNo}({transaction.FlatDet.AptType})&nbsp;</span> Floor No. : <span>{transaction.FlatDet.FloorNo}</span>&nbsp; Tower No. : <span>{transaction.FlatDet.Wing}</span>&nbsp; {transaction.FlatDet.CarpetArea && <>RERA Carpet Area: <span>{transaction.FlatDet.CarpetArea} SQFT</span></>}</Typography>
                                                </Grid>}
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>}
                            </Box>
                        </Hidden>

                        <Hidden mdUp>
                            <Box className={classes.cardFooter}>
                                <Box paddingY={2} paddingX={2}>
                                    {transaction.ProjectName && <Grid
                                        container
                                        alignItems="center"
                                        justify="space-between"
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justify="space-between"
                                        >
                                            <Typography className={classes.TranIDTxt} display="inline" style={{ textAlign: 'center' }}>
                                                {t("transactionDetails.transactionCards.PaymentForLabel")}
                                                <br />
                                                <span className="IDValue">
                                                    {t("transactionDetails.transactionCards.bookingAmtTxt")}
                                                </span>
                                            </Typography>
                                            <Divider variant="middle" flexItem orientation="vertical" />
                                            <Grid container direction="column">
                                                {transaction.ProjectName && <Grid item>
                                                    <Typography className={classes.footerText}>Project Name: <span>{transaction.ProjectName}</span></Typography>
                                                </Grid>}
                                                {transaction.FlatDet && <Grid item>
                                                    <Typography className={classes.footerText}>Flat No. : <span>{transaction.FlatDet.FlatNo}({transaction.FlatDet.AptType})&nbsp;</span> Floor No. : <span>{transaction.FlatDet.FloorNo}</span>&nbsp; Tower No. : <span>{transaction.FlatDet.Wing}</span>&nbsp; {transaction.FlatDet.CarpetArea && <>RERA Carpet Area: <span>{transaction.FlatDet.CarpetArea} SQFT</span></>}</Typography>
                                                </Grid>}
                                            </Grid>
                                        </Box>
                                    </Grid>}
                                </Box>
                            </Box>
                            {/* <Divider />
                        <Box className={classes.cardFooter}>
                            <Box paddingY={1} paddingX={2}>
                                <Grid
                                    container
                                    alignItems="center"
                                    justify="space-between"
                                >
                                </Grid>
                            </Box>
                        </Box> */}
                        </Hidden>
                    </Box>
                </Box>)}
        </>
    )
};

export default PendingTransactionCard;