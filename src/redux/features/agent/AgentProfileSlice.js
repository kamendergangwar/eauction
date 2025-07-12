import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// import { apiEndPoint } from "./ApplicantAuthSlice";

const ApiEndPointProfile = ApiEndPoint + "/AgentProfile/";

const apiurlofProfile = "http://localhost/rest-api/applicationservice/";

// export const headers = {
//   Authorization: localStorage.getItem("jwtToken"),
// };

/* export const editApplicant = createAsyncThunk(
  "applicant/editApplicant",
  async (agentApplicationsData, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPointApplicant + localStorage.getItem("applicantId"),
        agentApplicationsData
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
); */

export const getAgentProfileData = createAsyncThunk(
  "agent/AgentProfile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointProfile + localStorage.getItem("agentcode")
        //+ "?Lang=" + localStorage.getItem("i18nextLng")
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

export const updateAgentProfilePhoto = createAsyncThunk(
  "agent/UpdateAgentProfilePhoto",
  async (updateData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/AgentFileUpload", updateData
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

export const updateAgentProfileInfo = createAsyncThunk(
  "agent/UpdateAgentProfile",
  async (updateData, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPointProfile + localStorage.getItem("agentcode"), updateData
        //+ "?Lang=" + localStorage.getItem("i18nextLng")
        // { headers }
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

export const agentProfileSlice = createSlice({
  name: "agentProfile",
  initialState: {
    isFetchingAgentProfile: false,
    isSuccessResAgentProfile: false,
    isSuccessReqAgentProfile: false,
    isErrorAgentProfile: false,
    errorMsgAgentProfile: "",
    agentProfileData: {},
    isFetchingUpdateAgentProfile: false,
    isFetchingUpdateAgentProfilePhoto: false,
    updateAgentProfileData: {},
    updateAgentProfilePhotoData: {},
    isSuccessResUpdateAgentProfile: false,
    isSuccessResUpdateAgentProfilePhoto: false,
    isErrorUpdateAgentProfile: false,
    errorMessageUpdateProfile: "",
    isErrorUpdateAgentProfilePhoto: false,
    errorMessageUpdateProfilePhoto: ""
  },
  reducers: {
    clearAgentProfileState: (state) => {
      state.isFetchingUpdateAgentProfilePhoto = false;
      state.isSuccessResUpdateAgentProfilePhoto = false;
      state.isErrorUpdateAgentProfilePhoto = false;
      state.isFetchingAgentProfile = false;
      state.isSuccessResAgentProfile = false;
      state.isSuccessReqAgentProfile = false;
      state.isErrorAgentProfile = false;
      state.errorMsgAgentProfile = "";
      state.errorMessageUpdateProfilePhoto = "";
      state.isFetchingUpdateAgentProfile = false;
      state.isSuccessResUpdateAgentProfile = false;
      state.isErrorUpdateAgentProfile = false;
      state.errorMessageUpdateProfile = "";
    },
    clearAgentProfileData: (state) => {
      state.agentProfileData = {};
      state.updateAgentProfileData = {};
      state.updateAgentProfilePhotoData = {};
    },
  },
  extraReducers: {
    [getAgentProfileData.fulfilled]: (state, { payload }) => {
      state.isFetchingAgentProfile = false;
      state.agentProfileData = payload.data;
      state.isSuccessResAgentProfile = payload.success;
    },
    [getAgentProfileData.pending]: (state) => {
      state.isFetchingAgentProfile = true;
    },
    [getAgentProfileData.rejected]: (state, { payload }) => {
      state.isFetchingAgentProfile = false;
      state.isErrorAgentProfile = payload.error;
      state.errorMsgAgentProfile = payload.message;
    },
    [updateAgentProfileInfo.fulfilled]: (state, { payload }) => {
      state.isFetchingUpdateAgentProfile = false;
      state.updateagentProfileData = payload.data;
      state.isSuccessResUpdateAgentProfile = payload.success;
    },
    [updateAgentProfileInfo.pending]: (state) => {
      state.isFetchingUpdateAgentProfile = true;
    },
    [updateAgentProfileInfo.rejected]: (state, { payload }) => {
      state.isFetchingUpdateAgentProfile = false;
      state.isErrorUpdateAgentProfile = payload.error;
      state.errorMessageUpdateProfile = payload.message;
    },

    [updateAgentProfilePhoto.fulfilled]: (state, { payload }) => {
      state.isFetchingUpdateAgentProfilePhoto = false;
      state.updateagentProfilePhotoData = payload.data;
      state.isSuccessResUpdateAgentProfilePhoto = true;

    },
    [updateAgentProfilePhoto.pending]: (state) => {
      state.isFetchingUpdateAgentProfilePhoto = true;
    },
    [updateAgentProfilePhoto.rejected]: (state, { payload }) => {
      state.isFetchingUpdateAgentProfilePhoto = false;
      state.isErrorUpdateAgentProfilePhoto = true;
      state.errorMessageUpdateProfilePhoto = "something went wrong";
    },
  },
});

export const { clearAgentProfileState, clearAgentProfileData } =
  agentProfileSlice.actions;

export const agentProfileSelector = (state) => state.agentProfile;
