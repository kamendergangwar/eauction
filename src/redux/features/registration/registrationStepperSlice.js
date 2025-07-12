import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";



export const RegistrationStepperSave = createAsyncThunk(
  "registration/Stepper/Save",
  async (step, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
      
        StepId: step
        
      }
      const response = await axios.post(ApiEndPoint + "/Auction/application_stepper", data);
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

export const getRegistrationProgress = createAsyncThunk(
  "registration/getProgress",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
        "/Auction/getStepperDetails/?ApplicantId=" +
        localStorage.getItem("applicantId") 
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




export const registrationStepperSlice = createSlice({
  name: "registrationStepper",
  initialState: {
    //registration Stepper 
    isFetchingRegStepper: false,
    isSuccessRegStepper: false,
    isErrorRegStepper: false,
    regStepperData: [],
    errorMessageRegStepper: "",
    
    //eauction get Reg Stepper
    isFetchRegStepper: false,
    isSuccessgetRegStepper: false,
    getRegStepper: [],
    getRegActiveStep: '',
    isErrorgetRegStepper: false,
    getRegStepperData: [],
    errorMessagegetRegStepper: "",
    getRegTotalStep:"",

  },
  reducers: {
    clearRegistrationStepperData: (state) => {
      state.isFetchingRegStepper = false;
      state.isSuccessRegStepper = false;
      state.isErrorRegStepper = false;
      state.errorMessageRegStepper = "";
    },
    cleargetRegistrationStepperData: (state) => {
      state.isgetRegStepper = false;
      state.isSuccessgetRegStepper = false;
      state.isErrorgetRegStepper = false;
      state.errorMessagegetRegStepper = "";
      state.getRegStepperData = [];
      state.getRegStepper = [];
      state.getRegActiveStep = '';
      state.getRegTotalStep='';
    },
   
  },
  extraReducers: {
    [RegistrationStepperSave.fulfilled]: (state, { payload }) => {
      state.isFetchingRegStepper = false;
      state.isErrorRegStepper = payload.error;
      state.errorMessageRegStepper = payload.message;
      state.isSuccessRegStepper = payload.success;
      state.regStepperData = payload.data;
    },
    [RegistrationStepperSave.pending]: (state) => {
      state.isFetchingRegStepper = true;
    },
    [RegistrationStepperSave.rejected]: (state, { payload }) => {
      state.isFetchingRegStepper = false;
      state.errorMessageRegStepper = payload.message;
      state.isErrorRegStepper = payload.error;
    },
    [getRegistrationProgress.fulfilled]: (state, { payload }) => {
      state.isFetchRegStepper = false;
      state.isErrorgetRegStepper = payload.error;
      state.errorMessagegetRegStepper = payload.message;
      state.isSuccessgetRegStepper = payload.success;
      state.getRegStepperData = payload.data;
      if (payload.data.length > 0) {
        state.getRegStepper = (payload.data[0].Stepper);
        state.getRegActiveStep = parseInt(payload.data[0].ActiveStepId);
        state.getRegTotalStep = (payload.data[0].TotalSteps);
       
      }
    },
    [getRegistrationProgress.pending]: (state) => {
      state.isFetchRegStepper = true;
    },
    [getRegistrationProgress.rejected]: (state, { payload }) => {
      state.isFetchRegStepper = false;
      state.errorMessagegetRegStepper = payload.message;
      state.isErrorgetRegStepper = payload.error;
    },
    
  },
});

export const { clearRegistrationStepperData,  cleargetRegistrationStepperData} = registrationStepperSlice.actions;

export const RegistrationStepperSelector = (state) => state.registrationStepper;