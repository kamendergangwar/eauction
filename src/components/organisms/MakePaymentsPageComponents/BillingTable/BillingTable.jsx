import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { DeleteIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { NoProjectIcon, PlusIcon1 } from "../../../atoms/SvgIcons/SvgIcons";
import {
  masterDataSelector,
  calculateTotalBill,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import {
  getApplication,
  editApplication,
  clearApplicationState,
  applicationSelector,
} from "../../../../redux/features/application/ApplicationSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import Chip from "@material-ui/core/Chip";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 20px rgba(7, 42, 200, 0.1)",
    borderRadius: 5,
    marginBottom: theme.spacing(5),
    overflow: "hidden",
    "& .MuiCardHeader-root": {
      backgroundColor: "#EAF2FC",
      padding: theme.spacing(2, 3),
    },
    "& .MuiCardContent-root": {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1.5, 0, 0, 0),
      },
    },
  },
  AppliedProjectTxt: {
    marginBottom: theme.spacing(2.5),
  },
  cardTitle: {
    color: "#0038C0",
    fontWeight: 500,
    fontSize: "1.1rem",
    marginRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  projectCatView: {
    backgroundColor: "rgba(0, 56, 192, 0.1)",
    borderRadius: 40,
    color: "#0038C0",
    fontWeight: 500,
    fontSize: "0.9rem",
    padding: theme.spacing(1, 2),
  },
  cardTableBox: {
    borderBottom: "1px solid #E7E7E7",
    "&>.MuiGrid-container>.MuiGrid-item": {
      borderRight: "1px solid #E7E7E7",
      padding: theme.spacing(2, 1, 2),
      "&:first-child": {
        paddingLeft: theme.spacing(1),
      },
      "&:last-child": {
        borderRight: 0,
      },
    },
    "&:last-child": {
      borderBottom: 0,
      "&>.MuiGrid-container>.MuiGrid-item": {
        paddingTop: theme.spacing(2),
      },
    },
  },
  mobileCardTableBox: {
    "&>.MuiGrid-container": {
      padding: theme.spacing(1.5, 2),
    },
  },
  selectedDetail: {
    display: "flex",
    alignItems: "center",
    padding: "2px 12px",
    background: "#FFFFFF",
    borderRadius: "40px",
    width: "fit-content",
    color: "#65707D",
    fontWeight: "600",
    fontSize: "12px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    "& span": {
      color: "#00437E",
      fontWeight: "700",
      fontSize: "14px",
    },
  },
  cardTableTitle: {
    display: "inline-flex",
    alignItems: "center",
    color: "#0F2940",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  cardTableSubTitle: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.8rem",
  },
  cardTableVal: {
    color: "#0F2940",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  primaryColor: {
    color: "#0038C0",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  cardFooter: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      borderTop: "1px solid #EEEEEE",
      padding: theme.spacing(2),
    },
  },
  removeBtn: {
    color: "#65707D",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  headertxt: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    paddingBottom: "15px",
  },
  catChipCont: {
    marginTop: theme.spacing(1),
    "& span": {
      color: "#0038C0",
      fontSize: "1rem",
      marginRight: "10px",
    },
    "& .MuiChip-root": {
      backgroundColor: "#fff",
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1.2),
      "& .MuiChip-label": {
        color: "#00437E",
        fontSize: "0.8rem",
        fontWeight: 600,
        padding: theme.spacing(1, 2),
        maxWidth: 750,
        [theme.breakpoints.down("sm")]: {
          maxWidth: 350,
        },
      },
    },
  },
  noProjectBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      width: "auto",
      height: "auto",
    },
    "& .title": {
      fontWeight: "600",
      fontSize: "0.875rem",
      lineHeight: "30px",
      color: "#0F2940",
      paddingTop: "10px",
    },
    "& .subTitle": {
      alignItems: "center",
      fontWeight: "400",
      fontSize: "0.75rem",
      lineHeight: "16px",
      color: "#4C5D6C",
      paddingBottom: "20px",
    },
  },
}));

const calculateTotal = (items) => {
  return items.map(({ total }) => Number(total)).reduce((sum, i) => sum + i, 0);
};

