import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEndPoint } from "../../../utils/Common";
import axios from "axios";

export const cancelRequest = createAsyncThunk(
  "cancelRequest",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPoint}/Cancelbooking/cancel_flat_request`,
        params
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

export const GetCancelStatus = createAsyncThunk(
  "GetCancelStatus",
  async (__, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPoint}/Cancelbooking/cancel_data`,
        {
          applicant_id: localStorage.getItem("applicantId"),
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

export const CancelBookingSlice = createSlice({
  name: "cancelBooking",
  initialState: {
    isFetchingCancelBooking: false,
    isSuccessCancelBooking: false,
    isErrorCancelBooking: false,
    cancelBookingData: [],
    errorMessageCancelBooking: "",

    isFetchingCancelStatus: false,
    isSuccessCancelStatus: false,
    isErrorCancelStatus: false,
    cancelStatus: [],
    errorMessageCancelStatus: "",
  },
  reducers: {
    clearCancelRequestState: (state) => {
      state.isFetchingCancelBooking = false;
      state.isSuccessCancelBooking = false;
      state.isErrorCancelBooking = false;
      state.errorMessageCancelBooking = "";
    },
    clearCancelStatusState: (state) => {
      state.isFetchingCancelStatus = false;
      state.isSuccessCancelStatus = false;
      state.isErrorCancelStatus = false;
      state.errorMessageCancelStatus = "";
    },
  },
  extraReducers: {
    [cancelRequest.fulfilled]: (state, { payload }) => {
      state.isFetchingCancelBooking = false;
      state.isErrorCancelBooking = payload.error;
      state.errorMessageCancelBooking = payload.message;
      state.isSuccessCancelBooking = payload.success;
      state.cancelBookingData = payload.data;
    },
    [cancelRequest.pending]: (state) => {
      state.isFetchingCancelBooking = true;
    },
    [cancelRequest.rejected]: (state, { payload }) => {
      state.isFetchingCancelBooking = false;
      state.errorMessageCancelBooking = payload.message;
      state.CancelBookingErrorData = payload.data;
      state.isErrorCancelBooking = payload.error;
      state.errorMessageCancelBooking = payload.message;
    },
    [GetCancelStatus.fulfilled]: (state, { payload }) => {
      state.isFetchingCancelStatus = false;
      state.isErrorCancelStatus = payload.error;
      state.errorMessageCancelStatus = payload.message;
      state.isSuccessCancelStatus = payload.success;
      state.cancelStatus = payload.data;
    },
    [GetCancelStatus.pending]: (state) => {
      state.isFetchingCancelStatus = true;
    },
    [GetCancelStatus.rejected]: (state, { payload }) => {
      state.isFetchingCancelStatus = false;
      state.errorMessageCancelStatus = payload.message;
      state.CancelBookingCancelStatus = payload.data;
      state.isErrorCancelStatus = payload.error;
      state.errorMessageCancelStatus = payload.message;
    },
  },
});

export const { clearCancelRequestState, clearCancelStatusState } =
  CancelBookingSlice.actions;

export const CancelBookingSelector = (state) => state.cancelBooking;
