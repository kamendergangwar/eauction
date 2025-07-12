import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

//Live Tender Data Api
export const getLiveTenderData = createAsyncThunk(
  "eauction/LiveTenderData",
  async (__, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
        per_page:"5",
        current_page:localStorage.getItem('livetenderPageNo'),
      }
      const response = await axios.post(ApiEndPoint + "/Auction/liveTender", data);
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

//Pending Tender Data Api
export const getPendingTenderData = createAsyncThunk(
  "eauction/PendingTenderData",
  async (__, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
        per_page:"5",
        current_page:localStorage.getItem('pendingtenderPageNo'),
      }
      const response = await axios.post(ApiEndPoint + "/Auction/myPendingTenders", data);
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
//Final Submitted Tender Data Api
export const getFinalSubmitTenderData = createAsyncThunk(
  "eauction/FinalSubmitTenderData",
  async (__, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
        per_page:"5",
        current_page:localStorage.getItem('finalsubmitPageNo'),
      }
      const response = await axios.post(ApiEndPoint + "/Auction/finalSubmitTenders", data);
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

//Live Auction Data Api
export const getLiveAuctionData = createAsyncThunk(
  "eauction/LiveAuctionData",
  async (__, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
        per_page:"5",
        current_page:localStorage.getItem("liveauctionPageNo"),
      }
      const response = await axios.post(ApiEndPoint + "/Auction/myLiveAuction", data);
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

export const getAuctionData = createAsyncThunk(
  "eauction/AuctionData",
  async (__, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
        per_page:"5",
        current_page:localStorage.getItem('allProjectsPageNo'),
      }
      const response = await axios.post(ApiEndPoint + "/Auction/getAuctionProjects", data);
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

export const getSingleAuctionProject = createAsyncThunk(
  "eauction/SingleProject",
  async (__, thunkAPI) => {
    try {
      const data = {
        ProjectId: localStorage.getItem('productId'),
        ApplicantId: localStorage.getItem('applicantId')
      }
      const response = await axios.post(ApiEndPoint + "/Auction/getAuctionProjectDetails", data);
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

export const getAppliedProjectData = createAsyncThunk(
  "eauction/AppliedProjectData",
  async (__, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId')
      }
      const response = await axios.post(ApiEndPoint + "/Auction/getMyAuctionProjects", data);
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


//get E-auction Winner Data

export const getWinnerData = createAsyncThunk(
  "eauction/WinnerData",
  async (__, thunkAPI) => {
    try {
      const data = {
        ApplicantId: localStorage.getItem('applicantId'),
        per_page:"5",
        current_page:localStorage.getItem('WinnerPageNo'),
      }
      const response = await axios.post(ApiEndPoint + "/Auction/get_winner_data", data);
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
//get E-auction topbids

export const getTopBids = createAsyncThunk(
  "eauction/topTenBidsData",
  async (data, thunkAPI) => {
    try {
      // const data = {
      //   ApplicantId: localStorage.getItem('applicantId'),
      //   ProjectId: localStorage.getItem('productId'),

      // }
      const response = await axios.post(ApiEndPoint + "/Auction/topTenBid", data);
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
export const eAuctionGenericOtp = createAsyncThunk(
  "eauction/AuctionData/GenericOtp",
  async (type, thunkAPI) => {
    try {
      const requestData = {
        MobileNo: localStorage.getItem("mobileNo"),
        Type: type,
        Lang: localStorage.getItem("i18nextLng"),
      };
      const response = await axios.post(
        `${ApiEndPoint}/GenericOtp/send`, requestData
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
)

export const eAuctionVerifyOtp = createAsyncThunk(
  "eauction/AuctionData/VerifyOtp",
  async (finalData, thunkAPI) => {
    try {

      const response = await axios.post(
        `${ApiEndPoint}/Auction/saveEmdAuctionPayments`, finalData
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
)


export const eauctionSlice = createSlice({
  name: "eauction",
  initialState: {
    //eauction Single project listing
    isFetchingSingleProject: false,
    isSuccessSingleProject: false,
    isErrorSingleProject: false,
    singleprojectData: [],
    errorMessageSingleProject: "",
    // Live Tender Data State
    isFetchingLiveTenderData: false,
    isSuccessLiveTenderData: false,
    isErrorLiveTenderData: false,
    liveTenderData: [],
    errorMessageLiveTenderData: "",
    //  Pending Tender Data State
    isFetchingPendingTenderData: false,
    isSuccessPendingTenderData: false,
    isErrorPendingTenderData: false,
    pendingTenderData: [],
    errorMessagePendingTenderData: "",
      //  Final Submit Tender Data State
      isFetchingFinalSubmitTenderData: false,
      isSuccessFinalSubmitTenderData: false,
      isErrorFinalSubmitTenderData: false,
      finalSubmitTenderData: [],
      errorMessageFinalSubmitTenderData: "",

    // Live Auction Data State
    isFetchingLiveAuctionData: false,
    isSuccessLiveAuctionData: false,
    isErrorLiveAuctionData: false,
    liveAuctionData: [],
    errorMessageLiveAuctionData: "",

    //eauction project listing

    isFetchingProject: false,
    isSuccessProject: false,
    isErrorProject: false,
    projectData: [],
    errorMessageProject: "",

    //eauction Myproject listing

    isFetchingMyProject: false,
    isSuccessMyProject: false,
    isErrorMyProject: false,
    myprojectData: [],
    errorMessageMyProject: "",

    //eauction Winner Data

    isFetchingWinnerData: false,
    isSuccessWinnerData: false,
    isErrorWinnerData: false,
    winnerData: [],
    errorMessageWinnerData: "",

     //eauction top ten bids Data

     isFetchingTopBidsData: false,
     isSuccessTopBidsData: false,
     isErrorTopBidsData: false,
     topBidsData: [],
     errorMessageTopBids: "",

    // eauction emd payment generic otp

    isFetchingSendOtpEauction: false,
    isSuccessSendOtpEauction: false,
    isErrorSendOtpEauction: false,
    sendOtpDataEauction: [],
    errorMessageSendOtpEauction: "",

    //eauction emd verify payment otp

    isFetchingVerifyOtpEauction: false,
    isSuccessVerifyOtpEauction: false,
    isErrorVerifyOtpEauction: false,
    verifyOtpDataEauction: [],
    errorMessageVerifyOtpEauction: ""
  },
  reducers: {
    clearEauctionSingleProjectData: (state) => {
      state.isFetchingSingleProject = false;
      state.isSuccessSingleProject = false;
      state.isErrorSingleProject = false;
      state.errorMessageSingleProject = "";
    },
    clearEauctionProjectData: (state) => {
      state.isFetchingProject = false;
      state.isSuccessProject = false;
      state.isErrorProject = false;
      state.errorMessageProject = "";
    },
    clearEauctionMyProjectData: (state) => {
      state.isFetchingMyProject = false;
      state.isSuccessMyProject = false;
      state.isErrorMyProject = false;
      state.errorMessageMyProject = "";
    },
    // clear Winner Data

    clearEauctionWinnerData: (state) => {
      state.isFetchingWinnerData = false;
      state.isSuccessWinnerData = false;
      state.isErrorWinnerData = false;
      state.errorMessageWinnerData = "";
    },
    // clear top bids Data
    clearEauctionTopBidsData: (state) => {
      state.isFetchingTopBidsData = false;
      state.isSuccessTopBidsData = false;
      state.isErrorTopBidsData = false;
      state.errorMessageTopBidsData = "";
    },
    clearEauctionGenericOtpState: (state) => {
      state.isFetchingSendOtpEauction = false;
      state.isSuccessSendOtpEauction = false;
      state.isErrorSendOtpEauction = false;
      state.errorMessageSendOtpEauction = "";
    },
    clearEauctionVerifyOtpState: (state) => {
      state.isFetchingVerifyOtpEauction = false;
      state.isSuccessVerifyOtpEauction = false;
      state.isErrorVerifyOtpEauction = false;
      state.errorMessageVerifyOtpEauction = "";
    },
    clearLiveAuctionData: (state) => {
      state.isFetchingLiveAuctionData = false;
      state.isSuccessLiveAuctionData = false;
      state.isErrorLiveAuctionData = false;
      state.errorMessageLiveAuctionData = "";
      state.liveAuctionData = [];
    },
    clearLiveTenderData: (state) => {
      state.isFetchingLiveTenderData = false;
      state.isSuccessLiveTenderData = false;
      state.isErrorLiveTenderData = false;
      state.errorMessageLiveTenderData = "";
      state.liveTenderData = [];
    },
    clearPendingTenderData: (state) => {
      state.isFetchingPendingTenderData = false;
      state.isSuccessPendingTenderData = false;
      state.isErrorPendingTenderData = false;
      state.errorMessagePendingTenderData = "";
      state.pendingTenderData = [];
    },
    clearFinalSubmitTenderData: (state) => {
      state.isFetchingFinalSubmitTenderData = false;
      state.isSuccessFinalSubmitTenderData = false;
      state.isErrorFinalSubmitTenderData = false;
      state.errorMessageFinalSubmitTenderData = "";
      state.finalSubmitTenderData = [];
    }

  },
  extraReducers: {
    [getSingleAuctionProject.fulfilled]: (state, { payload }) => {
      state.isFetchingSingleProject = false;
      state.isErrorSingleProject = payload.error;
      state.errorMessageSingleProject = payload.message;
      state.isSuccessSingleProject = payload.success;
      state.singleprojectData = payload.data;
    },
    [getSingleAuctionProject.pending]: (state) => {
      state.isFetchingSingleProject = true;
    },
    [getSingleAuctionProject.rejected]: (state, { payload }) => {
      state.isFetchingSingleProject = false;
      state.errorMessagesingleProject = payload.message;
      state.isErrorSingleProject = payload.error;
    },
    //Live Tender Data Extra Reducer
    [getLiveTenderData.fulfilled]: (state, { payload }) => {
      state.isFetchingLiveTenderData = false;
      state.isErrorLiveTenderData = payload.error;
      state.errorMessageLiveTenderData = payload.message;
      state.isSuccessLiveTenderData = payload.success;
      state.liveTenderData = payload.data;

    },
    [getLiveTenderData.pending]: (state) => {
      state.isFetchingLiveTenderData = true;
    },
    [getLiveTenderData.rejected]: (state, { payload }) => {
      state.isFetchingLiveTenderData = false;
      state.errorMessageLiveTenderData = payload.message;
      state.isErrorLiveTenderData = payload.error;
    },
    //Pending Tender Data Extra Reducer
    [getPendingTenderData.fulfilled]: (state, { payload }) => {
      state.isFetchingPendingTenderData = false;
      state.isErrorPendingTenderData = payload.error;
      state.errorMessagePendingTenderData = payload.message;
      state.isSuccessPendingTenderData = payload.success;
      state.pendingTenderData = payload.data;

    },
    [getPendingTenderData.pending]: (state) => {
      state.isFetchingPendingTenderData = true;
    },
    [getPendingTenderData.rejected]: (state, { payload }) => {
      state.isFetchingPendingTenderData = false;
      state.errorMessagePendingTenderData = payload.message;
      state.isErrorPendingTenderData = payload.error;
    },
  //Final Submitted Tender Data Extra Reducer
  [getFinalSubmitTenderData.fulfilled]: (state, { payload }) => {
    state.isFetchingFinalSubmitTenderData = false;
    state.isErrorFinalSubmitTenderData = payload.error;
    state.errorMessageFinalSubmitTenderData = payload.message;
    state.isSuccessFinalSubmitTenderData = payload.success;
    state.finalSubmitTenderData = payload.data;

  },
  [getFinalSubmitTenderData.FinalSubmit]: (state) => {
    state.isFetchingFinalSubmitTenderData = true;
  },
  [getFinalSubmitTenderData.rejected]: (state, { payload }) => {
    state.isFetchingFinalSubmitTenderData = false;
    state.errorMessageFinalSubmitTenderData = payload.message;
    state.isErrorFinalSubmitTenderData = payload.error;
  },


    //live Auction Data Extra Reducer
    [getLiveAuctionData.fulfilled]: (state, { payload }) => {
      state.isFetchingLiveAuctionData = false;
      state.isErrorLiveAuctionData = payload.error;
      state.errorMessageLiveAuctionData = payload.message;
      state.isSuccessLiveAuctionData = payload.success;
      state.liveAuctionData = payload.data;
    },
    [getLiveAuctionData.pending]: (state) => {
      state.isFetchingLiveAuctionData = true;
    },
    [getLiveAuctionData.rejected]: (state, { payload }) => {
      state.isFetchingLiveAuctionData = false;
      state.errorMessageLiveAuctionData = payload.message;
      state.isErrorLiveAuctionData = payload.error;
    },

    [getAuctionData.fulfilled]: (state, { payload }) => {
      state.isFetchingProject = false;
      state.isErrorProject = payload.error;
      state.errorMessageProject = payload.message;
      state.isSuccessProject = payload.success;
      state.projectData = payload.data;
    },
    [getAuctionData.pending]: (state) => {
      state.isFetchingProject = true;
    },
    [getAuctionData.rejected]: (state, { payload }) => {
      state.isFetchingProject = false;
      state.errorMessageProject = payload.message;
      state.isErrorProject = payload.error;
    },
    [getAppliedProjectData.fulfilled]: (state, { payload }) => {
      state.isFetchingMyProject = false;
      state.isErrorMyProject = payload.error;
      state.errorMessageMyProject = payload.message;
      state.isSuccessMyProject = payload.success;
      state.myprojectData = payload.data;
    },
    [getAppliedProjectData.pending]: (state) => {
      state.isFetchingMyProject = true;
    },
    [getAppliedProjectData.rejected]: (state, { payload }) => {
      state.isFetchingMyProject = false;
      state.errorMessageMyProject = payload.message;
      state.isErrorMyProject = payload.error;
    },
    // get Winner Data
    [getWinnerData.fulfilled]: (state, { payload }) => {
      state.isFetchingWinnerData = false;
      state.isErrorWinnerData = payload.error;
      state.errorMessageWinnerData = payload.message;
      state.isSuccessWinnerData = payload.success;
      state.winnerData = payload.data;
    },
    [getWinnerData.pending]: (state) => {
      state.isFetchingWinnerData = true;
    },
    [getWinnerData.rejected]: (state, { payload }) => {
      state.isFetchingWinnerData = false;
      state.errorMessageWinnerData = payload.message;
      state.isErrorWinnerData = payload.error;
    },

     // get Top Bids Data
     [getTopBids.fulfilled]: (state, { payload }) => {
      state.isFetchingTopBidsData = false;
      state.isErrorTopBidsData = payload.error;
      state.errorMessageTopBidsData = payload.message;
      state.isSuccessTopBidsData = payload.success;
      state.topBidsData = payload.data;
    },
    [getTopBids.pending]: (state) => {
      state.isFetchingTopBidsData = true;
    },
    [getTopBids.rejected]: (state, { payload }) => {
      state.isFetchingTopBidsData = false;
      state.errorMessageTopBidsData = payload.message;
      state.isErrorTopBidsData = payload.error;
    },


    [eAuctionGenericOtp.fulfilled]: (state, { payload }) => {
      state.isFetchingSendOtpEauction = false;
      state.isErrorSendOtpEauction = payload.error;
      state.errorMessageSendOtpEauction = payload.message;
      state.isSuccessSendOtpEauction = payload.success;
      state.sendOtpDataEauction = payload.data;
    },
    [eAuctionGenericOtp.pending]: (state) => {
      state.isFetchingSendOtpEauction = true;
    },
    [eAuctionVerifyOtp.rejected]: (state, { payload }) => {
      state.isFetchingVerifyOtpEauction = false;
      state.errorMessageVerifyOtpEauction = payload.message;
      state.verifyOtpErrorDataEauction = payload.data;
      state.isErrorVerifyOtpEauction = payload.error;
      state.errorMessageVerifyOtpEauction = payload.message;
    },
    [eAuctionVerifyOtp.fulfilled]: (state, { payload }) => {
      state.isFetchingVerifyOtpEauction = false;
      state.isErrorVerifyOtpEauction = payload.error;
      state.errorMessageVerifyOtpEauction = payload.message;
      state.isSuccessVerifyOtpEauction = payload.success;
      state.verifyOtpDataEauction = payload.data;
    },
    [eAuctionVerifyOtp.pending]: (state) => {
      state.isFetchingVerifyOtpEauction = true;
    },
    [eAuctionVerifyOtp.rejected]: (state, { payload }) => {
      state.isFetchingVerifyOtpEauction = false;
      state.errorMessageVerifyOtpEauction = payload.message;
      state.verifyOtpErrorDataEauction = payload.data;
      state.isErrorVerifyOtpEauction = payload.error;
      state.errorMessageVerifyOtpEauction = payload.message;
    },
  },
});

export const { clearEauctionProjectData, clearEauctionTopBidsData, clearFinalSubmitTenderData, clearLiveTenderData ,clearLiveAuctionData, clearPendingTenderData, clearEauctionWinnerData, clearEauctionGenericOtpState, clearEauctionVerifyOtpState, clearEauctionMyProjectData, clearEauctionSingleProjectData } = eauctionSlice.actions;

export const EauctionSelector = (state) => state.eauction;