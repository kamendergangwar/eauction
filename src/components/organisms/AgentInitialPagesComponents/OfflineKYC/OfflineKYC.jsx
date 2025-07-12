import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import AgentTitleDescriBox from "../../../atoms/AgentTitleDescriBox/AgentTitleDescriBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import { initialPagesStyles } from "../InitialPages.styles";
import { UploadFileIcon } from "../../../atoms/SvgIcons/SvgIcons";
import KYCDetails from "./KYCDetails/KYCDetails";
import Typography from "@material-ui/core/Typography";
import { ImageSizes, SupportedFormats } from "../../../../utils/Common";

const OfflineKYC = () => {
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [fileName, setFileName] = React.useState("");

  const initialValues = {
    file: null,
    securityPin: "",
  };

  const validationSchema = yup.object({
    file: yup
      .mixed()
      .required(t("kycOfflineForm.formControl.fileErrors.required"))
      .test(
        "fileSize",
        t("kycOfflineForm.formControl.fileErrors.limitation"),
        (value) => value && value.size <= ImageSizes.TenKB
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SupportedFormats.ZipFormats.includes(value.type)
      ),
    securityPin: yup
      .string()
      .required(t("kycOfflineForm.formControl.securityPinErrors.required")),
    // .matches(/^[ A-Za-z0-9_@./#&+-]*$/, "Please enter valid security pin")
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.securityPin && values.file) {
      console.log(values);
      history.push("/personal-details");
    }
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AuthTemplate>
        <div className={classes.root}>
          <AgentTitleDescriBox
            title={t("kycOfflineForm.title")}
            description={t("kycOfflineForm.description")}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formikRef}
          >
            {({ submitForm }) => (
              <Form className={classes.form} noValidate autoComplete="off">
                <Box marginY={1}>
                  <input
                    id="contained-button-file"
                    name="file"
                    type="file"
                    accept=".zip"
                    className={classes.input}
                    onChange={(event) => {
                      if (event.currentTarget.files[0]) {
                        formikRef.current.setFieldValue(
                          "file",
                          event.currentTarget.files[0]
                        );
                        setFileName(event.currentTarget.files[0].name);
                      }
                    }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="outlined"
                      fullWidth
                      disableElevation
                      disableTouchRipple
                      disableFocusRipple
                      startIcon={<UploadFileIcon />}
                      size="large"
                      component="span"
                      className={classes.fileUploadButton}
                    >
                      {fileName
                        ? "Reupload"
                        : t("kycOfflineForm.formControl.fileLabel")}
                    </Button>
                  </label>
                  {/* <Box display="flex">
                    <Box flexGrow={1} /> */}
                  {/* <Box marginLeft={1}>
                    <Typography variant="body2">{fileName}</Typography>
                  </Box> */}
                  {/* </Box> */}
                  <FormHelperText error variant="filled">
                    <ErrorMessage name="file" />
                  </FormHelperText>
                  <Box marginLeft={1}>
                    <Typography variant="body2">{fileName}</Typography>
                  </Box>
                </Box>
                <FormControl
                  control="input"
                  variant="outlined"
                  label={t("kycOfflineForm.formControl.securityPinInputLabel")}
                  placeholder={t(
                    "kycOfflineForm.formControl.securityPinInputPlaceholder"
                  )}
                  name="securityPin"
                  type="text"
                  id="securityPin"
                  required
                  inputProps={{ maxLength: 4 }}
                />
                <Box marginY={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={() => history.push("/verify-aadhaar")}
                      >
                        {t("kycOfflineForm.formControl.backButtonText")}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={submitForm}
                        fullWidth
                      >
                        {t("kycOfflineForm.formControl.nextButtonText")}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </AuthTemplate>
      <KYCDetails />
    </>
  );
};

export default OfflineKYC;
