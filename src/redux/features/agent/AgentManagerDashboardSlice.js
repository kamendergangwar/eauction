import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// import { apiEndPoint } from "./ApplicantAuthSlice";

const DashboardApiEndPoint = ApiEndPoint + "/ManagerAgentDashboard/";
const ComparitiveAnalApiEndPoint = ApiEndPoint + "/ManagersDashboardComparititiveAnalysis/";
const MngrEarningDetailsApiEndPoint = ApiEndPoint + "/ManagerAgentEarningDetails/";

// export const headers = {
//   Authorization: localStorage.getItem("jwtToken"),
// };

export const getManagerDashboard = createAsyncThunk(
  "agent/ManagerDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        DashboardApiEndPoint + localStorage.getItem("agentId") + "?" + localStorage.getItem("managerDashboardApiParam")
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

export const getManagerComparitiveAnalysis = createAsyncThunk(
  "agent/ManagerComparitiveAnalysis",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ComparitiveAnalApiEndPoint + localStorage.getItem("agentId") + "?" + localStorage.getItem("comparitiveAnalysisApiParam")
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

export const getManagerAgentEarningDetails = createAsyncThunk(
  "agent/ManagerAgentEarningDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        MngrEarningDetailsApiEndPoint + localStorage.getItem("agentId") + "?" + localStorage.getItem("mngrEarningDetailsApiParam")
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

export const managerDashboardSlice = createSlice({
  name: "managerDashboard",
  initialState: {
    isFetchingManagerDashboard: false,
    isSuccessResManagerDashboard: false,
    isSuccessReqManagerDashboard: false,
    isErrorManagerDashboard: false,
    errorMsgManagerDashboard: "",
    managerDashboardData: {},
    comparitiveAnalysisData: {},
    mngrAgentEarningDetailsData: {},
    isSuccessResMngrAgentEarningDetails: false,
    isFetchingMngrAgentEarningDetails: false,
    isErrorMngrAgentEarningDetails: false,
    errorMsgMngrAgentEarningDetails: ""
  },
  reducers: {
    clearManagerDashboardState: (state) => {
      state.isFetchingManagerDashboard = false;
      state.isSuccessResManagerDashboard = false;
      state.isSuccessReqManagerDashboard = false;
      state.isErrorManagerDashboard = false;
      state.errorMsgManagerDashboard = "";
      state.isSuccessResMngrAgentEarningDetails = false;
      state.isFetchingMngrAgentEarningDetails = false;
      state.isErrorMngrAgentEarningDetails = false;
      state.errorMsgMngrAgentEarningDetails = ""
    },
    clearManagerDashboardData: (state) => {
      state.managerDashboardData = {};
      state.comparitiveAnalysisData = {};
      state.mngrAgentEarningDetailsData = {};
    },
  },
  extraReducers: {
    [getManagerDashboard.fulfilled]: (state, { payload }) => {
      state.isFetchingManagerDashboard = false;
      state.managerDashboardData = payload.data;
      state.isSuccessResManagerDashboard = payload.success;
    },
    [getManagerDashboard.pending]: (state) => {
      state.isFetchingManagerDashboard = true;
    },
    [getManagerDashboard.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingManagerDashboard = false;
      state.isErrorManagerDashboard = payload.error;
      state.errorMsgManagerDashboard = payload.message;
    },
    [getManagerComparitiveAnalysis.fulfilled]: (state, { payload }) => {
      console.log("payload.data", payload.data);
      state.isFetchingManagerDashboard = false;
      state.comparitiveAnalysisData = payload.data;
      // state.isSuccessResManagerDashboard = payload.success;
    },
    [getManagerComparitiveAnalysis.pending]: (state) => {
      state.isFetchingManagerDashboard = true;
    },
    [getManagerComparitiveAnalysis.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingManagerDashboard = false;
      state.isErrorManagerDashboard = payload.error;
      state.errorMsgManagerDashboard = payload.message;
    },
    [getManagerAgentEarningDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingMngrAgentEarningDetails = false;
      state.mngrAgentEarningDetailsData = payload.data;
      state.isSuccessResMngrAgentEarningDetails = payload.success;
    },
    [getManagerAgentEarningDetails.pending]: (state) => {
      state.isFetchingMngrAgentEarningDetails = true;
    },
    [getManagerAgentEarningDetails.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingMngrAgentEarningDetails = false;
      state.isErrorMngrAgentEarningDetails = payload.error;
      state.errorMsgMngrAgentEarningDetails = payload.message;
    },
  },
});

export const { clearManagerDashboardState, clearManagerDashboardData } =
  managerDashboardSlice.actions;

export const managerDashboardSelector = (state) => state.managerDashboard;
