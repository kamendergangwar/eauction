import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { ApplicantKycDtlsIcon, VerifiedSuccessIcon, PdfFileViewIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicationDetailsViewStyles } from "../ApplicationDetailsView.styles";
import Image from "../../../../assets/Profile.jpg";

const ApplicantKycDetails = (props) => {
  const { width, applicantData } = props;
  const { t } = useTranslation("MyApplicationDetailsPageTrans");
  const classes = ApplicationDetailsViewStyles();
  const [kycData, setKycData] = React.useState("");
  const [cancellCheque, setcancellCheque] = React.useState({ fileName: '', fileSize: '' });
  const [pdfFineName, setPdfFineName] = React.useState({ fileName: '', fileSize: '' });
  const [panFineName, setPanFineName] = React.useState({ fileName: '', fileSize: '' });
  const [chequeFineName, setchequeFineName] = React.useState({ fileName: '', fileSize: '' });
  const history = useHistory();

  useEffect(() => {
    let kyc_dtls_data = applicantData[0];
    if (kyc_dtls_data) {
      setKycData(kyc_dtls_data);
      if (kyc_dtls_data?.cancelledcheque) {
        let chqFileobject = kyc_dtls_data?.cancelledcheque.split("/");
        let chqFileName = chqFileobject[chqFileobject.length - 1];
        get_filesize(kyc_dtls_data?.cancelledcheque, function (size) {
          setchequeFineName({ fileName: chqFileName, fileSize: readableBytes(size) });
        });
      }

      if (kyc_dtls_data?.AadharFile) {
        let pdfFileobject = kyc_dtls_data.AadharFile.split("/");
        let pdfFileName = pdfFileobject[pdfFileobject.length - 1];
        get_filesize(kyc_dtls_data?.AadharFile, function (size) {
          setPdfFineName({ fileName: pdfFileName, fileSize: readableBytes(size) });
        });
      }

      if (kyc_dtls_data?.PANFile) {
        let panFileobject = kyc_dtls_data.PANFile.split("/");
        let panFileName = panFileobject[panFileobject.length - 1];
        get_filesize(kyc_dtls_data?.PANFile, function (size) {
          setPanFineName({ fileName: panFileName, fileSize: readableBytes(size) });
        });
      }
    }
  }, [applicantData]);

  const openPdfFile = (file) => {
    window.open(file, '_blank');
  }

  function get_filesize(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
        callback(parseInt(xhr.getResponseHeader("Content-Length")));
      }
    };
    xhr.send();
  }

  function readableBytes(bytes) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
  }

  function onlyLastFourDigit(number) {
    let string = String(number)
    let sliced = string.slice(-4);
    let mask = String(sliced).padStart(string.length, "X")
    return mask;
  }

  return (
    <Box className={classes.detailBoxContainer}>
      <Box >
        <Grid container alignItems="center">
          <Grid item md>
            <IconTitle
              icon={<ApplicantKycDtlsIcon fontSize="large" />}
              title={t("applicantKycDetails.title")}
            />
          </Grid>
          <Grid item>
            {/* <Button color="primary" variant="outlined" className={classes.editIconBtn} startIcon={<ApplicationEditIcon />}>Edit Details</Button> */}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.secCardContent}>
        <Grid container>
          <Grid item md={3} xs={12} className="aadhaarCardDtls">
            <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.aadhaarNumberLabel")}</Typography>
            <Typography className={classes.dataValView}>{onlyLastFourDigit(kycData?.AadharNo) || '--'}</Typography>
            <Typography className={`${kycData?.IsAadharVerified == "1" ? classes.verifiedMsgView : classes.notverifiedMsgView}`}>
              <VerifiedSuccessIcon /> {t("applicantKycDetails.formControl.aadhaarVerifiedText")}
            </Typography>
            {kycData?.AadharFile && kycData?.AadharFile?.indexOf(".pdf") != -1 ? (<>
              <Box className={classes.pdfPreviewBox} onClick={() => openPdfFile(kycData?.AadharFile)}>
                <Grid container alignItems="center">
                  <Grid item xs="auto"><PdfFileViewIcon /></Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography className={classes.pdfFileName}>
                      {pdfFineName.fileName}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography className={classes.fileSizeView}>{t("applicantKycDetails.formControl.fileSizeLabel")}: {pdfFineName.fileSize}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </>) : ('')}
            {kycData?.AadharFile && kycData?.AadharFile?.indexOf(".png") != -1 ? (<>
              <Box className={classes.docViewBox}>
                <img src={kycData?.AadharFile || "https://i.pinimg.com/originals/83/b3/0f/83b30f1a065cbf872c0c945602b14503.jpg"} alt="Aadhaar Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
            {kycData?.AadharFile && kycData?.AadharFile?.indexOf(".jpg") != -1 ? (<>
              <Box className={classes.docViewBox}>
                <img src={kycData?.AadharFile || "https://i.pinimg.com/originals/83/b3/0f/83b30f1a065cbf872c0c945602b14503.jpg"} alt="Aadhaar Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
            {kycData?.AadharFile && kycData?.AadharFile?.indexOf(".jpeg") != -1 ? (<>
              <Box className={classes.docViewBox}>
                <img src={kycData?.AadharFile || "https://i.pinimg.com/originals/83/b3/0f/83b30f1a065cbf872c0c945602b14503.jpg"} alt="Aadhaar Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
          </Grid>
          <Grid item md={3} xs={12} className="panCardDtls">
            <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.panNumberLabel")}</Typography>
            <Typography className={classes.dataValView}>{onlyLastFourDigit(kycData?.PANNo) || '--'}</Typography>
            <Typography className={`${kycData?.isPanVerified == "1" ? classes.verifiedMsgView : classes.notverifiedMsgView}`}><VerifiedSuccessIcon /> {t("applicantKycDetails.formControl.panVerifiedText")}</Typography>
            {kycData?.PANFile && kycData?.PANFile?.indexOf(".pdf") != -1 ? (<>
              <Box className={classes.pdfPreviewBox} onClick={() => openPdfFile(kycData?.PANFile)}>
                <Grid container alignItems="center">
                  <Grid item xs="auto"><PdfFileViewIcon /></Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography className={classes.pdfFileName}>
                      {panFineName.fileName}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography className={classes.fileSizeView}>{t("applicantKycDetails.formControl.fileSizeLabel")}: {panFineName.fileSize}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </>) : ('')}
            {kycData?.PANFile && kycData?.PANFile?.indexOf(".png") != -1 ? (
              <>
                <Box className={classes.docViewBox}>
                  <img src={kycData?.PANFile || "https://images.news18.com/ibnlive/uploads/2021/07/1625318976_pan.jpg"} alt="Pan Card" referrerPolicy="no-referrer" />
                </Box>
              </>
            ) : ('')}

            {kycData?.PANFile && kycData?.PANFile?.indexOf(".jpg") != -1 ? (<>
              <Box className={classes.docViewBox}>
                <img src={kycData?.PANFile || "https://images.news18.com/ibnlive/uploads/2021/07/1625318976_pan.jpg"} alt="Pan Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
            {kycData?.PANFile && kycData?.PANFile?.indexOf(".jpeg") != -1 ? (<>
              <Box className={classes.docViewBox}>
                <img src={kycData?.PANFile || "https://images.news18.com/ibnlive/uploads/2021/07/1625318976_pan.jpg"} alt="Pan Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
          </Grid>
        </Grid>
      </Box>
      {kycData?.BankName && <Divider />}
      { false &&
        <Box className={classes.secCardContent}>
        {kycData?.BankName && <>
          <Grid container className={classes.dataRow}>
            <Grid item md={6} xs={12} className={classes.dataResCell}>
              <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.bankNameLabel")}</Typography>
              <Typography className={classes.dataValView}>{kycData?.BankName || "--"}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.branchNameLabel")}</Typography>
              <Typography className={classes.dataValView}>{kycData?.BranchName || "--"}</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.dataRow}>
            <Grid item md={6} xs={12} className={classes.dataResCell}>
              <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.bankAccountNumberLabel")}</Typography>
              <Typography className={classes.dataValView}>{kycData?.AccountNo || "--"}</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography className={classes.dataLabel}>
                {kycData?.Micrno ? (t("applicantKycDetails.formControl.micrNumberLabel")) :
                  (t("applicantKycDetails.formControl.ifscCodeLabel"))}
              </Typography>
              <Typography className={classes.dataValView}>{kycData?.Micrno || kycData?.IFSCCode || "--"}</Typography>
            </Grid>
          </Grid>
        </>}


        <Box>
          {kycData?.cancelledcheque && kycData?.cancelledcheque?.indexOf(".pdf") != -1 ? (<>
            <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.bankDetailsLabel")}</Typography>
            <Box className={classes.fileNamePreviewBox} onClick={() => openPdfFile(kycData?.cancelledcheque)}>
              <Grid container alignItems="center">
                <Grid item xs="auto"><PdfFileViewIcon /></Grid>
                <Grid item xs zeroMinWidth>
                  <Typography className={classes.fileNamePreview}>{chequeFineName.fileName}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.fileSizeView}>{t("applicantKycDetails.formControl.fileSizeLabel")}: {chequeFineName.fileSize || "--"}</Typography>
                </Grid>
              </Grid>
            </Box>
          </>) : ('')}

          <Grid item md={6} xs={12}>
            {kycData?.cancelledcheque && kycData?.cancelledcheque?.indexOf(".png") != -1 ? (<>
              <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.cancelledCheque")}</Typography>
              <Box className={classes.docViewBox}>
                <img src={kycData?.cancelledcheque || "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2020/07/23/601022-cancelled-cheque.jpg"} alt="Pan Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
            {kycData?.cancelledcheque && kycData?.cancelledcheque?.indexOf(".jpg") != -1 ? (<>
              <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.cancelledCheque")}</Typography>
              <Box className={classes.docViewBox}>
                <img src={kycData?.cancelledcheque || "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2020/07/23/601022-cancelled-cheque.jpg"} alt="Pan Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
            {kycData?.cancelledcheque && kycData?.cancelledcheque?.indexOf(".jpeg") != -1 ? (<>
              <Typography className={classes.dataLabel}>{t("applicantKycDetails.formControl.cancelledCheque")}</Typography>
              <Box className={classes.docViewBox}>
                <img src={kycData?.cancelledcheque || "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2020/07/23/601022-cancelled-cheque.jpg"} alt="Pan Card" referrerPolicy="no-referrer" />
              </Box>
            </>) : ('')}
          </Grid>
        </Box>
      </Box>}
    </Box>
  );
};

export default withWidth()(ApplicantKycDetails);
