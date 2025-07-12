import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import withWidth from "@material-ui/core/withWidth";
import TitleDescriBox from "../../../atoms/TitleDescriBox/TitleDescriBox";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import FormControl from "../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../InitialPages.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  resetPassword,
  applicantAuthSelector,
  clearAuthState,
} from "../../../../redux/features/applicant/ApplicantAuthSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import LinearProgress, {
  LinearProgressProps,
} from "@material-ui/core/LinearProgress";
import Pwd from "../../../../assets/Pwd.jpg";

const NewPassword = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(0);
  const [atleast1UppercaseLetterIs, setAtleast1UppercaseLetterIs] =
    React.useState(false);
  const [atleast1LowercaseLetterIs, setAtleast1LowercaseLetterIs] =
    React.useState(false);
  const [atleast1DigitIs, setAtleast1DigitIs] = React.useState(false);
  const [showAlertMessage, setShowAlertMessage] = React.useState(false);
  const [atleast1SpecialCharIs, setAtleast1SpecialCharIs] =
    React.useState(false);
  const [passStrengthTxt, setPassStrengthTxt] = React.useState("");

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    applicantAuthSelector
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearAuthState());
      setShowAlertMessage(true);
      // history.push("/");
    }
  }, [dispatch, history, isError, isSuccess]);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-.\\/:;<=>?@[\]^_`{|}~])(?=.{8,50})/,
        t("newPasswordForm.formControl.passwordErrors.limitation")
      )
      .required(t("newPasswordForm.formControl.passwordErrors.required")),
    confirmPassword: yup
      .string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref("password")],
            t("newPasswordForm.formControl.confirmPasswordErrors.limitation")
          ),
      })
      .required(
        t("newPasswordForm.formControl.confirmPasswordErrors.required")
      ),
  });

  const passwordChangeEvent = (passValue) => {
    let atleast_one_uppercase_lttr = new RegExp("(?=.*[A-Z])");
    let one_uppercase_is = atleast_one_uppercase_lttr.test(passValue);
    let progressIncrement = 0;
    setAtleast1UppercaseLetterIs(one_uppercase_is);
    if (one_uppercase_is) {
      progressIncrement += 20;
    }

    let atleast_one_lowercase_lttr = new RegExp("(?=.*[a-z])");
    let one_lowercase_is = atleast_one_lowercase_lttr.test(passValue);
    setAtleast1LowercaseLetterIs(one_lowercase_is);
    if (one_lowercase_is) {
      progressIncrement += 20;
    }

    let atleast_one_digit = new RegExp("(?=.*[0-9])");
    let one_digit_is = atleast_one_digit.test(passValue);
    setAtleast1DigitIs(one_digit_is);
    if (one_digit_is) {
      progressIncrement += 20;
    }

    let atleast_one_special_char = new RegExp("([^A-Za-z0-9])");
    let one_special_char_is = atleast_one_special_char.test(passValue);
    setAtleast1SpecialCharIs(one_special_char_is);
    if (one_special_char_is) {
      progressIncrement += 20;
    }
    let atleast_eighth_char = new RegExp("(?=.{8,})");
    let one_eighth_char_is = atleast_eighth_char.test(passValue);
    if (one_eighth_char_is) {
      progressIncrement += 20;
    }
    setProgress(progressIncrement);
    switch (progressIncrement) {
      case 20:
        setPassStrengthTxt("week");
        break;
      case 40:
        setPassStrengthTxt("fair");
        break;
      case 60:
        setPassStrengthTxt("good");
        break;
      case 80:
        setPassStrengthTxt("good");
        break;
      case 100:
        setPassStrengthTxt("great");
        break;
      default:
        setPassStrengthTxt("");
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.password && values.confirmPassword) {
      dispatch(resetPassword(values.password));
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
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthTemplate>
      {isFetching && <Loading isOpen={isFetching} />}
      <div
        className={classes.root}
      // style={{
      //   // marginTop: width === "xs" ? theme.spacing(3) : theme.spacing(5),
      //   height: 725,
      // }}
      >
        <TitleDescriBox
          title={t("newPasswordForm.title")}
          description={t("newPasswordForm.description")}
        // description={t("newPasswordForm.title")}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm, setFieldValue, values }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
              <Box textAlign="center" marginY={2}>
                <img className={classes.iconStyle} src={Pwd} alt="OTP" />
              </Box>
              <FormControl
                control="input"
                variant="outlined"
                label={t("newPasswordForm.formControl.passwordLabel")}
                placeholder={t(
                  "newPasswordForm.formControl.passwordPlaceholder"
                )}
                name="password"
                id="password"
                type={isShowPassword ? "text" : "password"}
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                  passwordChangeEvent(e.target.value);
                }}
                required
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
                autoFocus={true}
              />
              {values.password && (
                <Box
                  marginBottom={1}
                  className={`${classes.passValidationIndicator} ${passStrengthTxt}`}
                >
                  <Typography variant="body2">{passStrengthTxt}</Typography>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              )}
              {/* <Typography className={classes.helpText}>{t("newPasswordForm.formControl.passwordHelpText")}</Typography>
              <Table size="small" className={classes.passwordHelpTxtCont}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.passwordHelpTxt}>{t("newPasswordForm.formControl.hintText1")}</Typography>
                    </TableCell>
                    <TableCell>
                      {atleast1UppercaseLetterIs &&
                        <DoneOutlinedIcon />
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.passwordHelpTxt}>{t("newPasswordForm.formControl.hintText2")}</Typography>
                    </TableCell>
                    <TableCell>
                      {atleast1LowercaseLetterIs &&
                        <DoneOutlinedIcon />
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.passwordHelpTxt}>{t("newPasswordForm.formControl.hintText3")}</Typography>
                    </TableCell>
                    <TableCell>
                      {atleast1DigitIs &&
                        <DoneOutlinedIcon />
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.passwordHelpTxt}>{t("newPasswordForm.formControl.hintText4")}</Typography>
                    </TableCell>
                    <TableCell>
                      {atleast1SpecialCharIs &&
                        <DoneOutlinedIcon />
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table> */}
              <FormControl
                control="input"
                variant="outlined"
                label={t("newPasswordForm.formControl.confirmPasswordLabel")}
                placeholder={t(
                  "newPasswordForm.formControl.confirmPasswordPlaceholder"
                )}
                name="confirmPassword"
                id="confirmPassword"
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
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                inputProps={{
                  maxLength: 50,
                }}
                required
              />
              {showAlertMessage && <AlertBox severity="success">Your password has been changed successfully. Please login to continue</AlertBox>}
              <Box marginY={5} />
              <Box textAlign="center" marginY={2} marginBottom={3}>
                {showAlertMessage ? (<Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={width === "xs" ? true : false}
                  onClick={() => history.push("/login")}
                >
                  Go to Login
                </Button>) : (<Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  // onClick={submitForm}
                  fullWidth={width === "xs" ? true : false}
                // className={width === "xs" ? null : classes.button}
                >
                  {t("newPasswordForm.formControl.submitButtonText")}
                </Button>)}
              </Box>
              <Typography className={classes.registerLinkTxt}>
                {t("newPasswordForm.formControl.advoiceText0")}
                <strong>  {t("newPasswordForm.formControl.advoiceText1")} </strong>
                {t("newPasswordForm.formControl.advoiceText2")}
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
    </AuthTemplate>
  );
};

export default withWidth()(NewPassword);
