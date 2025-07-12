import * as React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Grid,
  Divider,
} from "@material-ui/core";
import FormControl from "../../FormControl/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import AgentDeleteDialoogBox from "../AgentDeleteLeadDialogBox/AgentDeleteLeadDialogBox";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

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
      fontSize: "1.2rem",
    },
  },
  dialogBoxTitle: {
    padding: theme.spacing(2),
    textAlign: "center",
    "& .MuiDialogTitle-root": {
      padding: 0,
    },
    "& h2": {
      color: "#007AE7",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
  dotView: {
    backgroundColor: "#E63626",
    borderRadius: "50%",
    display: "inline-block",
    width: 10,
    height: 10,
    marginLeft: theme.spacing(1.4),
  },
  dialogContentSec: {
    minWidth: "450px",
    padding: theme.spacing(0, 7, 4.5),
  },
}));

export default function AgentLeadViewDialogBox(props) {
  const { openLeadViewDialog, onClose, leadData, filterCategoryData } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const { t } = useTranslation("AgentProfilePageTrans");
  const formikRef = React.useRef();
  const classes = useStyles();

  const handleModalClose = () => {
    setOpenDeleteDialog(false);
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t("personalInfoEdit.formControl.fullNameErrors.required")),
    mobileNo: yup
      .string()
      .matches(
        /^[6-9]\d{9}$/,
        t("personalInfoEdit.formControl.mobileNumberErrors.limitation")
      )
      .required(t("personalInfoEdit.formControl.mobileNumberErrors.required")),
    // category: yup
    //   .string()
    //   .matches(
    //     /^([1-9]|1[0-3])$/,
    //     t("Please enter category from 1-13 only")
    //   )
    //   .required(t("category is required")),
    email: yup
      .string()
      .email(t("personalInfoEdit.formControl.emailIdErrors.limitation")),
    // .required(t("personalInfoEdit.formControl.emailIdErrors.required")),
    // currentAddress: yup
    //   .string()
    //   .required(
    //     t("personalInfoEdit.formControl.currentAddressErrors.required")
    //   ),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
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
    <>
      <Dialog
        open={openLeadViewDialog}
        onClose={() => onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <Grid className={classes.dialogBoxTitle}>
          <DialogTitle id="alert-dialog-title">{t("Lead Details")}</DialogTitle>
          <IconButton
            className={classes.dialogBoxCloseBtn}
            onClick={() => onClose(false)}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Grid>
        <Divider variant="middle"/>
        <DialogContent className={classes.dialogContentSec}>
          <Formik
            initialValues={leadData}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
          >
            {({ submitForm, setFieldValue, values }) => (
              <Form noValidate autoComplete="off">
                <Grid container xs={12} spacing={2} >
                  {Object.keys(leadData).map((key) => {
                    if (key != "LeadId" && key != "AgentId") {
                      return (
                        <Grid item xs={6}>
                          {key === 'category' ? (
                            <FormControl
                              control="selectbox"
                              variant="outlined"
                              label="Category"
                              name={key}
                              id={key}
                              options={filterCategoryData}
                              className={`${classes.filterInputBox} filterInputs`}
                            />
                          ) : key === 'dateOfVisit' ? (
                            <FormControl
                              control="datepicker"
                              name={key}
                              label="Date"
                              placeholder="Date"
                              onChange={(value) => {
                                setFieldValue(key, value);
                              }}
                              maxDate={new Date()}
                              inputVariant="outlined"
                              required
                            />
                          ) : (
                            <FormControl
                              control="input"
                              variant="outlined"
                              label={key}
                              placeholder={`Enter Client ${key}`}
                              name={key}
                              type="text"
                              id={key}
                              required
                            />
                          )}
                        </Grid>
                      );
                    }
                  })}
                </Grid>
                <Box textAlign="right" paddingTop={4.5}>
                  <Button
                    onClick={() => {
                      onClose(false);
                      setOpenDeleteDialog(true);
                    }}
                    style={{ color: "#f44336" }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <Button onClick={submitForm} autoFocus>
                    Save changes
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <AgentDeleteDialoogBox
        openDeleteDialog={openDeleteDialog}
        onClose={handleModalClose}
        leadData={leadData}
      />
    </>
  );
}
