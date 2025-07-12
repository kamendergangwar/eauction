import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";
import moment from "moment";



// export const updateCountDownTime = createAsyncThunk(
//     "countTimer/updateCountDown",
//     async (data, thunkAPI) => {
//       try {


export const updateCountDownTime = createAsyncThunk(
  "countTimer/updateCountDown",
  async (data, thunkAPI) => {
    try {

      const response = await axios.post(
        ApiEndPoint + "/Auction/update_eauctionEndDate",
        data);
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
// server timer difference api 
export const updateDifferenceTime = createAsyncThunk(
  "countTimer/updateDifferenceTime",
  async (data, thunkAPI) => {
    const start = performance.now();
    try {

      const response = await axios.post(
        ApiEndPoint + "/Auction/ServerBidTime",
        data);
      let responseData = await response.data;
      if (response.status === 200) {
        const end = performance.now();
        const responseTime = end - start;
        // console.log("diff", end - start)
        return { responseTime, ...responseData };
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const countTimerSlice = createSlice({
  name: "countTimer",
  initialState: {
    isFetchingCountTimer: false,
    isSuccessCountTimer: false,
    isErrorCountTimer: false,
    errorMsgCountTimer: "",
    countTimerData: {},
    //server Timer
    isFetchingServerTimer: false,
    isSuccessServerTimer: false,
    isErrorServerTimer: false,
    errorMsgServerTimer: "",
    serverTimerData: {},

  },
  reducers: {
    clearTimerState: (state) => {
      state.isFetchingCountTimer = false;
      state.isSuccessCountTimer = false;
      state.isErrorCountTimer = false;
      state.errorMsgCountTimer = "";

    },
    clearTimerData: (state) => {
      state.countTimerData = {};
    },
    clearServerTimerState: (state) => {
      state.isFetchingServerTimer = false;
      state.isSuccessServerTimer = false;
      state.isErrorServerTimer = false;
      state.errorMsgServerTimer = "";

    },
    clearServerTimerData: (state) => {
      state.serverTimerData = {};
    },
  },



  extraReducers: {
    [updateCountDownTime.fulfilled]: (state, { payload }) => {
      state.isFetchingCountTimer = false;
      state.isErrorCountTimer = payload.error;
      state.errorMessageCountTimer = payload.message;
      state.isSuccessCountTimer = payload.success;
      state.countTimerData = payload.data;
      console.log(state.countTimerData, "sdsdsds")

    },
    [updateCountDownTime.pending]: (state) => {
      state.isFetchingCountTimer = true;
    },
    [updateCountDownTime.rejected]: (state, { payload }) => {
      state.isFetchingCountTimer = false;
      state.errorMessageCountTimer = payload.message;
      state.isErrorCountTimer = payload.error;
    },

    //extra reducer for server timer state
    [updateDifferenceTime.fulfilled]: (state, { payload }) => {
      state.isFetchingServerTimer = false;
      state.isErrorServerTimer = payload.error;
      state.errorMessageServerTimer = payload.message;
      state.isSuccessServerTimer = payload.success;
      // state.serverTimerData = payload.data;

      // Calculate API delay time in milliseconds
      const apiDelayTimeMs = parseFloat(payload.responseTime);

      // Parse the timediff string into components
      const timediffArray = payload.data.timediff.split(':').map(Number);
      const [days, hours, minutes, seconds] = timediffArray;

      // Convert the timediff into total milliseconds
      const totalTimediffMs = (
        ((days * 24 + hours) * 60 + minutes) * 60 + seconds
      ) * 1000;

      // Calculate the adjusted time difference
      const adjustedTimediffMs = totalTimediffMs - apiDelayTimeMs;

      // Convert the adjusted time difference back into components
      const adjustedSecondsTotal = Math.max(0, Math.floor(adjustedTimediffMs / 1000));
      const adjustedDays = Math.floor(adjustedSecondsTotal / (24 * 60 * 60));
      const adjustedHours = Math.floor((adjustedSecondsTotal % (24 * 60 * 60)) / (60 * 60));
      const adjustedMinutes = Math.floor((adjustedSecondsTotal % (60 * 60)) / 60);
      const adjustedSeconds = adjustedSecondsTotal % 60;

      // Format the adjusted timediff string
      const adjustedTimediff = `${adjustedDays}:${adjustedHours}:${adjustedMinutes}:${adjustedSeconds}`;

      // Return the adjusted server time data
      state.serverTimerData = { "timediff": adjustedTimediff };
      state.apiDelayTime = apiDelayTimeMs;
    },
    [updateDifferenceTime.pending]: (state) => {
      state.isFetchingServerTimer = true;
    },
    [updateDifferenceTime.rejected]: (state, { payload }) => {
      state.isFetchingServerTimer = false;
      state.errorMessageServerTimer = payload.message;
      state.isErrorServerTimer = payload.error;
    },
  },



});

export const { clearTimerState, clearTimerData, clearServerTimerState, clearServerTimerData } =
  countTimerSlice.actions;

export const countTimerSelector = (state) => state.countTimer;
