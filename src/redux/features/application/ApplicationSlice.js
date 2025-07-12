import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";
// import { apiEndPoint } from "../applicant/ApplicantAuthSlice";

const ApiEndPointApplications = ApiEndPoint + "/Applications";
const ApiEndPointMyAppOverview =
  ApiEndPoint + "/Applicant/applicationOverview/";
const ApiEndPointSalesForce =
  ApiEndPoint + "/Applications/addApplicationToSalesForce";

export const addApplication = createAsyncThunk(
  "application/addApplication",
  async (applicationData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointApplications,
        applicationData
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

export const addToSalesForce = createAsyncThunk(
  "application/addToSalesForce",
  async (applicationData, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPointSalesForce, applicationData);
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

export const editApplication = createAsyncThunk(
  "application/editApplication",
  async (applicationData, thunkAPI) => {
    try {
      const requestData = {
        // SchemeId: applicationData.SchemeId,
        // ProjectId: applicationData.ProjectId,
        // ReservationId: applicationData.ReservationId,
        // Type: applicationData.Type,
        ApplicantId: localStorage.getItem("applicantId"),
        ApplicationStatus: applicationData.ApplicationStatus,
        ApplicationId: applicationData.ApplicationId,
        Lang: localStorage.getItem("i18nextLng"),
      };
      const response = await axios.put(ApiEndPointApplications, requestData);
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

export const getApplication = createAsyncThunk(
  "applicant/getApplication",
  async (_, thunkAPI) => {
    try {
      var applicantId = localStorage.getItem("applicantId");
      if (applicantId !== null) {
        const response = await axios.get(
          // Static ID for temporary
          /* ApiEndPointMyAppOverview +
          localStorage.getItem("applicantId") +
          "?Lang=" +
          localStorage.getItem("i18nextLng") */
          ApiEndPointApplications +
            "/" +
            localStorage.getItem("applicantId") +
            "?Lang=" +
            localStorage.getItem("i18nextLng")
        );
        let responseData = await response.data;
        if (response.status === 200) {
          return responseData;
        } else {
          return thunkAPI.rejectWithValue(responseData);
        }
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// get application overview
export const applicationOverview = createAsyncThunk(
  "applicant/applicationOverview",
  async (applicationID, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointMyAppOverview +
          localStorage.getItem("applicantId") +
          "?Lang=" +
          localStorage.getItem("i18nextLng") +
          (applicationID ? "&ApplicationId=" + applicationID : "")
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

export const applicationSlice = createSlice({
  name: "application",
  initialState: {
    isFetchingApplication: false,
    isSuccessResApplication: false,
    isSuccessReqAddApplication: false,
    AddApplicationResData: [],
    isSuccessReqEditApplication: false,
    EditApplicationData: [],
    isErrorApplication: false,
    errorMsgApplication: "",
    applicationData: [],
    currentApplicationData: [],
    applicationBookingStatus: [],
    paidAndSelectedApplctnData: [],
    isSuccessResApplicationOverview: false,
    isFetchingApplicationOverview: false,
    isErrorApplicationOverview: false,
    errorMsgApplicationOverview: "",
    applicationOverviewData: [],
    currentApplicationOverviewData: [],
  },
  reducers: {
    clearApplicationState: (state) => {
      state.isFetchingApplication = false;
      state.isSuccessResApplication = false;
      state.isSuccessReqAddApplication = false;
      state.isSuccessReqEditApplication = false;
      state.isErrorApplication = false;
      state.AddApplicationResData = [];
      state.EditApplicationData = [];
    },
    clearApplicationtData: (state) => {
      state.applicationData = [];
    },
    clearApplicationOverviewState: (state) => {
      state.errorMsgApplication = "";
      state.isSuccessResApplicationOverview = false;
      state.isFetchingApplicationOverview = false;
      state.isErrorApplicationOverview = false;
      state.errorMsgApplicationOverview = "";
    },
  },
  extraReducers: {
    [addApplication.fulfilled]: (state, { payload }) => {
      // console.log(payload, "Add Success - 1");
      state.AddApplicationResData = payload.data;
      state.isFetchingApplication = false;
      state.isSuccessReqAddApplication = payload.success;
    },
    [addApplication.pending]: (state) => {
      state.isFetchingApplication = true;
    },
    [addApplication.rejected]: (state, { payload }) => {
      state.isFetchingApplication = false;
      state.isErrorApplication = payload.error;
      state.errorMsgApplication = payload.message;
    },
    [editApplication.fulfilled]: (state, { payload }) => {
      // console.log(payload, "Edit Success - 1");
      state.isFetchingApplication = false;
      state.isSuccessReqEditApplication = payload.success;
      state.EditApplicationData = payload.data;
    },
    [editApplication.pending]: (state) => {
      state.isFetchingApplication = true;
    },
    [editApplication.rejected]: (state, { payload }) => {
      state.isFetchingApplication = false;
      state.isErrorApplication = payload.error;
      state.errorMsgApplication = payload.message;
    },
    [getApplication.fulfilled]: (state, { payload }) => {
      if (payload) {
        // console.log(payload, "Success - 2");
        state.applicationData = payload.data;
        if (payload.data[payload.data.length-1]?.Applicant_Booking_Status ) {
          state.applicationBookingStatus = payload.data[payload.data.length-1].Applicant_Booking_Status;
        } else {
          state.applicationBookingStatus = [];
        }
        if (payload.data) {
          state.currentApplicationData = payload.data.filter(
            (item) => item.ApplicationStatus === "0"
          );
          state.paidAndSelectedApplctnData = payload.data.filter(
            (item) =>
              item.ApplicationStatus === "0" || item.ApplicationStatus === "1"
          );
        }
        state.isFetchingApplication = false;
        state.isSuccessResApplication = payload.success;
        state.isErrorApplication = payload.error;
        state.errorMsgApplication = payload.message;
      }
    },
    [getApplication.pending]: (state) => {
      state.isFetchingApplication = true;
    },
    [getApplication.rejected]: (state, { payload }) => {
      // console.log(payload, "Reject");
      state.isFetchingApplication = false;
      state.isErrorApplication = payload.error;
      state.errorMsgApplication = payload.message;
      state.applicationData = [];
      state.applicationBookingStatus = [];
      state.currentApplicationData = [];
    },
    [applicationOverview.fulfilled]: (state, { payload }) => {
      state.applicationOverviewData = payload.data;
      if (payload.data) {
        state.currentApplicationOverviewData = payload.data.filter(
          (item) => item.ApplicationStatus === "0"
        );
      }
      state.isFetchingApplicationOverview = false;
      state.isSuccessResApplicationOverview = payload.success;
    },
    [applicationOverview.pending]: (state) => {
      state.isFetchingApplicationOverview = true;
    },
    [applicationOverview.rejected]: (state, { payload }) => {
      state.isFetchingApplicationOverview = false;
      state.isErrorApplicationOverview = payload?.error;
      state.errorMsgApplicationOverview = payload?.message;
      state.applicationOverviewData = [];
      state.currentApplicationOverviewData = [];
    },
  },
});

export const {
  clearApplicationState,
  clearApplicationtData,
  clearApplicationOverviewState,
} = applicationSlice.actions;

export const applicationSelector = (state) => state.application;
