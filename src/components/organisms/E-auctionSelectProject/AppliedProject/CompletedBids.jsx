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
} from "@material-ui/core";

import Marquee from "react-fast-marquee";
import Blink from "react-blink-text";
import { styled } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    EauctionSelector,
    clearEauctionProjectData,
} from "../../../../redux/features/eauction/eauctionSlice";
import {
    getAuctionData,
    getAppliedProjectData,
} from "../../../../redux/features/eauction/eauctionSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import moment from "moment";
import { eauctionStyle } from "../eauctionStyle.style";
import BiddingDetail from "../BiddingDetail/BiddingDetail";
import { useTranslation } from "react-i18next";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import { FloorStepIcon, RoomTypeIcon, ScaleIcon, UnitTypeIcon, UploadDocsTitleIcon, WingIcon } from "../../../atoms/SvgIcons/SvgIcons";
import flashsale from "../../../../assets/flashsale.png";

import clsx from "clsx";

const StyledButton = styled(Button)({
    variant: "contained",
    color: "primary",
    background: "#0038C0",

    marginTop: 20,
    //marginRight: "15px",
});
const ButtonContainer = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
});
const StyledLink = styled(Link)({
    marginBottom: "20px",
    textDecoration: "none",
});
const CompletedBids = ({ onTabChange }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation("ProfilePageTrans");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const history = useHistory();
    const handleOpenDialog = (project) => {
        setSelectedProject(project);
        setOpenDialog(true);
    };

    const stepsData = ["Registration", "Project Selection", "Bidding", "Winner "];

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const {
        //MyProject Listing Variable state
        isFetchingMyProject,
        isSuccessMyProject,
        isErrorMyProject,
        myprojectData,
        errorMessageMyProject,
    } = useSelector(EauctionSelector);
    const sectionStyles = {
        // Background color
        //border: '1px solid #ccc',   // Border color
        margin: "5px",
    };

    const cardStyles = {
        marginBottom: "15px",

        //backgroundColor: 'cornsilk',
        border: "1px solid blue",
    };
    const alertstyle = {
        backgroundColor: "red",

        borderRadius: "10px",
    };
    const classes = eauctionStyle();
    const currentDate = moment();
    const filteredMyProjectData = myprojectData.filter((product) =>
        currentDate.isAfter(moment(product.bid_end_date))
    );

    return (
        <>

            <Box
                sx={{
                    //backgroundColor: "white",
                    padding: 20,
                    margin: 30,
                    borderRadius: 30,
                }}
            >
                <FormTitleBox
                    title={"Completed Bids"}
                    // backUrl={"/dashboard"}
                    titleIcon={<UploadDocsTitleIcon fontSize="large" />}
                />

                <Box>
                    {filteredMyProjectData.length === 0 ? (

                        <Typography variant="h6" align="center">No bidding Completed yet.</Typography>
                    ) : (
                        filteredMyProjectData.map((product) => (
                            <Card
                                className={clsx(classes.root)}
                                variant="outlined"
                                key={product.id}
                            >


                                <Grid container>
                                    <Grid item md="auto" xs={12}>
                                        <div className={classes.projectCoverImgSec}>
                                            {product?.title && (
                                                <CardMedia
                                                    component="img"
                                                    className={classes.cover}
                                                    // image={Image}
                                                    // image="https://img.staticmb.com/mbcontent/images/uploads/2023/2/13-plots-available-for-sale-in-Navi-Mumbai.jpg"
                                                    image={`https://resteauctiondev.cidcohomes.com/rest-api/applicationservice/assets/aadhaar_image/${product?.image_path}`}

                                                    title={product.title}
                                                    referrerPolicy="no-referrer"
                                                />
                                            )}
                                        </div>
                                    </Grid>
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
                                                            {product.title}
                                                        </Typography>
                                                        {
                                                            <div className={classes.selectedChip}>
                                                                <Chip label={"Completed"} variant="outlined" />
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
                                                                    <RoomTypeIcon className={classes.scaleIconView} />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Box className={classes.dataValueViewBox}>
                                                                        <Typography className={classes.dataTitle}>
                                                                            {"Location"}
                                                                        </Typography>
                                                                        <Typography className={classes.dataValue}>
                                                                            {product.location || "--"}{" "}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center">
                                                                <Grid item>
                                                                    <ScaleIcon className={classes.scaleIconView} />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Box className={classes.dataValueViewBox}>
                                                                        <Typography className={classes.dataTitle}>
                                                                            {"Type"}
                                                                        </Typography>
                                                                        <Typography className={classes.dataValue}>
                                                                            {product.project_type || "--"}{" "}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center">
                                                                <Grid item>
                                                                    <UnitTypeIcon
                                                                        className={classes.scaleIconView} />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Box className={classes.dataValueViewBox}>
                                                                        <Typography className={classes.dataTitle}>
                                                                            {"BID Type"}
                                                                        </Typography>
                                                                        <Typography className={classes.dataValue}>
                                                                            {product.bid_type || "--"}{" "}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
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
                                                                            {moment(product.bid_start_date).format(
                                                                                "MMM DD, YYYY h:mm a"
                                                                            ) || "--"}{" "}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center">
                                                                <Grid item>
                                                                    <FloorStepIcon className={classes.scaleIconView} />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Box className={classes.dataValueViewBox}>
                                                                        <Typography className={classes.dataTitle}>
                                                                            {"Bid End Date"}
                                                                        </Typography>
                                                                        <Typography className={classes.dataValue}>
                                                                            {moment(product.bid_end_date).format(
                                                                                "MMM DD, YYYY h:mm a"
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
                                                                        className={classes.scaleIconView} />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Box className={classes.dataValueViewBox}>
                                                                        <Typography className={classes.dataTitle}>
                                                                            {"EMD Amount"}
                                                                        </Typography>
                                                                        <Typography className={classes.dataValue}>
                                                                            ₹{product.emd_amount || "--"}{" "}
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div style={{ marginBottom: "5px" }}>
                                                <Grid
                                                    container
                                                    xs={12}
                                                    md="auto"
                                                    className={classes.mobileCheckboxSec}
                                                >
                                                    {currentDate.isBefore(
                                                        moment(product.bid_end_date)
                                                    ) ? (
                                                        <Button
                                                            className={classes.selectProjBtn}
                                                            variant={"contained"}
                                                            color="primary"
                                                            onClick={() => {
                                                                handleOpenDialog(product);
                                                                localStorage.setItem("productId", product.id);
                                                            }}
                                                        >
                                                            Submit Bid                      </Button>
                                                    ) : (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            disabled
                                                        // onClick={() => {
                                                        //    history.push("/make-emdproject-payment")
                                                        //     localStorage.setItem('productId', product.id);
                                                        //  }}
                                                        >
                                                            Bid Expired
                                                        </Button>
                                                    )}
                                                </Grid>
                                            </div>

                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>

                        )))}


                </Box>
            </Box>
        </>
    );
};

export default CompletedBids;
