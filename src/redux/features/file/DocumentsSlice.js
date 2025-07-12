import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

const ApiEndPointDocumentSave = ApiEndPoint + "/DocumentSave";

export const saveDocument = createAsyncThunk(
  "documents/saveDocument",
  async (requestData, thunkAPI) => {
    try {
      // const data = new FormData();
      // data.append(...requestData);
      // console.log("====================================");
      // console.log(data);
      // console.log("====================================");
      const response = await axios.post(ApiEndPointDocumentSave, requestData);
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    isEStampSelected: false,
    isFetching: false,
    isSuccess: false,
    isSuccessSent: "",
    isError: false,
    errorMessage: "",
    documentId: {},
  },
  reducers: {
    eStampSelectOrDeselect: (state, action) => {
      state.isEStampSelected = action.payload;
    },
    clearSuccessMsg: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [saveDocument.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isSuccessSent = payload.message;
      state.documentId = payload.data;
    },
    [saveDocument.pending]: (state) => {
      state.isFetching = true;
      state.documentId = {};
    },
    [saveDocument.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
      // state.isSuccessSent = false;
    },
  },
});

export const { eStampSelectOrDeselect, clearSuccessMsg } =
  documentsSlice.actions;

export const documentsSelector = (state) => state.documents;
