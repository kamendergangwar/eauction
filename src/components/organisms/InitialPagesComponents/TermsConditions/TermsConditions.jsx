import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "../../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../InitialPages.styles";
import AuthTemplate from "../../../templates/AuthTemplate/AuthTemplate";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import { DialogBackArrowIcon } from "../../../atoms/SvgIcons/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";

const TermsConditions = (props) => {
  const { width } = props;
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage
  } = useSelector(applicantSelector);

  const initialValues = {
    acceptTerms: false,
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
      let sendParam = {
        LotteryTermsAndConditions: "1",
        Type: "LotteryTermsAndCondition"
      };
      dispatch(editApplicant(sendParam));
    }
  };

  useEffect(() => {
    if (isSuccessResApplicant) {
      dispatch(clearApplicantState());
      let url_param = localStorage.getItem("urlParam");
      let redirect_url = "";
      if (url_param && url_param === "grievance") {
        redirect_url = "/dashboard";
      } else {
        //redirect_url = "/auth-verify-aadhaar";
        redirect_url ='/question-1'
      }
      history.push(redirect_url);
    }
  }, [isSuccessResApplicant]);

  useEffect(() => {
    if(formikRef.current) {
      const formik = formikRef.current;
      formik.resetForm();
    }
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  const logOut = () => {
    var myItem = localStorage.getItem('i18nextLng');
    localStorage.clear();
    localStorage.setItem('i18nextLng', myItem);
    history.push("/");
  };

  return (
    <AuthTemplate>
      {(isFetchingApplicant) && (
        <Loading isOpen={isFetchingApplicant} />
      )}
      <Box paddingTop={5} position="relative">
        {/* <IconButton
          aria-label="Close"
          onClick={() => logOut()}
          className={`${classes.closeBtn} back`}
        >
          <DialogBackArrowIcon size="small" />
        </IconButton> */}
        {/* <Paper elevation={4}> */}
        <Box display="flex" justifyContent="center">
          <Typography variant="h5" gutterBottom className={classes.termnsNdCondTitle}>
            {t("termsConditions.title")}
          </Typography>
        </Box>
        <Paper elevation={0} className={classes.paperContainer}>
          <Typography variant="body1">
            {/* {t("termsConditions.content")} */} Participants in this e-auction for shops must be legal entities or individuals aged 18 and above, registering online with accurate information. Bidding is open within a specified period, with the highest bid at the auction's end determining the winner. The winning bidder must make full payment promptly for ownership transfer. Bids are binding, and refunds or cancellations are not allowed. Disputes will be resolved through arbitration. Any manipulation or fraudulent activity leads to disqualification. The organizer may modify terms, and participants acknowledge acceptance by bidding.
          </Typography>
          {/* <Typography variant="body1" gutterBottom>
            {t("termsConditions.content")}
          </Typography> */}
        </Paper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formikRef}
        >
          {({ submitForm }) => (
            <Form noValidate autoComplete="off">
              {isErrorApplicant && (
                <AlertBox severity="error">{errorMessage}</AlertBox>
              )}
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
                  // onClick={submitForm}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={width === "xs" ? true : false}
                  className={width === "xs" ? null : classes.button}
                >
                  {t("termsConditions.formControl.buttonText")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        {/* </Paper> */}
      </Box>
    </AuthTemplate>
  );
};

export default TermsConditions;
