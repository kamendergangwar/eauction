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
    Chip,
    Divider,
    Stepper,
    Step,
    StepLabel,
    Drawer,
    IconButton,
    withStyles,
} from "@material-ui/core";
import SyncIcon from '@material-ui/icons/Sync';
import CloseIcon from '@material-ui/icons/Close';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { useTranslation } from "react-i18next";
import {
    FloorStepIcon,
    RoomTypeIcon,
    RupeePriceIcon,
    ScaleIcon,
    UnitTypeIcon,
    UploadDocsTitleIcon,
    WingIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import clsx from "clsx";
import { DashboardStyle } from "../DashboardTabs.style";
import CountdownTimer2 from "../../../../molecules/CountDownTimer/CountDownTimer2";
import BiddingDetail from "./BiddingDetail/BiddingDetail";
import { EauctionSelector, clearLiveAuctionData, getLiveAuctionData } from "../../../../../redux/features/eauction/eauctionSlice";
import Loading from "../../../../atoms/Loading/Loading";
import { Alert, Pagination } from "@material-ui/lab";
import { updateDifferenceTime } from "../../../../../redux/features/eauction/countTimerSlice";

const StyledButton = styled(Button)({
    variant: "contained",
    color: "primary",
    background: "#0038C0",

    marginTop: 5,
    //marginRight: "15px",
});

const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        background: "linear-gradient(90deg, rgba(249,155,2,1) 0%, rgba(255,82,25,1) 54%, rgba(241,71,29,1) 100%);",
        '&:hover': {
            background: "linear-gradient(90deg, rgba(233,145,0,1) 0%, rgba(255,81,25,1) 54%, rgba(226,45,0,0.989233193277311) 100%);",
        },
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2, 0, 0, 0),
        },
    },
}))(Button);

