import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";



export const ProjectStepperSave = createAsyncThunk(
  "eauction/projectStepper/Save",
  async (step, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
        ProjectId: localStorage.getItem('productId'),
        CompletedStep: step
      }
      const response = await axios.post(ApiEndPoint + "/ProjectProgressStepper/projectStepperSave", data);
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

export const getProjectProgress = createAsyncThunk(
  "eauction/getProjectProgress",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
        "/ProjectProgressStepper/" +
        localStorage.getItem("applicantId") + '/' +
        localStorage.getItem('productId')
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


// Get Final Submission Details

export const getFinalSubmissionDetail = createAsyncThunk(
  "eauction/getFinalSubmission",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
        '/ApplyNow/get_Final_Submission_details/' +
        localStorage.getItem("applicantId") + '/' +
        localStorage.getItem('productId')
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


export const projectStepperSlice = createSlice({
  name: "projectStepper",
  initialState: {
    //eauction Stepper Single project listing
    isFetchingProjectStepper: false,
    isSuccessProjectStepper: false,
    isErrorProjectStepper: false,
    projectStepperData: [],
    errorMessageProjectStepper: "",
    //eauction Stepper get project Stepper
    isFetchProjectStepper: false,
    isSuccessgetProjectStepper: false,
    getProjectStepper: [],
    getProjectActiveStep: '',
    isErrorgetProjectStepper: false,
    getprojectStepperData: [],
    errorMessagegetProjectStepper: "",
    //get final submission details
    isFetchingFinalSubmission: false,
    isSuccessFinalSubmission: false,
    isErrorFinalSubmission: false,
    finalSubmissionData: {},
    errorMessageFinalSubmission: "",

  },
  reducers: {
    clearEauctionProjectStepperData: (state) => {
      state.isFetchingProjectStepper = false;
      state.isSuccessProjectStepper = false;
      state.isErrorProjectStepper = false;
      state.errorMessageProjectStepper = "";
    },
    clearEauctiongetProjectStepperData: (state) => {
      state.isgetProjectStepper = false;
      state.isSuccessgetProjectStepper = false;
      state.isErrorgetProjectStepper = false;
      state.errorMessagegetProjectStepper = "";
      state.getprojectStepperData = [];
      state.getProjectStepper = [];
      state.getProjectActiveStep = '';
    },
    clearFinalSubmissionData: (state) => {
      state.isFetchingFinalSubmission = false;
      state.isSuccessFinalSubmission = false;
      state.isErrorFinalSubmission = false;
      state.errorMessageFinalSubmission = "";
    },
  },
  extraReducers: {
    [ProjectStepperSave.fulfilled]: (state, { payload }) => {
      state.isFetchingProjectStepper = false;
      state.isErrorProjectStepper = payload.error;
      state.errorMessageProjectStepper = payload.message;
      state.isSuccessProjectStepper = payload.success;
      state.projectStepperData = payload.data;
    },
    [ProjectStepperSave.pending]: (state) => {
      state.isFetchingProjectStepper = true;
    },
    [ProjectStepperSave.rejected]: (state, { payload }) => {
      state.isFetchingProjectStepper = false;
      state.errorMessageProjectStepper = payload.message;
      state.isErrorProjectStepper = payload.error;
    },
    [getProjectProgress.fulfilled]: (state, { payload }) => {
      state.isFetchProjectStepper = false;
      state.isErrorgetProjectStepper = payload.error;
      state.errorMessagegetProjectStepper = payload.message;
      state.isSuccessgetProjectStepper = payload.success;
      state.getprojectStepperData = payload;
      if (payload.data.length > 0) {
        state.getProjectStepper = JSON.parse(payload.data[0].Stepper);
        state.getProjectActiveStep = parseInt(payload.data[0].ActiveStepId);
        state.getProjectActiveStep += 1;
      }
    },
    [getProjectProgress.pending]: (state) => {
      state.isFetchProjectStepper = true;
    },
    [getProjectProgress.rejected]: (state, { payload }) => {
      state.isFetchProjectStepper = false;
      state.errorMessagegetProjectStepper = payload.message;
      state.isErrorgetProjectStepper = payload.error;
    },
    [getFinalSubmissionDetail.fulfilled]: (state, { payload }) => {
      state.isFetchingFinalSubmission = false;
      state.isErrorFinalSubmission = payload.error;
      state.errorMessageFinalSubmission = payload.message;
      state.isSuccessFinalSubmission = payload.success;
      state.finalSubmissionData = payload.data;

    },
    [getFinalSubmissionDetail.pending]: (state) => {
      state.isFetchingFinalSubmission = true;
    },
    [getFinalSubmissionDetail.rejected]: (state, { payload }) => {
      state.isFetchingFinalSubmission = false;
      state.errorMessageFinalSubmission = payload.message;
      state.isErrorFinalSubmission = payload.error;
    },

  },
});

export const { clearEauctionProjectStepperData, clearEauctiongetProjectStepperData, clearFinalSubmissionData } = projectStepperSlice.actions;

export const EauctionProjectStepperSelector = (state) => state.projectStepper;