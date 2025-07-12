import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { Formik, Form } from "formik";
// import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import FormControl from "../../FormControl/FormControl";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const ProjectFiltersDialogBox = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  const formikRef = useRef();

  const initialValues = {
    // mobileNumber: "",
    location: "",
    // subLocation: "",
    projectType: "",
    priceRange: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    // console.log(values);
  };

  // const subLocationList = [
  //   {
  //     value: "1",
  //     label: t(
  //       "selectProjectForm.projectForm.formControl.subLocation.options.kharghar"
  //     ),
  //   },
  //   {
  //     value: "2",
  //     label: t(
  //       "selectProjectForm.projectForm.formControl.subLocation.options.belapur"
  //     ),
  //   },
  //   {
  //     value: "3",
  //     label: t(
  //       "selectProjectForm.projectForm.formControl.subLocation.options.nerul"
  //     ),
  //   },
  // ];

  const projectTypeList = [
    {
      value: "1",
      label: t(
        "selectProjectForm.projectForm.formControl.projectType.options.kh2BHK"
      ),
    },
    {
      value: "2",
      label: t(
        "selectProjectForm.projectForm.formControl.projectType.options.kh2BHK"
      ),
    },
    {
      value: "3",
      label: t(
        "selectProjectForm.projectForm.formControl.projectType.options.kh3BHK"
      ),
    },
  ];

  const priceRangeeList = [
    {
      value: "1",
      label: t(
        "selectProjectForm.projectForm.formControl.priceRange.options.price1"
      ),
    },
    {
      value: "2",
      label: t(
        "selectProjectForm.projectForm.formControl.priceRange.options.price2"
      ),
    },
    {
      value: "3",
      label: t(
        "selectProjectForm.projectForm.formControl.priceRange.options.price3"
      ),
    },
    {
      value: "4",
      label: t(
        "selectProjectForm.projectForm.formControl.priceRange.options.price4"
      ),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
    >
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <DialogTitle id="alert-dialog-title">Filters</DialogTitle>
        </Box>
        <Box p={1}>
          <IconButton onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue }) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={1}>
                {/* <Grid item xs={12} sm={3}>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    name="subLocation"
                    label={t(
                      "selectProjectForm.projectForm.formControl.subLocation.subLocationLabel"
                    )}
                    options={subLocationList}
                  />
                </Grid> */}
                <Grid item xs={12} sm={3}>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    name="projectType"
                    label={t(
                      "selectProjectForm.projectForm.formControl.projectType.projectTypeLabel"
                    )}
                    options={projectTypeList}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    name="priceRange"
                    label={t(
                      "selectProjectForm.projectForm.formControl.priceRange.priceRangeLabel"
                    )}
                    options={priceRangeeList}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        {/* <DialogContentText id="alert-dialog-description">
          {t("multipleCategoryDialog.description1")}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          {t("multipleCategoryDialog.description2")}
        </DialogContentText> */}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={() => onClose(false)}
          color="primary"
        >
          CANCEL
        </Button>
        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={() => onClose(true)}
          color="primary"
          autoFocus
        >
          APPLY FILTERS
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectFiltersDialogBox;
