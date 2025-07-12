import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

const DateFormatter = (datestr) => {
  const date = new Date(datestr);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  }, ${date.getFullYear()}`;
};

export const addEditApplicantProgress = createAsyncThunk(
  "applicantstepper/addEditApplicantProgress",
  async (newStepper, thunkAPI) => {
    let ActiveStep = 2;
    await newStepper.forEach((step) => {
      ActiveStep =
        step.Status == "completed" ? Number(step.StepId) + 1 : ActiveStep;
    });

    try {
      const requestData = {
        ApplicantId: localStorage.getItem("applicantId"),
        Stepper: { superStepper: newStepper },
        ActiveStepId: ActiveStep,
      };
      const response = await axios.post(
        ApiEndPoint + "/ApplicantProgressStepper",
        requestData, {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          }
        }
      );
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getApplicantProgress = createAsyncThunk(
  "stepper/getApplicantProgress",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/ApplicantProgressStepper?ApplicantId=" +
        localStorage.getItem("applicantId") + "&Lang=" + localStorage.getItem("i18nextLng")
      );
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const ApplicantStepperSlice = createSlice({
  name: "ApplicantProgress",
  initialState: {
    superActiveStep: 2,
    superStepper: [
      {
        StepId: "1",
        Description: "Applicant SignIn",
        Status: "completed",
      },
      {
        StepId: "2",
        Description: "KYC",
        Status: "pending",
      },
      {
        StepId: "3",
        Description: "personals details",
        Status: "pending",
      },
      {
        StepId: "4",
        Description: "Add Co-applicant",
        Status: "pending",
      },
      {
        StepId: "5",
        Description: "Category Details",
        Status: "pending",
      },
      {
        StepId: "6",
        Description: "Documents Upload",
        Status: "pending",
      },
      {
        StepId: "7",
        Description: "Application payment",
        Status: "pending",
      },
      {
        StepId: "8",
        Description: "Document Verification",
        Status: "pending",
      },
      {
        StepId: "9",
        Description: "Select Project",
        Status: "pending",
      },
      {
        StepId: "10",
        Description: "Booking Payment",
        Status: "pending",
      },
      {
        StepId: "11",
        Description: "LOI Letter",
        Status: "pending",
      },
      {
        StepId: "12",
        Description: "Allotment Letter",
        Status: "pending",
      },
      {
        StepId: "13",
        Description: "Installments",
        Status: "pending",
      },
      {
        StepId: "14",
        Description: "Agreement",
        Status: "pending",
      },
    ],
    isFetchingStepper: false,
    isSuccessProgressReqStepper: false,
    isSuccessProgressResStepper: false,
    isErrorStepper: false,
    errorMessageStepper: "",
    ApplicantStepperData: {},
    LastUpdatedDate: "12 Mar, 23",
    documentPreVerificationData: [],
    documentPostVerificationData: [],
  },
  reducers: {
    clearSuperStepperEditVars: (state, action) => {
      state.isSuccessProgressReqStepper = false;
      state.isFetchingStepper = false;
      state.isErrorStepper = false;
      state.errorMessageStepper = "";
    },
    clearApplicantKycStepperVars: (state, action) => {
      state.isSuccessProgressResStepper = false;
    },
    ApplicantStepperActiveStep: (state, action) => {
      state.superActiveStep = action.payload;
    },
    clearApplicantStepper: (state, action) => {
      state.ApplicantStepperData = {};
      state.isSuccessProgressResStepper = false;
      state.isSuccessProgressReqStepper = false;
    },
    clearApplicantStepperUpdateRes: (state, action) => {
      state.isSuccessProgressResStepper = false;
      state.isSuccessProgressReqStepper = false;
    },
  },
  extraReducers: {
    [addEditApplicantProgress.fulfilled]: (state, { payload }) => {
      state.isFetchingStepper = false;
      state.isSuccessProgressReqStepper = true;
      if (payload.data.length > 0) {
        const data = payload.data[0];
        state.ApplicantStepperData = JSON.parse(data.Stepper);
        let LastUpdatedDate = data.UpdatedAt ? data.UpdatedAt : data.CreatedAt;
        state.LastUpdatedDate = DateFormatter(LastUpdatedDate);
        state.superActiveStep = parseInt(data.ActiveStepId);
        state.documentPreVerificationData = data.DocumentPreVerification;
        state.documentPostVerificationData = data.DocumentPostVerification;
      }
    },
    [addEditApplicantProgress.pending]: (state) => {
      state.isFetchingStepper = true;
    },
    [addEditApplicantProgress.rejected]: (state, { payload }) => {
      state.isFetchingStepper = false;
      state.isErrorStepper = true;
      state.isSuccessProgressReqStepper = false;
      state.errorMessageStepper = payload.message;
    },
    //
    [getApplicantProgress.fulfilled]: (state, { payload }) => {
      if (payload.data.length > 0) {
        const data = payload.data[0];
        state.ApplicantStepperData = JSON.parse(data.Stepper);
        let LastUpdatedDate = data.UpdatedAt ? data.UpdatedAt : data.CreatedAt;
        state.LastUpdatedDate = DateFormatter(LastUpdatedDate);
        state.superActiveStep = parseInt(data.ActiveStepId);
        state.documentPreVerificationData = data?.DocumentPreVerification;
        state.documentPostVerificationData = data?.DocumentPostVerification;
      }
      state.isFetchingStepper = false;
      state.isSuccessProgressResStepper = payload.success;
      state.isErrorStepper = payload.error;
      state.errorMessageStepper = payload.message;
    },
    [getApplicantProgress.pending]: (state) => {
      state.isFetchingStepper = true;
    },
    [getApplicantProgress.rejected]: (state, { payload }) => {
      state.isFetchingStepper = false;
      state.isErrorStepper = true;
      state.errorMessageStepper = payload.message;
      state.ApplicantStepperData = {};
    },
  },
});

export const {
  ApplicantStepperActiveStep,
  clearSuperStepperEditVars,
  clearApplicantKycStepperVars,
  clearApplicantStepper,
  clearApplicantStepperUpdateRes,
} = ApplicantStepperSlice.actions;

export const ApplicantProgressSelector = (state) => state.applicantStepper;
