import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FormControl from "../../FormControl/FormControl";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  dialogBoxCloseBtn: {
    color: "#0F2940",
    position: "absolute",
    right: 0,
    top: 0,
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem"
    }
  },
  dialogBoxTitle: {
    padding: theme.spacing(6),
    textAlign: "center",
    "& .MuiDialogTitle-root": {
      padding: 0
    },
    "& h2": {
      color: "#007AE7",
      fontSize: "1.5rem",
      fontWeight: "bold"
    }
  },
  dotView: {
    backgroundColor: "#E63626",
    borderRadius: "50%",
    display: "inline-block",
    width: 10,
    height: 10,
    marginLeft: theme.spacing(1.4)
  },
  dialogContentSec: {
    minWidth: "450px",
    padding: theme.spacing(0, 7, 4.5)
  }
}));

const AgntPersonalInformationEditDialogBox = (props) => {
  const { open, onClose, selectedApplication } = props;
  const classes = useStyles();
  const { t } = useTranslation("AgentProfilePageTrans");
  const formikRef = useRef();
  const [appNotifications, setAppNotifications] = useState([]);

  /* useEffect(() => {
    console.log("selectedApplication", selectedApplication.DashboardNotifications);
    if (Array.isArray(selectedApplication?.DashboardNotifications)) {
      setAppNotifications(selectedApplication.DashboardNotifications);
    }
  }, [selectedApplication]); */
  const genderList = [
    {
      value: 1,
      label: t(
        "personalInfoEdit.formControl.genderOptions.male"
      ),
    },
    {
      value: 2,
      label: t(
        "personalInfoEdit.formControl.genderOptions.female"
      ),
    },
    {
      value: 3,
      label: t(
        "personalInfoEdit.formControl.genderOptions.other"
      ),
    },
  ];

  const initialValues = {
    fullName: "",
    gender: "",
    mobileNumber: "",
    emailId: "",
    currentAddress: ""
  };

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required(t("personalInfoEdit.formControl.fullNameErrors.required")),
    mobileNumber: yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t("personalInfoEdit.formControl.mobileNumberErrors.limitation")
      )
      .required(t("personalInfoEdit.formControl.mobileNumberErrors.required")),
    gender: yup
      .string()
      .required(
        t("personalInfoEdit.formControl.genderErrors.required")
      ),
    emailId: yup
      .string()
      .email(
        t("personalInfoEdit.formControl.emailIdErrors.limitation")
      )
      .required(t("personalInfoEdit.formControl.emailIdErrors.required")),
    currentAddress: yup
      .string()
      .required(t("personalInfoEdit.formControl.currentAddressErrors.required"))
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log("values", values);
    /* if (
      values.fullName &&
      values.mobileNumber &&
      values.grievanceCategory &&
      values.grievanceType &&
      values.grievanceDescription &&
      phnNumber
    ) {
      const requestData = new FormData();
      requestData.append("full_name", values.fullName);
      requestData.append("email", values.emailId);
      // requestData.append("mobile_no", values.mobileNumber);
      requestData.append("mobile_no", phnNumber);
      requestData.append("grievance_category", values.grievanceCategory);
      requestData.append("grievances_type", values.grievanceType);
      requestData.append("description", values.grievanceDescription);
      requestData.append("attachment", imageUrl);
      requestData.append("status", "completed");
      dispatch(raiseGrievance(requestData));
    } */
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <Grid className={classes.dialogBoxTitle}>
        <DialogTitle id="alert-dialog-title">{t("personalInfoEdit.title")}</DialogTitle>
        <IconButton className={classes.dialogBoxCloseBtn} onClick={() => onClose(false)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Grid>
      <DialogContent className={classes.dialogContentSec}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form noValidate autoComplete="off">
              <FormControl
                control="input"
                variant="outlined"
                label={t("personalInfoEdit.formControl.fullNameLabel")}
                placeholder={t("personalInfoEdit.formControl.fullNamePlaceholder")}
                name="fullName"
                type="text"
                id="fullName"
                required
              />
              <FormControl
                control="selectbox"
                variant="outlined"
                label={t("personalInfoEdit.formControl.genderLabel")}
                name="gender"
                id="gender"
                options={genderList}
                required
              />
              <FormControl
                control="input"
                variant="outlined"
                label={t("personalInfoEdit.formControl.mobileNumberLabel")}
                placeholder={t(
                  "personalInfoEdit.formControl.mobileNumberPlaceholder"
                )}
                name="mobileNumber"
                type="number"
                id="mobileNumber"
                required
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
              <FormControl
                control="input"
                variant="outlined"
                label={t("personalInfoEdit.formControl.emailIdLabel")}
                placeholder={t("personalInfoEdit.formControl.emailIdPlaceholder")}
                name="emailId"
                type="email"
                id="emailId"
                required
              />
              <FormControl
                control="input"
                variant="outlined"
                label={t("personalInfoEdit.formControl.currentAddressLabel")}
                placeholder={t(
                  "personalInfoEdit.formControl.currentAddressPlaceholder"
                )}
                type="text"
                multiline
                rows={4}
                name="currentAddress"
                id="currentAddress"
                required
              />
              <Box textAlign="right" paddingTop={4.5}>
                <Button
                  color="primary"
                  style={{ minWidth: 120, marginRight: 20 }}
                >
                  {t("personalInfoEdit.formControl.cancelBtnText")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                  style={{ minWidth: 120 }}
                >
                  {t("personalInfoEdit.formControl.saveBtnText")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
      {/* <DialogActions className={classes.dialogActions}>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={() => onClose(false)}
          color="primary"
        >
          {t("multipleCategoryDialog.cancelButton")}
        </Button>
        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={() => onClose(true)}
          color="primary"
          autoFocus
        >
          {t("multipleCategoryDialog.confirmButton")}
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default AgntPersonalInformationEditDialogBox;
