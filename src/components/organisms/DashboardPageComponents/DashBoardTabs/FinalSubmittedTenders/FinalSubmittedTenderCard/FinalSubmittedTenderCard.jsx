import { Box, Button, Card, CardMedia, Chip, Grid, Hidden, Typography, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useState } from "react";
import { DateLastUpdateIcon, ProjectStsCompletedIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SaveIcon from '@material-ui/icons/Save';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GavelIcon from '@material-ui/icons/Gavel';
import moment from "moment";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CountdownTimer2 from "../../../../../molecules/CountDownTimer/CountDownTimer2";
import ApplyNowDialog from "../../AllTenders/ApplyTenderDialogBox/ApplyTenderDialog";

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
        borderRadius: 10,
        marginBottom: theme.spacing(2),
        position: "relative",
    },
    RefundedRibbon: {
        position: "absolute",
        top: "15px",
        left: "0px",
        "& .MuiSvgIcon-root": {
            width: "auto",
            height: "auto",
        }
    },
    cover: {
        width: 195,
        minHeight: '100%',
        borderRight: '1px solid #dfdfdf',
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: 80,
            minHeight: "auto",
            border: 'none'
        },
    },
    cardHeader: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        padding: theme.spacing(1.5, 2),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1.5)
        },
    },
    applicationNoView: {
        display: "flex",
        color: "#4C5C6D",
        fontSize: "0.8rem",
        fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","),
        lineHeight: "24px",
        letterSpacing: "0.04em",
        [theme.breakpoints.down("sm")]: {
            fontWeight: 400,
            fontSize: "0.5rem",
        },
        "& strong": {
            color: "#00437E",
            fontSize: "1rem",
            lineHeight: "24px",
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.75rem",
                fontWeight: "600",
            },
        },
        "& img": {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            },
        }
    },
    applicationStatusCont: {
        display: "flex",
        color: "rgba(76, 92, 109, 0.8)",
        fontSize: "12px",
        fontFamily: ["Noto Sans", '"Poppins"', "sans-serif"].join(","),
        fontWeight: 400,
        lineHeight: "16px",
        alignItems: "center",
        textAlign: "right"
    },
    statusViewChip: {
        backgroundColor: "rgb(82 82 82 / 5%)",
        border: "1px solid rgb(0 0 0 / 10%)",
        borderRadius: 40,
        color: "#6e6e6e",
        fontSize: "0.75rem",
        fontWeight: 700,
        padding: theme.spacing(0.5, 2.5),
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        marginLeft: "8px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.75rem",
            padding: theme.spacing(0.5, 3),
        },
        "&.rejected": {
            backgroundColor: "rgba(235, 87, 87, 0.05)",
            borderColor: "rgba(235, 87, 87, 0.1)",
            color: "#EB5757"
        },
        "&.waiting": {
            backgroundColor: "rgba(242, 153, 74, 0.05)",
            borderColor: "rgba(242, 153, 74, 0.1)",
            color: "#F2994A"
        },
        "&.verified": {
            backgroundColor: "rgba(33, 150, 83, 0.05)",
            borderColor: "rgba(33, 150, 83, 0.1)",
            color: "#219653"
        },
        "&.RefundInitiated": {
            backgroundColor: "rgba(235, 87, 87, 0.05)",
            borderColor: "rgba(235, 87, 87, 0.1)",
            color: "#EB5757"
        },
        "&.completed": {
            backgroundColor: "rgba(33, 150, 83, 0.05)",
            borderColor: "rgba(33, 150, 83, 0.1)",
            color: "#219653"
        },
        "&.InProgress": {
            backgroundColor: "rgba(236, 170, 0, 0.1)",
            borderColor: "rgba(236, 170, 0, 0.2)",
            color: "#ECAA00"
        },
        "&.Progress": {
            backgroundColor: "#E5EFFF",
            borderColor: "rgba(0, 94, 255, 0.2)",
            color: "#005EFF"
        },
        "&.Refunded": {
            backgroundColor: "#E5EFFF",
            borderColor: "rgba(0, 94, 255, 0.2)",
            color: "#005EFF"
        },
    },
    cardActionSec: {
        textAlign: "right",
        padding: theme.spacing(1, 0, 0, 0),
        [theme.breakpoints.down("sm")]: {
            borderTop: "1px solid rgba(1, 81, 202, 0.1)",
            padding: theme.spacing(1.25),
            textAlign: "center",
            "& .MuiButtonBase-root": {
                fontSize: "0.875rem",
                fontWeight: 600,
                lineHeight: "24px",
            }
        },
    },
    cardContentCont: {
        padding: theme.spacing(2, 2.5),
        [theme.breakpoints.down("sm")]: {
            padding: 0,
        },
    },
    projectTitle: {
        color: "#0F2940",
        fontSize: "1rem",
        fontWeight: "bold",
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            fontSize: "0.9rem",
            padding: theme.spacing(1.25),
            margin: 0
        },
    },
    catTitleView: {
        color: "#4C5C6D",
        fontSize: "0.8rem",
        marginBottom: theme.spacing(0.8)
    },
    chipCont: {
        whiteSpace: "pre-wrap",
        "& .MuiChip-root": {
            backgroundColor: "#EAF2FC",
            color: "#00437E",
            fontWeight: 600,
            fontSize: "0.8rem",
            marginRight: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
            maxWidth: 360,
            [theme.breakpoints.down("sm")]: {
                height: "auto",
                maxWidth: "70%",
                padding: theme.spacing(1)
            },
            "& .MuiChip-label": {
                [theme.breakpoints.down("sm")]: {
                    whiteSpace: "initial",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            }
        }
    },
    catViewSection: {
        paddingTop: theme.spacing(1.875),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(3, 1.25),
        },
    },

    paymentPendingTxt: {
        fontSize: "0.7rem",
        marginBottom: theme.spacing(0.5),
        textAlign: "center"
    },
    orTxt: {
        fontSize: "0.8rem",
        lineHeight: "40px",
        padding: "0 10px"
    },
    uploadDocBtn: {
        background: "linear-gradient(326deg, rgb(0 13 199) 0%, rgb(16 147 245) 70%)",
        border: 0
    },
    requiredDocumentCount: {
        marginRight: "8px",
        "& .reqCount": {
            fontWeight: "700",
            color: "#0F2940"
        }
    },
    boxContentCont: {
        padding: theme.spacing(2, 2.5),
        [theme.breakpoints.down("sm")]: {
            padding: 0,
        },
    },
    stepperSec: {
        paddingRight: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 0),
        },
    },
    stepperBox: {
        textAlign: "center",
        position: "relative",
        height: 80,
    },
    numRoundBox: {
        backgroundColor: "#FFFFFF",
        border: "2px solid #F1F4F8",
        boxShadow: "0px 0px 20px rgba(0, 25, 121, 0.06)",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 2,
        color: "#FFFFFF",
        /* "&.active": {
          borderColor: "rgba(204, 222, 245, 0.6)",
          width: 46,
          height: 46,
        }, */
        "&.completed": {
            backgroundColor: "#219653",
            boxShadow: "0px 0px 40px rgba(0, 25, 121, 0.1)"
        },
        "& .MuiSvgIcon-root": {
            fontSize: "1.2rem"
        },
    },
    stepperText: {
        color: "rgba(76, 93, 108, 0.8)",
        fontSize: "0.6rem",
        position: "absolute",
        top: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        /* "&.active": {
          color: "#FFFFFF",
          fontWeight: "bold",
        }, */
        "&.completed": {
            color: "#0F2940",
        },
    },
    stepBeforeAfterLine: {
        borderTop: "2px solid #F1F4F8",
        position: "absolute",
        top: "30%",
        left: 0,
        width: "calc(50% - 14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: "translate(0, -50%)",
        zIndex: 1,
        "&.after": {
            left: "50%",
            transform: "translate(14px, -50%)"
        },
        "&.completed": {
            borderColor: "#219653"
        }
    },
    lastUpdatedDateView: {
        color: "#4C5D6C",
        fontSize: "0.8rem",
        "& .MuiSvgIcon-root": {
            fontSize: "1.2rem",
            verticalAlign: "middle",
            marginRight: theme.spacing(0.5)
        },
        "& span": {
            verticalAlign: "middle",
            display: "inline-block",
            marginRight: theme.spacing(0.5)
        },
        "& strong": {
            verticalAlign: "middle",
            display: "inline-block"
        },
    },
    bidChip: {
        display: 'flex',
        gap: 8,
        "& .MuiChip-outlined": {
            backgroundColor: "rgb(242, 253, 252)",
            border: "1px solid rgb(4, 211, 188)",
            "& .MuiChip-label": {
                color: "black",
                fontSize: "0.8rem",
                fontWeight: 700,
                padding: theme.spacing(1, 2),
            },
        },
    },
}));

