import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

export const addEditNocApplication = createAsyncThunk(
    "noc/addEditNocApplication",
    async (_requestData, thunkAPI) => {
      try {
        const response = await axios.put(ApiEndPoint + "/NocTransaction/nocApplication/"+localStorage.getItem("applicantId"), _requestData);
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

export const getNocTransactionHistory = createAsyncThunk(
    "noc/getNocTransactionHistory",
    async (_requestData, thunkAPI) => {
      try {
        const response = await axios.get(ApiEndPoint + "/NocTransaction/nocApplicationHistory/" +localStorage.getItem("applicantId"));
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


export const NocSlice = createSlice({
    name: "noc",
    initialState: {
        isFetchingUpdateNocApplication: false,
        isSuccessUpdateNocApplication: false,
        isErrorUpdateNocApplication: false,
        errorMessageUpdateNocApplication : "",

        isFetchingNocTransactionHistory: false,
        isSuccessNocTransactionHistory: false,
        isErrorNocTransactionHistory: false,
        errorMessageNocTransactionHistory : "",
        nocTransactionHistoryData: [],
    },
    reducers: {
        clearNocApplication: (state) => {
            state.isFetchingUpdateNocApplication= false;
            state.isSuccessUpdateNocApplication= false;
            state.isErrorUpdateNocApplication= false;
            state.errorMessageUpdateNocApplication = "";
        }
    },
    extraReducers: {
      [addEditNocApplication.fulfilled]: (state, { payload }) => {
        state.isFetchingUpdateNocApplication = false;
        state.isSuccessUpdateNocApplication = payload.success;
        if (!payload.success) {
          state.isErrorUpdateNocApplication = payload.error;
          state.errorMessageUpdateNocApplication = payload.message;
        }
      },
      [addEditNocApplication.pending]: (state) => {
        state.isFetchingUpdateNocApplication = true;
      },
      [addEditNocApplication.rejected]: (state, { payload }) => {
        state.isFetchingUpdateNocApplication = false;
        state.isSuccessUpdateNocApplication = false;
        state.isErrorUpdateNocApplication = true;
        state.errorMessageUpdateNocApplication = "";
      },
      [getNocTransactionHistory.fulfilled]: (state, { payload }) => {
        state.isFetchingNocTransactionHistory = false;
        state.isSuccessNocTransactionHistory = payload.success;
        state.nocTransactionHistoryData = payload.data;
      },
      [getNocTransactionHistory.pending]: (state) => {
        state.isFetchingNocTransactionHistory = true;
      },
      [getNocTransactionHistory.rejected]: (state, { payload }) => {
        state.isFetchingNocTransactionHistory = false;
        state.isErrorNocTransactionHistory = true;
        state.errorMessageNocTransactionHistory = "";
        state.nocTransactionHistoryData = [];
      },
    },
});

export const { clearNocApplication } = NocSlice.actions;
export const NocApplicationSelector = (state) => state.noc;
