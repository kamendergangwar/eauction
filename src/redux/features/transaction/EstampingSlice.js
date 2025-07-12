import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

export const getEstampSummary = createAsyncThunk(
  "eStamping/eStampSummary",
  async (thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPoint + "/EstampDetailSummary/");
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

export const eStampingSlice = createSlice({
  name: "eStamping",
  initialState: {
    isFetchingEstamping: false,
    isSuccessResEstamping: false,
    isSuccessReqEstamping: false,
    isErrorEstamping: false,
    errorMsgEstamping: "",
    eStampingnData: [],
    currentEstamping: [],
    reservationCat: [],
    documentForEstamping: [],
  },
  reducers: {
    clearEstamping: (state) => {
      state.isFetchingEstamping = false;
      state.isSuccessResEstamping = false;
      state.isSuccessReqEstamping = false;
      state.isErrorEstamping = false;
      state.errorMsgEstamping = "";
    },
    clearEstampingData: (state) => {
      state.eStampingnData = [];
    },
    setApplicationsForEstamping: (state, action) => {
      state.EstampingnData.push(action.payload);
    },
    setDocforEstamping: (state, action) => {
      state.reservationCat = action.payload;
      // console.log(action.payload);
      // console.log(state.reservationCat);
    },
    clearDocforEstamping: (state) => {
      state.reservationCat = [];
    },
    addDocforEstamping: (state, action) => {
      state.documentForEstamping = action.payload;
    },
  },
  extraReducers: {
    [getEstampSummary.fulfilled]: (state, { payload }) => {
      // console.log(payload, "Success - 1");
      state.isFetchingEstamping = false;
      state.isSuccessReqEstamping = payload.success;
      state.eStampingnData = payload.data;
      state.currentEstamping.push(payload.data);
    },
    [getEstampSummary.pending]: (state) => {
      state.isFetchingEstamping = true;
      state.isSuccessReqEstamping = false;
      state.currentEstamping = [];
      // state.reservationCat = [];
    },
    [getEstampSummary.rejected]: (state, { payload }) => {
      state.isFetchingEstamping = false;
      state.isErrorEstamping = payload.error;
      state.errorMsgEstamping = payload.message;
      state.currentEstamping = [];
      state.reservationCat = [];
    },
  },
});

export const {
  clearEstamping,
  clearEstampingData,
  setApplicationsForEstamping,
  setDocforEstamping,
  addDocforEstamping,
  clearDocforEstamping,
} = eStampingSlice.actions;

export const eStampingSelector = (state) => state.eStamping;
