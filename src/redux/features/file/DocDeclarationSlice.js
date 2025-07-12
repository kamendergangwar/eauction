import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint, fallback_msg } from "../../../utils/Common";
// import { apiEndPoint } from "../applicant/ApplicantAuthSlice";

const ApiEndPointApplications = ApiEndPoint + "/Document/myProfileDocuments";
const ApiEndPointUploadDocuments = ApiEndPoint + "/Document/getUploadDocumentList";
const ApiEndPointfile = ApiEndPoint + "/FileUpload/getAwsFileView";
const ApiEndPointCategorywiseDocs = ApiEndPoint + "/Document/getCategoryWiseDocumentList";

export const getDocumentsList = createAsyncThunk(
  "docDeclaration/getDocumentsList",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `${ApiEndPointApplications}/${localStorage.getItem("applicantId")}?Lang=${localStorage.getItem("i18nextLng")}`
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


export const getDynamicFile = createAsyncThunk(
  "docDeclaration/getDynamicFile",
  async (sendData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${ApiEndPointfile}?fileName=${sendData}`
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

export const getUploadDocumentsList = createAsyncThunk(
  "docDeclaration/getUploadDocumentsList",
  async (sendData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPointUploadDocuments}`,
        sendData
      );
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updatetDocumentDeclaration = createAsyncThunk(
  "docDeclaration/updatetDocumentDeclaration",
  async (sendData, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPoint + "/Applicant/updateDeclarationDocument/" + localStorage.getItem("applicantId"),
        sendData
      );
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const agreeDeclaration = createAsyncThunk(
  "docDeclaration/agreeDeclaration",
  async (sendData1, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/Applicant/Declaration/" + localStorage.getItem("applicantId"),
        sendData1
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


export const updateDocumentsList = createAsyncThunk(
  "Document/updateDocumentsList",
  async (sendData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPoint}/Document/ApplicationsDocuments`,
        sendData
      );
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getCategoryWiseDocumentsList = createAsyncThunk(
  "docDeclaration/getCategoryWiseDocumentsList",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `${ApiEndPointCategorywiseDocs}?Lang=${localStorage.getItem("i18nextLng")}`
      );
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const docDeclarationSlice = createSlice({
  name: "docDeclaration",
  initialState: {
    isFetchingGetDocsList: false,
    isSuccessResGetDocsList: false,
    isErrorGetDocsList: false,
    errorMsgGetDocsList: "",
    getDocsListData: [],

    isFetchingFile: false,
    isSuccessFile: false,
    isErrorFile: false,
    errorMsgFile: "",
    fileData: [],

    isFetchingGetUploadList: false,
    isSuccessResUploadList: false,
    isErrorGetUploadList: false,
    errorMsgGetUploadList: "",
    getUploadListData: [],

    isFetchingUpdateDocsList: false,
    isSuccessUpdateDocsList: false,
    isErrorUpdateDocsList: false,
    errorMsgUpdateDocsList: "",
    isFetchingDeclaration: false,
    isSuccessResDeclaration: false,
    isErrorDeclaration: false,
    errorMsgDeclaration: "",


    DocumentsListData: [],
    isFetchingDocumentsList: false,
    isSuccessDocumentsList: false,
    isErrorDocumentsList: false,
    errorMsgDocumentsList: "",

    getCategoryWiseDocumentsListData: [],
    isFetchingGetCategoryWiseDocumentsList: false,
    isSuccessGetCategoryWiseDocumentsList: false,
    isErrorGetGetCategoryWiseDocumentsList: false,
    errorMsgGetGetCategoryWiseDocumentsList: "",
  },
  reducers: {
    clearDocDeclarationState: (state) => {
      state.isFetchingGetDocsList = false;
      state.isSuccessResGetDocsList = false;
      state.isErrorGetDocsList = false;
      state.errorMsgGetDocsList = "";
      state.isFetchingDeclaration = false;
      state.isSuccessResDeclaration = false;
      state.isErrorDeclaration = false;
      state.errorMsgDeclaration = "";


      state.DocumentsListData = [];
      state.isFetchingDocumentsList = false;
      state.isSuccessDocumentsList = false;
      state.isErrorDocumentsList = false;
      state.errorMsgDocumentsList = "";

      state.isFetchingFile = false;
      state.isSuccessFile = false;
      state.isErrorFile = false;
      state.errorMsgFile = "";
      state.fileData = [];
    },
    clearDocDeclarationtData: (state) => {
      state.getDocsListData = [];
    },
  },
  extraReducers: {
    [getDocumentsList.fulfilled]: (state, { payload }) => {
      state.getDocsListData = payload.data;
      state.isFetchingGetDocsList = false;
      state.isSuccessResGetDocsList = payload.success;
      state.isErrorGetDocsList = payload.error;
      state.errorMsgGetDocsList = payload.message;
    },
    [getDocumentsList.pending]: (state) => {
      state.isFetchingGetDocsList = true;
    },
    [getDocumentsList.rejected]: (state, { payload }) => {
      state.isFetchingGetDocsList = false;
      state.isErrorGetDocsList = payload?.error || true;
      state.errorMsgGetDocsList = payload?.message || fallback_msg;
      state.isSuccessResGetDocsList = payload?.success;
      state.getDocsListData = [];
    },

    [getDynamicFile.fulfilled]: (state, { payload }) => {
      state.fileData = payload.data;
      state.isFetchingFile = false;
      state.isSuccessFile = payload.success;
      state.isErrorFile = payload.error;
      state.errorMsgFile = payload.message;
    },
    [getDynamicFile.pending]: (state) => {
      state.isFetchingFile = true;
    },
    [getDynamicFile.rejected]: (state, { payload }) => {
      state.isFetchingFile = false;
      state.isErrorFile = payload.error;
      state.errorMsgFile = payload.message;
      state.isSuccessFile = payload.success;
      state.fileData = [];
    },
    [getUploadDocumentsList.fulfilled]: (state, { payload }) => {
      state.getUploadListData = payload.data;
      state.isFetchingGetUploadList = false;
      state.isSuccessResUploadList = payload.success;
      state.isErrorGetUploadList = payload.error;
      state.errorMsgGetUploadList = payload.message;
    },
    [getUploadDocumentsList.pending]: (state) => {
      state.isFetchingGetUploadList = true;
    },
    [getUploadDocumentsList.rejected]: (state, { payload }) => {
      state.isFetchingGetUploadList = false;
      state.isErrorGetUploadList = payload.error;
      state.errorMsgGetUploadList = payload.message;
      state.isSuccessResUploadList = payload.success;
      state.getUploadListData = [];
    },
    [updateDocumentsList.fulfilled]: (state, { payload }) => {
      state.DocumentsListData = payload.data;
      state.isFetchingDocumentsList = false;
      state.isSuccessDocumentsList = payload.success;
      state.isErrorDocumentsList = payload.error;
      state.errorMsgDocumentsList = payload.message;
    },
    [updateDocumentsList.pending]: (state) => {
      state.isFetchingDocumentsList = true;
    },
    [updateDocumentsList.rejected]: (state, { payload }) => {
      state.isFetchingDocumentsList = false;
      state.isErrorDocumentsList = payload.error;
      state.errorMsgDocumentsList = payload.message;
      state.isSuccessDocumentsList = payload.success;
      state.DocumentsListData = [];
    },

    [updatetDocumentDeclaration.fulfilled]: (state, { payload }) => {
      state.isFetchingUpdateDocsList = false;
      state.isSuccessUpdateDocsList = payload.success;
      state.isErrorUpdateDocsList = payload.error;
      state.errorMsgUpdateDocsList = payload.message;
    },
    [updatetDocumentDeclaration.pending]: (state) => {
      state.isFetchingUpdateDocsList = true;
    },
    [updatetDocumentDeclaration.rejected]: (state, { payload }) => {
      state.isFetchingUpdateDocsList = false;
      state.isErrorUpdateDocsList = payload.error;
      state.errorMsgUpdateDocsList = payload.message;
      state.isSuccessUpdateDocsList = payload.success;
    },
    [agreeDeclaration.fulfilled]: (state, { payload }) => {
      state.isSuccessResDeclaration = payload.success;
      state.isErrorDeclaration = false;
    },
    [agreeDeclaration.pending]: (state) => {
      state.isFetchingDeclaration = true;
    },
    [agreeDeclaration.rejected]: (state, { payload }) => {
      state.isFetchingDeclaration = false;
      state.isSuccessResDeclaration = payload.success;
      state.isErrorDeclaration = payload.error;
      state.errorMsgDeclaration = payload.message;
    },
    [getCategoryWiseDocumentsList.fulfilled]: (state, { payload }) => {
      state.getCategoryWiseDocumentsListData = payload.data;
      state.isFetchingGetCategoryWiseDocumentsList = false;
      state.isSuccessGetCategoryWiseDocumentsList = payload.success;
      state.isErrorGetGetCategoryWiseDocumentsList = payload.error;
      state.errorMsgGetGetCategoryWiseDocumentsList = payload.message;
    },
    [getCategoryWiseDocumentsList.pending]: (state) => {
      state.isFetchingGetCategoryWiseDocumentsList = true;
    },
    [getCategoryWiseDocumentsList.rejected]: (state, { payload }) => {
      state.isFetchingGetCategoryWiseDocumentsList = false;
      state.isErrorGetGetCategoryWiseDocumentsList = payload.error;
      state.errorMsgGetGetCategoryWiseDocumentsList = payload.message;
      state.isSuccessGetCategoryWiseDocumentsList = payload.success;
    },
  },
});

export const { clearDocDeclarationState, clearDocDeclarationtData } = docDeclarationSlice.actions;

export const docDeclarationSelector = (state) => state.docDeclaration;
