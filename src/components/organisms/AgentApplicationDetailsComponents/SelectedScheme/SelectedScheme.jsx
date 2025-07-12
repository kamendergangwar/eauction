import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Divider, Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotelOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import SquareFootOutlinedIcon from "@material-ui/icons/SquareFootOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { green } from "@material-ui/core/colors";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import {
  AccomodationIcon,
  BankIcon,
  HomeIcon,
  DocumentIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import { useHistory } from "react-router-dom";
import BillingTable from "../../MakePaymentsPageComponents/BillingTable/BillingTable";
import { AppDetailsViewStyles } from "../AppDetailsView/AppDetailsView.styles";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const projectDetails = {
  schemeName: "Awas Sainuk Yojna",
  title: "Royal Orchad 2",
  price: "55,55,590",
  location: "Kharghar, Navi Mumbai",
  bhk: "2",
  status: "Ready to move",
  carpetArea: "3089-4400",
};
const billingSummary = [
  {
    application: "Project Name  at so & so location",
    applicationFee: "₹ 250",
    platformFee: "₹ 125",
    subTotal: "₹ 125",
    gst: "₹ 125",
    total: "₹ 375",
  },
];

const SelectedScheme = (props) => {
  const { width, schemeDetails, applicantData } = props;
  const { t } = useTranslation("AgentAppDetailsViewPageTrans");
  const classes = AppDetailsViewStyles();
  const [documentDetails, setDocumentDetails] = React.useState([]);
  const history = useHistory();

  useEffect(() => {
    if (applicantData?.DocumentDetails) {
      if (applicantData?.DocumentDetails.length > 0) {
        var resultData = applicantData.DocumentDetails;
        var resultData2 = resultData;
        var get_final_data = resultData
          .reduce(function (res, currentValue) {
            if (res.indexOf(currentValue.DocumentName) === -1) {
              res.push(currentValue.DocumentName);
            }
            return res;
          }, [])
          .map(function (value) {
            return {
              DocumentName: value,
              subList: resultData2
                .filter(function (_el) {
                  return _el.DocumentName === value;
                })
                .map(function (_el) {
                  return _el;
                }),
            };
          });
        setDocumentDetails(get_final_data);
      }
    }
  }, [applicantData]);

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
    <Box className={classes.secContainer}>
      <Typography variant="h6">
        {t("applicatntProfilePage.schemeDetail.title")}
      </Typography>
      <Grid style={{ marginTop: "15px", marginBottom: "30px" }}>
        {schemeDetails.length == 0 && (
          <AlertBox severity="error">
            {"There is no Schemes available"}
          </AlertBox>
        )}
        {schemeDetails.map((projectDetails, index) => (
          <Grid key={index}>
            <Grid container spacing={1} style={{ marginBottom: "5px" }}>
              <Grid item>
                <Typography style={{ fontSize: "0.8rem" }}>
                  Project ID: <strong>{projectDetails.projectId}</strong>,
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: "0.8rem" }}>
                  Application Status:{" "}
                  <strong>{projectDetails.appStatusTxt}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Card className={classes.cardRoot}>
              <div className={classes.cardContainer}>
                <CardMedia
                  className={classes.cover}
                  image={projectDetails.images[0]}
                  title="Live from space album cover"
                />
                <div className={classes.details}>
                  <Grid container direction="row" justify="space-between">
                    <Grid item xs={6} sm={3}>
                      <Typography
                        variant="body2"
                        style={{ color: "#f27807", fontWeight: "bold" }}
                        gutterBottom
                      >
                        {projectDetails.schemeName
                          ? projectDetails.schemeName
                          : "--"}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                        gutterBottom
                      >
                        {projectDetails.title ? projectDetails.title : "--"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Button
                        type="button"
                        variant="contained"
                        size="small"
                        disableElevation
                        disableFocusRipple
                        disableTouchRipple
                        className={classes.amountView}
                      >
                        ₹{" "}
                        {projectDetails.price
                          ? numberWithCommas(projectDetails.price)
                          : "--"}
                      </Button>
                    </Grid>
                  </Grid>
                  <div className={classes.dataCotainer}>
                    <Typography variant="body2" className={classes.wrapIcon}>
                      <LocationOnOutlinedIcon fontSize="small" />
                      &nbsp;{" "}
                      {projectDetails.location ? projectDetails.location : "--"}
                    </Typography>
                    <Typography variant="body2" className={classes.wrapIcon}>
                      <LocalHotelOutlinedIcon fontSize="small" />
                      &nbsp; {projectDetails.bhk
                        ? projectDetails.bhk
                        : "--"}{" "}
                      BHK Appartment
                    </Typography>
                    <Typography variant="body2" className={classes.wrapIcon}>
                      <AssignmentTurnedInOutlinedIcon fontSize="small" />
                      &nbsp;{" "}
                      {projectDetails.status ? projectDetails.status : "--"}
                    </Typography>
                    <Typography variant="body2" className={classes.wrapIcon}>
                      <SquareFootOutlinedIcon fontSize="small" />
                      &nbsp;{" "}
                      {projectDetails.carpetArea
                        ? projectDetails.carpetArea
                        : "--"}{" "}
                      Sqft
                    </Typography>
                  </div>
                  <div className={classes.chipCotainer}>
                    <Box>
                      <Box className={`${classes.chipsUi} filled`}>
                        {projectDetails.category || "--"}
                      </Box>
                      <Box className={classes.chipsUi}>
                        {projectDetails.parking || "--"}
                      </Box>
                      <Box className={classes.chipsUi}>
                        {projectDetails.elevator || "--"}
                      </Box>
                      <Box className={classes.chipsUi}>
                        {projectDetails.cctv || "--"}
                      </Box>
                    </Box>
                    <Box>
                      <Button
                        startIcon={<EditOutlinedIcon color="primary" />}
                        color="primary"
                        component="span"
                        style={{ fontSize: 12 }}
                      >
                        {t("Edit")}
                      </Button>
                    </Box>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container alignItems="center" style={{ marginBottom: 15 }}>
        <Grid item>
          <Typography variant="h6">
            {t("applicatntProfilePage.documentsForm.title")}
          </Typography>
        </Grid>
        <Grid item style={{ paddingLeft: 15 }}>
          <Button
            startIcon={<EditOutlinedIcon color="primary" />}
            color="primary"
            component="span"
            style={{ fontSize: 12 }}
            onClick={() => history.push("/submit-documents")}
          >
            {t("applicatntProfilePage.documentsForm.editButtonText")}
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.innerTitle}>
        <AgentIconTitle
          icon={<HomeIcon fontSize="large" />}
          title={t("applicatntProfilePage.documentsForm.puccaHouseForm.title")}
        />
      </Box>
      <Box marginBottom={5}>
        <FormControl component="fieldset">
          <FormControlLabel
            name="isPuccaHouse"
            checked={applicantData.OwnOtherRoom == "1"}
            control={<Checkbox color="primary" />}
            label={t(
              "applicatntProfilePage.documentsForm.puccaHouseForm.checkBoxLabel"
            )}
            labelPlacement="end"
            disabled
            className={classes.paccaHouseCheckBox}
          />
          {/* {!isConfirmCheckbox && (
                  <FormHelperText>
                    {t("puccaHouseForm.formControl.checkBoxError")}
                  </FormHelperText>
                )} */}
        </FormControl>
      </Box>

      <Box className={classes.innerTitle} marginBottom={3}>
        <AgentIconTitle
          icon={<DocumentIcon fontSize="large" />}
          title={t(
            "applicatntProfilePage.documentsForm.castCertificateForm.title0"
          )}
        />
      </Box>
      {documentDetails.length == 0 && (
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.infoValueTxt}
        >
          --
        </Typography>
      )}
      {documentDetails.map((element, index) => (
        <Box marginBottom={8} key={index}>
          {/* <Typography variant="h6" className={classes.subTitle}>{t("applicatntProfilePage.documentsForm.castCertificateForm.title1")}</Typography> */}
          <Typography variant="h6" className={classes.subTitle}>
            {element.DocumentName}
          </Typography>
          <Box marginBottom={2} marginTop={2}>
            <Grid container spacing={3}>
              {element.subList.map((innerElement, innerIndx) => (
                <Grid item md={3} xs={12} key={innerIndx}>
                  {/* <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.castCertificateForm.formControl.documentDateLabel")}
              </Typography> */}
                  <Typography variant="subtitle1" className={classes.infoLabel}>
                    {innerElement.DocFieldName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.infoValueTxt}
                  >
                    {innerElement.DocumentValue || "--"}
                  </Typography>
                </Grid>
              ))}
              {/* <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.castCertificateForm.formControl.nameCertifcateInputLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>Randon Name</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.castCertificateForm.formControl.certifcateNumberInputLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>CDFF216589</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.castCertificateForm.formControl.certificateStateLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>Maharastra</Typography>
            </Grid> */}
            </Grid>
          </Box>
          {/* <Box marginBottom={2}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.castCertificateForm.formControl.barCodeLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>Yes</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.castCertificateForm.formControl.mahaCertificateLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>No</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box marginBottom={2}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.castCertificateForm.formControl.attachementLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>caste.pdf</Typography>
            </Grid>
          </Grid>
        </Box> */}
        </Box>
      ))}
      {/* <Box marginBottom={6}>
        <Typography variant="h6" className={classes.subTitle}>{t("applicatntProfilePage.documentsForm.casteValidityForm.title")}</Typography>
        <Box marginBottom={2} marginTop={2}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.casteValidityForm.formControl.documentNoInputLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>CDFF216589</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.casteValidityForm.formControl.nameCertifcateInputLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>Randon Name</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.casteValidityForm.formControl.casteCategoryLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>SC/ST</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.casteValidityForm.formControl.validityLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>31-07-2022</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box marginBottom={2}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.casteValidityForm.formControl.certificateStateLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>Maharastra</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.casteValidityForm.formControl.documentDateLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>12-04-21</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box marginBottom={2}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Typography
                variant="subtitle1"
                className={classes.infoLabel}
              >
                {t("applicatntProfilePage.documentsForm.casteValidityForm.formControl.attachementLabel")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" className={classes.infoValueTxt}>castevalidity.pdf</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box> */}

      <Grid container alignItems="center">
        <Grid item>
          <AgentIconTitle
            icon={<BankIcon fontSize="large" />}
            title={t("applicatntProfilePage.bankDetails.title")}
          />
        </Grid>
        <Grid item style={{ paddingLeft: 15 }}>
          <Button
            startIcon={<EditOutlinedIcon />}
            color="primary"
            component="span"
            style={{ fontSize: 12 }}
            onClick={() => history.push("/make-payments")}
          >
            {t("applicatntProfilePage.bankDetails.editButtonText")}
          </Button>
        </Grid>
      </Grid>
      <Box marginBottom={2} marginTop={2}>
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            <Typography variant="subtitle1" className={classes.infoLabel}>
              {t(
                "applicatntProfilePage.bankDetails.formControl.accountNumberLabel"
              )}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.infoValueTxt}
            >
              {applicantData.AccountNo || "--"}
            </Typography>
          </Grid>
          <Grid item md={3} xs={12}>
            <Typography variant="subtitle1" className={classes.infoLabel}>
              {t(
                "applicatntProfilePage.bankDetails.formControl.branchNameLabel"
              )}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.infoValueTxt}
            >
              {applicantData.BranchName || "--"}
            </Typography>
          </Grid>
          <Grid item md={3} xs={12}>
            <Typography variant="subtitle1" className={classes.infoLabel}>
              {t("applicatntProfilePage.bankDetails.formControl.bankNameLabel")}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.infoValueTxt}
            >
              {applicantData.BankName || "--"}
            </Typography>
          </Grid>
          <Grid item md={3} xs={12}>
            <Typography variant="subtitle1" className={classes.infoLabel}>
              {t("applicatntProfilePage.bankDetails.formControl.IFSCcodeLabel")}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.infoValueTxt}
            >
              {applicantData.IFSCCode || "--"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box borderTop={1} borderColor="grey.400" marginY={2} />
      <AgentIconTitle
        icon={<AccomodationIcon fontSize="large" />}
        title={t("applicatntProfilePage.billingForm.title")}
      />
      <BillingTable />
      {/* <div className={classes.tableContainer}>
        <Hidden only={["xs", "sm"]}>
          <TableContainer classes={{ root: classes.customTableContainer }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    {t("Application")}
                  </TableCell>
                  <TableCell>
                    {t("Application Fee")}
                  </TableCell>
                  <TableCell>
                    {t("Platform Fee")}
                  </TableCell>
                  <TableCell>
                    {t("Sub Total")}
                  </TableCell>
                  <TableCell>
                    {t("GST")}
                  </TableCell>
                  <TableCell>
                    {t("Total")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billingSummary.map((row, index) => (
                  <TableRow key={index} style={{ textTransform: "capitalize" }}>
                    <TableCell>
                      <Box>
                        <Box className={classes.catChip}>Category-Handicap</Box>
                      </Box>
                      {row.application}
                    </TableCell>
                    <TableCell>{row.applicationFee}</TableCell>
                    <TableCell>{row.platformFee}</TableCell>
                    <TableCell>{row.subTotal}</TableCell>
                    <TableCell>{row.gst}</TableCell>
                    <TableCell>{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Hidden>
        <Hidden only={["md", "lg"]}>
          {billingSummary.map((row, index) => (
            <Card
              key={index}
              elevation={2}
              style={{ marginBottom: 10, textTransform: "capitalize" }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt={row.memberName}
                    variant="rounded"
                    src={row.photoFile}
                  />
                }
                action={
                  <Box paddingTop={1}>
                    <IconButton
                      size="small"
                      aria-label="edit"
                    >
                      <EditOutlinedIcon color="primary" />
                    </IconButton>
                  </Box>
                }
                title={
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("addFamilyDetailForm.familyTable.tableTh1")}:{" "}
                    <span style={{ fontWeight: 600 }}>{row.memberName}</span>
                  </Typography>
                }
              />
              <CardContent>
                <Box display="flex" flexDirection="row">
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("addFamilyDetailForm.familyTable.tableTh2")}:{" "}
                      <span style={{ fontWeight: 600 }}> {row.age}</span>
                    </Typography>
                  </Box>
                  <Box marginLeft={3}>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("addFamilyDetailForm.familyTable.tableTh3")}:{" "}
                      <span style={{ fontWeight: 600 }}>
                        {(() => {
                          if (row.gender === "1") {
                            return "Male";
                          } else if (row.gender === "2") {
                            return "Female";
                          } else {
                            return "Other";
                          }
                        })()}
                      </span>
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY={2}>
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("addFamilyDetailForm.familyTable.tableTh4")}:{" "}
                      <span style={{ fontWeight: 600 }}> {row.relationship}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY={2}>
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("addFamilyDetailForm.familyTable.tableTh5")}:
                      <span style={{ fontWeight: 600 }}>
                        {" "}
                        {row.aadhaarNumber}
                      </span>
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY={2}>
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("addFamilyDetailForm.familyTable.tableTh6")}:
                      <span style={{ fontWeight: 600 }}> {row.mobileNumber}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY={2}>
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("addFamilyDetailForm.familyTable.tableTh")}:{" "}
                      <span style={{ fontWeight: 600 }}>{row.ownership}</span>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Hidden>
      </div> */}
    </Box>
  );
};

export default withWidth()(SelectedScheme);
