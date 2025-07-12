import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// import { apiEndPoint } from "./ApplicantAuthSlice";

const ApiEndPointApplicant = ApiEndPoint + "/Applicant/";
const ApiEndPointPanCardDtls = ApiEndPoint + "/PanCardDetails";
const ApiEndPointFileUpload = ApiEndPoint + "/FileUpload";
const ApiEndPointTempPanCardVerify = ApiEndPoint + "/Applicant/panVerified/";
const ApiEndPointCenterByPinCode = ApiEndPoint + "/appointment/API/Appointment";

// export const headers = {
//   Authorization: localStorage.getItem("jwtToken"),
// };

export const skipCoApplicant = createAsyncThunk(
  "applicant/skipCoApplicant",
  async (_, thunkAPI) => {
    try {
      const response = await axios.patch(
        ApiEndPointApplicant + 'skip_co_applicant/' + localStorage.getItem("applicantId")
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

export const editApplicant = createAsyncThunk(
  "applicant/editApplicant",
  async (applicantData, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPointApplicant + localStorage.getItem("applicantId"),
        applicantData
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
export const ApplicantBankDetails = createAsyncThunk(
  "applicant/ApplicantBankDetails",
  async (applicantData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointApplicant + 'bankDetails/' + localStorage.getItem("applicantId"),
        applicantData
      );
      let responseData = await response.data;
      if (response.status === 201 || response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// Get Bank Details  

export const getBankdetails = createAsyncThunk(
  "applicant/getBankDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointApplicant + 'bankDetails/' + localStorage.getItem("applicantId")
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


export const setApplicantFilter = createAsyncThunk(
  "applicant/projects?",
  async (applicantData, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/projects?"
        + "Lang=" +
        localStorage.getItem("i18nextLng") + ""
        + "&applicantId=" +
        localStorage.getItem("applicantId") +
        "&income=" +
        applicantData.AnnualFamilyIncome +
        "&castecategory=" +
        applicantData.CasteCatId +
        "&reservationCategory=" +
        applicantData.RservationCatIds
        // { headers }
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


export const applicationFilter = createAsyncThunk(
  "applicant/projects?",
  async (applicantData, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/projects?"
        + "Lang=" +
        localStorage.getItem("i18nextLng") + ""
        + "&applicantId=" +
        localStorage.getItem("applicantId") +
        "&income=" +
        applicantData.AnnualFamilyIncome +
        "&castecategory=" +
        applicantData.CasteCatId +
        "&reservationCategory=" +
        applicantData.RservationCatIds
        // { headers }
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

export const updateApplicantAddressDtls = createAsyncThunk(
  "applicant/updateApplicantAddressDtls",
  async (applicantData, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPointApplicant + localStorage.getItem("applicantId"),
        applicantData
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

export const getApplicant = createAsyncThunk(
  "applicant/getApplicant",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointApplicant +
        localStorage.getItem("applicantId") +
        "?Lang=" +
        localStorage.getItem("i18nextLng")
        // { headers }
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

export const getApplicantTermAndCondition = createAsyncThunk(
  "applicant/getApplicantTermAndCondition",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPointApplicant + "TermAndCondition/" + localStorage.getItem("applicantId"));
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

export const getDetailsFromPanCard = createAsyncThunk(
  "applicant/getDetailsFromPanCard",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPointPanCardDtls, sendParam);
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

export const tempPanCardVarification = createAsyncThunk(
  "applicant/tempPanCardVarification",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPointTempPanCardVerify + localStorage.getItem("applicantId") + "/" + sendParam);
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


export const getstaeCityByPinCode = createAsyncThunk(
  "applicant/getstaeCityByPinCode",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPoint + "/PincodeDetails/" + sendParam);
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

export const getState = createAsyncThunk(
  "applicant/getState",
  async (thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPoint + "/PincodeDetails/getState");
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

export const getDistrict = createAsyncThunk(
  "applicant/getDistrict",
  async (thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPoint + "/PincodeDetails/getDistrict");
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

export const updateApplicantProfilePhoto = createAsyncThunk(
  "agent/updateApplicantProfilePhoto",
  async (updateData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointFileUpload + "/updateApplicantProfile", updateData
      );
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
);


export const getOfficeCenters = createAsyncThunk(
  "applicant/getOfficeCenters",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPointCenterByPinCode + "/appointmentDistricts", sendParam);
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


export const bookAppointment = createAsyncThunk(
  "applicant/bookAppointment",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPointCenterByPinCode + "/saveAppointment", sendParam);
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


export const getSlots = createAsyncThunk(
  "applicant/getSlots",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPointCenterByPinCode + "/getAppointmentSlot", sendParam);
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


export const searchByPinCode = createAsyncThunk(
  "applicant/searchByPinCode",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPointCenterByPinCode + "/searchServices?data=" + sendParam);
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

export const getAppointmentData = createAsyncThunk(
  "applicant/getAppointmentData",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPointCenterByPinCode + "/applicantBookedAppointments/" + localStorage.getItem("applicantId"));
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

export const cancelAppointment = createAsyncThunk(
  "applicant/cancelAppointment",
  async (sendParam, thunkAPI) => {
    try {
      const response = await axios.get(ApiEndPointCenterByPinCode + "/cancelAppointment/" + sendParam);
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




export const getSlotTimer = createAsyncThunk(
  "Appointment/tempBookingData",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPointCenterByPinCode}/tempBookingData`, params

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

export const editApplicantEmail = createAsyncThunk(
  "applicant/editApplicantEmail",
  async (params, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPoint + "/applicant/updateEmail/" + localStorage.getItem("applicantId"),
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

// Email Validation OTP
export const sendEmailVerificationOTP = createAsyncThunk(
  "applicant/sendEmailVerificationOTP",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/applicant/sendEmailVerificationOTP",
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

// Email Validation OTP Verification
export const verifyEmailVerificationOTP = createAsyncThunk(
  "applicant/verifyEmailVerificationOTP",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/applicant/verifyEmailVerificationOTP",
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

export const applicantSlice = createSlice({
  name: "applicant",
  initialState: {
    isFetchingApplicant: false,
    isSuccessResApplicant: false,
    isErrorApplicant: false,
    errorMsgApplicant: "",
    applicantData: {},

    isFetchingApplicantBank: false,
    isSuccessResApplicantBank: false,
    isErrorApplicantBank: false,
    errorMsgApplicantBank: "",
    applicantDataBank: {},
    // get bank details
    isgetBankDetails: false,
    isSuccessgetBankDetails: false,
    isErrorgetBankDetails: false,
    getBankDetailsData: {},
    errorMessagegetBankDetails: "",

    //
    isFetchingApplicantGet: false,
    isSuccessResApplicantGet: false,
    isErrorApplicantGet: false,
    errorMsgApplicantGet: "",

    isFetchingApplicantAdd: false,
    isSuccessResApplicantAdd: false,
    isErrorApplicantAdd: false,
    errorMsgApplicantAdd: "",
    applicantDataAdd: {},

    isFetchingPanCard: false,
    isSuccessResPanCard: false,
    isErrorPanCard: false,
    errorMessagePanCard: "",
    panCardData: {},

    isFetchingOfflineCenter: false,
    isSuccessResOfflineCenter: false,
    isErrorOfflineCenter: false,
    errorMessageOfflineCenter: "",
    OfflineCenterData: {},

    isFetchingBookAppointment: false,
    isSuccessResBookAppointment: false,
    isErrorBookAppointment: false,
    errorMessageBookAppointment: "",
    BookAppointmentCenterData: {},

    isFetchingSlot: false,
    isSuccessResSlot: false,
    isErrorSlot: false,
    errorMessageSlot: "",
    SlotData: {},

    isFetchingAplcntTermsCndtn: false,
    isSuccessResAplcntTermsCndtn: false,
    isErrorAplcntTermsCndtn: false,
    errorMsgAplcntTermsCndtn: "",
    aplcntTermsCndtnData: {},

    isSuccessResTempVerify: false,
    isFetchingTempVerify: false,
    isErrorTempVerify: false,
    errorMsgTempVerify: "",
    tempVerifyData: {},

    isFetchingStateCity: false,
    isSuccessResStateCity: false,
    isErrorStateCity: false,
    errorMsgStateCity: "",
    StateCityData: {},

    isFetchingState: false,
    isSuccessResState: false,
    isErrorState: false,
    errorMsgState: "",
    StateData: {},

    isFetchingDistrict: false,
    isSuccessResDistrict: false,
    isErrorDistrict: false,
    errorMsgDistrict: "",
    DistrictData: {},

    isFetchingUpdateAgentProfilePhoto: false,
    updateAgentProfilePhotoData: {},
    isSuccessResUpdateAgentProfilePhoto: false,
    isErrorUpdateAgentProfilePhoto: false,
    errorMessageUpdateProfilePhoto: "",

    isFetchingSearchCode: false,
    isSuccessSearchCode: false,
    isErrorSearchCode: false,
    errorMsgSearchCode: "",
    SearchCodeData: {},

    isFetchingAppointmentData: false,
    isSuccessAppointmentData: false,
    isErrorAppointmentData: false,
    errorMsgAppointmentData: "",
    AppointmentData: {},

    isFetchingAppointmentCancel: false,
    isSuccessAppointmentCancel: false,
    isErrorAppointmentCancel: false,
    errorMsgAppointmentCancel: "",
    AppointmentCancel: {},

    isFetchingSlotBookEndTime: false,
    isSuccessSlotBookEndTime: false,
    isErrorSlotBookEndTime: false,
    errorMsgSlotBookEndTime: "",
    SlotBookEndTime: [],

    //update Email Api initial values
    isFetchingUpdateEmail: false,
    isSuccessUpdateEmail: false,
    isErrorUpdateEmail: false,
    errorMsgUpdateEmail: "",
    applicantUpdateEmail: {},

    //Send Email verification OTP
    isFetchingEmailVerificationOTP: false,
    isErrorEmailVerificationOTP: false,
    errorMsgEmailVerificationOTP: "",
    isSuccessEmailVerificationOTP: false,

    //Verify Email verification OTP
    isFetchingVerifyEmailVerificationOTP: false,
    isErrorVerifyEmailVerificationOTP: false,
    errorMsgVerifyEmailVerificationOTP: "",
    isSuccessVerifyEmailVerificationOTP: false,

    //Verify Email verification OTP
    isFetchingSkipCoApplicant: false,
    isErrorSkipCoApplicant: false,
    errorMsgSkipCoApplicant: "",
    isSuccessSkipCoApplicant: false,

  },
  reducers: {
    clearApplicantState: (state) => {
      state.isFetchingApplicant = false;
      state.isSuccessResApplicant = false;
      state.isErrorApplicant = false;
      state.errorMsgApplicant = "";

      state.isgetBankDetails = false;
      state.isSuccessgetBankDetails = false;
      state.isErrorgetBankDetails = false;
      state.getBankDetailsData = {};
      state.errorMessagegetBankDetails = "";

      state.isFetchingApplicantBank = false;
      state.isSuccessResApplicantBank = false;
      state.isErrorApplicantBank = false;
      state.errorMsgApplicantBank = "";
      state.applicantDataBank = {};

      state.isFetchingApplicantGet = false;
      state.isSuccessResApplicantGet = false;
      state.isErrorApplicantGet = false;
      state.errorMsgApplicantGet = "";

      state.isFetchingApplicantAdd = false;
      state.isSuccessResApplicantAdd = false;
      state.isErrorApplicantAdd = false;
      state.errorMsgApplicantAdd = "";

      state.isFetchingPanCard = false;
      state.isSuccessResPanCard = false;
      state.isErrorPanCard = false;
      state.errorMessagePanCard = "";

      state.isFetchingAplcntTermsCndtn = false;
      state.isSuccessResAplcntTermsCndtn = false;
      state.isErrorAplcntTermsCndtn = false;
      state.errorMsgAplcntTermsCndtn = "";

      state.isSuccessResTempVerify = false;
      state.isFetchingTempVerify = false;
      state.isErrorTempVerify = false;
      state.errorMsgTempVerify = "";

      state.isFetchingStateCity = false;
      state.isSuccessResStateCity = false;
      state.isErrorStateCity = false;
      state.errorMsgStateCity = "";
      state.StateCityData = {};

      //update email state reset
      state.isFetchingUpdateEmail = false;
      state.isSuccessUpdateEmail = false;
      state.isErrorUpdateEmail = false;
      state.errorMsgUpdateEmail = "";

      //update email state reset
      state.isFetchingUpdateEmail = false;
      state.isSuccessUpdateEmail = false;
      state.isErrorUpdateEmail = false;
      state.errorMsgUpdateEmail = "";

      //update skipCoApplicant state reset
      state.isFetchingSkipCoApplicant = false;
      state.isErrorSkipCoApplicant = false;
      state.errorMsgSkipCoApplicant = "";
      state.isSuccessSkipCoApplicant = false;
    },
    clearApplicantData: (state) => {
      state.applicantData = {};
      state.panCardData = {};
      state.applicantDataAdd = {};
      state.aplcntTermsCndtnData = {};
      state.tempVerifyData = {};

      state.isFetchingUpdateAgentProfilePhoto = false;
      state.updateAgentProfilePhotoData = {};
      state.isSuccessResUpdateAgentProfilePhoto = false;
      state.isErrorUpdateAgentProfilePhoto = false;
      state.errorMessageUpdateProfilePhoto = "";

      state.isFetchingOfflineCenter = false;
      state.isSuccessResOfflineCenter = false;
      state.isErrorOfflineCenter = false;
      state.errorMessageOfflineCenter = "";
      state.OfflineCenterData = {};

      state.isFetchingSearchCode = false;
      state.isSuccessSearchCode = false;
      state.isErrorSearchCode = false;
      state.errorMsgSearchCode = "";
      state.SearchCodeData = {};

      state.isFetchingBookAppointment = false;
      state.isSuccessResBookAppointment = false;
      state.isErrorBookAppointment = false;
      state.errorMessageBookAppointment = "";
      state.BookAppointmentCenterData = {};

      state.isFetchingAppointmentData = false;
      state.isSuccessAppointmentData = false;
      state.isErrorAppointmentData = false;
      state.errorMsgAppointmentData = "";
      state.AppointmentData = {};

      state.isFetchingSkipCoApplicant = false;
      state.isErrorSkipCoApplicant = false;
      state.errorMsgSkipCoApplicant = "";
      state.isSuccessSkipCoApplicant = false;
    },
    // reset update email state and data

    clearUpdateEmailState: (state) => {
      state.isFetchingUpdateEmail = false;
      state.isSuccessUpdateEmail = false;
      state.isErrorUpdateEmail = false;
      state.errorMsgUpdateEmail = "";
      state.applicantUpdateEmail = {};
    },


    // reset skip applicant state
    clearSkipApplicantState: (state) => {
      state.isFetchingSkipCoApplicant = false;
      state.isErrorSkipCoApplicant = false;
      state.errorMsgSkipCoApplicant = "";
      state.isSuccessSkipCoApplicant = false;
    },

    // reset email OTP state and data
    clearEmailVerificationOTPState: (state) => {
      state.isFetchingEmailVerificationOTP = false;
      state.isErrorEmailVerificationOTP = false;
      state.errorMsgEmailVerificationOTP = "";
      state.isSuccessEmailVerificationOTP = false;
    },

    // reset verify email OTP state and data
    clearVerifyEmailVerificationOTPState: (state) => {
      state.isFetchingVerifyEmailVerificationOTP = false;
      state.isErrorVerifyEmailVerificationOTP = false;
      state.errorMsgVerifyEmailVerificationOTP = "";
      state.isSuccessVerifyEmailVerificationOTP = false;
    }
  },
  extraReducers: {
    [editApplicant.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicant = false;
      state.isSuccessResApplicant = payload.success;
    },
    [editApplicant.pending]: (state) => {
      state.isFetchingApplicant = true;
      state.isErrorApplicant = false;
      state.errorMessage = "";
    },
    [editApplicant.rejected]: (state, { payload }) => {
      state.isFetchingApplicant = false;
      state.isErrorApplicant = payload.error;
      state.errorMessage = payload.message;
    },
    //applicant bank details

    [ApplicantBankDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicantBank = false;
      state.isSuccessResApplicantBank = payload.success;
    },
    [ApplicantBankDetails.pending]: (state) => {
      state.isFetchingApplicantBank = true;
      state.isErrorApplicantBank = false;
      state.errorMessage = "";
    },
    [ApplicantBankDetails.rejected]: (state, { payload }) => {
      state.isFetchingApplicantBank = false;
      state.isErrorApplicantBank = payload.error;
      state.errorMessage = payload.message;
    },
    // 

    //getbank Details

    [getBankdetails.fulfilled]: (state, { payload }) => {
      state.isgetBankDetails = false;
      state.isErrorgetBankDetails = payload.error;
      state.errorMessagegetBankDetails = payload.message;
      state.isSuccessgetBankDetails = payload.success;
      state.getBankDetailsData = payload.data;
    },
    [getBankdetails.pending]: (state) => {
      state.isgetBankDetails = true;
    },
    [getBankdetails.rejected]: (state, { payload }) => {
      state.isgetBankDetails = false;
      state.errorMessagegetBankDetails = payload.message;
      state.isErrorgetBankDetails = payload.error;
    },
    //
    [updateApplicantAddressDtls.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicantAdd = false;
      state.isSuccessResApplicantAdd = payload.success;
    },
    [updateApplicantAddressDtls.pending]: (state) => {
      state.isFetchingApplicantAdd = true;
      state.isErrorApplicantAdd = false;
      state.errorMessageAdd = "";
    },
    [updateApplicantAddressDtls.rejected]: (state, { payload }) => {
      state.isFetchingApplicantAdd = false;
      state.isErrorApplicantAdd = payload.error;
      state.errorMessageAdd = payload.message;
    },
    [getApplicant.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicantGet = false;
      state.applicantData = payload.data[0];
      state.isSuccessResApplicantGet = payload.success;
    },
    [getApplicant.pending]: (state) => {
      state.isFetchingApplicantGet = true;
    },
    [getApplicant.rejected]: (state, { payload }) => {
      state.isFetchingApplicantGet = false;
      state.isErrorApplicantGet = payload.error;
      state.errorMessageGet = payload.message;
    },
    [getDetailsFromPanCard.fulfilled]: (state, { payload }) => {
      state.isFetchingPanCard = false;
      state.panCardData = payload.data[0];
      state.isSuccessResPanCard = payload.success;
      state.errorMessagePanCard = payload.message;
      state.isErrorPanCard = payload.error;
    },
    [getDetailsFromPanCard.pending]: (state) => {
      state.isFetchingPanCard = true;
    },
    [getDetailsFromPanCard.rejected]: (state, { payload }) => {
      state.isFetchingPanCard = false;
      state.isErrorPanCard = payload.error;
      state.errorMessagePanCard = payload.message;
    },

    [getOfficeCenters.fulfilled]: (state, { payload }) => {
      state.isFetchingOfflineCenter = false;
      state.OfflineCenterData = payload.data;
      state.isSuccessResOfflineCenter = payload.success;
      state.errorMessageOfflineCenter = payload.message;
      state.isErrorOfflineCenter = payload.error;
    },
    [getOfficeCenters.pending]: (state) => {
      state.isFetchingOfflineCenter = true;
    },
    [getOfficeCenters.rejected]: (state, { payload }) => {
      state.isFetchingOfflineCenter = false;
      state.isErrorOfflineCenter = payload.error;
      state.errorMessageOfflineCenter = payload.message;
    },

    [bookAppointment.fulfilled]: (state, { payload }) => {
      state.isFetchingBookAppointment = false;
      state.BookAppointmentCenterData = payload.data;
      state.isSuccessResBookAppointment = payload.success;
      state.errorMessageBookAppointment = payload.message;
      state.isErrorBookAppointment = payload.error;
    },
    [bookAppointment.pending]: (state) => {
      state.isFetchingBookAppointment = true;
    },
    [bookAppointment.rejected]: (state, { payload }) => {
      state.isFetchingBookAppointment = false;
      state.isErrorBookAppointment = payload.error;
      state.errorMessageBookAppointment = payload.message;
    },

    [getSlots.fulfilled]: (state, { payload }) => {
      state.isFetchingSlot = false;
      state.SlotData = payload.data;
      state.isSuccessResSlot = payload.success;
      state.errorMessageSlot = payload.message;
      state.isErrorSlot = payload.error;
    },
    [getSlots.pending]: (state) => {
      state.isFetchingSlot = true;
    },
    [getSlots.rejected]: (state, { payload }) => {
      state.isFetchingSlot = false;
      state.isErrorSlot = payload.error;
      state.errorMessageSlot = payload.message;
    },

    // 

    [getApplicantTermAndCondition.fulfilled]: (state, { payload }) => {
      state.isFetchingAplcntTermsCndtn = false;
      state.aplcntTermsCndtnData = payload.data[0];
      state.isSuccessResAplcntTermsCndtn = payload.success;
    },
    [getApplicantTermAndCondition.pending]: (state) => {
      state.isFetchingAplcntTermsCndtn = true;
    },
    [getApplicantTermAndCondition.rejected]: (state, { payload }) => {
      state.isFetchingAplcntTermsCndtn = false;
      state.isErrorAplcntTermsCndtn = payload.error;
      state.errorMsgAplcntTermsCndtn = payload.message;
    },

    // 

    [tempPanCardVarification.fulfilled]: (state, { payload }) => {
      state.isFetchingTempVerify = false;
      state.tempVerifyData = payload.data[0];
      state.isSuccessResTempVerify = payload.success;
      state.isErrorTempVerify = payload.error;
      state.errorMsgTempVerify = payload.message;
    },
    [tempPanCardVarification.pending]: (state) => {
      state.isFetchingTempVerify = true;
    },
    [tempPanCardVarification.rejected]: (state, { payload }) => {
      state.isFetchingTempVerify = false;
      state.isSuccessResTempVerify = payload.success;
      state.isErrorTempVerify = payload.error;
      state.errorMsgTempVerify = payload.message;
      state.tempVerifyData = {};
    },
    [searchByPinCode.fulfilled]: (state, { payload }) => {
      state.isFetchingSearchCode = false;
      state.SearchCodeData = payload.data;
      state.isSuccessSearchCode = payload.success;
      state.isErrorSearchCode = payload.error;
      state.errorMsgSearchCode = payload.message;
    },
    [searchByPinCode.pending]: (state) => {
      state.isFetchingSearchCode = true;
    },
    [searchByPinCode.rejected]: (state, { payload }) => {
      state.isFetchingSearchCode = false;
      state.isSuccessSearchCode = payload.success;
      state.isErrorSearchCode = payload.error;
      state.errorMsgSearchCode = payload.message;
      state.SearchCodeData = {};
    },
    [getAppointmentData.fulfilled]: (state, { payload }) => {
      state.isFetchingAppointmentData = false;
      state.AppointmentData = payload.data;
      state.isSuccessAppointmentData = payload.success;
      state.isErrorAppointmentData = payload.error;
      state.errorMsgAppointmentData = payload.message;
    },
    [getAppointmentData.pending]: (state) => {
      state.isFetchingAppointmentData = true;
    },
    [getAppointmentData.rejected]: (state, { payload }) => {
      state.isFetchingAppointmentData = false;
      state.isSuccessAppointmentData = payload.success;
      state.isErrorAppointmentData = payload.error;
      state.errorMsgAppointmentData = payload.message;
      state.AppointmentData = {};
    },
    [cancelAppointment.fulfilled]: (state, { payload }) => {
      state.isFetchingAppointmentData = false;
      state.AppointmentCancel = payload.data;
      state.isSuccessAppointmentCancel = payload.success;
      state.isErrorAppointmentCancel = payload.error;
      state.errorMsgAppointmentCancel = payload.message;
    },
    [cancelAppointment.pending]: (state) => {
      state.isFetchingAppointmentCancel = true;
    },
    [cancelAppointment.rejected]: (state, { payload }) => {
      state.isFetchingAppointmentCancel = false;
      state.isSuccessAppointmentCancel = payload.success;
      state.isErrorAppointmentCancel = payload.error;
      state.errorMsgAppointmentCancel = payload.message;
      state.AppointmentCancel = {};
    },
    [getstaeCityByPinCode.fulfilled]: (state, { payload }) => {
      state.isFetchingStateCity = false;
      state.StateCityData = payload.data[0];
      state.isSuccessResStateCity = payload.success;
    },
    [getstaeCityByPinCode.pending]: (state) => {
      state.isFetchingStateCity = true;
    },
    [getstaeCityByPinCode.rejected]: (state, { payload }) => {
      state.isFetchingStateCity = false;
      state.isErrorStateCity = payload.error;
      state.errorMsgStateCity = payload.message;
      state.isSuccessResStateCity = payload.success;
    },

    [getState.fulfilled]: (state, { payload }) => {
      state.isFetchingState = false;
      state.StateData = payload.data;
      state.isSuccessResState = payload.success;
    },
    [getState.pending]: (state) => {
      state.isFetchingState = true;
    },
    [getState.rejected]: (state, { payload }) => {
      state.isFetchingState = false;
      state.isErrorState = payload.error;
      state.errorMsgState = payload.message;
      state.isSuccessResState = payload.success;
    },

    [getDistrict.fulfilled]: (state, { payload }) => {
      state.isFetchingDistrict = false;
      state.DistrictData = payload.data;
      state.isSuccessResDistrict = payload.success;
    },
    [getDistrict.pending]: (state) => {
      state.isFetchingDistrict = true;
    },
    [getDistrict.rejected]: (state, { payload }) => {
      state.isFetchingDistrict = false;
      state.isErrorDistrict = payload.error;
      state.errorMsgDistrict = payload.message;
      state.isSuccessResDistrict = payload.success;
    },

    [updateApplicantProfilePhoto.fulfilled]: (state, { payload }) => {
      state.isFetchingUpdateAgentProfilePhoto = false;
      state.updateagentProfilePhotoData = payload.data;
      state.isSuccessResUpdateAgentProfilePhoto = payload.success;

    },
    [updateApplicantProfilePhoto.pending]: (state) => {
      state.isFetchingUpdateAgentProfilePhoto = true;
    },
    [updateApplicantProfilePhoto.rejected]: (state, { payload }) => {
      state.isFetchingUpdateAgentProfilePhoto = false;
      state.isErrorUpdateAgentProfilePhoto = true;
      state.errorMessageUpdateProfilePhoto = "something went wrong";
    },

    [getSlotTimer.fulfilled]: (state, { payload }) => {
      state.isFetchingSlotBookEndTime = false;
      state.isSuccessSlotBookEndTime = payload.success;
      state.SlotBookEndTime = payload.data;
      state.isErrorSlotBookEndTime = payload.error;
      state.errorMsgSlotBookEndTime = payload.message;
    },
    [getSlotTimer.pending]: (state) => {
      state.isFetchingSlotBookEndTime = true;
      state.isSuccessSlotBookEndTime = false;
    },
    [getSlotTimer.rejected]: (state, { payload }) => {
      state.isFetchingSlotBookEndTime = false;
      state.isErrorSlotBookEndTime = payload.error;
      state.errorMsgSlotBookEndTime = payload.message;
    },
    //update email afters reducer 
    [editApplicantEmail.fulfilled]: (state, { payload }) => {
      state.isFetchingUpdateEmail = false;
      state.isSuccessUpdateEmail = payload.success;
    },
    [editApplicantEmail.pending]: (state) => {
      state.isFetchingUpdateEmail = true;
      state.isErrorUpdateEmail = false;
      state.errorMsgUpdateEmail = "";
    },
    [editApplicantEmail.rejected]: (state, { payload }) => {
      state.isFetchingUpdateEmail = false;
      state.isErrorUpdateEmail = payload.error;
      state.errorMsgUpdateEmail = payload.message;
    },
    //send email Verification OTP reducer's 
    [sendEmailVerificationOTP.fulfilled]: (state, { payload }) => {
      state.isFetchingEmailVerificationOTP = false;
      state.isSuccessEmailVerificationOTP = payload.success;
    },
    [sendEmailVerificationOTP.pending]: (state) => {
      state.isFetchingEmailVerificationOTP = true;
      state.isErrorEmailVerificationOTP = false;
      state.errorMsgEmailVerificationOTP = "";
    },
    [sendEmailVerificationOTP.rejected]: (state, { payload }) => {
      state.isFetchingEmailVerificationOTP = false;
      state.isErrorEmailVerificationOTP = payload.error;
      state.errorMsgEmailVerificationOTP = payload.message;
    },
    //verify email Verification OTP reducer's 
    [verifyEmailVerificationOTP.fulfilled]: (state, { payload }) => {
      state.isFetchingVerifyEmailVerificationOTP = false;
      state.isSuccessVerifyEmailVerificationOTP = payload.success;
      state.isErrorVerifyEmailVerificationOTP = payload.error;
      state.errorMsgVerifyEmailVerificationOTP = payload.message;
    },
    [verifyEmailVerificationOTP.pending]: (state) => {
      state.isFetchingVerifyEmailVerificationOTP = true;
      state.isErrorVerifyEmailVerificationOTP = false;
      state.errorMsgVerifyEmailVerificationOTP = "";
    },
    [verifyEmailVerificationOTP.rejected]: (state, { payload }) => {
      state.isFetchingVerifyEmailVerificationOTP = false;
      state.isErrorVerifyEmailVerificationOTP = payload.error;
      state.errorMsgVerifyEmailVerificationOTP = payload.message;
    },
    [skipCoApplicant.fulfilled]: (state, { payload }) => {
      state.isFetchingSkipCoApplicant = false;
      state.isSuccessSkipCoApplicant = payload.success;
      state.isErrorSkipCoApplicant = payload.error;
      state.errorMsgSkipCoApplicant = payload.message;
    },
    [skipCoApplicant.pending]: (state) => {
      state.isFetchingSkipCoApplicant = true;
      state.isErrorSkipCoApplicant = false;
      state.errorMsgSkipCoApplicant = "";
    },
    [skipCoApplicant.rejected]: (state, { payload }) => {
      state.isFetchingSkipCoApplicant = false;
      state.isErrorSkipCoApplicant = payload.error;
      state.errorMsgSkipCoApplicant = payload.message;
    },
  },
});

export const { clearApplicantState, clearApplicantData, clearUpdateEmailState, clearEmailVerificationOTPState, clearVerifyEmailVerificationOTPState, clearSkipApplicantState } =
  applicantSlice.actions;

export const applicantSelector = (state) => state.applicant;
