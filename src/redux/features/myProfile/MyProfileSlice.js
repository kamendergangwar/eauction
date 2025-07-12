import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";
const ApiEndPointMyAppOverview = ApiEndPoint + "/MyProfile/";

export const getMyProfile = createAsyncThunk(
  "myProfile/getMyProfile",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointMyAppOverview + localStorage.getItem("applicantId")
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

export const getTransaction = createAsyncThunk(
  "myProfile/getTransaction",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/Transaction/" + localStorage.getItem("applicantId") + "?Lang=" + localStorage.getItem("i18nextLng")
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

export const getTransactionDetails = createAsyncThunk(
  "myProfile/getTransactionDetails",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + '/Transaction/TransactionDetail/' + params.TransactionReferenceNo + "?gateway=" + params.PaymentGateway + "&Lang=" + localStorage.getItem("i18nextLng")
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

export const getPendingTransDetail = createAsyncThunk(
  "myProfile/getPendingTransDetail",
  async (__, thunkAPI) => {
    let requestData = {
      ApplicantId: localStorage.getItem('applicantId'),
      type: "pending",
      from: "booking"
    }
    try {
      const response = await axios.post(
        ApiEndPoint + '/SbiGetway/booking_pending_transaction', requestData
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

export const getReciptDetails = createAsyncThunk(
  "myProfile/getReciptDetails",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + '/PDFDownloader/receipt/' + params.TransactionReferenceNo + "?gateway=" + params.PaymentGateway + "&Lang=" + localStorage.getItem("i18nextLng") + "&IsJsonSent=1"
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

export const getDocuments = createAsyncThunk(
  "myProfile/getDocuments",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + '/Document/ProfileDocuments/' + localStorage.getItem("applicantId") + "?Lang=" + localStorage.getItem("i18nextLng")
        // ApiEndPoint +'/Document/ProfileDocuments/'+"140777" +"?Lang=" + localStorage.getItem("i18nextLng")
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

export const setDefaultLanguage = createAsyncThunk(
  "myProfile/setDefaultLanguage",
  async (language, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/Applicant/UpdateLanguage", {
        ApplicantId: localStorage.getItem("applicantId"),
        Lang: language,
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

export const myProfileSlice = createSlice({
  name: "myProfile",
  initialState: {
    isSuccessMyProfile: false,
    isFetchingMyProfile: false,
    isErrorMyProfile: false,
    errorMsgMyProfile: "",
    applicationMyProfile: [],
    currentMyProfile: [],
    isSuccessTransaction: false,
    isFetchingTransaction: false,
    isErrorTransaction: false,
    errorMsgTransaction: "",
    applicationTransaction: [],

    isSuccessTransactionDetail: false,
    isFetchingTransactionDetail: false,
    isErrorTransactionDetail: false,
    errorMsgTransactionDetail: "",
    applicationTransactionDetail: [],

    isSuccessPendingTransDetail: false,
    isFetchingPendingTransDetail: false,
    isErrorPendingTransDetail: false,
    errorMsgPendingTransDetail: "",
    pendingTransDetail: [],

    isSuccessReciptDetail: false,
    isFetchingReciptDetail: false,
    errorMsgReciptDetail: "",
    applicationReciptDetail: [],

    isSuccessDocuments: false,
    isFetchingDocuments: false,
    isErrorDocuments: false,
    errorMsgDocuments: "",
    applicationDocuments: [],

    isSuccessLanguage: false,
    isFetchingLanguage: false,
    isErrorLanguage: false,
    errorMsgLanguage: "",
    applicationLanguage: [],
  },
  reducers: {
    clearProfileState: (state) => {
      state.isSuccessMyProfile = false;
      state.isFetchingMyProfile = false;
      state.isErrorMyProfile = false;
      state.errorMsgMyProfile = "";
      state.isSuccessTransaction = false;
      state.isFetchingTransaction = false;
      state.isErrorTransaction = false;
      state.errorMsgTransaction = "";

      state.isSuccessDocuments = false;
      state.isFetchingDocuments = false;
      state.isErrorDocuments = false;
      state.errorMsgDocuments = "";

      state.isSuccessTransactionDetail = false;
      state.isFetchingTransactionDetail = false;
      state.isErrorTransactionDetail = false;
      state.errorMsgTransactionDetail = "";

      state.isSuccessPendingTransDetail = false;
      state.isFetchingPendingTransDetail= false;
      state.ErrorPendingTransDetail= false;
      state.errorMsgPendingTransDetail= "";

      state.isSuccessReciptDetail = false;
      state.isFetchingReciptDetail = false;
      state.errorMsgReciptDetail = "";

      state.isSuccessLanguage = false;
      state.isFetchingLanguage = false;
      state.isErrorLanguage = false;
      state.errorMsgLanguage = "";
    },
    clearProfileData: (state) => {
      state.applicationMyProfile = [];
      state.applicationTransaction = [];
      state.applicationDocuments = [];
      state.applicationTransactionDetail = [];
      state.applicationReciptDetail = [];
      state.applicationLanguage = [];
      state.pendingTransDetail = [];
    },
  },
  extraReducers: {
    [getMyProfile.fulfilled]: (state, { payload }) => {
      state.applicationMyProfile = payload.data;
      state.isFetchingMyProfile = false;
      state.isSuccessMyProfile = payload.success;
    },
    [getMyProfile.pending]: (state) => {
      state.isFetchingMyProfile = true;
    },
    [getMyProfile.rejected]: (state, { payload }) => {
      console.log(payload, "payload error")
      state.isFetchingMyProfile = false;
      state.isErrorMyProfile = payload?.error;
      state.errorMsgMyProfile = payload?.message;
      state.applicationMyProfile = [];
      state.currentMyProfile = [];
    },

    [getTransaction.fulfilled]: (state, { payload }) => {
      state.applicationTransaction = payload.data;
      state.isFetchingTransaction = false;
      state.isSuccessTransaction = payload.success;
    },
    [getTransaction.pending]: (state) => {
      state.isFetchingTransaction = true;
    },
    [getTransaction.rejected]: (state, { payload }) => {
      state.isFetchingTransaction = false;
      // state.isErrorTransaction = payload.error;
      state.errorMsgTransaction = payload.message;
      state.applicationMyProfile = [];
      state.applicationTransaction = [];
    },

    [getDocuments.fulfilled]: (state, { payload }) => {
      state.applicationDocuments = payload.data;
      state.isFetchingDocuments = false;
      state.isSuccessDocuments = payload.success;
    },
    [getDocuments.pending]: (state) => {
      state.isFetchingDocuments = true;
    },
    [getDocuments.rejected]: (state, { payload }) => {
      state.isFetchingDocuments = false;
      // state.isErrorTransaction = payload.error;
      state.errorMsgDocuments = payload;
      state.applicationDocuments = [];
    },

    [getTransactionDetails.fulfilled]: (state, { payload }) => {
      state.applicationTransactionDetail = payload.data;
      state.isFetchingTransactionDetail = false;
      state.isSuccessTransactionDetail = payload.success;
    },
    [getTransactionDetails.pending]: (state) => {
      state.isFetchingTransactionDetail = true;
    },
    [getTransactionDetails.rejected]: (state, { payload }) => {
      state.isFetchingTransactionDetail = false;
      // state.isErrorTransaction = payload.error;
      state.errorMsgTransactionDetail = payload;
      state.applicationTransactionDetail = [];
    },
    [getPendingTransDetail.fulfilled]: (state, { payload }) => {
      state.pendingTransDetail = payload.data;
      state.isFetchingPendingTransDetail = false;
      state.isSuccessPendingTransDetail = payload.success;
    },
    [getPendingTransDetail.pending]: (state) => {
      state.isFetchingPendingTransDetail = true;
    },
    [getPendingTransDetail.rejected]: (state, { payload }) => {
      state.isFetchingPendingTransDetail = false;
      state.isErrorPendingTransDetail = payload.error;
      state.errorMsgPendingTransDetail = payload.message;
      state.pendingTransDetail = [];
    },
    [getReciptDetails.fulfilled]: (state, { payload }) => {
      state.applicationReciptDetail = payload.data;
      state.isFetchingReciptDetail = false;
      state.isSuccessReciptDetail = payload.success;
    },
    [getReciptDetails.pending]: (state) => {
      state.isFetchingReciptDetail = true;
    },
    [getReciptDetails.rejected]: (state, { payload }) => {
      state.isFetchingReciptDetail = false;
      // state.isErrorRecipt = payload.error;
      state.errorMsgReciptDetail = payload;
      state.applicationReciptDetail = [];
    },

    [setDefaultLanguage.fulfilled]: (state, { payload }) => {
      state.applicationLanguage = payload.data;
      state.isFetchingLanguage = false;
      state.isSuccessLanguage = payload.success;
    },
    [setDefaultLanguage.pending]: (state) => {
      state.isFetchingLanguage = true;
    },
    [setDefaultLanguage.rejected]: (state, { payload }) => {
      state.isFetchingLanguage = false;
      state.errorMsgLanguage = payload;
      state.applicationLanguage = [];
    },
  },
});

export const { clearProfileState, clearProfileData } =
  myProfileSlice.actions;

export const myProfileSelector = (state) => state.myProfile;