import React, { useState, useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "../../FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import moment from "moment";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { PersonalDetailsTitleIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoApplicantDetails,
  coApplicantSelector,
  editCoApplicant,
  clearCoApplicantState
} from "../../../../redux/features/coApplicant/CoApplicantSlice";
import Loading from "../../../atoms/Loading/Loading";

const styles = (theme) => ({
  dialogHeader: {
    borderBottom: "1px solid #E7E7E7",
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(5)
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
    fontSize: "0.9rem"
  } */
});

export const DialogTitle = withStyles(styles)((props) => {
  const { title, subTitle, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogHeader} {...other}>
      <Grid container>
        <Grid item><PersonalDetailsTitleIcon fontSize="large" className={classes.titleIcon} /></Grid>
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
    padding: theme.spacing(1, 3),
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
  formActionSec: {
    textAlign: "right",
    paddingTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  }
}));

const AddCoApplicntPersonalDtlsDialogBox = (props) => {
  const { onClose, open, } = props;
  const classes = useStyles();
  const { t } = useTranslation("PersonalDetailsPageTrans");
  const [isEligible, setIsEligible] = useState(false);
  const formikRef = useRef();
  const [formValues, setFormValues] = useState(null);
  const dispatch = useDispatch();
  const {
    isFetchingGetCoApplicant,
    isSuccessResGetCoApplicant,
    isErrorGetCoApplicant,
    errorMsgGetCoApplicant,
    coApplicantData,

    isFetchingCoApplicantEdit,
    isSuccessResCoApplicantEdit,
    isErrorCoApplicantEdit,
    errorMsgCoApplicantEdit
  } = useSelector(coApplicantSelector);

  const handleClose = () => {
    onClose();
  };

  const initialValues = {
    applicantFullName: "",
    dateOfBirth: null,
    mobileNumber: "",
    emailId: "",
  };

  const validationSchema = yup.object().shape({
    applicantFullName: yup
      .string()
      .required(
        t(
          "coApplicant.addPersonalDetailsForm.formControl.fullNameErrors.required"
        )
      )
      .matches(
        /^[\u0900-\u097F.a-zA-Z ]*$/,
        t(
          "coApplicant.addPersonalDetailsForm.formControl.fullNameErrors.limitation"
        )
      ),
    dateOfBirth: yup
      .date()
      .nullable()
      .default(null)
      .required(
        t("coApplicant.addPersonalDetailsForm.formControl.dob.dobErrors.required")
      ),
    mobileNumber: yup
      .string()
      .required(
        t("coApplicant.addPersonalDetailsForm.formControl.mobileNumberErrors.required")
      )
      .matches(
        /^[6-9]\d{9}$/,
        t(
          "coApplicant.addPersonalDetailsForm.formControl.mobileNumberErrors.limitation"
        )
      ),
    emailId: yup
      .string()
      .email(t("coApplicant.addPersonalDetailsForm.formControl.emailIdErrors.limitation"))
    // .required(t("coApplicant.addPersonalDetailsForm.formControl.emailIdErrors.required")),
  });

  useEffect(() => {
    dispatch(getCoApplicantDetails());
  }, []);


  useEffect(() => {
    if (isSuccessResGetCoApplicant) {
      let first_name = "";
      if (coApplicantData.FirstName) {
        if (coApplicantData.FirstName !== "0") {
          first_name = coApplicantData.FirstName;
        } else {
          first_name = "";
        }
      }
      let date_of_birth = null;
      if (coApplicantData.DOB) {
        if (coApplicantData.DOB !== "00/00/0000") {
          let apiDate = coApplicantData.DOB;
          let convertDate = apiDate.split("-");
          const finalDate = new Date(
            parseInt(convertDate[0]),
            parseInt(convertDate[1]) - 1,
            parseInt(convertDate[2])
          );
          date_of_birth = finalDate;
        }
      }
      let mobile_no = "";
      if (coApplicantData.MobileNo) {
        if (coApplicantData.MobileNo !== "0") {
          mobile_no = coApplicantData.MobileNo;
        } else {
          mobile_no = "";
        }
      }
      let email_id = "";
      if (coApplicantData.EmailId) {
        if (coApplicantData.EmailId !== "0") {
          email_id = coApplicantData.EmailId;
        } else {
          email_id = "";
        }
      }

      const savedValues = {
        applicantFullName: first_name,
        dateOfBirth: date_of_birth,
        mobileNumber: mobile_no,
        emailId: email_id,
      };

      setFormValues(savedValues);
    }
  }, [isSuccessResGetCoApplicant, coApplicantData]);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const requestData = {
      ApplicantId: localStorage.getItem("applicantId"),
      CoApplicantFullNAme: values.applicantFullName,
      DOB: moment(values.dateOfBirth).format("YYYY/DD/MM"),
      MobileNo: values.mobileNumber,
      EmailId: values.emailId,
      AddressLine1: "",
      AddressLine2: "",
      PostalCode: "",
      City: "",
      District: "",
      State: "",
      // Type: "PersonalDetailsCoApplicantv2"
    };
    // console.log("requestData", requestData);
    dispatch(editCoApplicant(requestData));
  };

  useEffect(() => {
    if (isSuccessResCoApplicantEdit) {
      onClose();
      dispatch(clearCoApplicantState());
    }
  }, [isSuccessResCoApplicantEdit]);

  /* useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    setIsEligible(false);
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps
  */

  /* useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); */

  const calculateAge = (dob) => {
    const diffMs = Date.now() - dob.getTime();
    const ageDT = new Date(diffMs);
    const age = Math.abs(ageDT.getUTCFullYear() - 1970);
    if (age < 18) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  return (
    <>

      <Dialog
        open={open || false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      // fullScreen={width === "xs" ? true : false}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} title={t("coApplicant.addPersonalDetailsForm.title")} />
        <DialogContent>
          <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
            enableReinitialize
          >
            {({ submitForm, setFieldValue, touched, errors, values }) => (
              <Form noValidate autoComplete="off">
                <div className={classes.formSection}>
                  {isErrorCoApplicantEdit && (
                    <AlertBox severity="error">{errorMsgCoApplicantEdit}</AlertBox>
                  )}
                  {isErrorGetCoApplicant && (
                    <AlertBox severity="error">{errorMsgGetCoApplicant}</AlertBox>
                  )}
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          name="applicantFullName"
                          label={t("coApplicant.addPersonalDetailsForm.formControl.fullNameLabel")}
                          placeholder={t("coApplicant.addPersonalDetailsForm.formControl.fullNamePlaceholder")}
                          type="text"
                          id="applicantFullName"
                          required
                          inputProps={{ maxLength: 50 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="datepicker"
                          name="dateOfBirth"
                          label={t(
                            "coApplicant.addPersonalDetailsForm.formControl.dob.dobLabel"
                          )}
                          placeholder={t(
                            "coApplicant.addPersonalDetailsForm.formControl.dob.dobPlaceholder"
                          )}
                          onChange={(value) => {
                            if (value) {
                              calculateAge(value);
                              setFieldValue("dateOfBirth", value);
                            } else {
                              setFieldValue("dateOfBirth", null);
                            }
                          }}
                          // variant={width === "lg" ? "inline" : ""}
                          maxDate={new Date()}
                          inputVariant="outlined"
                          required
                        />
                        {/* <FormControl
                          control="datepicker"
                          name="dateOfBirth"
                          label={t("coApplicant.addPersonalDetailsForm.formControl.dob.dobLabel")}
                          placeholder={t("coApplicant.addPersonalDetailsForm.formControl.dob.dobPlaceholder")}
                          onChange={(value) => {
                            if (value) {
                              calculateAge(value);
                              setFieldValue("dateOfBirth", value);
                            } else {
                              setFieldValue("dateOfBirth", null);
                            }
                          }}
                          // variant={width === "lg" ? "inline" : ""}
                          maxDate={new Date()}
                          inputVariant="outlined"
                          required
                        /> */}
                        {isEligible && (
                          <AlertBox severity="error">{t("coApplicant.addPersonalDetailsForm.formControl.dob.dobErrors.eligibleText")}</AlertBox>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={t("coApplicant.addPersonalDetailsForm.formControl.mobileNumberInputLabel")}
                          placeholder={t("coApplicant.addPersonalDetailsForm.formControl.mobileNumberPlaceholder")}
                          name="mobileNumber"
                          type="number"
                          id="mobileNumber"
                          required
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 10);
                          }}
                          onChange={(e) => {
                            setFieldValue("mobileNumber", e.target.value);
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <strong>+91 - </strong>{" "}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Box paddingY={1.5}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          label={`${t("coApplicant.addPersonalDetailsForm.formControl.emailInputLabel")} (${t("coApplicant.optionalTxt")})`}
                          placeholder={t("coApplicant.addPersonalDetailsForm.formControl.emailPlaceholder")}
                          name="emailId"
                          type="email"
                          id="emailId"
                          inputProps={{ maxLength: 100 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box className={classes.formActionSec}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      // onClick={submitForm}
                      disabled={isEligible}
                    >
                      {t(
                        "coApplicant.addPersonalDetailsForm.saveBtnTxt"
                      )}
                    </Button>
                  </Box>
                </div>
              </Form>
            )}
          </Formik>
          {(isFetchingCoApplicantEdit) && (
            <Loading isOpen={isFetchingCoApplicantEdit} />
          )}
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

export default AddCoApplicntPersonalDtlsDialogBox;
