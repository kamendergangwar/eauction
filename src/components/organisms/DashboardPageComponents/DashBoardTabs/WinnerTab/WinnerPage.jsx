import React, { useEffect, useState } from "react";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    CardMedia,
    Box,
    Grid,
    Divider,
    Chip,
    TableHead,
    Dialog,
    DialogTitle,
    DialogContent,
    TableContainer,
    Paper,
    IconButton,
    colors,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    EauctionSelector,
    getWinnerData, getTopBids,
    clearEauctionTopBidsData
} from "../../../../../redux/features/eauction/eauctionSlice";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import moment from "moment";
import { eauctionStyle } from "../../../E-auctionSelectProject/eauctionStyle.style";
import { useTranslation } from "react-i18next";
import FormTitleBox from "../../../../atoms/FormTitleBox/FormTitleBox";
import {
    FloorStepIcon,
    RoomTypeIcon,
    ScaleIcon,
    UnitTypeIcon,
    UploadDocsTitleIcon,
    WingIcon,
} from "../../../../atoms/SvgIcons/SvgIcons";
import clsx from "clsx";

import { numberWithCommas } from "../../../../../utils/util";
import { Pagination } from "@material-ui/lab";

import { ApiEndPoint } from "../../../../../utils/Common";

const WinnerPage = ({ onTabChange }) => {
    const {
        isFetchingWinnerData,
        isSuccessWinnerData,
        isErrorWinnerData,
        winnerData,
        errorMessageWinnerData,
        isFetchingTopBidsData,
        isSuccessTopBidsData,
        isErrorTopBidsData,
        topBidsData,
        errorMessageTopBids,
    } = useSelector(EauctionSelector);

    const dispatch = useDispatch();
    const { t } = useTranslation("ProfilePageTrans");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const history = useHistory();
    const [pdfLoading, setPdfLoading] = useState(false);
    const [bidsData, setBidsData] = useState("");
    const [page, setPage] = useState(1);

    const perPage = 5;

    const handleOpenDialog = (project) => {
        setSelectedProject(project);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = (data) => {

        dispatch(getTopBids(data));
        // setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(clearEauctionTopBidsData())
    };


    useEffect(() => {
        dispatch(getWinnerData());

    }, [dispatch]);

    const classes = eauctionStyle();
    useEffect(() => {
        if (isSuccessTopBidsData) {
            setBidsData(topBidsData);
            setOpen(true);
        }
    }, [isSuccessTopBidsData])

    useEffect(() => {
        localStorage.setItem("WinnerPageNo", page);
        dispatch(getWinnerData());
    }, [page]);


    const downloadResult = (data) => {
        setPdfLoading(true);
        let fileUrl = `${ApiEndPoint}/Auction/getResultPdf`;
        fetch(fileUrl, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
            body: JSON.stringify(data)
        }).then((response) => response.blob()).then((blob) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Auction_Result_' + data.eventID;
            document.body.append(link);
            link.click();
            link.remove();
            // in case the Blob uses a lot of memory
            setTimeout(() => URL.revokeObjectURL(link.href), 300);
        }).catch(function (error) {
            alert("Result not found");
        }).finally(res => {
            setPdfLoading(false);
        })
    };
    return (
        <>
            <Box
                sx={{
                    padding: 20,
                    margin: 30,
                    borderRadius: 30,
                }}
            >
                <FormTitleBox
                    title={"Auction Results"}
                    titleIcon={<UploadDocsTitleIcon fontSize="large" />}
                />
                <Box>
                    {isFetchingWinnerData && <Typography>Loading Results...</Typography>}
                    {isErrorWinnerData && (
                        <Typography variant="h6" align="center">
                            {errorMessageWinnerData}
                        </Typography>
                    )}
                    {isSuccessWinnerData && (
                        <>
                            {winnerData?.map((winner) => (
                                <Card raised
                                    className={clsx(classes.root)}
                                    variant="outlined"
                                    key={winner?.winner?.winner_id}
                                >
                                    <Grid container>
                                        {/* <Grid item md="auto" xs={12}>
                                            <div className={classes.projectCoverImgSec}>
                                                {winner?.winner?.title && (
                                                    <CardMedia
                                                        component="img"
                                                        className={classes.cover}
                                                        image={`https://resteauctiondev.cidcohomes.com/rest-api/applicationservice/assets/aadhaar_image/${winner.winner.image_path}`}
                                                        title={winner?.winner?.title}
                                                        referrerPolicy="no-referrer"
                                                    />
                                                )}
                                            </div>
                                        </Grid> */}
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
                                                                {winner.winner.eventID}
                                                            </Typography>


                                                            {




                                                                <div className={classes.selectedChip}>
                                                                    <Button size="small" color="primary" onClick={() => {
                                                                        let data = {
                                                                            ProjectId: winner.winner.ProjectId,
                                                                            ApplicantId: localStorage.getItem("applicantId"),

                                                                        };
                                                                        handleClickOpen(data);
                                                                    }}>
                                                                        View My Bids
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            let data = {
                                                                                ProjectId: winner.winner.ProjectId,
                                                                                ApplicantId: localStorage.getItem("applicantId"),
                                                                                eventID: winner.winner.eventID
                                                                            };
                                                                            downloadResult(data);
                                                                        }}
                                                                        color="primary"
                                                                    >
                                                                        View Result
                                                                    </Button>
                                                                    {/* <Chip
                                                                        label={"Result"}
                                                                        color="primary"
                                                                        variant="outlined"
                                                                    /> */}

                                                                </div>

                                                            }
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
                                                            xs={11}
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                            className={classes.projectDetailsCon}
                                                        >
                                                            <Grid item>
                                                                <Grid container alignItems="center">
                                                                    <Grid item>
                                                                        <RoomTypeIcon
                                                                            className={classes.scaleIconView}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Box className={classes.dataValueViewBox}>
                                                                            <Typography className={classes.dataTitle}>
                                                                                {"Location"}
                                                                            </Typography>
                                                                            <Typography className={classes.dataValue}>
                                                                                {winner.winner.eventID || "--"}{" "}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container alignItems="center">
                                                                    <Grid item>
                                                                        <ScaleIcon
                                                                            className={classes.scaleIconView}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Box className={classes.dataValueViewBox}>
                                                                            <Typography className={classes.dataTitle}>
                                                                                {"Type"}
                                                                            </Typography>
                                                                            <Typography className={classes.dataValue}>
                                                                                {winner.winner.auctionFor || "--"}{" "}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container alignItems="center">
                                                                    <Grid item>
                                                                        <UnitTypeIcon
                                                                            className={classes.scaleIconView}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Box className={classes.dataValueViewBox}>
                                                                            <Typography className={classes.dataTitle}>
                                                                                {"BID Type"}
                                                                            </Typography>
                                                                            <Typography className={classes.dataValue}>
                                                                                {winner.winner.BidType || "--"}{" "}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container alignItems="center">
                                                                    <Grid item>
                                                                        <WingIcon
                                                                            className={classes.scaleIconView}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Box className={classes.dataValueViewBox}>
                                                                            <Typography className={classes.dataTitle}>
                                                                                {"Highest Bid"}
                                                                            </Typography>
                                                                            <Typography className={classes.dataValue}>
                                                                                ₹&nbsp;
                                                                                {numberWithCommas(
                                                                                    winner.winner.BidValue
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
                                                                                {moment(
                                                                                    winner.winner.eauctionEndDate
                                                                                ).format("MMM DD, YYYY h:mm a") ||
                                                                                    "--"}{" "}
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
                                                                                {"Result Opening Date"}
                                                                            </Typography>
                                                                            <Typography className={classes.dataValue}>
                                                                                {moment(
                                                                                    winner.winner.eauctionResultOpenDate
                                                                                ).format("MMM DD, YYYY h:mm a") ||
                                                                                    "--"}{" "}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            {/* <Grid item>
                                                                <Grid container alignItems="center">
                                                                    <Grid item>
                                                                        <FloorStepIcon
                                                                            className={classes.scaleIconView}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Box
                                                                            className={
                                                                                classes.dataValueViewBox
                                                                            }
                                                                        >
                                                                            <Typography
                                                                                className={classes.dataTitle}
                                                                            >
                                                                                {"Base Price"}
                                                                            </Typography>
                                                                            <Typography
                                                                                className={classes.dataValue}
                                                                            >
                                                                                ₹{winner.winner.base_price || "--"}{" "}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                {/* <div style={{ marginBottom: "5px" }}>
                                                    <Grid
                                                        container
                                                        xs={12}
                                                        md="auto"
                                                        className={classes.mobileCheckboxSec}
                                                    > */}
                                                {/* You can add buttons or any other UI elements here */}
                                                {/* </Grid>
                                                </div> */}
                                                {/* <div className={classes.dataContainer} >
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Rank</TableCell>
                                                                <TableCell>Bidder Name</TableCell>
                                                                <TableCell>Bid Amount</TableCell>
                                                                <TableCell>Bid Type</TableCell>
                                                                <TableCell>Bid Date and Time</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {winner.looser.map((loser, index) => (
                                                                <TableRow key={loser.ApplicantId}>
                                                                    <TableCell>{index + 1}</TableCell>
                                                                    <TableCell>{loser.FirstName}</TableCell>
                                                                    <TableCell>{loser.MaxBidValue}</TableCell>
                                                                    <TableCell>{winner.winner.BidType}</TableCell>
                                                                    <TableCell>
                                                                        {moment(loser.CreatedAt).format(
                                                                            "MMM DD, YYYY h:mm a"
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div> */}
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                        </>
                    )}
                </Box>
                {winnerData?.total > perPage && (
                    <Box
                        width="100%"
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                        m={2}
                    >
                        <Pagination
                            // count={Math.ceil(projectData?.total / perPage)}
                            count={2}
                            variant="outlined"
                            shape="rounded"
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth className={classes.modelBoxConfirm}>
                <DialogTitle >My Last 10 bids
                    <IconButton title="close"  className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon  />
                    </IconButton></DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table className={classes.dataContainer}>
                            <TableHead style={{ backgroundColor: '#0f297f' }}>
                                <TableRow >

                                    <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>BidValue</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>Bid Type</TableCell>
                                    <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>CreatedAt</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {bidsData && bidsData.length > 0 ? (
                                    bidsData.map((row) => (
                                        <TableRow key={row.BidId}>
                                            <TableCell align="center">{row.BidValue}</TableCell>
                                            <TableCell align="center">{row.bidtype}</TableCell>
                                            <TableCell align="center">{moment(row.CreatedAt).format("MMM DD, YYYY h:mm a")}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            No bid data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>

            </Dialog>
        </>
    );
};

export default WinnerPage;
