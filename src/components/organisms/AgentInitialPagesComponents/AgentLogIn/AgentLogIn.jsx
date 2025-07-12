import React, { useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import withWidth from "@material-ui/core/withWidth";
import AgentTitleDescriBox from "../../../atoms/AgentTitleDescriBox/AgentTitleDescriBox";
import FormControl from "../../../molecules/FormControl/FormControl";
import AgentAuthTemplate from "../../../templates/AgentAuthTemplate/AgentAuthTemplate";
import { AgentInitialPagesStyles } from "../AgentInitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  agentLogin,
  agentAuthSelector,
  clearAuthState,
} from "../../../../redux/features/agent/AgentAuthSlice";
// import { getStepperDetails } from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const AgentLogIn = (props) => {
  const { width } = props;
  const classes = AgentInitialPagesStyles();
  const { t } = useTranslation("AgentInitialPageTrans");
  const history = useHistory();
  const formikRef = useRef();
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(agentAuthSelector);

  const {
    isFetchingStepper,
    isSuccessResStepper,
    isErrorStepper,
    errorMessageStepper,
    stepperData,
  } = useSelector((state) => state.stepper);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearAuthState());
      // dispatch(getStepperDetails());
      history.push("/cfc-applicants-analytics-dashboard");
    }
  }, [dispatch, history, isError, isSuccess]);

  /* useEffect(() => {
    if (isSuccessResStepper) {
      const stepper = stepperData.superStepper;
      if (localStorage.getItem("applicantId")) {
        if (!stepper[0].subStepper[0].completed) {
          history.push("/personal-details");
        } else if (!stepper[0].subStepper[1].completed) {
          history.push("/contact-details");
        } else if (!stepper[0].subStepper[2].completed) {
          history.push("/family-details");
        } else if (!stepper[1].subStepper[0].completed) {
          history.push("/category-details");
        } else if (!stepper[1].subStepper[1].completed) {
          history.push("/select-projects");
        } else if (!stepper[2].completed) {
          history.push("/submit-documents");
        } else if (!stepper[3].completed) {
          history.push("/make-payments");
        } else {
          history.push("/dashboard");
        }
      }
    }
  }, [history, isSuccessResStepper, stepperData]); */

  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = yup.object({
    userName: yup
      .string()
      .required(t("agentLoginForm.formControl.userNameErrors.required")),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])(?=.{8,50})/,
        t("agentLoginForm.formControl.passwordErrors.limitation")
      )
      .required(t("agentLoginForm.formControl.passwordErrors.required")),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.userName && values.password) {
      const requestData = {
        MobileNo: values.userName,
        Password: values.password,
      };
      dispatch(agentLogin(requestData));
    }
  };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
    dispatch(clearAuthState());
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AgentAuthTemplate>
      {(isFetching || isFetchingStepper) && (
        <Loading isOpen={isFetching || isFetchingStepper} />
      )}
      <div className={classes.root}>
        <AgentTitleDescriBox
          title={t("agentLoginForm.title")}
          description={t("agentLoginForm.description")}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
              {/* {isErrorStepper && (
                <AlertBox severity="error">{errorMessageStepper}</AlertBox>
              )} */}
              <FormControl
                control="input"
                variant="outlined"
                label={t("agentLoginForm.formControl.userNameLabel")}
                placeholder={t("agentLoginForm.formControl.userNamePlaceholder")}
                name="userName"
                id="userName"
                type="text"
                required
              />
              <FormControl
                control="input"
                variant="outlined"
                label={t("agentLoginForm.formControl.passwordLabel")}
                placeholder={t("agentLoginForm.formControl.passwordPlaceholder")}
                name="password"
                id="password"
                type={isShowPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {isShowPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 50,
                }}
                required
              />
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="body1" gutterBottom>
                  <Link
                    to="/cfc-forgot-password"
                    style={{ textDecoration: "none", color: "#007ae7" }}
                  >
                    {t("agentLoginForm.formControl.passwordText")}
                  </Link>
                </Typography>
              </Box>
              <Box textAlign="center" marginY={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={submitForm}
                  fullWidth={width === "xs" ? true : false}
                  className={width === "xs" ? null : classes.button}
                >
                  {t("agentLoginForm.formControl.buttonText")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </AgentAuthTemplate>
  );
};

export default withWidth()(AgentLogIn);
