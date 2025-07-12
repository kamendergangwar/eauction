import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

export const addEditStepper = createAsyncThunk(
  "stepper/addEditStepper",
  async (newStepper, thunkAPI) => {
    try {
      const requestData = {
        Applicantid: localStorage.getItem("applicantId"),
        Stepper: { superStepper: newStepper },
      };
      const response = await axios.post(ApiEndPoint + "/Stepper/stepperv2", requestData);
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getStepperDetails = createAsyncThunk(
  "stepper/getStepperDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/Stepper/stepperv2/" + localStorage.getItem("applicantId")
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

export const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    superActiveStep: 0,
    sub1ActiveStep: 0,
    sub2ActiveStep: 0,
    superStepper: [
      {
        "step": 1,
        "description": "Personal Details",
        "status": "pending",
        "applicantKycStepper": [
          {
            "step": 1,
            "title": "Verify Aadhaar",
            "status": "pending",
            "isAfterLine": true,
            "isBeforeLine": false
          },
          // {
          //   "step": 2,
          //   "title": "Upload Aadhaar",
          //   "status": "pending",
          //   "isAfterLine": true,
          //   "isBeforeLine": true
          // },
          {
            "step": 2,
            "title": "Verify PAN",
            "status": "pending",
            "isAfterLine": true,
            "isBeforeLine": true
          },
          // {
          //   "step": 4,
          //   "title": "Upload PAN",
          //   "status": "pending",
          //   "isAfterLine": true,
          //   "isBeforeLine": true
          // },
          {
            "step": 3,
            "title": "Bank Details",
            "status": "pending",
            "isAfterLine": false,
            "isBeforeLine": true,
          },
          // {
          //   "step": 6,
          //   "title": "Cancelled Cheque",
          //   "status": "pending",
          //   "isAfterLine": false,
          //   "isBeforeLine": true
          // }
        ],
        // "coApplicantKycStepper": [{
        //   "step": 1,
        //   "title": "Verify Aadhaar",
        //   "status": "pending",
        //   "isAfterLine": true,
        //   "isBeforeLine": false
        // },
        // // {
        // //   "step": 2,
        // //   "title": "Upload Aadhaar",
        // //   "status": "pending",
        // //   "isAfterLine": true,
        // //   "isBeforeLine": true
        // // },
        // {
        //   "step": 2,
        //   "title": "Verify PAN",
        //   "status": "pending",
        //   "isAfterLine": false,
        //   "isBeforeLine": true
        // },
        //   // {
        //   //   "step": 4,
        //   //   "title": "Upload PAN",
        //   //   "status": "pending",
        //   //   "isAfterLine": false,
        //   //   "isBeforeLine": true
        //   // }
        // ]
      },
      {
        "step": 2,
        "description": "Category Details",
        "status": "pending"
      },
      {
        "step": 3,
        "description": "Submit Affidavit",
        "status": "pending"
      },
      {
        "step": 4,
        "description": "Make Payment",
        "status": "pending"
      }
    ],
    isFetchingStepper: false,
    isSuccessReqStepper: false,
    isSuccessResStepper: false,
    isErrorStepper: false,
    errorMessageStepper: "",
    stepperData: {},
  },
  reducers: {
    clearSuperStepperEditVars: (state, action) => {
      state.isSuccessReqStepper = false;
      state.isSuccessResStepper = false;
      state.isFetchingStepper = false;
      state.isErrorStepper = false;
      state.errorMessageStepper = "";
    },
    clearApplicantKycStepperVars: (state, action) => {
      state.isSuccessResStepper = false;
    },
    superStepperActiveStep: (state, action) => {
      state.superActiveStep = action.payload;
    },
    subSteppper1ActiveStep: (state, action) => {
      state.sub1ActiveStep = action.payload;
    },
    subSteppper2ActiveStep: (state, action) => {
      state.sub2ActiveStep = action.payload;
    },
  },
  extraReducers: {
    [addEditStepper.fulfilled]: (state, { payload }) => {
      state.isFetchingStepper = false;
      state.isSuccessReqStepper = payload.success;
    },
    [addEditStepper.pending]: (state) => {
      state.isFetchingStepper = true;
    },
    [addEditStepper.rejected]: (state, { payload }) => {
      state.isFetchingStepper = false;
      state.isErrorStepper = true;
      state.errorMessageStepper = payload?.message;
    },
    // 
    [getStepperDetails.fulfilled]: (state, { payload }) => {
      if (payload.data.length > 0) {
        state.stepperData = JSON.parse(payload.data[0].Stepper);
      }
      state.isFetchingStepper = false;
      state.isSuccessResStepper = payload.success;
      state.isErrorStepper = payload.error;
      state.errorMessageStepper = payload?.message;
    },
    [getStepperDetails.pending]: (state) => {
      state.isFetchingStepper = true;
    },
    [getStepperDetails.rejected]: (state, { payload }) => {
      state.isFetchingStepper = false;
      state.isErrorStepper = true;
      state.errorMessageStepper = payload?.message;
      state.stepperData = {};
    },
  },
});

export const {
  superStepperActiveStep,
  subSteppper1ActiveStep,
  subSteppper2ActiveStep,
  clearSuperStepperEditVars,
  clearApplicantKycStepperVars
} = stepperSlice.actions;

export default stepperSlice.reducer;
