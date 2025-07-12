import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormControl as MUIform } from "@material-ui/core";
import FormControl from "../../../molecules/FormControl/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from '@material-ui/core/Chip'
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  CatecoryDetailIcon,
  DeclarationMiniIcon,
  RupeesIcon,
  DeclarationtitleIcon,
  WhiteArrowIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import SubStepperBar2 from "../../../atoms/StepperBar/SubStepperBar2/SubStepperBar2";
import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getApplicant,
  editApplicant,
  applicantSelector,
  clearApplicantState,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  updateDocumentsList,
  getDocumentDeclarationList,
  updatetDocumentDeclaration,
  docDeclarationSelector,
  clearDocDeclarationState,
  clearDocDeclarationtData
} from "../../../../redux/features/file/DocDeclarationSlice";
import {
  getStepperDetails,
  addEditStepper,
  clearSuperStepperEditVars
} from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import MultiCategoryDialogBox from "../../../molecules/DialogBoxes/MultiCategoryDialogBox/MultiCategoryDialogBox";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import {
  NextArrowIcon,
  ChipCrossIcon,
  BottomRectIcon,
  BottomCircleIcon,
  HomeIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import { DocumentsFormStyles } from "../Document.style";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function Declaration(props) {
  const { width } = props;
  const classes = DocumentsFormStyles();
  const { t } = useTranslation("DeclarationAffidavitPageTrans");
  const formikRef = useRef();
  const history = useHistory();
  const [formValues, setFormValues] = React.useState(null);
  const dispatch = useDispatch();
  const [isConfirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isallDocCheckbox, setIsallDocCheckbox] = useState(false);
  const [selectDocumentList, setSelectDocumentList] = useState([]);
  const updateConfirmCheckbox = () => setConfirmCheckbox(!isConfirmCheckbox);
  const [selectedCategory, setselectedCategory] = useState({})
  const { stepperData, isFetchingStepper, isSuccessResStepper } = useSelector(
    (state) => state.stepper
  );
  const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);
  const {
    isFetchingApplicant,
    isSuccessResApplicant,
    isErrorApplicant,
    errorMessage,
    applicantData,

    isFetchingApplicantGet,
    isSuccessResApplicantGet,
    isErrorApplicantGet,
    errorMsgApplicantGet
  } = useSelector(applicantSelector);
  const {
    isFetchingGetDocsList,
    isSuccessDocumentsList,
    isErrorDocumentsList,
    errorMsgGetDocsList,
    DocumentsListData,
    isFetchingDocumentsList,
    isFetchingUpdateDocsList,
    isSuccessUpdateDocsList
  } = useSelector(docDeclarationSelector);

  useEffect(() => {
    dispatch(getApplicant());
    setselectedCategory(JSON.parse(localStorage.getItem("selectCategory")));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach(item => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (item.applicantKycStepper[1].title == "Verify PAN" && pageUrl == undefined) {
            if (item.applicantKycStepper[1].status != "completed") {
              pageUrl = "/verify-pancard";
            }
          }
        }

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }

      })
      history.push(pageUrl)
    }
  }, [isSuccessResStepper])

  useEffect(() => {
    if (isSuccessResApplicantGet) {
      if (applicantData.OwnOtherRoom == "1") {
        setConfirmCheckbox(true);
        let setNewValues = {
          isPuccaHouse: true,
        };
        setFormValues(setNewValues);
      } else {
        setConfirmCheckbox(true);
      }

      let ReservationID = JSON.parse(localStorage.getItem("ReservationCatIds"));
   

      const uniqueReservationID = [...new Set(ReservationID)].toString();
     

      let sendData = {
        ApplicantId: applicantData.ApplicantId,
        "Lang": localStorage.getItem("i18nextLng"),
        // "CasteCatId" :applicantData.CasteCatId,
        // "ReservationCatIds" : applicantData.RservationCatIds,
      };
      dispatch(updateDocumentsList(sendData));
    }
  }, [isSuccessResApplicantGet, applicantData, dispatch, t]);

  useEffect(() => {
    if (isSuccessDocumentsList) {
      let temp_sel_doc_list = [];
      for (let d = 0; d < DocumentsListData.DocumentDetails.length; d++) {
        const element = DocumentsListData.DocumentDetails[d];
        // let RequiredDoc = JSON.parse(element.FilesRequired);
        // RequiredDoc.en.forEach((value, index) => {
        // });
        let temp_new_obj = {
          ...element,
          // nameId: "selectDoc" + RequiredDoc.en[index].DocumentFileUrl,
          nameId: "selectDoc" + element.DocumentId,
          isSelected: element.isSubmitted == "1" ? true : false,
          // reqDocumentName: localStorage.getItem("i18nextLng") == 'hi' ? RequiredDoc.hi[index].DocumentFileUrl : localStorage.getItem("i18nextLng") == 'mr' ? RequiredDoc.mr[index].DocumentFileUrl : RequiredDoc.en[index].DocumentFileUrl
          reqDocumentName: element.DocumentName
        };
        temp_sel_doc_list.push(temp_new_obj);
      }
      setSelectDocumentList(temp_sel_doc_list);
    } else {
      setSelectDocumentList([]);
    }
  }, [DocumentsListData]);

  const initialValues = {
    isPuccaHouse: false,
  };

  const validationSchema = yup.object({});

  const docSelectOnChange = (elmParam) => {
    let temp_doc_list = [];
    for (let f = 0; f < selectDocumentList.length; f++) {
      const doc_element = selectDocumentList[f];
      let temp_obj = {
        ...doc_element,
        isSelected: doc_element.reqDocumentName == elmParam.reqDocumentName ? !elmParam.isSelected : doc_element.isSelected
      };
      temp_doc_list.push(temp_obj);
    }
    setSelectDocumentList(temp_doc_list);
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);

    let allDocSelected = selectDocumentList.every(function (e) {
      return e.isSelected == true;
    });

    if (allDocSelected == true) {
      localStorage.setItem("selectDocumentList", JSON.stringify(selectDocumentList));
      updateStepperUI();
    } else {
      handleClickOpen();
    }

    let filterIds = selectDocumentList.filter(item => {
      if (item.isSelected == true && item.DocumentId) {

        return item.DocumentId
      }
    }).map((item) => { return item.DocumentId; });
    let documentIDs = filterIds.toString();
    let paramsHolder = {
      "documentIds": documentIDs
    };
    dispatch(updatetDocumentDeclaration(paramsHolder));
  };

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 3) {
        new_obj = {
          ...element,
          status: "completed"
        };
      } else {
        new_obj = {
          ...element
        };
      }
      newStepper.push(new_obj);
    }
    dispatch(addEditStepper(newStepper));
  };

  useEffect(() => {
    if (isSuccessReqStepper) {
      dispatch(getStepperDetails());
      dispatch(clearSuperStepperEditVars());
      history.push("/application-details");
    }
  }, [isSuccessReqStepper]);


  const [infoMsgDialogBoxOpen, setInfoMsgDialogBoxOpen] = React.useState(false);

  const handleClickOpen = () => {
    setInfoMsgDialogBoxOpen(true);
  };

  const handleClose = () => {
    setInfoMsgDialogBoxOpen(false);
  };

  const skipFlow = () => {
    history.push("/application-details");
  }

  return (
    <>
      {(isFetchingApplicantGet) && (
        <Loading isOpen={isFetchingApplicantGet} />
      )}

      {(isFetchingUpdateDocsList || isFetchingDocumentsList) && (
        <Loading isOpen={isFetchingUpdateDocsList || isFetchingDocumentsList} />
      )}


      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize
      >
        {({ submitForm, setFieldValue, touched, errors, values }) => (
          <Form noValidate autoComplete="off" className={classes.formContainer}>
            <FormCard>
              <Hidden smDown>
                <FormTitleBox
                  title={t("DeclarationPage.title")}
                  backUrl="/select-projects"
                  titleIcon={<DeclarationtitleIcon fontSize="large" />}
                />
              </Hidden>
              <Hidden mdUp>
                <StepperBar
                  callingForMobileIs={true}
                  title={t("DeclarationPage.title")}
                  backUrl="/select-projects"
                />
              </Hidden>
              <div className={classes.formSection}>
                {/* <Box
                  className={classes.titleBox}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <IconTitle
                    icon={<HomeIcon fontSize="large" />}
                    title={t("DeclarationPage.section.pucca")}
                  />
                </Box> */}
                {/* <Box
                  paddingY={3}
                  className={`${classes.sectionBox} ${"checkBox"}`}
                >
                  <MUIform component="fieldset" error={!isConfirmCheckbox}>
                    <FormControlLabel
                      name="isPuccaHouse"
                      checked={isConfirmCheckbox}
                      onChange={updateConfirmCheckbox}
                      control={<Checkbox color="primary" />}
                      label={t("DeclarationPage.section.label")}
                      labelPlacement="end"
                    />
                  </MUIform>
                </Box> */}
                {/* <Box
                  className={classes.sectionBox}
                  marginY={3}
                  width={width === "xs" ? "100%" : "56%"}
                >
                  <Typography
                    variant="body2"
                    gutterBottom
                    color="textSecondary"
                  >
                    {t("DeclarationPage.section.desc")}
                  </Typography>
                </Box> */}
                {/* <Box borderTop={1} borderColor="grey.400" marginY={2} /> */}
                <Box className={classes.titleBox}>
                  <IconTitle
                    icon={<DeclarationMiniIcon fontSize="large" />}
                    title={
                      <>
                        {t("DeclarationPage.subTitle")}
                        <Box className={classes.selectedDocName}>
                          {/* {selectedCategory?.castName?.label && <Chip label={selectedCategory?.castName?.label} variant="outlined" />} */}
                          {DocumentsListData?.CategoryDetails?.map((element) => (
                            <Chip label={element} variant="outlined" title={element} />
                          ))}
                        </Box>
                      </>
                    }
                    alignItems="start"
                  />
                </Box>
                <Box className={classes.sectionBox}>
                  <Typography className={classes.boldText}>
                    {t("DeclarationPage.formControl.label")}
                  </Typography>
                  <Grid
                    container
                    spacing={width === "xs" ? 1 : 3}
                  >
                    {isErrorDocumentsList &&
                      <AlertBox severity="error">{errorMsgGetDocsList}</AlertBox>
                    }
                    {selectDocumentList.map((element, i) => (
                      <Grid item xs={12} md={6} key={i}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={element.isSelected}
                                name={element.reqDocumentName}
                                color="primary"
                                onChange={(e) => docSelectOnChange(element)}
                              />
                            }
                            label={element.reqDocumentName}
                          />
                        </FormGroup>
                        {/* <FormControl
                          control="checkbox"
                          label={element.DocumentName}
                          name="domocile"
                          id="domocile"
                          color="primary"
                          required
                        /> */}
                      </Grid>
                    ))}
                    {/* <Grid item xs={12} md={3}>
                      <FormControl
                        control="checkbox"
                        label="Affidavit D"
                        name="affidavitD"
                        id="affidavitD"
                        color="primary"
                        required
                      />
                    </Grid> */}
                  </Grid>
                  {/* <Grid
                    container
                    spacing={width === "xs" ? 1 : 3}
                  >
                    <Grid item xs={12} md={3}>
                      <FormControl
                        control="checkbox"
                        label="Caste Certificate"
                        name="caste"
                        id="caste"
                        color="primary"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl
                        control="checkbox"
                        label="Income Proof"
                        name="Income"
                        id="Income"
                        color="primary"
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={width === "xs" ? 1 : 3}
                  >
                    <Grid item xs={12} md={3}>
                      <FormControl
                        control="checkbox"
                        label="Pmay Proof"
                        name="Pmay"
                        id="Pmay"
                        color="primary"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl
                        control="checkbox"
                        label="Affidavit C"
                        name="affidavitC"
                        id="affidavitC"
                        color="primary"
                        required
                      />
                    </Grid>
                  </Grid> */}
                </Box>
              </div>
              <div className={classes.actionSection}>
                <Grid container alignItems="center" justify="flex-end">
                  {isFetchingStepper && (
                    <Grid item xs="auto">
                      <Typography className={classes.progressView}>
                        {t("DeclarationPage.formControl.submit.savingText")}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs="auto">
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={skipFlow}
                      endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                      style={{ marginRight: "30px" }}
                    >
                      Skip Now
                    </Button> */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      // onClick={submitForm}
                      endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                    >
                      {t("DeclarationPage.formControl.submit.submitBtn")}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </FormCard>
          </Form>
        )}
      </Formik>
      <Dialog
        onClose={handleClose}
        className={classes.dialogBox}
        aria-labelledby="customized-dialog-title"
        open={infoMsgDialogBoxOpen}
      >
        <DialogTitle
          onClose={handleClose}
          className={classes.dialogueTitle}
        >
          {t("DeclarationPage.dialogue.title")}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            gutterBottom
            className={classes.dialogueContentText}
          >
            {t("DeclarationPage.dialogue.desc")}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withWidth()(Declaration);