const MyLiveAuctionTab = ({ onTabChange }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation("ProfilePageTrans");
    const classes = DashboardStyle();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const history = useHistory();
    const [page, setPage] = useState(1)
    const perPage = 5;
    const {

        isFetchingLiveAuctionData,
        isSuccessLiveAuctionData,
        isErrorLiveAuctionData,
        liveAuctionData,
        errorMessageLiveAuctionData,

    } = useSelector(EauctionSelector);

    const currentDate = moment();
    const handleOpenDialog = (project) => {
        setSelectedProject(project);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        // window.location.reload()
    };

    useEffect(() => {
        dispatch(getLiveAuctionData());
        return () => {
            dispatch(clearLiveAuctionData());
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("liveauctionPageNo", page);
        dispatch(getLiveAuctionData());
    }, [page]);

    const handleRefresh = () => {
        dispatch(getLiveAuctionData());
    }
    useEffect(() => {
        const interval = setInterval(() => {
            const data = {
                ApplicantId: localStorage.getItem("applicantId"),
                ProjectId: localStorage.getItem("productId"),

            };
            dispatch(updateDifferenceTime(data))
                .then((response) => {
                    console.log("API Response:", response?.payload?.data?.timediff); // Log the response
                    //setTimerDifference(response?.payload?.data?.timediff); // Update timer difference state
                })
                .catch((error) => {
                    console.error("API Error:", error); // Log any API errors
                });
        }, 1000); // Call the API every 2 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    return (
        <>
            {isFetchingLiveAuctionData && <Loading isOpen={isFetchingLiveAuctionData} />}
            <Box
                sx={{
                    //backgroundColor: "white",

                    margin: 30,
                    borderRadius: 30,
                }}
            >
                {isErrorLiveAuctionData && <Alert severity="error">{errorMessageLiveAuctionData}</Alert>}
                {liveAuctionData.length !== 0 ? (
                    <>
                        <Box className={classes.divider} sx={{ marginBottom: 10 }}>
                            <Typography variant="h6">Live Bidding</Typography>
                            <ColorButton startIcon={<SyncIcon />} onClick={handleRefresh}>
                                Refresh
                            </ColorButton>
                        </Box>
                    </>
                ) : (<Box className={classes.divider} sx={{ marginBottom: 10 }}>
                    <Typography variant="h6">Currently No Live Auction Available</Typography> </Box>)}
                {liveAuctionData?.data?.map((product) => (
                    <Card
                        className={clsx(classes.root)}
                        variant="outlined"
                        key={product.id}
                    >
                        <Grid container>
                            <Grid item md xs={12}>
                                <CardContent className={classes.cardContentCont}>
                                    <Box className={classes.cardHeaderCont}>
                                        <Grid container justify="space-between">
                                            <Grid
                                                container
                                                justifyContent="space-between"
                                                xs={12}
                                                md="auto"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    className={classes.schemeNameView}
                                                >
                                                    {product.eventID}
                                                </Typography>
                                                <div className={classes.bidChip}>
                                                    {product?.eauctionEndDate && (
                                                        <Box display='flex' alignItems='center'>
                                                            <Typography style={{ fontWeight: 600 }}>Ends in :&nbsp;</Typography>
                                                            <Chip
                                                                label={<CountdownTimer2 targetDate={product?.eauctionEndDate} />}
                                                                variant="outlined"
                                                                icon={<QueryBuilderIcon style={{ color: 'rgb(240, 101, 72)' }} />}
                                                            />
                                                        </Box>
                                                    )}
                                                    <Chip
                                                        label="Live"
                                                        variant="outlined"
                                                        avatar={
                                                            <Typography
                                                                className={classes.blinkingDot}
                                                                style={{
                                                                    width: "10px",
                                                                    height: "10px",
                                                                    borderRadius: "50%",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider className={classes.dividerLine} />
                                    <div className={classes.dataContainer}>
                                        <Grid
                                            container
                                            spacing={1}
                                            className={classes.mainDetailCon}
                                            justify="space-between"
                                        >
                                            <Grid
                                                container
                                                xs={6}
                                                alignItems="center"
                                                justifyContent="space-between"
                                                className={classes.projectDetailsCon}
                                            >
                                                <Grid item>
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <WingIcon className={classes.scaleIconView} />
                                                        </Grid>
                                                        <Grid item>
                                                            <Box className={classes.dataValueViewBox}>
                                                                <Typography className={classes.dataTitle}>
                                                                    {"Bid Start Date"}
                                                                </Typography>
                                                                <Typography className={classes.dataValue}>
                                                                    {moment(product.eauctionStartDate).format(
                                                                        "MMM DD, YYYY h:mm:ss a"
                                                                    ) || "--"}{" "}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <FloorStepIcon
                                                                className={classes.scaleIconView}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Box className={classes.dataValueViewBox}>
                                                                <Typography className={classes.dataTitle}>
                                                                    {"Bid End Date"}
                                                                </Typography>
                                                                <Typography className={classes.dataValue}>
                                                                    {moment(product.eauctionEndDate).format(
                                                                        "MMM DD, YYYY h:mm:ss a"
                                                                    ) || "--"}{" "}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <FloorStepIcon
                                                                className={classes.scaleIconView}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Box className={classes.dataValueViewBox}>
                                                                <Typography className={classes.dataTitle}>
                                                                    {"EMD Paid"}
                                                                </Typography>
                                                                <Typography className={classes.dataValue}>
                                                                    ₹{product.emdFee || "--"}{" "}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Divider orientation="vertical" flexItem />
                                            <Grid xs={5} alignItems="center" container
                                                justifyContent="space-between"
                                                className={product?.current_highest_bid?.isMyHighestBid ? classes.InbidCon : classes.OutbidCon}
                                            >
                                                <Grid item>
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <RupeePriceIcon
                                                                className={classes.scaleIconView}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Box className={classes.dataValueViewBox}>
                                                                <Typography className={classes.dataTitle}>
                                                                    Highest Bid
                                                                </Typography>
                                                                <Typography className={classes.dataValue}>
                                                                    {/* ₹{product.current_highest_bid.amount || "--"}{" "} */}
                                                                    ₹{product.current_highest_bid?.BidValue || "--"}{" "}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <FloorStepIcon
                                                                className={classes.scaleIconView}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Box className={classes.dataValueViewBox}>
                                                                <Typography className={classes.dataTitle}>
                                                                    Created At
                                                                </Typography>
                                                                <Typography className={classes.dataValue}>
                                                                    {moment(product?.current_highest_bid?.createdAt).format("MMM DD, YYYY h:mm:ss a") || "--"}{" "}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container alignItems="center">
                                                        <Grid item>
                                                            <FloorStepIcon
                                                                className={classes.scaleIconView}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Box className={classes.dataValueViewBox}>
                                                                <Typography className={classes.dataTitle}>
                                                                    By
                                                                </Typography>
                                                                <Typography className={classes.dataValue}>
                                                                    {product.current_highest_bid?.isMyHighestBid ? 'You' : 'other'}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </div>
                                    <Grid xs={12}>
                                        <Button
                                            className={classes.selectProjBtn}
                                            variant={"contained"}
                                            color="primary"
                                            onClick={() => {
                                                handleOpenDialog(product);
                                                localStorage.setItem("productId", product.id);
                                            }}
                                            style={{ float: 'right', marginBottom: 8 }}
                                        >
                                            Submit Bid{" "}
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                ))}

                <Drawer anchor={'right'} open={openDialog} onClose={handleCloseDialog} className={classes.auctionDrawer}>
                    <DialogTitle style={{ padding: '4px 24px' }}>
                        <span style={{ fontWeight: 'bolder' }}>Auction Bid - </span> {selectedProject ? `(${selectedProject.eventID})` : ''}
                        <Grid item style={{ float: 'right' }} className={classes.bidChip}>
                            <Chip
                                label="Live"
                                variant="outlined"
                                style={{ marginRight: 8 }}
                                avatar={
                                    <Typography
                                        className={classes.blinkingDot}
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                }
                            />
                            <IconButton onClick={handleCloseDialog} size="small">
                                <CloseIcon />
                            </IconButton>
                            {liveAuctionData?.total > perPage && <Box width='100%' justifyContent='center' display='flex' alignItems='center' m={2}>
                                <Pagination
                                    // count={Math.ceil(projectData?.total / perPage)}
                                    count={2}
                                    variant="outlined"
                                    shape="rounded"
                                    page={page}
                                    onChange={(event, value) => setPage(value)}
                                    color="primary" />
                            </Box>}
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers style={{ padding: '4px 24px' }}>
                        <BiddingDetail />
                    </DialogContent>
                </Drawer>

            </Box>
        </>
    );
};

export default MyLiveAuctionTab;
