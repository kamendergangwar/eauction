import { Box, Button, CardMedia, Chip, Divider, Grid, Hidden, Paper, Tooltip, Typography, useMediaQuery, useTheme, withStyles } from "@material-ui/core"
import { CancelBookingStyle } from "../CancelBookingStyle.style";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CancelFlatCardIluss, CancelFlatCardIlussLong, VerifiedDocIcon } from "../../../../../atoms/SvgIcons/SvgIcons";
import { Schedule } from "@material-ui/icons";
import pdfIcon from "../../../../../../assets/pdfIcon.png";
import imageGallery from "../../../../../../assets/imageGallery.png"
import UserPDFViewDialogBox from "../../../../../molecules/DialogBoxes/UserPDFViewDialogBox/UserPDFViewDialogBox";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import cancelPng from "../../../../../../assets/cancel.png"
import moment from "moment";

const reasonsList = [
    {
        value: 1,
        label: "Excessive Debt Burden"
    },
    {
        value: 2,
        label: "Job Loss or Unemployment"
    },
    {
        value: 3,
        label: "Unforeseen Circumstances"
    },
    {
        value: 4,
        label: "Poor Financial Planning",
    },
    {
        value: 5,
        label: "Other"
    },
];

const ErrorTooltip = withStyles((theme) => ({
    arrow: {
      color: 'rgba(200, 0, 0, 0.87)',
    },
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(200, 0, 0, 0.87)',
      boxShadow: "0 0 20px rgba(223 19 19 / 50%)",
      fontSize: 11,
    },
  }))(Tooltip);

