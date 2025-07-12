import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint, Fcfs_Flow } from "../../../utils/Common";

// export const ApiEndPoint = "http://35.200.197.80/rest-api/applicationservice";
// export const ApiEndPoint =
//   "https://rest-api.helioscart.com/rest-api/applicationservice";

export const setSigninPassword = createAsyncThunk(
  "applicant/setPassword",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/UserSignUpV2/Password",
        requestData
      );
      let responseData = await response.data;
      if (response.status === 200) {
        localStorage.setItem("applicantId", responseData.data.ApplicantId);
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "applicant/signupUser",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/UserSignUpV2",
        requestData
      );
      let responseData = await response.data;
      if (response.status === 201) {
        localStorage.setItem("applicantId", responseData.data.ApplicantId);
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "applicant/loginUser",
  async ({ MobileNo, Password }, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + "/ApplicantLogin", {
        MobileNo,
        Password,
        Lang: localStorage.getItem("i18nextLng"),
        Agentcode: localStorage.getItem("agentjwtToken") && localStorage.getItem("agentcode") ? localStorage.getItem("agentcode") : undefined,
      });
      let responseData = await response.data;
      if (response.status === 201) {
        localStorage.setItem("applicantId", responseData.data.ApplicantId);
        localStorage.setItem("jwtToken", responseData.data.jwtToken);
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginMobile = createAsyncThunk(
  "applicant/loginMobile",
  async ({ MobileNo, otp }, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + "/MobileLogin", {
        MobileNo,
        otp,
        Lang: localStorage.getItem("i18nextLng"),
        fcfs_flow : Fcfs_Flow ? "on" : "off",
        Agentcode: localStorage.getItem("agentjwtToken") && localStorage.getItem("agentcode") ? localStorage.getItem("agentcode") : undefined,
      });
      let responseData = await response.data;
      if (response.status === 201) {
        localStorage.setItem("applicantId", responseData.data.ApplicantId);
        localStorage.setItem("jwtToken", responseData.data.jwtToken);
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const sendOrResendOtp = createAsyncThunk(
  "applicant/sendOrResendOtp",
  async ({ MobileNo, Type }, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPoint + "/ResendOtp", {
        MobileNo,
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

export const verifyOtp = createAsyncThunk(
  "applicant/verifyOtp",
  async ({ MobileNo, Otp, MobileVerification }, thunkAPI) => {
    try {
      const requestBody = {
        MobileNo,
        Otp,
        MobileVerification,
        Lang: localStorage.getItem("i18nextLng"),
        fcfs_flow : Fcfs_Flow ? "on" : "off",
      };
      const response = await axios.put(ApiEndPoint + "/VerifyOtp", requestBody);
      let responseData = await response.data;
      if (response.status === 200) {
        if (MobileVerification === "1") {
          localStorage.setItem("applicantId", responseData.data.ApplicantId);
          localStorage.setItem("jwtToken", responseData.data.jwtToken);
          localStorage.removeItem("userVerifyCredentials");
          // if(responseData.data.fcfs_flow === "on"){
          //   localStorage.setItem("fcfsFlow", true);
          // }
          // else{
          //   localStorage.setItem("fcfsFlow", false)
          // }
          localStorage.setItem("fcfsFlow", Fcfs_Flow);
        } else {
          localStorage.setItem("jwtToken", responseData.data.jwtToken);
          // if(responseData.data.fcfs_flow === "on"){
          //   localStorage.setItem("fcfsFlow", true);
          // }
          // else{
          //   localStorage.setItem("fcfsFlow", false)
          // }
          // localStorage.removeItem("jwtToken");
          localStorage.setItem("fcfsFlow", Fcfs_Flow)
        }
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const verifiedOtp = createAsyncThunk(
  "applicant/verifiedOtp",
  async ({ MobileNo, Otp }, thunkAPI) => {
    try {
      const requestBody = {
        MobileNo,
        Otp,
        Lang: localStorage.getItem("i18nextLng"),
      };
      const response = await axios.put(
        ApiEndPoint + "/VerifiedOtp",
        requestBody
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

export const resetPassword = createAsyncThunk(
  "applicant/resetPassword",
  async (Password, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPoint + "/ResetPassword", {
        MobileNo: localStorage.getItem("mobileNumber"),
        Password: Password,
        Otp: localStorage.getItem("otp"),
        Lang: localStorage.getItem("i18nextLng"),
      });
      let responseData = await response.data;
      if (response.status === 200) {
        // localStorage.setItem("applicantId", responseData.data.ApplicantId);
        // localStorage.setItem("jwtToken", responseData.data.jwtToken);
        // localStorage.removeItem("mobileNumber");
        // localStorage.removeItem("otp");
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const applicantAuthSlice = createSlice({
  name: "applicantAuth",
  initialState: {
    isFetchingUserLogin: false,
    isSuccessUserLogin: false,
    isErrorUserLogin: false,
    errorMessageUserLogin: "",
    loginUserErrorData: {},
    loginUserData: {},

    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    isOtpSuccess: false,
    signupUserErrorData: {},
    mobileUserErrorData: {},
    mobileResponseData: {},
    resendOtpData: {}
  },
  reducers: {
    clearAuthState: (state) => {
      state.isFetchingUserLogin = false;
      state.isSuccessUserLogin = false;
      state.isErrorUserLogin = false;
      state.errorMessageUserLogin = "";
      state.loginUserErrorData = {};

      state.isFetching = false;
      state.isSuccess = false;
      state.isOtpSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.signupUserErrorData = {};
      state.mobileUserErrorData = {};
      state.mobileResponseData = {};
      state.resendOtpData = {};
    },
    clearLoginUserData: (state) => {
      state.loginUserData = {};
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = payload.success;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
      state.signupUserErrorData = payload.data;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetchingUserLogin = false;
      state.isSuccessUserLogin = payload.success;
      state.loginUserData = payload.data;
    },
    [loginUser.pending]: (state) => {
      state.isFetchingUserLogin = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetchingUserLogin = false;
      state.isErrorUserLogin = true;
      state.errorMessageUserLogin = payload.message;
      state.loginUserErrorData = payload.data;
    },
    [loginMobile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isOtpSuccess = payload.success;
      state.mobileResponseData = payload.data;
    },
    [loginMobile.pending]: (state) => {
      state.isFetching = true;
    },
    [loginMobile.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
      state.mobileUserErrorData = payload.data;
    },
    [sendOrResendOtp.fulfilled]: (state, { payload }) => {
      state.isError = payload.error;
      state.errorMessage = payload.message;
      state.isFetching = false;
      state.isSuccess = payload.success;
      state.resendOtpData = payload.data;
    },
    [sendOrResendOtp.pending]: (state) => {
      state.isFetching = true;
    },
    [sendOrResendOtp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [verifyOtp.fulfilled]: (state, { payload }) => {
      state.isError = payload.error;
      state.errorMessage = payload.message;
      state.isFetching = false;
      state.isOtpSuccess = payload.success;
    },
    [verifyOtp.pending]: (state) => {
      state.isFetching = true;
    },
    [verifyOtp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [verifiedOtp.fulfilled]: (state, { payload }) => {
      state.isError = payload.error;
      state.errorMessage = payload.message;
      state.isFetching = false;
      state.isOtpSuccess = payload.success;
    },
    [verifiedOtp.pending]: (state) => {
      state.isFetching = true;
    },
    [verifiedOtp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = payload.success;
    },
    [resetPassword.pending]: (state) => {
      state.isFetching = true;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [setSigninPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = payload.success;
    },
    [setSigninPassword.pending]: (state) => {
      state.isFetching = true;
    },
    [setSigninPassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearAuthState } = applicantAuthSlice.actions;

export const applicantAuthSelector = (state) => state.applicantAuth;
