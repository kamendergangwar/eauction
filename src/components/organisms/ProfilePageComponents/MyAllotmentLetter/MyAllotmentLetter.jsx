import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import ProfileWrap from "../ProfileWrap/ProfileWrap";
import { MyAllotmentLetterStyle } from "./MyAllotmentLetter.style";
import { Button, useTheme, useMediaQuery } from "@material-ui/core";
import Loading from "../../../atoms/Loading/Loading";
import { DownloadNow, BannerIcon4 } from "../../../atoms/SvgIcons/SvgIcons";
import { ApplicantProgressSelector } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { ApiEndPoint } from "../../../../utils/Common";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { docDeclarationSelector, getUploadDocumentsList } from "../../../../redux/features/file/DocDeclarationSlice";

function MyAllotmentLetter(props) {
  const classes = MyAllotmentLetterStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [documentsList, setDocumentList] = useState([])
  const [myAllotmentPath, setMyAllotmentPath] = useState("");
  const [skipDocs, setSkipDocs] = useState([]);
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const {
    isFetchingGetUploadList,
    isSuccessResUploadList,
    isErrorGetUploadList,
    errorMsgGetUploadList,
    getUploadListData,
  } = useSelector(docDeclarationSelector);
  const { ApplicantStepperData, isSuccessProgressResStepper, superActiveStep } = useSelector(ApplicantProgressSelector);


  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "11" && item.Status != "completed") {
          history.push("/dashboard");
        }
      })
    }
  }, [isSuccessProgressResStepper]);

  useEffect(() => {
    let sendData = {
      ApplicantId: localStorage.getItem("applicantId"),
      Lang: localStorage.getItem("i18nextLng"),
    }
    dispatch(getUploadDocumentsList(sendData));
  }, []);

  useEffect(() => {
    if (isSuccessResUploadList && getUploadListData) {
      setDocumentList(getUploadListData?.DocumentDetails)
    }
  }, [getUploadListData, isSuccessResUploadList]);

  useEffect(() => {
    const filteredArray = documentsList.filter(item => {
      return item.DocumentDetails[0]?.IsSkipped == "1";
    });
    setSkipDocs(filteredArray);
  }, [documentsList])

  const downloadFile = (url, filename = '') => {
    setPdfLoading(true);
    var applicant_id = localStorage.getItem('applicantId');
    filename = "Allotment_Letter_" + applicant_id + ".pdf";
    const ajax_url = ApiEndPoint + "/PostLottery/fetchATPdf";
    if (filename.length === 0) filename = url.split('/').pop();
    const req = new XMLHttpRequest();
    req.open('POST', ajax_url, true);
    req.responseType = 'blob';
    req.onload = function () {
      const blob = new Blob([req.response], {
        type: 'application/pdf',
      });

      const isIE = false || !!document.documentMode;
      if (isIE) {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const windowUrl = window.URL || window.webkitURL;
        const href = windowUrl.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('download', filename);
        a.setAttribute('href', href);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      setPdfLoading(false);
    };
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("url=" + url);
  };

  useEffect(() => {
    var applicant_id = localStorage.getItem('applicantId');
    setIsFetching(true);
    axios
      .post(
        ApiEndPoint + `/PostLottery/getIsAllotmentGenerated`, {
        applicant_id,
        lang: localStorage.getItem("i18nextLng"),
      }
      )
      .then((res) => {
        var data = res?.data;
        if (data) {
          var letter_path = data?.data?.letter_path;
          if (letter_path != '') {
            setMyAllotmentPath(letter_path);
          }
        }
        setIsFetching(false);
      });
  }, []);


  return (
    <ProfileWrap>
      {(isFetchingGetUploadList || pdfLoading || isFetching) && <Loading isOpen={isFetchingGetUploadList || pdfLoading || isFetching} />}
      <div className={classes.docContainer}>
        <Box className={classes.pageHeader}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h4" className={classes.pageTitle}>{t("myAllotmentSec.title")}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.tableContainer}>
          {(superActiveStep > 8 && skipDocs.length != 0) && <Alert severity="warning" style={{ margin: '12px 0' }} action={
            <Button color="inherit" variant="outlined" size="small" onClick={() => history.push('/upload-documents')}>
              {t("Upload")}
            </Button>}>
            <AlertTitle>
              You have skipped uploading the following document. Please upload it before generating the allotment letter. The allotment letter will only be generated after following document is uploaded.
            </AlertTitle>
            <ul>
              {skipDocs.map((skipDoc, index) => (
                <li key={index}>{skipDoc?.DocumentName}</li>
              ))}
            </ul>
          </Alert>}
          {myAllotmentPath !== "" && myAllotmentPath !== undefined ? (
            <>
              <div className={classes.bannerContainer}>
                <Grid
                  container
                  alignItems="center"
                  justify="space-around"
                  className={`${classes.bannerHolder} ${classes.bannerUploadDoc}`}
                >
                  <Hidden smDown>
                    <Grid item md={2}>
                      <BannerIcon4 className={classes.bannerIcon} />
                    </Grid>
                  </Hidden>
                  <Grid item md={9}>
                    <Box className={classes.secTitle}>
                      <Typography variant="h6">
                        {t("myAllotmentSec.subTitle")}
                      </Typography>
                      <Button className={classes.downloadIconBtn} variant="contained" startIcon={isXsDown ? "" : <DownloadNow color={'#0038C0'} />} onClick={() => downloadFile(myAllotmentPath, "test.pdf")}>
                        {t("myDocumentSec.downloadBtnText")}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </>
          ) : <h1 className={classes.notFound}>{t("myAllotmentSec.allotmentnotgenerated")}</h1>
          }
        </Box>
      </div>
    </ProfileWrap>
  );
}

export default MyAllotmentLetter;

