import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  //ProjectApiEndPoint,
 // FilterListApiEndPoint,
  SelectProjectApiEndPoint,
  ApiEndPoint,
} from "../../../utils/Common";

export const getProjectsData = createAsyncThunk(
  "projectsData/getProjectsData",
  async (params, thunkAPI) => {
    try {
      /* const response = await axios.get(
        ProjectApiEndPoint +
        "projects?&casteCategory=1&reservationCategory=9,10&income=1&lang=" +
        localStorage.getItem("i18nextLng") + ""
        + "&applicantId=" +
        localStorage.getItem("applicantId")
      ); */
      const response = await axios.get(
        SelectProjectApiEndPoint +
          `categories?lang=${localStorage.getItem(
            "i18nextLng"
          )}&category=true${params}`
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

export const getFcfsProjectList = createAsyncThunk(
  "projectsData/getFcfsProjectsData",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          `/FlatRandomization/fetchPreferenceDetailsAllProjects?lang=${localStorage.getItem(
            "i18nextLng")}&ApplicantId=${localStorage.getItem("applicantId")}`);
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

export const getProjectsListData = createAsyncThunk(
  "projectsData/getProjectsListData",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/AgentsApplications/ProjectsNames/?Lang=" +
          localStorage.getItem("i18nextLng")
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

export const getFilterLocationList = createAsyncThunk(
  "projectsData/getFilterLocationList",
  async (_, thunkAPI) => {
    try {
      // const response = await axios.get(FilterListApiEndPoint + "api.php?locationlist=yes&lang=" + localStorage.getItem("i18nextLng"));
      const response = await axios.get(
        ApiEndPoint +
          "/Applicant/InfoBetaLocationList/?Lang=" +
          localStorage.getItem("i18nextLng")
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

export const getApplicantSelectedFlat = createAsyncThunk(
  "projectsData/getApplicantSelectedFlat",
  async (_, thunkAPI) => {
    try {
      const requestData = {
        ApplicantId: localStorage.getItem("applicantId"),
        Lang: localStorage.getItem("i18nextLng"),
      };
      const response = await axios.post(
        ApiEndPoint +
          "/FlatRandomization/fetchApplicantBookingDetails",
          requestData
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

export const projectDataSlice = createSlice({
  name: "projectsData",
  initialState: {
    isSchemeFetching: false,
    isSchemeSuccess: false,
    isSchemeError: false,
    schemeErrorMessage: "",
    demoProjectList: [],
    schemeData: {},
    schemeProjectList: [],

    projectListData: [],
    ProListData: [],
    isFetchingProjectListData: false,
    isSuccessProjectListData: false,
    isErrorProjectListData: false,
    errorMessageProjectListData: "",

    isFetchingLocationList: false,
    isSuccessLocationList: false,
    isErrorLocationList: false,
    errorMessageLocationList: "",
    locationListData: {},

    fcfsLocationListData: {},
    isFetchingFcfsLocationList: false,
    isSuccessFcfsLocationList: false,
    isErrorFcfsLocationList: false,
    errorMessageFcfsLocationList: "",

    applicantSelectedFlat : {},
    isFetchingApplicantSelectedFlat : false,
    isSuccessApplicantSelectedFlat : false,
    isErrorApplicantSelectedFlat : false,
    errorMessageApplicantSelectedFlat : "",
  },
  reducers: {
    clearProjectDataState: (state) => {
      state.isSchemeFetching = false;
      state.isSchemeSuccess = false;
      state.isSchemeError = false;
      state.schemeErrorMessage = "";
      //
      state.isFetchingLocationList = false;
      state.isSuccessLocationList = false;
      state.isErrorLocationList = false;
      state.errorMessageLocationList = "";

      state.isFetchingProjectListData = false;
      state.isSuccessProjectListData = false;
      state.isErrorProjectListData = false;
      state.errorMessageProjectListData = "";

      state.isFetchingFcfsLocationList = false;
      state.isSuccessFcfsLocationList = false;
      state.isErrorFcfsLocationList = false;
      state.errorMessageFcfsLocationList = "";

      state.isFetchingApplicantSelectedFlat = false;
      state.isSuccessApplicantSelectedFlat = false;
      state.isErrorApplicantSelectedFlat = false;
      state.errorMessageApplicantSelectedFlat = "";
    },
    setDummyProjectList: (state, action) => {
      state.demoProjectList.push(action.payload);
    },
    removeDuplicateProject: (state, action) => {
      const index = state.demoProjectList.findIndex(
        (item) => item.projectId === action.payload
      );
      if (index > -1) {
        state.demoProjectList.splice(index, 1);
      }
    },
    projectToggle: (state, action) => {
      const index = state.demoProjectList.findIndex(
        (item) => item.projectId === action.payload.projectId
      );
      state.demoProjectList[index] = action.payload;
    },
    clearProjectList: (state) => {
      state.demoProjectList = [];
    },
    clearLocationList: (state) => {
      state.locationListData = {};
    },
    clearProjectListData: (state) => {
      state.projectListData = [];
      state.ProListData = [];
    },
  },
  extraReducers: {
    [getProjectsData.fulfilled]: (state, { payload }) => {
      state.schemeData = payload?.project;
      state.schemeProjectList = payload?.result;
      state.isSchemeFetching = false;
      state.isSchemeSuccess = true;
    },
    [getProjectsData.pending]: (state) => {
      state.isSchemeFetching = true;
    },
    [getProjectsData.rejected]: (state, { payload }) => {
      state.schemeData = {};
      state.schemeProjectList = [];
      state.isSchemeFetching = false;
      state.isSchemeSuccess = false;
      state.isSchemeError = true;
      state.schemeErrorMessage = payload.message;
    },
    [getFilterLocationList.fulfilled]: (state, { payload }) => {
      // state.locationListData = payload?.result[0];
      state.locationListData = payload?.data;
      // state.schemeLocationList = payload?.result;
      state.isFetchingLocationList = false;
      state.isSuccessLocationList = true;
    },
    [getFilterLocationList.pending]: (state) => {
      state.isFetchingLocationList = true;
    },
    [getFilterLocationList.rejected]: (state, { payload }) => {
      state.locationListData = {};
      // state.schemeLocationList = [];
      state.isFetchingLocationList = false;
      state.isSuccessLocationList = false;
      state.isErrorLocationList = true;
      state.errorMessageLocationList = payload.message;
    },

    [getFcfsProjectList.fulfilled]: (state, { payload }) => {
      state.fcfsLocationListData = payload?.data;
      state.isFetchingFcfsLocationList = false;
      state.isSuccessFcfsLocationList = true;
    },
    [getFcfsProjectList.pending]: (state) => {
      state.isFetchingFcfsLocationList = true;
    },
    [getFcfsProjectList.rejected]: (state, { payload }) => {
      state.fcfsLocationListData = {};
      state.isFetchingFcfsLocationList = false;
      state.isSuccessFcfsLocationList = false;
      state.isErrorFcfsLocationList = true;
      state.errorMessageFcfsLocationList = payload.message;
    },

    [getApplicantSelectedFlat.fulfilled]: (state, { payload }) => {
      state.applicantSelectedFlat = payload?.data.Applicant_Booking_Status;
      state.isFetchingApplicantSelectedFlat = false;
      state.isSuccessApplicantSelectedFlat = true;
    },
    [getApplicantSelectedFlat.pending]: (state) => {
      state.isFetchingApplicantSelectedFlat = true;
    },
    [getApplicantSelectedFlat.rejected]: (state, { payload }) => {
      state.applicantSelectedFlat = [];
      state.isFetchingApplicantSelectedFlat = false;
      state.isSuccessApplicantSelectedFlat = false;
      state.isErrorApplicantSelectedFlat = true;
      state.errorMessageApplicantSelectedFlat = payload.message;
    },

    [getProjectsListData.fulfilled]: (state, { payload }) => {
      state.projectListData = payload.data;
      state.projectListData.map((item) => {
        const newItem = {
          value: item.project_id,
          label: item.project_name,
        };
        state.ProListData.push(newItem);
      });
      // state.schemeLocationList = payload?.result;
      //console.log("project",state.projectListData);
      state.isFetchingProjectListData = false;
      state.isSuccessProjectListData = true;
    },
    [getProjectsListData.pending]: (state) => {
      state.isFetchingProjectListData = true;
    },
    [getProjectsListData.rejected]: (state, { payload }) => {
      state.projectListDataData = [];
      // state.schemeProjectListData = [];
      state.isFetchingProjectListData = false;
      state.isSuccessProjectListData = false;
      state.isErrorProjectListData = true;
      state.errorMessageProjectListData = payload.message;
    },
  },
});

export const {
  clearProjectDataState,
  setDummyProjectList,
  projectToggle,
  clearProjectList,
  clearLocationList,
  clearProjectListData,
  removeDuplicateProject,
} = projectDataSlice.actions;

export const projectDataSelector = (state) => state.projectsData;
