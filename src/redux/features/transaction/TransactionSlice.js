import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

export const addTransactions = createAsyncThunk(
  "transaction/addTransactions",
  async (transactionData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/Transaction",
        transactionData
      );
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    isFetchingTransaction: false,
    isSuccessResTransaction: false,
    isSuccessReqTransaction: false,
    isErrorTransaction: false,
    errorMsgTransaction: "",
    transactionData: [],
  },
  reducers: {
    clearTransactionState: (state) => {
      state.isFetchingTransaction = false;
      state.isSuccessResTransaction = false;
      state.isSuccessReqTransaction = false;
      state.isErrorTransaction = false;
      state.errorMsgTransaction = "";
    },
    clearTransactionData: (state) => {
      state.transactionData = [];
    },
    setApplicationsForTransaction: (state, action) => {
      state.transactionData.push(action.payload);
    },
  },
  extraReducers: {
    [addTransactions.fulfilled]: (state, { payload }) => {
      // console.log(payload, "Success - 1");
      state.isFetchingTransaction = false;
      state.isSuccessReqTransaction = payload.success;
    },
    [addTransactions.pending]: (state) => {
      state.isFetchingTransaction = true;
    },
    [addTransactions.rejected]: (state, { payload }) => {
      state.isFetchingTransaction = false;
      state.isErrorTransaction = payload.error;
      state.errorMsgTransaction = payload.message;
    },
  },
});

export const {
  clearTransactionState,
  clearTransactionData,
  setApplicationsForTransaction,
} = transactionSlice.actions;

export const transactionSelector = (state) => state.transaction;
