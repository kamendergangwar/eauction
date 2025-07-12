import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// export const ApiEndPoint = "http://35.200.197.80/rest-api/applicationservice";
// export const ApiEndPoint =
//   "https://rest-api.helioscart.com/rest-api/applicationservice";

/* export const signupUser = createAsyncThunk(
  "applicant/signupUser",
  async ({ MobileNo, Password }, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + "/UserSignUp", {
        MobileNo,
        Password,
        Lang: localStorage.getItem("i18nextLng"),
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
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
); */

export const agentLogin = createAsyncThunk(
  "agent/agentLogin",
  async ({ MobileNo, Password }, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + "/AgentLogin", {
        MobileNo,
        Password,
        Lang: localStorage.getItem("i18nextLng"),
      });
      let responseData = await response.data;
      if (response.status === 201) {
        localStorage.setItem("agentId", responseData.data.AgentId);
        localStorage.setItem("agentjwtToken", responseData.data.AgentjwtToken);
        localStorage.setItem("agentcode", responseData.data.Agentcode);
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

/* export const loginMobile = createAsyncThunk(
  "applicant/loginMobile",
  async ({ MobileNo, otp }, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + "/MobileLogin", {
        MobileNo,
        otp,
        Lang: localStorage.getItem("i18nextLng"),
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
); */

export const sendOrResendOtp = createAsyncThunk(
  "agent/sendOrResendOtp",
  async ({ MobileNo, Type }, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPoint + "/AgentResendOtp", {
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
  "agent/verifyOtp",
  async ({ MobileNo, Otp }, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPoint + "/AgentVerifyOtp", {
        MobileNo,
        Otp,
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

export const resetPassword = createAsyncThunk(
  "agent/resetPassword",
  async (Password, thunkAPI) => {
    try {
      const response = await axios.put(ApiEndPoint + "/AgentResetPassword", {
        MobileNo: Number(localStorage.getItem("agentMobileNumber")),
        Password: Password,
        Otp: localStorage.getItem("agentOtp"),
        Lang: localStorage.getItem("i18nextLng"),
      });
      let responseData = await response.data;
      if (response.status === 200) {
        localStorage.setItem("agentId", responseData.data.AgentId);
        localStorage.setItem("agentjwtToken", responseData.data.AgentjwtToken);
        localStorage.setItem("agentcode", responseData.data.Agentcode);
        localStorage.removeItem("agentMobileNumber");
        localStorage.removeItem("agentOtp");
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const agentAuthSlice = createSlice({
  name: "agentAuth",
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    isOtpSuccess: false,
  },
  reducers: {
    clearAuthState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isOtpSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    /* [signupUser.fulfilled]: (state, { payload }) => {
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
    }, */
    [agentLogin.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = payload.success;
    },
    [agentLogin.pending]: (state) => {
      state.isFetching = true;
    },
    [agentLogin.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    /* [loginMobile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isOtpSuccess = payload.success;
    },
    [loginMobile.pending]: (state) => {
      state.isFetching = true;
    },
    [loginMobile.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    }, */
    [sendOrResendOtp.fulfilled]: (state, { payload }) => {
      state.isError = payload.error;
      state.errorMessage = payload.message;
      state.isFetching = false;
      state.isSuccess = payload.success;
    },
    [sendOrResendOtp.pending]: (state) => {
      state.isFetching = true;
    },
    [sendOrResendOtp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
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
  },
});

export const { clearAuthState } = agentAuthSlice.actions;

export const agentAuthSelector = (state) => state.agentAuth;
