import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// import { apiEndPoint } from "./ApplicantAuthSlice";

const ApiEndPointApplications = ApiEndPoint + "/AgentsApplications/";

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

export const GetAgentApplications = createAsyncThunk(
  "agent/AgentApplications",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointApplications + localStorage.getItem("agentcode") + "?" + localStorage.getItem("applctnsDashboardApiParam") + "&Lang=" + localStorage.getItem("i18nextLng") 
        // { headers }
      );
      let responseData = await response.data;

      if (response.status === 200) {
        // console.log("enter response",response);
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const agentApplicationsSlice = createSlice({
  name: "agentApplications",
  initialState: {
    isFetchingAgentApplications: false,
    isSuccessResAgentApplications: false,
    isSuccessReqAgentApplications: false,
    isErrorAgentApplications: false,
    errorMsgAgentApplications: "",
    agentApplicationsData: {},
  },
  reducers: {
    clearAgentApplicationsState: (state) => {
      state.isFetchingAgentApplications = false;
      state.isSuccessResAgentApplications = false;
      state.isSuccessReqAgentApplications = false;
      state.isErrorAgentApplications = false;
      state.errorMsgAgentApplications = "";
    },
    clearAgentApplicationsData: (state) => {
      state.agentApplicationsData = {};
    },
  },
  extraReducers: {
    // [editApplicant.fulfilled]: (state, { payload }) => {
    //   // console.log(payload, "Success - 1");
    //   state.isFetchingAgentApplications = false;
    //   state.isSuccessReqAgentApplications = payload.success;
    // },
    // [editApplicant.pending]: (state) => {
    //   state.isFetchingAgentApplications = true;
    // },
    // [editApplicant.rejected]: (state, { payload }) => {
    //   state.isFetchingAgentApplications = false;
    //   state.isErrorAgentApplications = payload.error;
    //   state.errorMessage = payload.message;
    // },
    [GetAgentApplications.fulfilled]: (state, { payload }) => {
      state.isFetchingAgentApplications = false;
      state.agentApplicationsData = payload.data;
      state.isSuccessResAgentApplications = payload.success;
      //console.log("payload", payload)
    },
    [GetAgentApplications.pending]: (state) => {
      state.isFetchingAgentApplications = true;
    },
    [GetAgentApplications.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingAgentApplications = false;
      state.isErrorAgentApplications = payload.error;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearAgentApplicationsState, clearAgentApplicationsData } =
  agentApplicationsSlice.actions;

export const agentApplicationsSelector = (state) => state.agentApplications;
