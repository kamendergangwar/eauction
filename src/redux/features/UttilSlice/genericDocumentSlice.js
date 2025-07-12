import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEndPoint } from "../../../utils/Common";
import axios from "axios";

export const genericGetDocuments = createAsyncThunk(
  "Utils/genericGetDocuments",
  async (requestData, thunkAPI) => {
    try {
      
      const response = await axios.post(
        `${ApiEndPoint}/OtherRequestDocuments/getUploadDocumentList`,
        requestData
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

export const genericSaveDocuments = createAsyncThunk(
  "Utils/genericSaveDocuments",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPoint}/OtherRequestDocuments/saveDocument`,
        requestData
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

export const GenericDocSlice = createSlice({
  name: "genericDocuments",
  initialState: {
    isFetchingGenericGetDoc: false,
    isSuccessGenericGetDoc: false,
    isErrorGenericGetDoc: false,
    genericGetDocData: "",
    errorMessageGenericGetDoc: "",

    //save generic doc initial state
    isFetching: false,
    isSuccess: false,
    isSuccessSent: "",
    isError: false,
    errorMessage: "",
    documentId: {},
  },
  reducers: {
    clearGenericGetDocState: (state) => {
      state.isFetchingGenericGetDoc = false;
      state.isSuccessGenericGetDoc = false;
      state.isErrorGenericGetDoc = false;
      state.errorMessageGenericGetDoc = "";
    },
    clearSuccessMsg: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [genericGetDocuments.fulfilled]: (state, { payload }) => {
      state.isFetchingGenericGetDoc = false;
      state.isErrorGenericGetDoc = payload.error;
      state.errorMessageGenericGetDoc = payload.message;
      state.isSuccessGenericGetDoc = payload.success;
      state.genericGetDocData = payload.data;
    },
    [genericGetDocuments.pending]: (state) => {
      state.isFetchingGenericGetDoc = true;
    },
    [genericGetDocuments.rejected]: (state, { payload }) => {
      state.isFetchingGenericGetDoc = false;
      state.errorMessageGenericGetDoc = payload.message;
      state.genericGetDocErrorData = payload.data;
      state.isErrorGenericGetDoc = payload.error;
      state.errorMessageGenericGetDoc = payload.message;
    },
    [genericSaveDocuments.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isSuccessSent = payload.message;
      state.documentId = payload.data;
    },
    [genericSaveDocuments.pending]: (state) => {
      state.isFetching = true;
      state.documentId = {};
    },
    [genericSaveDocuments.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
      // state.isSuccessSent = false;
    },
  },
});

export const { clearGenericGetDocState, clearSuccessMsg } =
  GenericDocSlice.actions;

export const GenericDocSliceSelector = (state) => state.genericDocuments;
