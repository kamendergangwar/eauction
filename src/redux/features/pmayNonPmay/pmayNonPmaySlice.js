import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";
//const ApiEndPointMyAppOverview = ApiEndPoint + "/Applicant/PmayNonPmay/";
const ApiEndPointMyApplicantOverview = ApiEndPoint + "/Applicant/OtherDetails/";
const SorryFormEndPoint = "https://infouat.cidcohomes.com/wp-json/wp/v2/save-lead-data";


// export const getPmay = createAsyncThunk(
//   "PmayNonPmay/getMyProfile",
//   async (params, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         ApiEndPointMyAppOverview + localStorage.getItem("applicantId") + "?Lang=" + localStorage.getItem("i18nextLng") + params
//       );
//       let responseData = await response.data;
//       if (response.status === 200) {
//         return responseData;
//       } else {
//         return thunkAPI.rejectWithValue(responseData);
//       }
//     } catch (e) {
//       thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );
export const getBidderType = createAsyncThunk(
  "bidder/getbiddertype",
  async ({ RegisterType, Type, GstNo }, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPointMyApplicantOverview + localStorage.getItem("applicantId"), {
        RegisterType,
        GstNo,
        Type,
        Lang: localStorage.getItem("i18nextLng"),
      });
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

/// Save Gst Value For Non Individual

export const saveGstValue = createAsyncThunk(
  "bidder/savegstvalue",
  async ({ Type, GstNo }, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPointMyApplicantOverview + localStorage.getItem("applicantId"), {

        GstNo,
        Type,
        Lang: localStorage.getItem("i18nextLng"),
      });
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

export const RegisterBidderType = createAsyncThunk(
  "bidder/Registerbiddertype",
  async (values, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPointMyApplicantOverview + localStorage.getItem("applicantId"), values);
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


export const saveLeadForm = createAsyncThunk(
  "preferences/saveLeadForm",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        SorryFormEndPoint,
        params
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

export const pmaySlice = createSlice({
  name: "PmayNonPmay",
  initialState: {

    //save gst state
    isSuccessSaveGst: false,
    isFetchingSaveGst: false,
    saveGstMessage: "",
    isErrorSaveGst: "",
    


    isSuccessPmay: false,
    isFetchingPmay: false,
    isErrorPmay: false,
    errorMsgPmay: "",
    applicationPmay: "",
    currentPmay: [],
    isSuccessLeadForm: "",
    isFetchingLeadForm: false,
    isErrorLeadForm: false,
    errorMsgLeadForm: "",
    isSuccessBidder: false,
    isErrorBidder: false,
    errorMsgBidder: "",
    isFetchingBidder: false,
    applicationBidder: "",
    currentBidder: [],
  },
  reducers: {
    clearProfileState: (state) => {
      state.isSuccessPmay = false;
      state.isFetchingPmay = false;
      state.isErrorPmay = false;
      state.errorMsgPmay = false;
      state.errorMsgPmay = "";
      state.isSuccessPmay = false;
      state.errorMsgPmay = "";
      state.applicationPmay = "";
      state.currentPmay = [];
    },
    clearBidderState: (state) => {
      state.isSuccessBidder = false;
      state.isFetchingBidder = false;
      state.isErrorBidder = false;
      state.errorMsgBidder = false;
      state.errorMsgBidder = '';
      state.applicationBidder = '';
      state.currentBidder = [];
    },
    clearProfileData: (state) => {
      state.applicationBidder = '';
      state.applicationPmay = "";
      state.isSuccessLeadForm = "";
    },
    clearGstData: (state) => {
      state.isSuccessSaveGst = false;
      state.isFetchingSaveGst = false;
      state.saveGstMessage = "";
      state.isErrorSaveGst = "";
    }
  },
  extraReducers: {
    [getBidderType.fulfilled]: (state, { payload }) => {
      state.applicationPmay = payload.message;
      state.isFetchingPmay = false;
      state.isSuccessPmay = payload.success;
    },
    [getBidderType.pending]: (state) => {
      state.isFetchingPmay = true;
    },
    [getBidderType.rejected]: (state, { payload }) => {
      state.isFetchingPmay = false;
      state.isErrorPmay = payload.error;
      state.errorMsgPmay = payload.message;
      state.applicationPmay = "";
      state.currentPmay = [];
    },

    //gst save reducers

    [saveGstValue.fulfilled]: (state, { payload }) => {
      state.saveGstMessage = payload.message;
      state.isFetchingSaveGst = false;
      state.isSuccessSaveGst = payload.success;
    },
    [saveGstValue.pending]: (state) => {
      state.isFetchingSaveGst = true;
    },
    [saveGstValue.rejected]: (state, { payload }) => {
      state.isFetchingSaveGst = false;
      state.isErrorSaveGst = payload.error;
      state.errorMsgSaveGst = payload.message;
      state.applicationPmay = "";
      state.currentPmay = [];
    },
    [RegisterBidderType.fulfilled]: (state, { payload }) => {
      state.applicationBidder = payload.message;
      state.isFetchingBidder = false;
      state.isSuccessBidder = payload.success;
    },
    [RegisterBidderType.pending]: (state) => {
      state.isFetchingBidder = true;
    },
    [RegisterBidderType.rejected]: (state, { payload }) => {
      state.isFetchingBidder = false;
      state.isErrorBidder = payload.error;
      state.errorMsgBidder = payload.message;
      state.applicationBidder = "";
      state.currentBidder = [];
    },
    [saveLeadForm.fulfilled]: (state, { payload }) => {
      state.isFetchingLeadForm = false;
      state.isSuccessLeadForm = payload.status;
    },
    [saveLeadForm.pending]: (state) => {
      state.isFetchingLeadForm = true;
    },
    [saveLeadForm.rejected]: (state, { payload }) => {
      state.isFetchingLeadForm = false;
      state.isErrorLeadForm = payload.error;
      state.errorMsgLeadForm = payload.message;
    },
  },
});

export const { clearProfileState, clearProfileData, clearBidderState, clearGstData } =
  pmaySlice.actions;

export const PmayNonPmaySelector = (state) => state.PmayNonPmay;