const CancelHistoryCard = (props) => {
    const { setCancelStage, cancelStatusData } = props;
    const classes = CancelBookingStyle();
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const dispatch = useDispatch();
    const [reasonValue, setReasonValue] = useState('');
    const [docPreviewDialogOpenIs, setDocPreviewDialogOpen] = useState(false);
    const [documentURL, setDocumentURL] = useState("");

    const docPreviewDialogCloseFun = () => {
        setDocPreviewDialogOpen(false);
    };

    // useEffect(() => {
    //     if (cancelStatusData) {
    //         reasonsList.forEach((reason) => {
    //             if (reason.value == cancelStatusData?.reason)
    //                 setReasonValue(reason.label)
    //         })
    //     }
    // }, [cancelStatusData])

    return (
        <>
            {cancelStatusData.map((data) =>
                <>
                    <Typography style={{ fontSize: "0.8rem" }}>{data.CreatedAt}</Typography>
                    <Paper elevation={4} className={classes.historyCardCon}>
                        <Hidden smDown>
                            <Grid item xs={3}>
                                <CancelFlatCardIlussLong style={{ fontSize: "14rem", marginTop: 26 }} />
                            </Grid>
                        </Hidden>
                        <Grid container direction='column' xs={12} md={9} className={classes.historyDetailCon}>
                            <Grid container justifyContent='space-between' style={{ margin: "12px 0px 8px 0px" }}>
                                <Grid item>
                                    {data.cancel_status == 0 && <>
                                        <Typography variant='h6'>Cancel Booking Request raised</Typography>
                                        <Typography variant='body2'>Cancel Booking request is in progress.</Typography>
                                    </>}
                                    {data.cancel_status == 1 && <>
                                        <Typography variant='h6'>Cancel Booking Request accepted</Typography>
                                        <Typography variant='body2'>Cancel Booking request is completed.</Typography>
                                    </>}
                                </Grid>
                                <Grid container alignItems='center' xs direction={isXsScreen ? 'row' : 'column'}>
                                    <Typography>Application No.: &nbsp;</Typography>
                                    <Chip color={'secondary'} label={`${data.cancel_flat_data.old_application_no}`} variant={'outlined'} />
                                </Grid>
                            </Grid>
                            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                <span><strong>Cancellation Reason: </strong><i>{data.reason}</i></span>
                            </div>
                            <Grid container className={classes.cancelHistoryDetail} direction="column" justifyContent='flex-start'>
                                {/* <Grid container alignItems='center' xs={5}>
                                    <Grid item>
                                        <Typography style={{ fontSize: 12 }}><strong>Cancelation Reason :</strong> {data.reason}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider orientation='vertical' style={{ background: "rgb(2 2 2 / 45%)" }} flexItem />
                                <Grid container alignItems='center' xs={5}>
                                    <Hidden xsDown>
                                        <Grid xs={6} container>
                                            <Typography style={{ fontSize: 12 }}><strong>Uploaded Cancellation Letter :</strong></Typography>
                                        </Grid>
                                    </Hidden>
                                    <Grid xs={6} item style={{ height: 90 }}>
                                        <>
                                            <CardMedia
                                                component="img"
                                                className={classes.cover}
                                                style={{ height: 90, width: 90, position: "relative", }}
                                                image={data?.cancel_letter_url.includes(".pdf") ? pdfIcon : data?.cancel_letter_url}
                                                title={'Rejected Document'}
                                                referrerPolicy="no-referrer"
                                            />
                                            <Box className={classes.overlayBtn} onClick={(e) => { setDocPreviewDialogOpen(true); e.stopPropagation(); setDocumentURL(data?.cancel_letter_url) }} >
                                                <img src={imageGallery} alt="" />
                                                <span>{t("preview")}</span>
                                            </Box>
                                        </>
                                    </Grid>
                                </Grid> */}
                                <Grid item md="auto">
                                    <Typography className={classes.cardTitle}>
                                        Cancelled Flat details :
                                    </Typography>
                                </Grid>
                                <Grid item md="auto">
                                    <Typography >
                                        {t("projectCard.projectText")} :{" "}
                                        <strong>{data.cancel_flat_data.flats_booking_data[0].ProjectName || "--"}</strong>
                                    </Typography>
                                </Grid>
                                <Box className={classes.catChipCont} style={{ display: "flex" }}>
                                    <Box className={classes.selectedDetail}>
                                        <Typography style={{ fontSize: '0.8rem' }}>
                                            {t("projectCard.unitNo")}: <span>{data.cancel_flat_data.flats_booking_data[0]?.FlatNo || "--"}</span>
                                        </Typography>
                                        <Divider
                                            variant="middle"
                                            orientation="vertical"
                                            flexItem
                                        />
                                        <Typography style={{ fontSize: '0.8rem' }}>
                                            {t("projectCard.floorNo")}: <span>{data.cancel_flat_data.flats_booking_data[0]?.FloorNo || "--"}</span>
                                        </Typography>
                                        <Divider
                                            variant="middle"
                                            orientation="vertical"
                                            flexItem
                                        />
                                        <Typography style={{ fontSize: '0.8rem' }}>
                                            {t("projectCard.towerNo")}: <span>{data.cancel_flat_data.flats_booking_data[0]?.Wing || "--"}</span>
                                        </Typography>
                                        {/* <Divider
                                            variant="middle"
                                            orientation="vertical"
                                            flexItem
                                        /> */}
                                        {/* <Typography style={{ fontSize: '0.8rem' }}>
                                                {t("projectCard.carpetAreaLabel")}: <span>{data.cancel_flat_data.flats_booking_data[0]?.CarpetArea || "--"}{" "}{t("projectCard.sqftText")}</span>
                                            </Typography> */}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid>
                                {data.cancel_status == 0 && <Typography style={{ fontSize: 12, padding: 10, fontStyle: "italic" }}><strong>Note:</strong> Your cancellation is in progress. You'll be contacted throughout this process. Once all the necessary steps are completed, your cancellation request will be finalized.</Typography>}
                                {data.cancel_status == 1 && <Typography style={{ fontSize: 12, padding: 10, fontStyle: "italic" }}><strong>Note:</strong> Your cancellation has been accepted. You are welcome to start a fresh application at any time if you wish to re-apply.</Typography>}
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )}
            <UserPDFViewDialogBox showDownload={false} open={docPreviewDialogOpenIs} onClose={docPreviewDialogCloseFun} fileUrl={documentURL} />
        </>
    )
};

export default CancelHistoryCard;