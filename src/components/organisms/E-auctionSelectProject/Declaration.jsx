import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FormControl from "../../molecules/FormControl/FormControl";
import { initialPagesStyles } from "../InitialPagesComponents/InitialPages.styles";
import { useDispatch, useSelector } from "react-redux";
import { ApplyProjectSelector, clearSaveDeclerationState, saveDecleration } from "../../../redux/features/eauction/applyProjectSlice";
import { getProjectProgress } from "../../../redux/features/eauction/projectStepperSlice";
import FormCard from "../../molecules/Cards/FormCard/FormCard";
import { Hidden } from "@material-ui/core";
import FormTitleBox from "../../atoms/FormTitleBox/FormTitleBox";
import { MakePaymentIcon } from "../../atoms/SvgIcons/SvgIcons";
import StepperBar from "../../atoms/StepperBar/StepperBar";

const Declaration = ({ onNext }) => {
  const classes = initialPagesStyles();
  const { t } = useTranslation("InitialPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetchingSaveDecleration,
    isSuccessSaveDecleration,
    isErrorSaveDecleration,
    saveDeclerationData,
    errorMessageSaveDecleration } = useSelector(ApplyProjectSelector);

  const initialValues = {
    acceptTerms: false,
  };

  const validationSchema = yup.object({
    acceptTerms: yup
      .bool()
      .oneOf([true], t("termsConditions.formControl.checkBoxErrors.required")),
  });
  useEffect(() => {
    if (isSuccessSaveDecleration) {
      //dispatch(getProjectProgress());
      //window.location.reload();
      dispatch(clearSaveDeclerationState());
      onNext();

    }
  }, [isSuccessSaveDecleration])

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.acceptTerms === true) {
      dispatch(saveDecleration({ type: "Declaration" }))
    }

  };

  // useEffect(() => {
  //   const formik = formikRef.current;
  //   formik.resetForm();
  // }, [t]);


  return (
    <FormCard>
      <Hidden smDown>
        <FormTitleBox
          title="Tender Declaration"
          backUrl="back"
          titleIcon={<MakePaymentIcon fontSize="large" />}
        />
      </Hidden>
      <Hidden mdUp>
        <StepperBar
          callingForMobileIs={true}
          title="Tender Declaration"
          // backUrl="/dashboard"
        />
      </Hidden>
      <Box display="flex" justifyContent="center" paddingTop={5}>
        <Typography variant="h5" gutterBottom>
          {("E-Auction Terms & Conditions")}
        </Typography>
      </Box>
      <Paper elevation={0} className={classes.paperContainer}>
        <Typography variant="body1" gutterBottom>
          {/* {t("termsConditions.content")} */}
          To participate in the auction tender, bidders must adhere to the following terms and conditions. Submission of accurate and complete documentation within the specified timeline is mandatory. Payment of the prescribed document fee and Earnest Money Deposit (EMD) through approved online modes is required for eligibility. Bidders engaging in both Closed Bid and e-Auction must ensure fees are paid by the stipulated deadline. Late payments or discrepancies will result in disqualification. CIDCO's account should reflect RTGS/NEFT transactions promptly. Any fees received beyond the due date will not be accepted. Bidders failing to comply with these conditions will be ineligible for auction participation.
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
    </FormCard>
  );
};

export default Declaration;
