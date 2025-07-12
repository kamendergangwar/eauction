import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// export const ApiEndPoint = "http://35.200.197.80/rest-api/applicationservice";

export const AgentFileDataUpload = createAsyncThunk(
  "fileUpload/fileDataUpload",
  async (PostData, thunkAPI) => {
    try {
      const data = new FormData();
      const file = PostData.fileData
      data.append("file", file.doc ? file.doc : file);
      data.append("Type", file.docType ? file.docType : "");
      data.append("ApplicantId", PostData.ApplicantId);
      data.append("AgentCode", localStorage.getItem("agentcode"));
      data.append("Lang", localStorage.getItem("i18nextLng"));

      const response = await axios.post(ApiEndPoint + "/FileUpload", data);
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

export const fileDataUpload = createAsyncThunk(
  "fileUpload/fileDataUpload",
  async (requestData, thunkAPI) => {
    try {
      const data = new FormData();
      data.append("file", requestData.doc ? requestData.doc : data);
      data.append("Type", requestData.docType ? requestData.docType : "");
      data.append("ApplicantId", localStorage.getItem("applicantId"));
      data.append("Lang", localStorage.getItem("i18nextLng"));
      data.append("docName", requestData.docName ? requestData.docName : "")
      // data.append("Lang", "english");
      const response = await axios.post(ApiEndPoint + "/FileUpload", data);
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

export const TechnicalBidSave = createAsyncThunk(
  "fileUpload/technicalbidSave",
  async (requestData, thunkAPI) => {
    try {
      //   const data = new FormData();
      //   data.append("UploadFiles", requestData.UploadFiles ? requestData.UploadFiles : data);
      //  // data.append("Type", requestData.Type ? requestData.Type : "");
      //   data.append("ApplicantId", localStorage.getItem("applicantId"));
      //   data.append("ProjectId",  localStorage.getItem('productId'));
      //   data.append("Lang", localStorage.getItem("i18nextLng"));
      //   data.append("docName", requestData.docName ? requestData.docName : "")
      const data = {
        ApplicantId: localStorage.getItem("applicantId"),
        ProjectId: localStorage.getItem('productId'),
        UploadFiles: requestData.UploadFiles ? requestData.UploadFiles : "",
        docName: requestData.docName ? requestData.docName : "",
        lang: localStorage.getItem("i18nextLng"),
        Type: requestData.Type ? requestData.Type : "",
      }
      const response = await axios.post(ApiEndPoint + "/FileUpload/updateTechnicalBid", data);
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


export const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    isFileFetching: false,
    isFileSuccess: false,
    isFileError: false,
    fileErrorMessage: "",
    imageUrl: "",
    documentImageUrl: "",
    otherFileUrl: "",
    datUrl: {},

    // Technical Bid Save State
    isTechnicalBidFetching: false,
    isTechnicalBidSuccess: false,
    isTechnicalBidError: false,
    technicalBidErrorMessage: "",
    technicalBidData: [],

  },
  reducers: {
    clearFileState: (state) => {
      state.isFileFetching = false;
      state.isFileSuccess = false;
      state.isFileError = false;
      state.fileErrorMessage = "";
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setDocumentImageUrl: (state, action) => {
      state.documentImageUrl = action.payload;
    },
    setOtherFile: (state, action) => {
      state.otherFileUrl = action.payload;
    },
    clearImageUrl: (state) => {
      state.imageUrl = "";
    },
    clearDocumentImageUrl: (state) => {
      state.documentImageUrl = "";
    },
    clearOtherFile: (state) => {
      state.otherFileUrl = "";
    },
    clearDatUrl: (state) => {
      state.dataUrl = {};

    },
  },
  extraReducers: {
    [fileDataUpload.fulfilled]: (state, { payload }) => {
      if (payload.data?.Type == "DocumentUrl") {
        state.documentImageUrl = payload.data.UploadedFileUrl;
      } else if (payload.data?.Type == "OtherDocument") {
        state.otherFileUrl = payload.data.UploadedFileUrl;
      } else {
        state.imageUrl = payload.data.UploadedFileUrl;
      }
      state.isFileFetching = false;
      state.isFileSuccess = payload.success;
      state.isFileError = payload.error;
      state.dataUrl = payload.data;
      state.fileErrorMessage = payload.message;
    },
    [fileDataUpload.pending]: (state) => {
      state.isFileFetching = true;
    },
    [fileDataUpload.rejected]: (state, { payload }) => {
      state.isFileFetching = false;
      state.isFileError = true;
      state.fileErrorMessage = payload.message;
      state.isFileSuccess = false;
    },
    // Technical Bid AWS Save Extra Reducers

    [TechnicalBidSave.fulfilled]: (state, { payload }) => {

      state.isTechnicalBidFetching = false;
      state.isTechnicalBidSuccess = payload.success;
      state.isTechnicalBidError = payload.error;
      state.technicalBidData = payload.data;
      state.technicalBidErrorMessage = payload.message;
    },
    [TechnicalBidSave.pending]: (state) => {
      state.isTechnicalBidFetching = true;
    },
    [TechnicalBidSave.rejected]: (state, { payload }) => {
      state.isTechnicalBidFetching = false;
      state.isTechnicalBidError = true;
      state.technicalBidErrorMessage = payload.message;
      state.isTechnicalBidSuccess = false;
    },

    [AgentFileDataUpload.fulfilled]: (state, { payload }) => {
      if (payload.data?.Type == "DocumentUrl") {
        state.documentImageUrl = payload.data.UploadedFileUrl;
      } else if (payload.data?.Type == "OtherDocument") {
        state.otherFileUrl = payload.data.UploadedFileUrl;
      } else {
        state.imageUrl = payload.data.UploadedFileUrl;
      }
      state.isFileFetching = false;
      state.isFileSuccess = payload.success;
      state.isFileError = payload.error;
      state.dataUrl = payload.data;
      state.fileErrorMessage = payload.message;
    },
    [AgentFileDataUpload.pending]: (state) => {
      state.isFileFetching = true;
    },
    [AgentFileDataUpload.rejected]: (state, { payload }) => {
      state.isFileFetching = false;
      state.isFileError = true;
      state.fileErrorMessage = payload.message;
      state.isFileSuccess = false;
    },
  },
});

export const { clearFileState, setImageUrl, clearImageUrl, setDocumentImageUrl,
  clearDocumentImageUrl, setOtherFile,
  clearOtherFile, clearDatUrl } =
  fileUploadSlice.actions;

export const fileUploadSelector = (state) => state.fileUpload;