const FinalSubmittedTenderCard = (props) => {
    const { projectDetails, stepperData } = props;
    const classes = useStyles();
    const { t } = useTranslation("DashboardPageTrans");
    const dispatch = useDispatch();
    const history = useHistory();
    const [stepperList, setStepperList] = useState([]);
    const [overallApplicationStatus, setOverallApplicationStatus] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [projectSelected, setProjectSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setProjectSelected(null)
    };


    useEffect(() => {
        if (!stepperData) return;

        const modifiedStpprList = stepperData.map(element => {
            let pageName = '';
            let stepIcon = <SaveIcon style={{ color: '#afa8a8' }} />;
            let isBeforeLine = true;
            let isAfterLine = true;

            switch (element.StepId) {
                case '1':
                    pageName = 'Declaration';
                    stepIcon = element.Status === 'completed' ? <ProjectStsCompletedIcon /> : <PaymentIcon style={{ color: '#afa8a8' }} />;
                    isBeforeLine = false;
                    break;
                case '2':
                    pageName = 'EAuction Fee';
                    stepIcon = element.Status === "completed" ? <ProjectStsCompletedIcon /> : <PaymentIcon style={{ color: '#afa8a8' }} />;
                    break;
                case '3':
                    pageName = 'EMD Payment';
                    stepIcon = element.Status === 'completed' ? <ProjectStsCompletedIcon /> : <AccountBalanceIcon style={{ color: '#afa8a8' }} />;
                    break;
                case '4':
                    pageName = 'Technical Bid';
                    stepIcon = element.Status === 'completed' ? <ProjectStsCompletedIcon /> : <AssignmentIcon style={{ color: '#afa8a8' }} />;
                    break;
                case '5':
                    pageName = 'Close Bid';
                    stepIcon = element.Status === 'completed' ? <ProjectStsCompletedIcon /> : <GavelIcon style={{ color: '#afa8a8' }} />;
                    break;
                default:
                    if (element.Status === 'completed') {
                        setOverallApplicationStatus(true);
                    } else {
                        setOverallApplicationStatus(false);
                    }
                    pageName = 'Final Submission';
                    stepIcon = element.Status === "completed" ? <ProjectStsCompletedIcon /> : <SaveIcon style={{ color: '#afa8a8' }} />;
                    isAfterLine = false;
                    break;
            }

            return {
                ...element,
                pageName,
                stepIcon,
                isBeforeLine,
                isAfterLine
            };
        });

        setStepperList(modifiedStpprList);

        // Determine the active step based on the completion status
        const pendingStep = modifiedStpprList.findIndex(step => step.Status !== 'completed');
        const activeStep = pendingStep !== -1 ? pendingStep : modifiedStpprList.length;

        setActiveStep(activeStep);
    }, [stepperData]);

    console.log(activeStep);

    // const handleSubmissionDates = () => {
    //     switch (activeStep) {
    //         case '2':
    //             return <span>Pay Document fee end date<br /><strong>{moment(projectDetails.eauctionDocumentEndDate).format("MMMM DD, YYYY, h:mm A")}</strong></span>
    //         case '3':
    //             return <span>Pay EMD fee end date<br /><strong>{moment(projectDetails.eauctionEmdEndDate).format("MMMM DD, YYYY, h:mm A")}</strong></span>
    //         case '4':
    //             return <span>Close Bid end date<br /><strong>{moment(projectDetails.closeBidSubmitEndDate).format("MMMM DD, YYYY, h:mm A")}</strong></span>
    //         case '5':
    //             return <span>Final submission end date<br /><strong>{moment(projectDetails.regEndDate).format("MMMM DD, YYYY, h:mm A")}</strong></span>
    //         case '6':
    //             return <span>Final submission end date<br /><strong>{moment(projectDetails.regEndDate).format("MMMM DD, YYYY, h:mm A")}</strong></span>
    //         default:
    //             return <span>Tender Registration end date<br /><strong>{moment(projectDetails.regEndDate).format("MMMM DD, YYYY, h:mm A")}</strong></span>
    //     }
    // }

    return (
        <Card className={classes.cardRoot}>
            {/* {projectDetails.ApplicationStatus == "4" &&
                <Box className={classes.RefundedRibbon}>
                    <WinnerTagIcon />
                </Box>
            }
            {projectDetails.ApplicationStatus == "6" &&
                <Box className={classes.RefundedRibbon}>
                    <LostTagIcon />
                </Box>
            } */}

            <Grid container >
                <Grid item md="auto" xs={12}>
                    <CardMedia
                        className={classes.cover}
                        image={`https://resteauctiondev.cidcohomes.com/rest-api/applicationservice/uploads/project_images/${projectDetails?.image_path}`}
                        title="Projects image"
                        component="img"
                        referrerPolicy="no-referrer"
                        disabled
                    />
                </Grid>
                <Grid item md xs={12}>
                    <Box className={classes.cardBody}>
                        <Grid container alignItems="center" justify="space-between" className={classes.cardHeader}>
                            <Grid item md="auto">
                                {/* | {projectDetails.ApplicationAppliedDate */}
                                <Typography className={classes.applicationNoView}>
                                    <strong>{projectDetails.eventID}</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md="auto">
                                <Grid container alignItems="center" justify="right">
                                    {/* <Box className={classes.applicationStatusCont}>
                                        <Box className={`${classes.statusViewChip} ${projectDetails.appStatusClass}`}> {overallApplicationStatus ? 'Completed' : 'Pending'}</Box>
                                    </Box> */}
                                    {projectDetails?.eauctionStartDate && (
                                        <Box display='flex' alignItems='center' className={classes.bidChip}>
                                            <Typography style={{ fontWeight: 600 }}>Live Auction Starts in :&nbsp;</Typography>
                                            <Chip
                                                label={<CountdownTimer2 targetDate={projectDetails?.eauctionStartDate} />}
                                                variant="outlined"
                                                icon={<QueryBuilderIcon style={{ color: 'rgb(4, 211, 188)' }} />}
                                            />
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box className={classes.cardContentCont}>
                            <Grid container>
                                <Grid container justify="space-between" md={6} direction="column">
                                    <Grid item xs={12} md="auto">
                                        <Typography className={classes.projectTitle}>{projectDetails.eventID}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md="auto">
                                        <Box className={classes.catViewSection}>
                                            <Typography className={classes.lastUpdatedDateView}><DateLastUpdateIcon /> <span>Live E-Auction Start date<br /><strong>{moment(projectDetails.eauctionStartDate).format("MMMM DD, YYYY, h:mm A")}</strong></span></Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems="flex-end" md={6}>
                                    <Grid item md xs={12} className={classes.stepperSec}>
                                        <Grid container>
                                            {stepperList.map((element, index) => (
                                                <Grid item xs key={index}>
                                                    <Box className={classes.stepperBox}>
                                                        <Box className={`${classes.numRoundBox} ${element.Status}`}>
                                                            {element.stepIcon}
                                                        </Box>
                                                        <Typography
                                                            className={`${classes.stepperText} ${element.Status}`}
                                                        >
                                                            {element.pageName}
                                                        </Typography>
                                                        {element.isBeforeLine && (
                                                            <span className={`${classes.stepBeforeAfterLine} ${element.Status}`}></span>
                                                        )}
                                                        {element.isAfterLine && (
                                                            <span className={`${classes.stepBeforeAfterLine} after ${element.Status}`}></span>
                                                        )}
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md="auto" xs={12} className={classes.cardActionSec}>
                                <Button
                                    className={classes.detailButton}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                        setOpen(true);
                                        setProjectSelected(projectDetails)
                                    }}
                                >
                                    {"View Detail"}
                                </Button>
                                {/* <Button color="primary" variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => {
                                    history.push("/apply-now");
                                    localStorage.setItem('productId', projectDetails.id);
                                }}>Proceed to complete</Button> */}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {projectSelected && <ApplyNowDialog open={open} handleClose={handleClose} projectData={projectSelected} isBottomAction={false} />}
        </Card>
    )
}

export default FinalSubmittedTenderCard;