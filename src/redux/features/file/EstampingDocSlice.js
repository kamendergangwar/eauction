import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

const ApiEndPointEstamptDocument = ApiEndPoint + "/Estamp";

export const generateEstamping = createAsyncThunk(
  "estamp/generateEstamping",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointEstamptDocument,
        requestData
      );
      let responseData = await response.data;
      // console.log(responseData);
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const getDocumentId = createAsyncThunk(
  "estamp/getDocumentId",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + `/Estamp/documents/${requestData}`
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      // console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDocumentDetails = createAsyncThunk(
  "estamp/getDocumentDetails",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPoint + `/Estamp/${requestData}`);
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      // console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const htmlToPdf = createAsyncThunk(
  "estamp/htmlToPdf",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/HtmltoPdf",
        requestData
      );
      const responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const estampDocumentsSlice = createSlice({
  name: "estamp",
  initialState: {
    isEStampSelected: false,
    isFetchingEstamping: false,
    isSuccess: false,
    isSuccessSent: false,
    isError: false,
    errorMessage: "",
    estampData: [],
    documentID: "",
    isFetchingDoc: false,
    isDocFileSuccess: false,
    docSuccessMessage: false,
    docFileData: "",
    docFileError: false,
    deocErrorMessage: false,
    isPdfSuccess: false,
    ispdfError: false,
    pdfData: "",
    isFetchingPdf: false,
    isDocIdFetching: false,
    isDocIdSuccess: false,
    docIdData: [],
    isDocIdError: false,
    isDocDetailsFetching: false,
    isDocDetailsSuccess: false,
    docIdDetailsData: [],
    isDocDetailsError: false,
  },
  reducers: {
    eStampSelectOrDeselect: (state, action) => {
      state.isEStampSelected = action.payload;
    },
  },
  extraReducers: {
    [generateEstamping.fulfilled]: (state, { payload }) => {
      state.isFetchingEstamping = false;
      state.isSuccess = true;
      state.isSuccessSent = payload.message;
      state.estampData = payload.data;
      // state.documentID = payload.data.documentId;
    },
    [generateEstamping.pending]: (state) => {
      state.isFetchingEstamping = true;
    },
    [generateEstamping.rejected]: (state, { payload }) => {
      state.isFetchingEstamping = false;
      state.isError = true;
      state.errorMessage = payload.message;
      state.isSuccessSent = false;
    },
    [getDocumentDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingDoc = false;
      state.isDocFileSuccess = true;
      state.docSuccessMessage = payload.message;
      state.docFileData = payload.data;
    },
    [getDocumentDetails.pending]: (state) => {
      state.isFetchingDoc = true;
    },
    [getDocumentDetails.rejected]: (state, { payload }) => {
      state.isFetchingDoc = false;
      state.docFileError = true;
      state.deocErrorMessage = payload.message;
      // state.isSuccessSent = false;
    },
    [getDocumentId.fulfilled]: (state, { payload }) => {
      state.isDocIdFetching = false;
      state.isDocIdSuccess = true;
      state.docIdData = payload.data;
    },
    [getDocumentId.pending]: (state) => {
      state.isDocIdFetching = true;
    },
    [getDocumentId.rejected]: (state, { payload }) => {
      state.isDocIdFetching = false;
      state.isDocIdError = true;

      // state.isSuccessSent = false;
    },
    [htmlToPdf.fulfilled]: (state, { payload }) => {
      state.isPdfSuccess = true;
      state.pdfData = payload.data;
      state.ispdfError = false;
      state.isFetchingPdf = false;
      // console.log(state.isPdfSuccess);
      // console.log(state.pdfData);
    },
    [htmlToPdf.pending]: (state) => {
      state.isFetchingPdf = true;
    },
    [htmlToPdf.rejected]: (state, { payload }) => {
      state.isPdfSuccess = false;
      state.ispdfError = true;
      state.isFetchingPdf = false;
      // console.log(state.ispdfError);
    },
  },
});

export const { eStampSelectOrDeselect } = estampDocumentsSlice.actions;

export const estampingDocumentSelector = (state) => state.estamp;
