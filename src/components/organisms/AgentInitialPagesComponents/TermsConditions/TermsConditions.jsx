import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControl from "../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../InitialPages.styles";

const TermsConditions = () => {
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const history = useHistory();

  const initialValues = {
    acceptTerms: true,
  };

  const validationSchema = yup.object({
    acceptTerms: yup
      .bool()
      .oneOf([true], t("termsConditions.formControl.checkBoxErrors.required")),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.acceptTerms) {
      // history.push("/verify-aadhaar");
      history.push("/auth-verify-aadhaar");
    }
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box paddingTop={5}>
        <Paper elevation={4}>
          <Box display="flex" justifyContent="center" paddingTop={5}>
            <Typography variant="h5" gutterBottom>
              {t("termsConditions.title")}
            </Typography>
          </Box>
          <Paper elevation={0} className={classes.paperContainer}>
            <Typography variant="body1" gutterBottom>
              {t("termsConditions.content")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t("termsConditions.content")}
            </Typography>
          </Paper>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
          >
            {({ submitForm }) => (
              <Form noValidate autoComplete="off">
                <div className={classes.checkBox}>
                  <FormControl
                    control="checkbox"
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    label={t("termsConditions.formControl.checkBoxLabel")}
                    color="primary"
                  />
                </div>
                <Box display="flex" justifyContent="center" paddingY={4}>
                  <Button
                    type="submit"
                    onClick={submitForm}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    {t("termsConditions.formControl.buttonText")}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </>
  );
};

export default TermsConditions;
