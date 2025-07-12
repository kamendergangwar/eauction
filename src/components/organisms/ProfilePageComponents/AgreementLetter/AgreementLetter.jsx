import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import ProfileWrap from "../ProfileWrap/ProfileWrap";
import { AgreementLetterStyle } from "./AgreementLetter.style";
import { Button, useTheme, useMediaQuery } from "@material-ui/core";
import { ApplicantProgressSelector } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import { ApiEndPoint } from "../../../../utils/Common";
import axios from "axios";
import { BannerIcon4, DownloadNow } from "../../../atoms/SvgIcons/SvgIcons";
import Loading from "../../../atoms/Loading/Loading";

function AgreementLetter(props) {
  const classes = AgreementLetterStyle();
  const { t } = useTranslation("ProfilePageTrans");
  const history = useHistory();
  const dispatch = useDispatch();
  const [letterPath, setLetterPath] = useState("");
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  //allow only if installment (step 13) is completed
  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        if (item.StepId == "13" && item.Status != "completed") {
          history.push("/dashboard");
        }
      })
    }
  }, [isSuccessProgressResStepper]);

  const downloadFile = (url, filename = '') => {
    setPdfLoading(true);
    var applicant_id = localStorage.getItem('applicantId');
    filename = "Agreement_Letter_" + applicant_id + ".pdf";
    const ajax_url = ApiEndPoint + "/PostLottery/fetchATSPdf";
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
    axios.post(
      ApiEndPoint + `/PostLottery/getIsAgreementLetterGenerated`, {
      applicant_id,
      lang: localStorage.getItem("i18nextLng"),
    })
      .then((res) => {
        var data = res?.data;
        if (data) {
          var letter_path = data?.data?.letter_path;
          if (letter_path != '') {
            setLetterPath(letter_path);
          }
        }
        setIsFetching(false);
      });
  }, []);

  return (
    <ProfileWrap>
      {(pdfLoading || isFetching) && <Loading isOpen={pdfLoading || isFetching} />}
      <div className={classes.docContainer}>
        <Box className={classes.pageHeader}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h4" className={classes.pageTitle}>{t("agreementSec.title")}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.tableContainer}>
          {letterPath !== "" && letterPath !== undefined ? (
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
                        {t("agreementSec.subTitle")}
                      </Typography>
                      <Button className={classes.downloadIconBtn} variant="contained" startIcon={isXsDown ? "" : <DownloadNow color={'#0038C0'} />} onClick={() => downloadFile(letterPath, "test.pdf")}>
                        {t("myDocumentSec.downloadBtnText")}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </>
          ) : <h1 className={classes.notFound}>{t("agreementSec.agreementnotgenerated")}</h1>
          }
        </Box>
      </div>
    </ProfileWrap>
  );
}

export default AgreementLetter;