const BillingTable = () => {
  const classes = useStyles();
  const { t } = useTranslation("BankDetailsPageTrans");
  const [billingTableData, setBillingTableData] = useState([]);
  const [bookingDetail, setBookingDetail] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    isFetchingMasterData,
    isSuccessMasterData,
    isErrorMasterData,
    errorMsgMasterData,
    billingDetails,
    // totalBill,
    reservationCategoriesData,
  } = useSelector(masterDataSelector);

  const {
    isFetchingApplication,
    isSuccessReqEditApplication,
    isErrorApplication,
    errorMsgApplication,
    applicationData,
    applicationBookingStatus,
  } = useSelector(applicationSelector);

  useEffect(() => {
    if (isSuccessReqEditApplication) {
      dispatch(getApplication());
      setTimeout(() => dispatch(clearApplicationState()), 1000);
    }
  }, [dispatch, isSuccessReqEditApplication]);

  useEffect(() => {
    let billing_details_table_list = [];
    if (billingDetails.length > 0) {
      const tempBillingDetails = billingDetails[0];
      applicationData.forEach((item) => {
        if (item.ApplicationStatus === "0") {
          let newItem = {
            applicationId: item.ApplicationId,
            schemeId: item.SchemeId,
            projectId: item.ProjectId,
            reservationId: item.ReservationId,
            applicationStatus: item.ApplicationStatus,
            applicationFee: tempBillingDetails.ApplicationFee,
            applicationGST: tempBillingDetails.ApplicationGST,
            platformFee: tempBillingDetails.PlatformFee,
            emd: tempBillingDetails.Emd,
            emdGst: tempBillingDetails.EMDGST,
            gst: tempBillingDetails.Gst,
            total: tempBillingDetails.Total,
            categoryName: item.ApplicantCategory,
          };
          // reservationCategoriesData.forEach((element) => {
          //   if (item.ReservationId === element.ResrevationCatId) {
          //     newItem.categoryName = element.ReservationCategoryName;
          //   }
          // });
          if (item.ProjectDetails) {
            if (item.ProjectDetails.attributes) {
              newItem.name = item.ProjectDetails.attributes["Title"];
            }
          }
          billing_details_table_list.push(newItem);
        }
      });
      if (applicationBookingStatus) {
        setBookingDetail(applicationBookingStatus[0]);
      }
      setBillingTableData(billing_details_table_list);

    }
  }, [applicationData, billingDetails, reservationCategoriesData]);

  useEffect(() => {
    const invoiceTotal = calculateTotal(billingTableData);
    dispatch(calculateTotalBill(invoiceTotal));
  }, [dispatch, billingTableData]);

  const removeApplication = (value) => {
    const requestData = {
      ApplicationId: value.applicationId,
      SchemeId: value.schemeId,
      ProjectId: value.projectId,
      ReservationId: value.reservationId,
      ApplicationStatus: "9",
      Type: "Project Details",
    };
    dispatch(editApplication(requestData));
  };

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

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      maxWidth: 454,
      color: "#65707D",
      fontSize: theme.typography.pxToRem(14),
      padding: 20,
      border: "1px solid #0038C0",
      boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06)",
      borderRadius: "8px",
    },
  }))(Tooltip);

  const handleDelete = (item) => {
    const requestData = {
      ApplicationId: item.ApplicationId,
      ApplicationStatus: "9",
      Type: "Project Details",
    };
    dispatch(editApplication(requestData));
  };

  return (
    <>
      {isFetchingMasterData && <Loading isOpen={isFetchingMasterData} />}
      {isFetchingApplication && <Loading isOpen={isFetchingApplication} />}
      {isErrorMasterData && (
        <AlertBox severity="error">{errorMsgMasterData}</AlertBox>
      )}
      {isErrorApplication && (
        <AlertBox severity="error">{errorMsgApplication}</AlertBox>
      )}

      {/* {billingTableData.length != 0 && (
        <Typography className={classes.AppliedProjectTxt}>
          <strong>{t("totalProject")}</strong> :{" "}
          <strong>{billingTableData.length}</strong>
        </Typography>
      )} */}
      {billingTableData.length == 0 && (
        <Box className={classes.noProjectBox}>
          <NoProjectIcon />
          <Typography className="title">
            {t("noProjectInBilling.title")}
          </Typography>
          <Typography className="subTitle">
            {t("noProjectInBilling.noteMessage")}
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            startIcon={<PlusIcon1 />}
            onClick={() => history.push("/select-projects")}
          >
            {t("noProjectInBilling.addBtn")}
          </Button>
        </Box>
      )}
      {billingTableData.map((row, i) => (
        <Card className={classes.cardRoot} key={i}>
          <CardHeader
            title={
              <Grid container direction="column">
                <Grid item md="auto" xs={12}>
                  <Typography className={classes.cardTitle}>
                    {t("billingDetails.projectText")} :{" "}
                    <strong>{row.name || "--"}</strong>
                  </Typography>
                </Grid>
                <Grid item md="auto" xs={12}>
                  {/* <Typography className={classes.projectCatView}>
                    {console.log(element.name, "row.categoryName")}
                    {t("billingDetails.selectCatText")} :
                    <strong>{element?.name || "--"}</strong>
                  </Typography> */}

                  <Box className={classes.catChipCont}>
                    <span>{t("billingDetails.selectCatText")} :</span>
                    {row.categoryName.map((categories) => (
                      <>
                        <Chip
                          label={categories.name}
                          key={categories.id}
                          variant="outlined"
                        // onDelete={() => handleDelete(categories)}
                        />
                      </>
                    ))}
                  </Box>
                  {bookingDetail && (
                    <Box className={classes.catChipCont} style={{ display: "flex" }}>
                      <span>{t("billingDetails.selectedFlatTxt")}</span>
                      <Box className={classes.selectedDetail}>
                        <Typography style={{fontSize: '0.8rem'}}>
                          {t("billingDetails.unitNo")} <span>{bookingDetail.FlatNo}</span>
                        </Typography>
                        <Divider
                          variant="middle"
                          orientation="vertical"
                          flexItem
                        />
                        <Typography style={{fontSize: '0.8rem'}}>
                          {t("billingDetails.floorNo")} <span>{bookingDetail.FloorNo}</span>
                        </Typography>
                        <Divider
                          variant="middle"
                          orientation="vertical"
                          flexItem
                        />
                        <Typography style={{fontSize: '0.8rem'}}>
                          {t("billingDetails.towerNo")} <span>{bookingDetail.Wing}</span>
                        </Typography>
                        <Divider
                          variant="middle"
                          orientation="vertical"
                          flexItem
                        />
                        <Typography style={{fontSize: '0.8rem'}}>
                          {t("billingDetails.unitType")} <span>{bookingDetail.flat_type}</span>
                        </Typography>
                        <Divider
                          variant="middle"
                          orientation="vertical"
                          flexItem
                        />
                        <Typography style={{fontSize: '0.8rem'}}>
                          {t("billingDetails.carpetAreaLabel")} <span>{bookingDetail.CarpetArea}{" "}{t("billingDetails.SQFT")}</span>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            }
          />
          <CardContent>
            <Hidden smDown>
              <Box>
                <Box className={classes.cardTableBox}>
                  <Grid container>
                    {/* <Grid item xs={3}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head1")}
                      </Typography>
                      <Typography className={classes.cardTableSubTitle}>
                        ({t("billingDetails.nonRefundableTxt")})
                      </Typography>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head6")}
                        <HtmlTooltip
                          style={{ display: 'none' }}
                          title={
                            <React.Fragment>
                              <Typography
                                color="primary"
                                className={classes.headertxt}
                              >
                                <strong>
                                  {t("billingDetails.emdInfoModal.title")}
                                </strong>
                              </Typography>
                              <Typography variant="body2">
                                {t("billingDetails.emdInfoModal.bodyText")}{" "}
                                <strong
                                  style={{ color: "rgba(0, 0, 0, 0.87)" }}
                                >
                                  {t("billingDetails.emdInfoModal.bodyText1")}
                                </strong>{" "}
                                {t("billingDetails.emdInfoModal.bodyText2")}
                              </Typography>
                              <Typography variant="body2">
                                {t("billingDetails.emdInfoModal.bodyText3")}
                              </Typography>
                            </React.Fragment>
                          }
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.1111 16.4444H12.8889V11.1111H11.1111V16.4444ZM12 7.55556C11.5556 7.55556 11.1111 8 11.1111 8.44444C11.1111 8.88889 11.5556 9.33333 12 9.33333C12.4444 9.33333 12.8889 8.88889 12.8889 8.44444C12.8889 8 12.4444 7.55556 12 7.55556ZM12 4C7.55556 4 4 7.55556 4 12C4 16.4444 7.55556 20 12 20C16.4444 20 20 16.4444 20 12C20 7.55556 16.4444 4 12 4ZM12 18.2222C8.53333 18.2222 5.77778 15.4667 5.77778 12C5.77778 8.53333 8.53333 5.77778 12 5.77778C15.4667 5.77778 18.2222 8.53333 18.2222 12C18.2222 15.4667 15.4667 18.2222 12 18.2222Z"
                              fill="url(#paint0_linear_6059_23995)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_6059_23995"
                                x1="12"
                                y1="4"
                                x2="12"
                                y2="20"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset="0.201042" stopColor="#0038C0" />
                                <stop offset="0.878125" stopColor="#006FD5" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </HtmlTooltip>
                      </Typography>
                      {/* <Typography className={classes.cardTableSubTitle}>
                        ({t("billingDetails.loanAvailableTxt")})
                      </Typography> */}
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head8")}
                      </Typography>
                      {/* <Typography className={classes.cardTableSubTitle}>
                        ({t("billingDetails.nonRefundableTxt")})
                      </Typography> */}
                    </Grid>
                    {/* <Grid item xs={2}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head4")}
                      </Typography>
                      <Typography className={classes.cardTableSubTitle}>18%</Typography>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head5")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box className={classes.cardTableBox}>
                  <Grid container>
                    {/* <Grid item xs={3}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.applicationFee)}
                      </Typography>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.emd)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.applicationGST)}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={2}>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.emdGst)}
                      </Typography>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={classes.primaryColor}
                      >
                        ₹ {numberWithCommas(row.total)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Hidden>
            <Hidden mdUp>
              <Box>
                <Box className={classes.mobileCardTableBox}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head1")}
                      </Typography>
                      {/* <Typography className={classes.cardTableSubTitle}>
                        ({t("billingDetails.nonRefundableTxt")})
                      </Typography> */}
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.applicationFee)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head2")}
                      </Typography>
                      {/* <Typography className={classes.cardTableSubTitle}>
                        ({t("billingDetails.nonRefundableTxt")})
                      </Typography> */}
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.applicationGST)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head3")}*
                      </Typography>
                      {/* <Typography className={classes.cardTableSubTitle}>
                        ({t("billingDetails.loanAvailableTxt")})
                      </Typography> */}
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.emd)}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* <Grid container justify="space-between">
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head4")}
                      </Typography>
                      <Typography className={classes.cardTableSubTitle}>18%</Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableVal}
                      >
                        ₹ {numberWithCommas(row.emdGst)} /-
                      </Typography>
                    </Grid>
                  </Grid> */}
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.cardTableTitle}
                      >
                        {t("billingDetails.tableHeaders.head5")}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        className={classes.primaryColor}
                      >
                        ₹ {numberWithCommas(row.total)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Hidden>
            {/* <Box className={classes.cardFooter}>
              <Button
                type="button"
                startIcon={<DeleteIcon />}
                className={classes.removeBtn}
                onClick={() => removeApplication(row)}
              >
                {t("billingDetails.removeButtonText")}
              </Button>
            </Box> */}
          </CardContent>
        </Card>
      ))}

      {/* {billingTableData.length != 0 && <Typography className={classes.impTextView}>*{t("billingDetails.helpText")}</Typography>} */}
    </>
  );
};

export default BillingTable;
