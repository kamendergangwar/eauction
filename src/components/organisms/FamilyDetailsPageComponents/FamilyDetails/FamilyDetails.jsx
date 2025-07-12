import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { familyDetailsStyles } from "./FamilyDetails.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { CategoryIcon } from "../../../atoms/SvgIcons/SvgIcons";
import withWidth from "@material-ui/core/withWidth";
import FormMandatoryText from "../../../atoms/FormMandatoryText/FormMandatoryText";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import FamilyData from "../FamilyData/FamilyData";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import FamilyDetailsFormDialogBox from "../../../molecules/DialogBoxes/FamilyDetailsFormDialogBox/FamilyDetailsFormDialogBox";
import SubStepperBar1 from "../../../atoms/StepperBar/SubStepperBar1/SubStepperBar1";
import { useSelector, useDispatch } from "react-redux";
import {
  getFamilyMembers,
  familyMemberSelector,
  deleteFamilyMember,
  clearFamilyState,
  clearFamilyData,
  setJointowner,
} from "../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import {
  getApplicant,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getStepperDetails,
  addEditStepper,
  superStepperActiveStep,
  subSteppper1ActiveStep,
} from "../../../../redux/features/stepper/StepperSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

const FamilyDetails = (props) => {
  const { width } = props;
  const classes = familyDetailsStyles();
  const { t } = useTranslation("FamilyDetailsPageTrans");
  const history = useHistory();
  const [familyData, setFamilyData] = useState([]);
  const [isMarried, setMarried] = useState(false);

  const dispatch = useDispatch();

  const {
    isFetchingFamilyMember,
    isSuccessFamilyMembers,
    isErrorFamilyMember,
    errorMsgFamilyMember,
    familyMembersData,
  } = useSelector(familyMemberSelector);

  const { applicantData } = useSelector(applicantSelector);

  const { stepperData, isFetchingStepper } = useSelector(
    (state) => state.stepper
  );

  useEffect(() => {
    dispatch(getApplicant());
    dispatch(getFamilyMembers());
    dispatch(superStepperActiveStep(0));
    dispatch(subSteppper1ActiveStep(2));
  }, [dispatch]);

  useEffect(() => {
    if (applicantData.MarritalStatus) {
      if (applicantData.MarritalStatus === "2") {
        setMarried(true);
      } else {
        setMarried(false);
      }
    }
  }, [applicantData]);

  const [addEditDialogBoxOpen, setAddEditDialogBoxOpen] = React.useState(false);
  const [deleteDialogBoxOpen, setDeleteDialogBoxOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [skipDialogOpen, setSkipDialogOpen] = React.useState(false);
  const [selectedValueSkip, setSelectedValueSkip] = React.useState(null);

  useEffect(() => {
    if (isSuccessFamilyMembers) {
      let setDummyFamilyData = [];
      familyMembersData.forEach((item) => {
        const newItem = {
          id: item.FamilyId,
          ownership: item.JointOwner === "1" ? "yes" : "no",
          memberName: item.RelativeFullName,
          age: item.Age,
          gender: item.Gender,
          relationship: item.Relationship,
          aadhaarNumber: item.AadharNo,
          mobileNumber: item.MobileNo,
          photoFile:
            item.ImagePath ||
            "https://mass-dev-documents.s3.ap-south-1.amazonaws.com/lottery_132591_1625461229_profile.png",
          panNo: item.PANNo,
          email: item.EmailID,
          address: item.Address,
          dob: item.DOB,
        };
        setDummyFamilyData.push(newItem);
      });
      setFamilyData(setDummyFamilyData);
    }
  }, [familyMembersData, isSuccessFamilyMembers]);

  const handleOnAddEdit = (value) => {
    setSelectedValue(value);
    setAddEditDialogBoxOpen(true);
  };

  const handleCloseAddEditDialogBox = (value) => {
    setAddEditDialogBoxOpen(false);
    if (value) {
      if (value.addData) {
        const newItem = {
          id: value.addData.FamilyId,
          ownership: value.addData.JointOwner === "1" ? "yes" : "no",
          memberName: value.addData.RelativeFullName,
          age: value.addData.Age,
          gender: value.addData.Gender,
          relationship: value.addData.Relationship,
          aadhaarNumber: value.addData.AadharNo,
          mobileNumber: value.addData.MobileNo,
          photoFile: value.addData.ImagePath,
          panNo: value.addData.PANNo,
          email: value.addData.EmailID,
          address: value.addData.Address,
          dob: value.addData.DOB,
        };
        setFamilyData([newItem, ...familyData]);
      }
      if (value.editData) {
        const updatedFamilyData = [...familyData];
        const elementIndex = familyData.findIndex(
          (item) => item.id === value.editData.FamilyId
        );
        const editItem = {
          id: value.editData.FamilyId,
          ownership: value.editData.JointOwner === "1" ? "yes" : "no",
          memberName: value.editData.RelativeFullName,
          age: value.editData.Age,
          gender: value.editData.Gender,
          relationship: value.editData.Relationship,
          aadhaarNumber: value.editData.AadharNo,
          mobileNumber: value.editData.MobileNo,
          photoFile: value.editData.ImagePath,
          panNo: value.editData.PANNo,
          email: value.editData.EmailID,
          address: value.editData.Address,
          dob: value.editData.DOB,
        };
        updatedFamilyData.splice(elementIndex, 1, editItem);
        setFamilyData([...updatedFamilyData]);
      }
    }
    // setSelectedValue(null);
    // dispatch(clearFamilyData());
  };

  useEffect(() => {
    if (familyData.length > 0) {
      if (applicantData.MarritalStatus === "2") {
        let married = false;
        familyData.forEach((item) => {
          if (item.relationship === "Spouse") {
            married = true;
          }
        });
        setMarried(!married);
      }
    }
  }, [applicantData.MarritalStatus, familyData, isMarried]);

  const handleOnDelete = (value) => {
    setSelectedValue(value);
    setDeleteDialogBoxOpen(true);
  };

  const handleCloseDeleteDialogBox = (value) => {
    setDeleteDialogBoxOpen(false);
    // setSelectedValue(value);

    if (value !== "No") {
      setFamilyData(familyData.filter((item) => item.id !== value.id));
      dispatch(deleteFamilyMember(value.id));
      setSelectedValue(null);
    }
  };

  const handleOnSkip = (value) => {
    setSelectedValueSkip(value);
    setSkipDialogOpen(true);
  };

  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValueSkip(value);
    if (value !== "No") {
      dispatch(clearFamilyState());
      dispatch(clearFamilyData());
      history.push("/category-details");
      setSelectedValue(null);
    }
  };

  const submitForm = () => {
    dispatch(clearFamilyState());
    dispatch(clearFamilyData());
    const stepper = stepperData.superStepper;
    const newStepper = [...stepper];
    newStepper[0] = {
      ...stepper[0],
      subStepper: [
        { ...stepper[0].subStepper[0] },
        { ...stepper[0].subStepper[1] },
        { step: 2, description: "Family Details", completed: true },
      ],
    };
    let superStepCompleted = 0;
    newStepper[0].subStepper.forEach((item) => {
      if (item.completed) {
        superStepCompleted += 1;
      }
    });
    if (superStepCompleted === 3) {
      newStepper[0] = {
        step: 0,
        description: "Personal Details",
        completed: true,
        subStepper: [
          { ...stepper[0].subStepper[0] },
          { ...stepper[0].subStepper[1] },
          { step: 2, description: "Family Details", completed: true },
        ],
      };
    }
    const requestData = {
      Applicantid: localStorage.getItem("applicantId"),
      Stepper: { superStepper: newStepper },
    };
    dispatch(addEditStepper(requestData));
    dispatch(getStepperDetails());
    history.push("/category-details");
  };

  const goPreviousPage = () => {
    dispatch(clearFamilyState());
    dispatch(clearFamilyData());
    history.push("/contact-details");
  };

  return (
    <>
      {(isFetchingFamilyMember || isFetchingStepper) && (
        <Loading isOpen={isFetchingFamilyMember || isFetchingStepper} />
      )}
      <FormCard>
        <Hidden only={["sm", "md", "lg"]}>
          <Box marginLeft={2} paddingY={2}>
            <Button
              onClick={goPreviousPage}
              color="primary"
              startIcon={<NavigateBeforeIcon />}
            >
              {t("addFamilyDetailForm.backButtonText")}
            </Button>
          </Box>
        </Hidden>
        <Hidden only="xs">
          <SubStepperBar1 step={2} />
        </Hidden>
        <div className={classes.container}>
          <FormMandatoryText />
          {isErrorFamilyMember && (
            <AlertBox severity="error">{errorMsgFamilyMember}</AlertBox>
          )}
          {isMarried && (
            <AlertBox severity="info">
              {t("addFamilyDetailForm.isMarriedText")}
            </AlertBox>
          )}
          <IconTitle
            icon={<CategoryIcon fontSize="large" />}
            title={t("addFamilyDetailForm.title")}
          />
          <div className={classes.tableContainer}>
            <FamilyData
              familyData={familyData}
              handleOnEdit={handleOnAddEdit}
              handleOnDelete={handleOnDelete}
            />
          </div>
          <Box marginY={2}>
            <Button
              variant={width === "xs" ? null : "outlined"}
              color="primary"
              startIcon={
                width === "xs" ? (
                  <AddOutlinedIcon />
                ) : (
                  <AddCircleOutlineOutlinedIcon />
                )
              }
              style={{
                float: width === "xs" ? "left" : "right",
                borderRadius: 5,
                fontSize: 14,
                color: "#007ae7",
                textTransform: "capitalize",
              }}
              // onClick={handleOnAddEdit}
              onClick={() => handleOnAddEdit(null)}
            >
              {t("addFamilyDetailForm.buttonText")}
            </Button>
          </Box>
        </div>
      </FormCard>
      <Box
        marginY={width === "xs" ? 1 : 4}
        paddingY={width === "xs" ? 2 : 0}
        paddingX={2}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Hidden only="xs">
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                startIcon={<NavigateBeforeIcon />}
                fullWidth
                onClick={goPreviousPage}
                // onClick={() => {
                //   history.goBack();
                //   dispatch(clearFamilyState());
                //   dispatch(clearFamilyData());
                // }}
              >
                {t("addFamilyDetailForm.backButtonText")}
              </Button>
            </Grid>
            <Grid item xs={12} sm={3} md={4} lg={6}></Grid>
          </Hidden>
          <Grid item xs={12} sm={3} md={3} lg={2}>
            <Button
              type="button"
              color="primary"
              fullWidth
              onClick={() => handleOnSkip("openDialog")}
            >
              {t("addFamilyDetailForm.completeLaterButtonText")}
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              endIcon={<NavigateNextIcon />}
              fullWidth
              disabled={isMarried}
              onClick={submitForm}
            >
              {t("addFamilyDetailForm.saveButtonText")}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <FamilyDetailsFormDialogBox
        selectedValue={selectedValue}
        open={addEditDialogBoxOpen}
        onCloseForm={handleCloseAddEditDialogBox}
        isMarried={isMarried}
      />
      <ConfirmDialogBox
        title={t("addFamilyDetailForm.memberDetelePopup.title")}
        description={t("addFamilyDetailForm.memberDetelePopup.description")}
        selectedValue={selectedValue}
        open={deleteDialogBoxOpen}
        onClose={handleCloseDeleteDialogBox}
      />
      <ConfirmDialogBox
        title={t("Translation:skipDialog.title")}
        description={t("Translation:skipDialog.description")}
        question={t("Translation:skipDialog.question")}
        selectedValue={selectedValueSkip}
        open={skipDialogOpen}
        onClose={handleCloseSkipDialog}
      />
    </>
  );
};
export default withWidth()(FamilyDetails);
