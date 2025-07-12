import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// import { apiEndPoint } from "./ApplicantAuthSlice";

const AgentAnalDashApiEndPoint = ApiEndPoint + "/AgentDashboard/";
const AgentReportsApiEndPoint = ApiEndPoint + "/AgentProjectOverviewDetails/";
const AgentAllNotifiApiEndPoint = ApiEndPoint + "/AgentDashboardNotifications/";

// export const headers = {
//   Authorization: localStorage.getItem("jwtToken"),
// };

export const getAgentAnalDashboard = createAsyncThunk(
  "agent/AgentDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        AgentAnalDashApiEndPoint + localStorage.getItem("agentcode") + "?" + localStorage.getItem("analDashboardApiParam") + "&Lang=" + localStorage.getItem("i18nextLng")
        // { headers }
      );
      let responseData = await response.data;
      //console.log("response data aggent",responseData, localStorage.getItem("agentcode"), localStorage.getItem("analDashboardApiParam"), localStorage.getItem("i18nextLng"));
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

export const getAgentProjectOverviewDetails = createAsyncThunk(
  "agent/AgentProjectOverviewDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        AgentReportsApiEndPoint + localStorage.getItem("agentcode") + "?" + localStorage.getItem("agntProjectOverviewApiParam") + "&Lang=" + localStorage.getItem("i18nextLng")
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

export const getChartProjectOverviewDetails = createAsyncThunk(
  "agent/getChartProjectOverviewDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        AgentReportsApiEndPoint + localStorage.getItem("agentcode") + "?" + localStorage.getItem("chartProjectOverviewApiParam") + "&Lang=" + localStorage.getItem("i18nextLng")
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

export const getAgentAllNotifications = createAsyncThunk(
  "agent/getAgentAllNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        AgentAllNotifiApiEndPoint + localStorage.getItem("agentcode") + "?" + localStorage.getItem("agentAllNotifiApiParam") + "&Lang=" + localStorage.getItem("i18nextLng")
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


export const getAgentApplicantsAnalDashboard = createAsyncThunk(
  "agent/AgentApplicantsAnalDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + '/AgentApplicants/AgentApplicantDashboardCountDetails/' + localStorage.getItem("agentcode") + "?" + localStorage.getItem("analDashboardApiParam") + "&Lang=" + localStorage.getItem("i18nextLng")
      );
      let responseData = await response.data;
      return responseData;
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const agentAnalDashboardSlice = createSlice({
  name: "agentAnalDashboard",
  initialState: {
    isFetchingAgentAnalDashboard: false,
    isSuccessResAgentAnalDashboard: false,
    isSuccessReqAgentAnalDashboard: false,
    isErrorAgentAnalDashboard: false,
    errorMsgAgentAnalDashboard: "",
    agentAnalDashboardData: {},
    agentProjectOverviewData: {},
    isFetchingAgentProjectOverview: false,
    isSuccessResAgentProjectOverview: false,
    isErrorAgentProjectOverview: false,
    errorMsgAgentProjectOverview: "",
    chartProjectOverviewData: {},
    proProject: [],
    isFetchingChartProjectOverview: false,
    isSuccessResChartProjectOverview: false,
    isErrorChartProjectOverview: false,
    errorMsgChartProjectOverview: "",
    agentAllNotifiData: {},
    isFetchingAgentAllNotifi: false,
    isSuccessResAgentAllNotifi: false,
    isErrorAgentAllNotifi: false,
    errorMsgAgentAllNotifi: "",

    isFetchingAgentApplicantsAnalDashboard: false,
    isSuccessResAgentApplicantsAnalDashboard: false,
    isErrorAgentApplicantsAnalDashboard: false,
    errorMsgAgentApplicantsAnalDashboard: "",
    agentApplicantsAnalDashboardData: [],
  },
  reducers: {
    clearAgentAnalDashboardState: (state) => {
      state.isFetchingAgentAnalDashboard = false;
      state.isSuccessResAgentAnalDashboard = false;
      state.isSuccessReqAgentAnalDashboard = false;
      state.isErrorAgentAnalDashboard = false;
      state.errorMsgAgentAnalDashboard = "";
      state.isFetchingAgentProjectOverview = false;
      state.isSuccessResAgentProjectOverview = false;
      state.isErrorAgentProjectOverview = false;
      state.errorMsgAgentProjectOverview = "";
      state.isFetchingChartProjectOverview = false;
      state.isSuccessResChartProjectOverview = false;
      state.isErrorChartProjectOverview = false;
      state.errorMsgChartProjectOverview = "";    
      state.isFetchingAgentApplicantsAnalDashboard= false;
      state.isSuccessResAgentApplicantsAnalDashboard= false;
      state.isErrorAgentApplicantsAnalDashboard= false;
      state.errorMsgAgentApplicantsAnalDashboard= "";
    },
    clearAgentAnalDashboardData: (state) => {
      state.agentAnalDashboardData = {};
      state.agentProjectOverviewData = {};
      state.chartProjectOverviewData = {};
      state.agentApplicantsAnalDashboardData= {};
      state.proProject = [];
    },
  },
  extraReducers: {
    [getAgentAnalDashboard.fulfilled]: (state, { payload }) => {
      // console.log("data",payload);
      // const forAll = {
      //   value: "All",
      //   label: "all"
      // }
      // state.proProject.push(forAll);
      state.isFetchingAgentAnalDashboard = false;
      state.agentAnalDashboardData = payload.data;
      // state.agentAnalDashboardData.ProjectListDropdown.forEach((item) => {
      //   const newItem = {
      //     value: item.ProjectId,
      //     label: item.ProjectName
      //   }

      //   state.proProject.push(newItem)
      // })
      state.isSuccessResAgentAnalDashboard = payload.success;
    },
    [getAgentAnalDashboard.pending]: (state) => {
      state.isFetchingAgentAnalDashboard = true;
    },
    [getAgentAnalDashboard.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingAgentAnalDashboard = false;
      state.isErrorAgentAnalDashboard = payload.error;
      state.errorMsgAgentAnalDashboard = payload.message;
    },
    [getAgentApplicantsAnalDashboard.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.isFetchingAgentApplicantsAnalDashboard = false;
      state.agentApplicantsAnalDashboardData = payload.data;
      state.isSuccessResAgentApplicantsAnalDashboard = payload.success;
    },
    [getAgentApplicantsAnalDashboard.pending]: (state) => {
      state.isFetchingAgentApplicantsAnalDashboard = true;
    },
    [getAgentApplicantsAnalDashboard.rejected]: (state, { payload }) => {
      state.isFetchingAgentApplicantsAnalDashboard = false;
      state.isErrorAgentApplicantsAnalDashboard = payload.error;
      state.errorMsgAgentApplicantsAnalDashboard = payload.message;
    },
    [getAgentProjectOverviewDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingAgentProjectOverview = false;
      state.agentProjectOverviewData = payload.data;
      state.isSuccessResAgentProjectOverview = payload.success;
    },
    [getAgentProjectOverviewDetails.pending]: (state) => {
      state.isFetchingAgentProjectOverview = true;
    },
    [getAgentProjectOverviewDetails.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingAgentProjectOverview = false;
      state.isErrorAgentProjectOverview = payload.error;
      state.errorMsgAgentProjectOverview = payload.message;
    },
    [getChartProjectOverviewDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingChartProjectOverview = false;
      state.chartProjectOverviewData = payload.data;
      state.isSuccessResChartProjectOverview = payload.success;
    },
    [getChartProjectOverviewDetails.pending]: (state) => {
      state.isFetchingChartProjectOverview = true;
    },
    [getChartProjectOverviewDetails.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingChartProjectOverview = false;
      state.isErrorChartProjectOverview = payload.error;
      state.errorMsgChartProjectOverview = payload.message;
    },
    [getAgentAllNotifications.fulfilled]: (state, { payload }) => {
      state.isFetchingAgentAllNotifi = false;
      state.agentAllNotifiData = payload.data;
      state.isSuccessResAgentAllNotifi = payload.success;
    },
    [getAgentAllNotifications.pending]: (state) => {
      state.isFetchingAgentAllNotifi = true;
    },
    [getAgentAllNotifications.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingAgentAllNotifi = false;
      state.isErrorAgentAllNotifi = payload.error;
      state.errorMsgAgentAllNotifi = payload.message;
    },
  },
});

export const { clearAgentAnalDashboardState, clearAgentAnalDashboardData } =
  agentAnalDashboardSlice.actions;

export const agentApplicantsSelector = (state) => state.agentAnalDashboard;
