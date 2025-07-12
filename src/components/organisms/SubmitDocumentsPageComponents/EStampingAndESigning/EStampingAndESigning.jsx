import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "../../../molecules/FormControl/FormControl";
import {
  EStampBlueIcon,
  EStampWhiteIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import OutlinedCard from "../../../molecules/Cards/OutlinedCard/OutlinedCard";
import EStampBillInfoDialogBox from "../../../molecules/DialogBoxes/EStampBillInfoDialogBox/EStampBillInfoDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice";
import { applicantSelector } from "../../../../redux/features/applicant/ApplicantSlice";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
  },
  termsConditionBox: {
    borderLeftWidth: 3,
    borderLeftStyle: "solid",
    borderLeftColor: "#f93d5c",
    borderRadius: 4,
  },
  viewBillText: {
    color: "#007ae7",
    fontWeight: 600,
    cursor: "pointer",
  },
}));

const EStampingAndESigning = (props) => {
  const { width } = props;
  const classes = useStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const formikRef = useRef();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { isEStampSelected } = useSelector(documentsSelector);
  const { applicantData } = useSelector(applicantSelector);

  useEffect(() => {
    if (applicantData.IsEstamp) {
      dispatch(
        eStampSelectOrDeselect(applicantData?.IsEstamp === "1" ? true : false)
      );
    }
  }, [applicantData.IsEstamp, dispatch]);

  const initialValues = {
    acceptTerms: true,
  };

  const validationSchema = yup.object({
    acceptTerms: yup
      .bool()
      .oneOf([true], t("eStampForm.formControl.checkBoxErrors.required")),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.acceptTerms) {
      dispatch(eStampSelectOrDeselect(!isEStampSelected));
    }
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <OutlinedCard>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm }) => (
            <Form noValidate autoComplete="off">
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  {t("eStampForm.title")}
                </Typography>
                <Box marginY={2}>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    gutterBottom
                  >
                    {t("eStampForm.description")}
                  </Typography>
                </Box>
                <Box
                  className={classes.termsConditionBox}
                  p={2}
                  bgcolor="grey.200"
                  width={width === "xs" ? "100%" : "75%"}
                >
                  <Typography color="error" variant="body1" gutterBottom>
                    {t("eStampForm.termsConditionBox.title")}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    gutterBottom
                  >
                    {t("eStampForm.termsConditionBox.text1")}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    gutterBottom
                  >
                    {t("eStampForm.termsConditionBox.text2")}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    gutterBottom
                  >
                    {t("eStampForm.termsConditionBox.text3")}
                  </Typography>
                </Box>
                <Box paddingY={2}>
                  <FormControl
                    control="checkbox"
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    label={t("eStampForm.formControl.checkBoxLabel")}
                    color="primary"
                  />
                </Box>
                <Grid container spacing={width === "xs" ? 2 : 3}>
                  <Grid item xs={12} md={8} lg={9}>
                    <Box paddingY={1}>
                      <Typography color="textSecondary" variant="body2">
                        <span>{t("eStampForm.formControl.totalText")} </span>
                        <span
                          className={classes.viewBillText}
                          onClick={handleClickOpen}
                        >
                          <u>{t("eStampForm.formControl.viewBillText")}</u>
                        </span>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <Button
                      type="button"
                      variant={isEStampSelected ? "contained" : "outlined"}
                      color="primary"
                      startIcon={
                        isEStampSelected ? (
                          <EStampWhiteIcon />
                        ) : (
                          <EStampBlueIcon />
                        )
                      }
                      fullWidth
                      onClick={submitForm}
                      style={{ textTransform: "capitalize" }}
                    >
                      {isEStampSelected
                        ? t("eStampForm.formControl.deSelectButtonText")
                        : t("eStampForm.formControl.selectButtonText")}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Form>
          )}
        </Formik>
      </OutlinedCard>
      {open && (
        <EStampBillInfoDialogBox openValue={open} onClose={handleClose} />
      )}
    </>
  );
};

export default withWidth()(EStampingAndESigning);
