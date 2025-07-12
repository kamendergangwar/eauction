import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint, InfoWebSiteUrl } from "../../../utils/Common";
const ApiEndPointHelpDeskVideos = ApiEndPoint + "/HelpDeskVideos/searchData";
// const ApiEndPointHelpDeskTerms = ApiEndPoint + "/HelpDeskFiles/TnCPrivacyData";
const HelpDeskEndpoint = ApiEndPoint;
const faqEndpoint = InfoWebSiteUrl + "wp-json/wp/v2/get-faq-info";
export const getTermsAndPrivacyPolicy = createAsyncThunk(
  "helpDesk/getTermsAndPrivacyPolicy",
  async (param, thunkAPI) => {
    try {
      const response = await axios.get(
        `${HelpDeskEndpoint}/HelpDeskFiles/TnCPrivacyData?Lang=${localStorage.getItem("i18nextLng")}`
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


export const getHelpDeskVideos = createAsyncThunk(
  "helpDesk/getHelpDeskVideos",
  async (param, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointHelpDeskVideos + "?Lang=" + localStorage.getItem("i18nextLng") + param
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

export const getconfiguration = createAsyncThunk(
  "helpDesk/getconfiguration",
  async (param, thunkAPI) => {
    try {
      const response = await axios.get(
        `${HelpDeskEndpoint}/HelpDeskFiles/configuration?Lang=${localStorage.getItem("i18nextLng")}`
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

export const getfrequentlyAskedQue = createAsyncThunk(
  "helpDesk/getfrequentlyAskedQue",
  async (param, thunkAPI) => {
    try {
      const response = await axios.get(
        `${faqEndpoint}?lang=${localStorage.getItem("i18nextLng")}`
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

export const helpDeskSlice = createSlice({
  name: "helpDesk",
  initialState: {
    isSuccessHelpDeskVideos: false,
    isFetchingHelpDeskVideos: false,
    isErrorHelpDeskVideos: false,
    errorMsgHelpDeskVideos: "",
    resDataHelpDeskVideos: [],

    isSuccessTermsAndPrivacy: false,
    isFetchingTermsAndPrivacy: false,
    isErrorTermsAndPrivacy: false,
    errorMsgTermsAndPrivacy: "",
    resDataTermsAndPrivacy: [],

    isSuccessConfiguration: false,
    isFetchingConfiguration: false,
    isErrorConfiguration: false,
    errorMsgConfiguration: "",
    resDataConfiguration: [],

    isSuccessFaq: false,
    isFetchingFaq: false,
    isErrorFaq: false,
    errorMsgFaq: "",
    resDataFaq: [],
  },
  reducers: {
    clearFelpDeskState: (state) => {
      state.isSuccessHelpDeskVideos = false;
      state.isFetchingHelpDeskVideos = false;
      state.isErrorHelpDeskVideos = false;
      state.errorMsgHelpDeskVideos = "";

      state.isSuccessTermsAndPrivacy = false;
      state.isFetchingTermsAndPrivacy = false;
      state.isErrorTermsAndPrivacy = false;
      state.errorMsgTermsAndPrivacy = "";
      
      state.isSuccessFaq = false;
      state.isFetchingFaq = false;
      state.isErrorFaq = false;
      state.errorMsgFaq = "";
      state.resDataFaq = [];
    },
    clearHelpDeskData: (state) => {
      state.resDataHelpDeskVideos = [];
      state.resDataTermsAndPrivacy = [];
    },
  },
  extraReducers: {
    [getHelpDeskVideos.fulfilled]: (state, { payload }) => {
      state.resDataHelpDeskVideos = payload.data;
      state.isFetchingHelpDeskVideos = false;
      state.isSuccessHelpDeskVideos = payload.success;
    },
    [getHelpDeskVideos.pending]: (state) => {
      state.isFetchingHelpDeskVideos = true;
    },
    [getHelpDeskVideos.rejected]: (state, { payload }) => {
      state.isFetchingHelpDeskVideos = false;
      state.isErrorTermsAndPrivacy = payload.error;
      state.errorMsgHelpDeskVideos = payload.message;
      state.resDataHelpDeskVideos = [];
      state.currentHelpDeskVideos = [];
    },
    [getTermsAndPrivacyPolicy.fulfilled]: (state, { payload }) => {
      state.resDataTermsAndPrivacy = payload.data;
      state.isFetchingTermsAndPrivacy = false;
      state.isSuccessTermsAndPrivacy = payload.success;
    },
    [getTermsAndPrivacyPolicy.pending]: (state) => {
      state.isFetchingTermsAndPrivacy = true;
    },
    [getTermsAndPrivacyPolicy.rejected]: (state, { payload }) => {
      state.isFetchingTermsAndPrivacy = false;
      state.isErrorTermsAndPrivacy = payload?.error;
      state.errorMsgTermsAndPrivacy = payload?.message;
      state.resDataTermsAndPrivacy = [];
    },
    [getconfiguration.fulfilled]: (state, { payload }) => {
      state.resDataConfiguration = payload.data;
      state.isFetchingConfiguration = false;
      state.isSuccessConfiguration = payload.success;
    },
    [getconfiguration.pending]: (state) => {
      state.isFetchingConfiguration = true;
    },
    [getconfiguration.rejected]: (state, { payload }) => {
      state.isFetchingConfiguration = false;
      state.isErrorConfiguration = payload?.error;
      state.errorMsgConfiguration = payload?.message;
      state.resDataConfiguration = [];
    },
    [getfrequentlyAskedQue.fulfilled]: (state, { payload }) => {
      state.resDataFaq = payload.result;
      state.isFetchingFaq = false;
      state.isSuccessFaq = true;
    },
    [getfrequentlyAskedQue.pending]: (state) => {
      state.isFetchingFaq = true;
    },
    [getfrequentlyAskedQue.rejected]: (state, { payload }) => {
      state.isFetchingFaq = false;
      state.isErrorFaq = payload.error;
      state.errorMsgFaq = payload.message;
      state.resDataFaq = [];
    }
  },
});

export const { clearFelpDeskState, clearHelpDeskData } = helpDeskSlice.actions;

export const helpDeskSelector = (state) => state.helpDesk;