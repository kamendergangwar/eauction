import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEndPoint } from "../../../utils/Common";
import axios from "axios";

export const sendGenericOtp = createAsyncThunk(
    "Utils/GenericOtp",
    async (type, thunkAPI) => {
      try {
        const requestData = {
          MobileNo: localStorage.getItem("mobileNo"),
          Type: type,
          Lang: localStorage.getItem("i18nextLng"),
        };
        const response = await axios.post(
          `${ApiEndPoint}/GenericOtp/send`, requestData
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
  )


  export const UtilsSlice = createSlice({
    name: "utils",
    initialState: {
      isFetchingSendOtp : false,
      isSuccessSendOtp : false,
      isErrorSendOtp:  false,
      sendOtpData: [],
      errorMessageSendOtp: ""
    },
    reducers: {
      clearGenericOtpState: (state) => {
        state.isFetchingSendOtp = false;
        state.isSuccessSendOtp = false;
        state.isErrorSendOtp =  false;
        state.errorMessageSendOtp= "";
      },
    },
    extraReducers: {
      [sendGenericOtp.fulfilled]: (state, { payload }) => {
        state.isFetchingSendOtp = false;
        state.isErrorSendOtp = payload.error;
        state.errorMessageSendOtp = payload.message;
        state.isSuccessSendOtp = payload.success;
        state.sendOtpData = payload.data;
      },
      [sendGenericOtp.pending]: (state) => {
        state.isFetchingSendOtp = true;
      },
      [sendGenericOtp.rejected]: (state, { payload }) => {
        state.isFetchingSendOtp = false;
        state.errorMessageSendOtp = payload.message;
        state.sendOtpErrorData = payload.data;
        state.isErrorSendOtp = payload.error;
        state.errorMessageSendOtp = payload.message;
      },
    },
  });
  
  export const {clearGenericOtpState } = UtilsSlice.actions;
  
  export const UtilsSelector = (state) => state.utils;