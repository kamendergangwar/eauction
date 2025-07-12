import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";
// import { apiEndPoint } from "../applicant/ApplicantAuthSlice";

const ApiEndPointPaperlessAadhaar = ApiEndPoint + "/AadhaarPaperlessCaptcha";

export const getAadhaarCaptcha = createAsyncThunk(
  "aadhaar/getCaptcha",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointPaperlessAadhaar + "/captcha"
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

export const sendOTP = createAsyncThunk(
  "aadhaar/sendOTP",
  async (
    { docNumber, secretToken, tsTransID, captchaCode, IsCoApplicant },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(ApiEndPointPaperlessAadhaar + "/otp", {
        Lang: localStorage.getItem("i18nextLng"),
        applicantId: localStorage.getItem("applicantId"),
        transID: "123456",
        docType: 347,
        docNumber,
        secretToken,
        tsTransID,
        captchaCode,
        actionType: "otp",
        consent: 1,
        IsCoApplicant,
      });
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

//Sent OTP aadhaar MAHA IT
export const sendOTPMahaIT = createAsyncThunk(
  "aadhaar/sendOTPMahaIT",
  async ({ docNumber, IsCoApplicant, addCoApplicant }, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + "/MahaITeKYC/getotp", {
        Lang: localStorage.getItem("i18nextLng"),
        applicantId: localStorage.getItem("applicantId"),
        docNumber,
        IsCoApplicant,
        addCoApplicant
      });
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

//Verify OTP aadhaar MAHA IT
export const aadhaarVerifyOtpMahaIT = createAsyncThunk(
  "aadhaar/aadhaarVerifyOtpMahaIT",
  async ({ tsTransID, mobileCode, docNumber, IsCoApplicant }, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/MahaITeKYC/verifyotp",
        {
          tsTransID,
          mobileCode,
          ApplicantId: localStorage.getItem("applicantId"),
          docNumber,
          IsCoApplicant,
          Lang: localStorage.getItem("i18nextLng"),
        }
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

//verify mahait verify otp for other request 
export const aadhaarTempVerifyMahaIT = createAsyncThunk(
  "aadhaar/tempVerifyOtpMahaIT",
  async ({ tsTransID, mobileCode, docNumber, IsCoApplicant, addCoApplicant, MarritalStatus }, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/MahaITeKYC/verifyAdharotp",
        {
          tsTransID,
          mobileCode,
          ApplicantId: localStorage.getItem("applicantId"),
          docNumber,
          IsCoApplicant,
          Lang: localStorage.getItem("i18nextLng"),
          addCoApplicant,
          MarritalStatus
        }
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

export const aadhaarVerifyOtp = createAsyncThunk(
  "aadhaar/aadhaarVerifyOtp",
  async ({ transID, mobileCode, AadharNo, IsCoApplicant }, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointPaperlessAadhaar + "/details",
        {
          transID,
          shareCode: "1234",
          mobileCode,
          ApplicantId: localStorage.getItem("applicantId"),
          AadharNo,
          IsCoApplicant, Lang: localStorage.getItem("i18nextLng"),
        }
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

export const tempVerifyAadhaarPost = createAsyncThunk(
  "aadhaar/tempVerifyAadhaarPost",
  async ({ adharNumber, IsCoApplicant }, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointPaperlessAadhaar + "/TempAdharCaptch",
        {
          applicant_id: localStorage.getItem("applicantId"),
          adharNumber,
          IsCoApplicant,
        }
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

export const verifyAadhaarSlice = createSlice({
  name: "verifyAadhaar",
  initialState: {
    isFetchingVerifyAadhaar: false,
    isSuccessVerifyAadhaar: false,
    isErrorVerifyAadhaar: false,
    isSuccessSent: false,
    isErrorSendOtp: false,
    aadhaarErrorMessage: "",
    captchData: {},
    sentOTPData: {},

    //Maha IT Aadhaar Send Otp
    isFetchingVerifyAadhaarMahaIT: false,
    isSuccessSentMahaIT: false,
    isErrorSendOtpMahaIT: false,
    aadhaarErrorMessageMahaIT: "",
    sentOTPDataMahaIT: {},

    //Maha IT Aadhaar Verify Otp
    isSuccessVerifyAadhaarMahaIT: false,
    isErrorVerifyAadhaarMahaIT: false,
    aadhaarDataMahaIT: {},

    //Maha -IT temp aadhaar verify
    isFetchingTempVerifyMahaIT: false,
    isSuccessTempVerifyMahaIT: false,
    isErrorTempVerifyMahaIT: false,
    tempVerifyMahaITErrorMessage: "",
    aadhaarTempVerifyDataMahaIT: {},

    isFetchingGetAdarCaptch: false,
    isSuccessGetAdarCaptch: false,
    isErrorGetAdarCaptch: false,
    aadhaarData: {},

    isFetchingTempAdrVrf: false,
    isSuccessTempAdrVrf: false,
    isErrorTempAdrVrf: false,
    errorMessageTempAdrVrf: "",
  },
  reducers: {
    clearVerifyAadhaarState: (state) => {
      state.isFetchingVerifyAadhaar = false;
      state.isSuccessVerifyAadhaar = false;
      state.isErrorVerifyAadhaar = false;
      state.isErrorSendOtp = false;
      state.isSuccessSent = false;
      state.aadhaarErrorMessage = "";
      state.isFetchingTempAdrVrf = false;
      state.isSuccessTempAdrVrf = false;
      state.isErrorTempAdrVrf = false;
      state.errorMessageTempAdrVrf = "";
      //Maha IT Aadhaar Send Otp
      state.isFetchingVerifyAadhaarMahaIT = false;
      state.isSuccessSentMahaIT = false;
      state.isErrorSendOtpMahaIT = false;
      state.aadhaarErrorMessageMahaIT = "";

      //Maha- IT adhaar Verify otp
      state.isSuccessVerifyAadhaarMahaIT = false;
      state.isErrorVerifyAadhaarMahaIT = false;

      //Maha -IT temp aadhaar verify
      state.isFetchingTempVerifyMahaIT = false;
      state.isSuccessTempVerifyMahaIT = false;
      state.isErrorTempVerifyMahaIT = false;
      state.tempVerifyMahaITErrorMessage = "";
    },
    clearVerifyAadhaarData: (state) => {
      state.captchData = {};
      state.sentOTPData = {};
      state.aadhaarData = {};
      state.aadhaarDataMahaIT = {};
      state.sentOTPDataMahaIT = {};
      state.aadhaarTempVerifyDataMahaIT = {};
    },
  },
  extraReducers: {
    [getAadhaarCaptcha.fulfilled]: (state, { payload }) => {
      state.captchData = payload.data[0];
      state.isFetchingGetAdarCaptch = false;
      state.isSuccessGetAdarCaptch = payload.success;
      state.isErrorGetAdarCaptch = false;
      state.aadhaarErrorMessage = "";
    },
    [getAadhaarCaptcha.pending]: (state) => {
      state.isFetchingGetAdarCaptch = true;
    },
    [getAadhaarCaptcha.rejected]: (state, { payload }) => {
      state.isFetchingGetAdarCaptch = false;
      state.isErrorGetAdarCaptch = payload.error;
      state.captchData = {};
      state.aadhaarErrorMessage = payload.message;
    },
    [sendOTP.fulfilled]: (state, { payload }) => {
      state.sentOTPData = payload.data[0];
      state.isFetchingVerifyAadhaar = false;
      state.isErrorVerifyAadhaar = payload.error;
      state.isErrorSendOtp = payload.error;
      state.isSuccessSent = payload.success;
      state.aadhaarErrorMessage = payload.message;
    },
    [sendOTP.pending]: (state) => {
      state.isFetchingVerifyAadhaar = true;
    },
    [sendOTP.rejected]: (state, { payload }) => {
      state.isFetchingVerifyAadhaar = false;
      state.isErrorVerifyAadhaar = payload.error;
      state.isErrorSendOtp = payload.error;
      state.sentOTPData = {};
      state.aadhaarErrorMessage = payload.message;
    },
    [aadhaarVerifyOtp.fulfilled]: (state, { payload }) => {
      state.aadhaarData = payload.data[0];
      state.isFetchingVerifyAadhaar = false;
      state.isSuccessVerifyAadhaar = true;
    },
    [aadhaarVerifyOtp.pending]: (state) => {
      state.isFetchingVerifyAadhaar = true;
    },
    [aadhaarVerifyOtp.rejected]: (state, { payload }) => {
      state.isFetchingVerifyAadhaar = false;
      state.isErrorVerifyAadhaar = payload.error;
      state.aadhaarData = {};
      state.aadhaarErrorMessage = payload.message;
    },
    [tempVerifyAadhaarPost.fulfilled]: (state, { payload }) => {
      state.aadhaarData = payload.data[0];
      state.isFetchingTempAdrVrf = false;
      state.isSuccessTempAdrVrf = payload.success;
      state.isErrorTempAdrVrf = payload.error;
      state.errorMessageTempAdrVrf = payload.message;
    },
    [tempVerifyAadhaarPost.pending]: (state) => {
      state.isFetchingTempAdrVrf = true;
    },
    [tempVerifyAadhaarPost.rejected]: (state, { payload }) => {
      state.isFetchingTempAdrVrf = false;
      state.isErrorTempAdrVrf = payload.error;
      state.isSuccessTempAdrVrf = payload.success;
      state.errorMessageTempAdrVrf = payload.message;
      state.aadhaarData = {};
    },

    //Maha- IT adhaar sent otp
    [sendOTPMahaIT.fulfilled]: (state, { payload }) => {
      state.isFetchingVerifyAadhaarMahaIT = false;
      state.isSuccessSentMahaIT = payload.success;
      state.isErrorSendOtpMahaIT = payload.error;
      state.aadhaarErrorMessageMahaIT = payload.message;
      state.sentOTPDataMahaIT = payload.data[0];
    },
    [sendOTPMahaIT.pending]: (state) => {
      state.isFetchingVerifyAadhaarMahaIT = true;
    },
    [sendOTPMahaIT.rejected]: (state, { payload }) => {
      state.isFetchingVerifyAadhaarMahaIT = false;
      state.isErrorSendOtpMahaIT = payload.error;
      state.sentOTPDataMahaIT = {};
      state.aadhaarErrorMessageMahaIT = payload.message;
    },
    //Maha- IT adhaar Verify otp
    [aadhaarVerifyOtpMahaIT.fulfilled]: (state, { payload }) => {
      state.isSuccessVerifyAadhaarMahaIT = payload.success;
      state.isErrorVerifyAadhaarMahaIT = payload.error;
      state.aadhaarErrorMessageMahaIT = payload.message;
      state.aadhaarDataMahaIT = payload.data[0];
      state.isFetchingVerifyAadhaarMahaIT = false;
    },
    [aadhaarVerifyOtpMahaIT.pending]: (state) => {
      state.isFetchingVerifyAadhaarMahaIT = true;
    },
    [aadhaarVerifyOtpMahaIT.rejected]: (state, { payload }) => {
      state.isFetchingVerifyAadhaarMahaIT = false;
      state.isErrorVerifyAadhaarMahaIT = payload.error;
      state.aadhaarDataMahaIT = {};
      state.aadhaarErrorMessageMahaIT = payload.message;
    },

    //Maha -it temp verify aadhaar
    [aadhaarTempVerifyMahaIT.fulfilled]: (state, { payload }) => {
      state.isSuccessTempVerifyMahaIT = payload.success;
      state.isErrorTempVerifyMahaIT = payload.error;
      state.tempVerifyMahaITErrorMessage = payload.message;
      state.aadhaarTempVerifyDataMahaIT = payload.data[0];
      state.isFetchingTempVerifyMahaIT = false;
    },
    [aadhaarTempVerifyMahaIT.pending]: (state) => {
      state.isFetchingTempVerifyMahaIT = true;
    },
    [aadhaarTempVerifyMahaIT.rejected]: (state, { payload }) => {
      state.isFetchingTempVerifyMahaIT = false;
      state.isErrorTempVerifyMahaIT = payload.error;
      state.aadhaarTempVerifyDataMahaIT = {};
      state.tempVerifyMahaITErrorMessage = payload.message;
    },
  },
});

export const { clearVerifyAadhaarState, clearVerifyAadhaarData } =
  verifyAadhaarSlice.actions;

export const verifyAadhaarSelector = (state) => state.verifyAadhaar;
