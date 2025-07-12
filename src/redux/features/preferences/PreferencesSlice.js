import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";
const preferenceApiEndPoint = ApiEndPoint + "/FlatRandomization";

// export const headers = {
//   Authorization: localStorage.getItem("jwtToken"),
// };

export const getPreferencesList = createAsyncThunk(
  "preferences/getPreferences",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + '/DropDownStatus/projectPrefernce/'+localStorage.getItem("applicantId") + "?Lang=" + localStorage.getItem("i18nextLng")
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

export const addApplicantPreferences = createAsyncThunk(
  "preferences/addPreferences",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPoint}/Applicant/addPreferences/${localStorage.getItem("applicantId")}?dropDownIds=${params}`

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

export const getFlatPreference = createAsyncThunk(
  "preferences/fetchFlatPreferenceDetails",
  async (params, thunkAPI) => {
    try {      
      const response = await axios.post(
        `${preferenceApiEndPoint}/fetchFlatPreferenceDetails`, params

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

export const getFloorsDetails = createAsyncThunk(
  "preferences/fetchPreferenceDetailsFloorsDetails",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${preferenceApiEndPoint}/fetchPreferenceDetailsFloorsDetails`, params

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

export const confirmFlatBooking = createAsyncThunk(
  "preferences/confirmBookFlat",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${preferenceApiEndPoint}/confirmBookFlat`, params

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


export const getBookingEndTime = createAsyncThunk(
  "preferences/tempBookingTimer",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${preferenceApiEndPoint}/tempBookingTimer`, params

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

export const cancelBooking = createAsyncThunk(
  "preferences/cancelBookFlat",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${preferenceApiEndPoint}/cancelBookFlat`, params

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


export const getFloorList = createAsyncThunk(
  "preferences/fetchPreferenceDetailsFloorsList",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${preferenceApiEndPoint}/fetchPreferenceDetailsFloorsList`, params

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

export const sendConfirmFlatOtp =createAsyncThunk(
  "prefernces/GenericOtp",
  async (_, thunkAPI) => {
    try {
      const requestData = {
        MobileNo: localStorage.getItem("mobileNo"),
        Type:"temp_flat_booking",
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
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
)

export const resetPreferencesState = createAsyncThunk(
  "",
  async (requestData, thunkAPI) => {
	  return true;
  }
);

export const sendConfirmFlatCancellationOtp =createAsyncThunk(
  "prefernces/GenericCancelOtp",
  async (_, thunkAPI) => {
    try {
      const requestData = {
        MobileNo: localStorage.getItem("mobileNo"),
        Type:"temp_booking_cancel",
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
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const cancelBookingwithOtp = createAsyncThunk(
  "preferences/cancelBookFlatwithOtp",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${preferenceApiEndPoint}/cancelBookFlatOtp`, params

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

export const sendConfirmCatChangeOtp =createAsyncThunk(
  "prefernces/GenericCatChangeOtp",
  async (_, thunkAPI) => {
    try {
      const requestData = {
        MobileNo: localStorage.getItem("mobileNo"),
        Type:"user_change_category",
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
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const changeCatResetDoc = createAsyncThunk(
  "prefernces/changeCatResetDoc",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPoint}/Cancelbooking/changeCatResetDoc`, params
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

export const PreferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    isFetchingGetPreferences: false,
    isSuccessResGetPreferences: false,
    isErrorGetPreferences: false,
    errorMsgGetPreferences: "",
    PreferencesData: {},

    isFetchingAddPreferences: false,
    isSuccessResAddPreferences: false,
    isErrorAddPreferences: false,
    errorMsgAddPreferences: "",
    preferencesDetails: [],
    
    isFetchingAddFloor: false,
    isSuccessResAddFloor: false,
    isErrorAddFloor: false,
    errorMsgAddFloor: "",
    floorDetails: [],
    
    isFetchingConfirmFlat: false,
    isSuccessResConfirmFlat: false,
    isErrorConfirmFlat: false,
    errorMsgConfirmFlat: "",
    
    
    isFetchingCancelFlat: false,
    isSuccessResCancelFlat: false,
    isErrorCancelFlat: false,
    errorMsgCancelFlat: "",
    
    isFetchingFloorList: false,
    isSuccessResFloorList: false,
    isErrorFloorList: false,
    errorMsgFloorList: "",
    floorListData: [],
    
    isFetchingBookingEndTime: false,
    isSuccessBookingEndTime: false,
    isErrorBookingEndTime: false,
    errorMsgBookingEndTime: "",
    bookingEndTime: [],

    isFetchingSendOtp : false,
    isSuccessSendOtp : false,
    isErrorSendOtp:  false,
    sendOtpData: [],
    errorMessageSendOtp: "",

    isFetchingSendCancellationOtp   : false,
    isErrorSendCancellationOtp      : false,
    errorMessageSendCancellationOtp : "",
    isSuccessSendCancellationOtp    : false,
    sendCancellationOtpData         : [],

    isFetchingCancelFlatwithotp : false,
    isSuccessResCancelFlatwithotp : false,
    isErrorCancelFlatwithotp : false,
    errorMsgCancelFlatwithotp : "",

    isFetchingSendCatChangeOtp : false,
    isErrorSendCatChangeOtp : false,
    errorMessageSendCatChangeOtp : "",
    isSuccessSendCatChangeOtp : false,
    sendCatChangeOtpData : [],
    sendCatChangeOtpErrorData : [],

    isFetchingChangeCatResetDoc : false,
    isSuccessChangeCatResetDoc  : false,
    isErrorChangeCatResetDoc    : false,
    errorMsgChangeCatResetDoc   : [],
  },
  reducers: {
    clearPreferencesState: (state) => {
      state.isFetchingGetPreferences = false;
      state.isSuccessResGetPreferences = false;
      state.isErrorGetPreferences = false;
      state.errorMsgGetPreferences = "";

      
      // state.isFetchingAddFloor = false;
      // state.isSuccessResAddFloor = false;
      // state.isErrorAddFloor = false;
      // state.errorMsgAddFloor = "";
      // state.floorDetails = [];
      
    },
    clearPreferencesData: (state) => {
      state.PreferencesData = {};
    },
    
    clearBookingState: (state) => {
      state.isFetchingConfirmFlat = false;
      state.isSuccessResConfirmFlat = false;
      state.isErrorConfirmFlat = false;
      state.errorMsgConfirmFlat = "";
      
      state.isFetchingAddPreferences = false;
      state.isSuccessResAddPreferences = false;
      state.isErrorAddPreferences = false;
      state.errorMsgAddPreferences = "";
      state.preferencesDetails = [];
      
      state.isFetchingAddFloor = false;
      state.isSuccessResAddFloor = false;
      state.isErrorAddFloor = false;
      state.errorMsgAddFloor = "";
      state.floorDetails = [];
      
      state.isFetchingCancelFlat = false;
      state.isSuccessResCancelFlat = false;
      state.isErrorCancelFlat = false;
      state.errorMsgCancelFlat ="";

      state.isFetchingSendOtp = false;
      state.isSuccessSendOtp = false;
      state.isErrorSendOtp =  false;
      state.errorMessageSendOtp= "";
    },
    clearBookingOtpState : (state) =>{
      state.isFetchingSendOtp = false;
      state.isSuccessSendOtp = false;
      state.isErrorSendOtp =  false;
      state.errorMessageSendOtp= "";
      state.isErrorConfirmFlat = false;
    },
    clearBookingCancellationOtpState : (state) =>{
      state.isFetchingSendCancellationOtp   = false;
      state.isErrorSendCancellationOtp      = false;
      state.errorMessageSendCancellationOtp = "";
      state.isSuccessSendCancellationOtp    = false;
      state.sendCancellationOtpData         = [];
    },
    clearCancelBookingwithOtpState : (state) =>{
      state.isFetchingCancelFlatwithotp     = false;
      state.isErrorCancelFlatwithotp        = false;
      state.errorMsgCancelFlatwithotp       = "";
      state.isSuccessResCancelFlatwithotp   = false;
    },
    clearCatChangeSendOtpState : (state) => {
      state.isFetchingSendCatChangeOtp   = false;
      state.isErrorSendCatChangeOtp      = false;
      state.errorMessageSendCatChangeOtp = "";
      state.isSuccessSendCatChangeOtp    = false;
      state.sendCatChangeOtpData         = [];
      state.sendCatChangeOtpErrorData    = [];
    },
    clearChangeCatResetDoc : (state) =>{
      state.isFetchingChangeCatResetDoc = false;
      state.isSuccessChangeCatResetDoc  = false;
      state.isErrorChangeCatResetDoc    = false;
      state.errorMsgChangeCatResetDoc   = "";
    }    
  },
  extraReducers: {
    [getPreferencesList.fulfilled]: (state, { payload }) => {
      state.isFetchingGetPreferences = false;
      state.PreferencesData = payload.data;
      state.isSuccessResGetPreferences = payload.success;
      state.isErrorGetPreferences = payload.error;
      state.errorMsgGetPreferences = payload.message;
    },
    [getPreferencesList.pending]: (state) => {
      state.isFetchingGetPreferences = true;
      state.PreferencesData = {};
      state.isSuccessResGetPreferences = false;
    },
    [getPreferencesList.rejected]: (state, { payload }) => {
      state.isFetchingGetPreferences = false;
      state.isErrorGetPreferences = payload.error;
      state.errorMsgGetPreferences = payload.message;
    },

    [addApplicantPreferences.fulfilled]: (state, { payload }) => {
        state.isFetchingAddPreferences = false;
        state.isSuccessResAddPreferences = payload.success;
        state.isErrorAddPreferences = payload.error;
        state.errorMsgAddPreferences = payload.message;
      },
    [addApplicantPreferences.pending]: (state) => {
        state.isFetchingAddPreferences = true;
        state.isSuccessResAddPreferences = false;
      },
    [addApplicantPreferences.rejected]: (state, { payload }) => {
        state.isFetchingAddPreferences = false;
        state.isErrorAddPreferences = payload.error;
        state.errorMsgAddPreferences = payload.message;
    },
    
    [getFlatPreference.fulfilled]: (state, { payload }) => {
      state.isFetchingAddPreferences = false;
      state.isSuccessResAddPreferences = payload.success;
      state.isErrorAddPreferences = payload.error;
      state.errorMsgAddPreferences = payload.message;
      state.preferencesDetails = payload.data;
    },
    [getFlatPreference.pending]: (state) => {
      state.isFetchingAddPreferences = true;
      state.isSuccessResAddPreferences = false;
    },
    [getFlatPreference.rejected]: (state, { payload }) => {
      state.isFetchingAddPreferences = false;
      state.isErrorAddPreferences = payload.error;
      state.errorMsgAddPreferences = payload.message;
    },
    
    [getFloorsDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingAddFloor = false;
      state.isSuccessResAddFloor = payload.success;
      state.isErrorAddFloor = payload.error;
      state.errorMsgAddFloor = payload.message;
      state.floorDetails = payload.data;
    },
    [getFloorsDetails.pending]: (state) => {
      state.isFetchingAddFloor = true;
      state.isSuccessResAddFloor = false;
    },
    [getFloorsDetails.rejected]: (state, { payload }) => {
      state.isFetchingAddFloor = false;
      state.isErrorAddFloor = payload.error;
      state.errorMsgAddFloor = payload.message;
    },    
    [confirmFlatBooking.fulfilled]: (state, { payload }) => {
      state.isFetchingConfirmFlat = false;
      state.isSuccessResConfirmFlat = payload.success;
      state.isErrorConfirmFlat = payload.error;
      state.errorMsgConfirmFlat = payload.message;
      // state.floorDetails = payload.data;
    },
    [confirmFlatBooking.pending]: (state) => {
      state.isFetchingConfirmFlat = true;
      state.isSuccessResConfirmFlat = false;
    },
    [confirmFlatBooking.rejected]: (state, { payload }) => {
      state.isFetchingConfirmFlat = false;
      state.isErrorConfirmFlat = payload.error;
      state.errorMsgConfirmFlat = payload.message;
    },
    
    [cancelBooking.fulfilled]: (state, { payload }) => {
      state.isFetchingCancelFlat = false;
      state.isSuccessResCancelFlat = payload.success;
      state.isErrorCancelFlat = payload.error;
      state.errorMsgCancelFlat = payload.message;
    },
    [cancelBooking.pending]: (state) => {
      state.isFetchingCancelFlat = true;
      state.isSuccessResCancelFlat = false;
    },
    [cancelBooking.rejected]: (state, { payload }) => {
      state.isFetchingCancelFlat = false;
      state.isErrorCancelFlat = payload.error;
      state.errorMsgCancelFlat = payload.message;
    },
    
    [getFloorList.fulfilled]: (state, { payload }) => {
      state.isFetchingFloorList = false;
      state.isSuccessResFloorList = payload.success;
      state.floorListData = payload.data;
      state.isErrorFloorList = payload.error;
      state.errorMsgFloorList = payload.message;
    },
    [getFloorList.pending]: (state) => {
      state.isFetchingFloorList = true;
      state.isSuccessResFloorList = false;
    },
    [getFloorList.rejected]: (state, { payload }) => {
      state.isFetchingFloorList = false;
      state.isErrorFloorList = payload.error;
      state.errorMsgFloorList = payload.message;
    },
    [resetPreferencesState.fulfilled]: (state, { payload }) => {
      state.isSuccessResConfirmFlat = false;
    },
    [getBookingEndTime.fulfilled]: (state, { payload }) => {
      state.isFetchingBookingEndTime = false;
      state.isSuccessBookingEndTime = payload.success;
      state.bookingEndTime = payload.data;
      state.isErrorBookingEndTime = payload.error;
      state.errorMsgBookingEndTime = payload.message;
    },
    [getBookingEndTime.pending]: (state) => {
      state.isFetchingBookingEndTime = true;
      state.isSuccessBookingEndTime = false;
    },
    [getBookingEndTime.rejected]: (state, { payload }) => {
      state.isFetchingBookingEndTime = false;
      state.isErrorBookingEndTime = payload.error;
      state.errorMsgBookingEndTime = payload.message;
    },
    [sendConfirmFlatOtp.fulfilled]: (state, { payload }) => {
      state.isFetchingSendOtp = false;
      state.isErrorSendOtp = payload.error;
      state.errorMessageSendOtp = payload.message;
      state.isSuccessSendOtp = payload.success;
      state.sendOtpData = payload.data;
    },
    [sendConfirmFlatOtp.pending]: (state) => {
      state.isFetchingSendOtp = true;
    },
    [sendConfirmFlatOtp.rejected]: (state, { payload }) => {
      state.isFetchingSendOtp = false;
      state.errorMessageSendOtp = payload.message;
      state.sendOtpErrorData = payload.data;
      state.isErrorSendOtp = payload.error;
      state.errorMessageSendOtp = payload.message;
    },
    [sendConfirmFlatCancellationOtp.fulfilled]: (state, { payload }) => {
      state.isFetchingSendCancellationOtp = false;
      state.isErrorSendCancellationOtp = payload.error;
      state.errorMessageSendCancellationOtp = payload.message;
      state.isSuccessSendCancellationOtp = payload.success;
      state.sendCancellationOtpData = payload.data;
    },
    [sendConfirmFlatCancellationOtp.pending]: (state) => {
      state.isFetchingSendCancellationOtp = true;
    },
    [sendConfirmFlatCancellationOtp.rejected]: (state, { payload }) => {
      state.isFetchingSendCancellationOtp = false;
      state.errorMessageSendCancellationOtp = payload.message;
      state.sendCancellationOtpErrorData = payload.data;
      state.isErrorSendCancellationOtp = payload.error;
      state.errorMessageSendCancellationOtp = payload.message;
    },    
    [cancelBookingwithOtp.fulfilled]: (state, { payload }) => {
      state.isFetchingCancelFlatwithotp = false;
      state.isSuccessResCancelFlatwithotp = payload.success;
      state.isErrorCancelFlatwithotp = payload.error;
      state.errorMsgCancelFlatwithotp = payload.message;
    },
    [cancelBookingwithOtp.pending]: (state) => {
      state.isFetchingCancelFlatwithotp = true;
      state.isSuccessResCancelFlatwithotp = false;
    },
    [cancelBookingwithOtp.rejected]: (state, { payload }) => {
      state.isFetchingCancelFlatwithotp = false;
      state.isErrorCancelFlatwithotp = payload.error;
      state.errorMsgCancelFlatwithotp = payload.message;
    },
    [sendConfirmCatChangeOtp.fulfilled]: (state, { payload }) => {
      state.isFetchingSendCatChangeOtp = false;
      state.isErrorSendCatChangeOtp = payload.error;
      state.errorMessageSendCatChangeOtp = payload.message;
      state.isSuccessSendCatChangeOtp = payload.success;
      state.sendCatChangeOtpData = payload.data;
    },
    [sendConfirmCatChangeOtp.pending]: (state) => {
      state.isFetchingSendCatChangeOtp = true;
    },
    [sendConfirmCatChangeOtp.rejected]: (state, { payload }) => {
      state.isFetchingSendCatChangeOtp = false;
      state.errorMessageSendCatChangeOtp = payload.message;
      state.sendCatChangeOtpErrorData = payload.data;
      state.isErrorSendCatChangeOtp = payload.error;
    },
    [changeCatResetDoc.fulfilled]: (state, { payload }) => {
      state.isFetchingChangeCatResetDoc = false;
      state.isSuccessChangeCatResetDoc  = payload.success;
      state.isErrorChangeCatResetDoc    = payload.error;
      state.errorMsgChangeCatResetDoc   = payload.message;
    },
    [changeCatResetDoc.pending]: (state) => {
      state.isFetchingChangeCatResetDoc = true;
      state.isSuccessChangeCatResetDoc  = false;
    },
    [changeCatResetDoc.rejected]: (state, { payload }) => {
      state.isFetchingChangeCatResetDoc = false;
      state.isErrorChangeCatResetDoc    = payload.error;
      state.errorMsgChangeCatResetDoc   = payload.message;
    },    
  },
});

export const { clearPreferencesState, clearPreferencesData, clearBookingState,clearBookingOtpState, clearBookingCancellationOtpState, clearCancelBookingwithOtpState, clearCatChangeSendOtpState, clearChangeCatResetDoc } =
  PreferencesSlice.actions;

export const preferencesSelector = (state) => state.preferences;