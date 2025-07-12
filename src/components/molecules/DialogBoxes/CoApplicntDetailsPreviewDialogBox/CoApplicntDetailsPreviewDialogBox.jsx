import React, { useState, useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { KycViewIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
// import {
//   getGenderList,
//   masterDataSelector
// } from "../../../../redux/features/masterdata/MasterDataSlice";

const styles = (theme) => ({
  dialogHeader: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    "& > .MuiGrid-container": {
      flexWrap: "nowrap",
      alignItems: "center"
    },
  },
  titleIcon: {
    marginRight: theme.spacing(1.9),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(1.2),
      fontSize: "1.8rem"
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[800],
  },
  mainTitle: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  /* mainSubTitle: {
    color: "#0F2940",
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  } */
});

export const DialogTitle = withStyles(styles)((props) => {
  const { title, subTitle, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogHeader} {...other}>
      <Grid container>
        <Grid item><KycViewIcon fontSize="large" className={classes.titleIcon} /></Grid>
        <Grid item>
          <Typography variant="h5" className={classes.mainTitle}>{title}</Typography>
          {/* <Typography variant="h6" className={classes.mainSubTitle}>{subTitle}</Typography> */}
        </Grid>
      </Grid>

      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
  /* dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  }, */
  formSection: {
    padding: theme.spacing(5, 6),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  sectionTitle: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: theme.spacing(2)
  },
  userInfoVeiw: {
    color: "#65707D",
    fontWeight: 500,
    fontSize: "0.9rem",
    marginBottom: theme.spacing(2),
    "& strong": {
      color: "#0F2940"
    }
  },
  fileName: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "0.9rem",
    wordBreak: "break-word",
    marginTop: theme.spacing(1)
  },
  fileViewBox: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2)
    },
    "& img": {
      maxWidth: 300,
      width: "100%"
    }
  },
  dividerLine: {
    margin: theme.spacing(3, 0)
  },
  /* formActionSec: {
    textAlign: "right",
    paddingTop: theme.spacing(3)
  } */
}));

const CoApplicntDetailsPreviewDialogBox = (props) => {
  const { onClose, open, coApplicantData } = props;
  const classes = useStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const [coApplicantGender, setCoApplicantGender] = useState("");
  const dispatch = useDispatch();
  // const {
  //   genderListData,
  //   isFetchingGender,
  //   isSuccessGender,
  //   isErrorGender,
  //   errorMsgGender,
  // } = useSelector(masterDataSelector);

  // useEffect(() => {
  //   dispatch(getGenderList());
  // }, [dispatch, t]);

  // useEffect(() => {
  //   if (isSuccessGender) {
  //     for (let g = 0; g < genderListData.length; g++) {
  //       const element = genderListData[g];
  //       console.log(coApplicantData?.Gender, element.DdtId, "11 element ---")
  //       if (coApplicantData?.Gender == element.DdtId) {
  //         setCoApplicantGender(element.Title);
  //       }
  //     }
  //   }
  // }, [isSuccessGender]);


  useEffect(() => {
    if (coApplicantData) {
      if (coApplicantData?.Gender != "0") {
        if (coApplicantData?.Gender == "1") {
          setCoApplicantGender("Male");
        } else if (coApplicantData?.Gender == "2") {
          setCoApplicantGender("Female");
        } else {
          setCoApplicantGender("Other");
        }
      }
    }
  }, [coApplicantData])

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      // fullScreen={width === "xs" ? true : false}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} title={t("coApplicant.kycDetailsView.title")} />
        <DialogContent>
          <div className={classes.formSection}>
            <Grid container>
              <Grid item xs={12} sm={7}>
                <Typography variant="h4" className={classes.sectionTitle}>{t("coApplicant.kycDetailsView.aadhaarDetails.title")}</Typography>
                <Box>
                  <Typography className={classes.userInfoVeiw}>{t("coApplicant.kycDetailsView.aadhaarDetails.aadhaarNumberLabel")}: <strong>{coApplicantData?.AadharNo}</strong></Typography>
                  <Typography className={classes.userInfoVeiw}>{t("coApplicant.kycDetailsView.aadhaarDetails.nameLabel")}: <strong>{coApplicantData?.FirstName}</strong></Typography>
                  <Typography className={classes.userInfoVeiw}>{t("coApplicant.kycDetailsView.aadhaarDetails.genderLabel")}: <strong>{coApplicantGender}</strong></Typography>
                  <Typography className={classes.userInfoVeiw}>{t("coApplicant.kycDetailsView.aadhaarDetails.addressLabel")}: <br /><strong>{coApplicantData?.House + ", " + coApplicantData?.Area}</strong></Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                {coApplicantData?.AadharFile && <Box className={classes.fileViewBox}><img src={coApplicantData?.AadharFile} alt="Aadhaar Card" /></Box>}
                {/* <Typography className={classes.fileName}>{coApplicantData?.AadharFile}</Typography> */}
              </Grid>
            </Grid>
            <Divider className={classes.dividerLine} />
            <Grid container>
              <Grid item xs={12} sm={7}>
                <Typography variant="h4" className={classes.sectionTitle}>{t("coApplicant.kycDetailsView.panCardDetails.title")}</Typography>
                <Box>
                  <Typography className={classes.userInfoVeiw}>{t("coApplicant.kycDetailsView.panCardDetails.panNumberLabel")}: <strong>{coApplicantData?.PANNo}</strong></Typography>
                  <Typography className={classes.userInfoVeiw}>{t("coApplicant.kycDetailsView.panCardDetails.nameLabel")}: <strong>{coApplicantData?.FirstName}</strong></Typography>
                  <Typography className={classes.userInfoVeiw}>{t("coApplicant.kycDetailsView.panCardDetails.genderLabel")}: <strong>{coApplicantGender}</strong></Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5}>
                {coApplicantData?.PANFile && <Box className={classes.fileViewBox}><img src={coApplicantData?.PANFile} alt="Pan Card" /></Box>}
                {/* <Typography className={classes.fileName}>{coApplicantData?.PANFile}</Typography> */}
              </Grid>
            </Grid>
            {/* <Box className={classes.formActionSec}>
              <Button
                type="button"
                variant="contained"
                color="primary"
              >
                {t(
                  "OK"
                )}
              </Button>
            </Box> */}
          </div>
        </DialogContent>
        {/* <DialogActions className={classes.dialogActions}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={handleClose}
            color="primary"
          >
            {t("addFamilyDetailForm.memberDetelePopup.cancelButton")}
          </Button>
          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={() => handleConfirm(selectedValue)}
            color="primary"
            autoFocus
          >
            {t("addFamilyDetailForm.memberDetelePopup.confirmButton")}
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default CoApplicntDetailsPreviewDialogBox;
