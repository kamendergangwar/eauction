import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProjectApiEndPoint, ApiEndPoint } from "../../../utils/Common";

export const getProjectsData = createAsyncThunk(
  "agentProjectsData/getProjectsData",
  async (params, thunkAPI) => {
    if(params != "" && params != undefined && params != null) {
      params = "&"+params;
    } else {
      params = "";
    }
    try {
      const response = await axios.get(
        ProjectApiEndPoint +
        "/categories?lang=" +
        localStorage.getItem("i18nextLng") +
        "&category=true" +
        params
      );
      // const response = await axios.get(
      //   "http://odishadigital.com/masshousinglatest/wp-json/wp/v2/categories?lang=" +
      //     localStorage.getItem("i18nextLng") +
      //     "&category=61"
      // );
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

export const getLocationData = createAsyncThunk(
  "agentProjectsData/getLocationData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
        "/Applicant/InfoBetaLocationList?lang=" +
        localStorage.getItem("i18nextLng") +
        "&category=true"
      );
      // const response = await axios.get(
      //   "http://odishadigital.com/masshousinglatest/wp-json/wp/v2/categories?lang=" +
      //     localStorage.getItem("i18nextLng") +
      //     "&category=61"
      // );
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

export const agentProjectDataSlice = createSlice({
  name: "agentProjectsData",
  initialState: {
    isSchemeFetching: false,
    isSchemeSuccess: false,
    isSchemeError: false,
    schemeErrorMessage: "",
    demoProjectList: [],
    schemeData: {},
    schemeProjectList: [],

    isLocationFetching: false,
    isLocationSuccess: false,
    isLocationError: false,
    locationErrorMessage: "",
    demoLocationList: [],
    locationData: {},
    locationProjectList: [],
  },
  reducers: {
    clearProjectDataState: (state) => {
      state.isSchemeFetching = false;
      state.isSchemeSuccess = false;
      state.isSchemeError = false;
      state.schemeErrorMessage = "";
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
    setLocationList: (state, action) => {
      state.demoLocationList.push(action.payload);
    },
  },
  extraReducers: {
    [getProjectsData.fulfilled]: (state, { payload }) => {
      state.schemeData = payload.project;
      state.schemeProjectList = payload.result;
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

    [getLocationData.fulfilled]: (state, { payload }) => {
      state.locationData         = "";
      state.locationProjectList  = payload.data;
      state.isLocationFetching   = false;
      state.isLocationSuccess    = true;
    },
    [getLocationData.pending]: (state) => {
      state.isLocationFetching = true;
    },
    [getLocationData.rejected]: (state, { payload }) => {
      state.locationData         = {};
      state.locationProjectList  = [];
      state.isLocationFetching   = false;
      state.isLocationSuccess    = false;
      state.isLocationError      = true;
      state.locationErrorMessage = payload.message;
    },
  },
});

export const {
  clearProjectDataState,
  setDummyProjectList,
  projectToggle,
  clearProjectList,
  removeDuplicateProject,
} = agentProjectDataSlice.actions;

export const agentProjectDataSelector = (state) => state.agentProjectsData;
