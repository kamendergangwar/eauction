import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint, ProjectApiEndPoint } from "../../../utils/Common";
// import { apiEndPoint } from "../applicant/ApplicantAuthSlice";

const ApiEndPointNotifications = ApiEndPoint + "/DashboardNotifications";

export const getNotificationsListDummy = () => {
  var locText = localStorage.getItem("i18nextLng");
  var application_id = localStorage.getItem("applicantId");
  var catCode = 38;
  if (locText === "hi") {
    catCode = 45;
  }
  if (locText === "mr") {
    catCode = 43;
  }
  return new Promise((resolve, reject) => {
    axios.get(`${ApiEndPointNotifications}/${application_id}?perpage=10&page=11&sortby=desc`).then((result) => {
      if (result) {
        resolve(result);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};

export const getNotificationsList = createAsyncThunk("notification/getNotificationsList", async (_, thunkAPI) => {
  try {
    var locText = localStorage.getItem("i18nextLng");
    var application_id = localStorage.getItem("applicantId");
    var catCode = 38;
    if (locText === "hi") {
      catCode = 45;
    }
    if (locText === "mr") {
      catCode = 43;
    }
    const response = await axios.get(ApiEndPointNotifications + "/" + application_id + "?perpage=10&page=11&sortby=desc");
    let responseData = await response.data;
    if (response.status === 200) {
      return responseData;
    } else {
      return thunkAPI.rejectWithValue(responseData);
    }
  } catch (e) {
    thunkAPI.rejectWithValue(e.response.data);
  }
});


export const getNotificationForDashboard = () => {
  var locText = localStorage.getItem("i18nextLng");
  var agent_code = localStorage.getItem("agentcode");
  var catCode = 38;
  if (locText === "hi") {
    catCode = 45;
  }
  if (locText === "mr") {
    catCode = 43;
  }
  return new Promise((resolve, reject) => {
    axios.get(ApiEndPoint + "/AgentDashboardNotifications/" + localStorage.getItem("agentcode") + "?perpage=10&page=1&sortby=desc&Lang=" + localStorage.getItem("i18nextLng")).then((result) => {
      if (result) {
        resolve(result);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};

// export const getNotificationForDashboard = createAsyncThunk(
//   "notification/getNotificationForDashboard",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         ApiEndPoint +"/AgentDashboardNotifications/"+ localStorage.getItem("agentcode") + "?perpage=10&page=1&sortby=desc&Lang="+ localStorage.getItem("i18nextLng")
//         // { headers }
//       );
//       let responseData = await response.data.data.data;

//       if (response.status === 200) {
//         console.log("enter response", responseData);
//         return responseData;
//       } else {
//         return thunkAPI.rejectWithValue(responseData);
//       }
//     } catch (e) {
//       thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );

export const notificationsSlice = createSlice({
  name: "notification",
  initialState: {
    isFetchingNotifications: false,
    isSuccessResNotifications: false,
    isSuccessReqNotifications: false,
    isErrorNotifications: false,
    errorMsgNotifications: "",
    notificationsData: [],
    isFetchingNotificationsForDashboard: false,
    isSuccessResNotificationsForDashboard: false,
    isSuccessReqNotificationsForDashboard: false,
    isErrorNotificationsForDashboard: false,
    errorMsgNotificationsForDashboard: "",
    notificationsDataForDashBoard: [],
  },
  reducers: {
    clearNotificationsState: (state) => {
      state.isFetchingNotifications = false;
      state.isSuccessResNotifications = false;
      state.isSuccessReqNotifications = false;
      state.isErrorNotifications = false;
      state.errorMsgNotifications = "";

      state.isFetchingNotificationsForDashboard = false;
      state.isSuccessResNotificationsForDashboard = false;
      state.isSuccessReqNotificationsForDashboard = false;
      state.isErrorNotificationsForDashboard = false;
      state.errorMsgNotificationsForDashboard = "";
    },
    clearNotificationsData: (state) => {
      state.notificationsData = [];
      state.notificationsDataForDashBoard = [];
    },
  },
  extraReducers: {
    [getNotificationsList.fulfilled]: (state, { payload }) => {
      state.notificationsData = payload.data;
      state.isFetchingNotifications = false;
      state.isSuccessReqNotifications = payload.success;
    },
    [getNotificationsList.pending]: (state) => {
      state.isFetchingNotifications = true;
    },
    [getNotificationsList.rejected]: (state, { payload }) => {
      state.isFetchingNotifications = false;
      state.isErrorNotifications = payload.error;
      state.errorMsgNotifications = payload.message;
    },


    // [getNotificationForDashboard.fulfilled]: (state, { payload }) => {
    //   console.log("viko",payload);
    //   state.notificationsDataForDashBoard = payload.data;
    //   state.isFetchingNotificationsForDashboard = false;
    //   //console.log("enter viko", payload);
    //   state.isSuccessReqNotificationsForDashboard = payload.success;
    // },

    // [getNotificationForDashboard.pending]: (state) => {
    //   state.isFetchingNotificationsForDashboard = true;
    //   state.notificationsDataForDashBoard = [];
    // },
    // [getNotificationForDashboard.rejected]: (state, { payload }) => {
    //   state.isFetchingNotificationsForDashboard = false;
    //   state.isErrorNotificationsForDashboard = payload.error;
    //   state.errorMsgNotificationsForDashboard = payload.message;
    // }
  },
});

export const { clearNotificationsState, clearNotificationsData } = notificationsSlice.actions;

export const notificationsSelector = (state) => state.notifications;
