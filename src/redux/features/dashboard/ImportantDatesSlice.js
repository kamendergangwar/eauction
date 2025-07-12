import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint, ProjectApiEndPoint } from "../../../utils/Common";
// import { apiEndPoint } from "../applicant/ApplicantAuthSlice";

const ApiEndPointLatestNews = ProjectApiEndPoint + "posts";

export const getImpDatesListDummy = () => {
  var locText = localStorage.getItem("i18nextLng");
  var catCode = 40;
  if (locText === "hi") {
    catCode = 49;
  }
  if (locText === "mr") {
    catCode = 47;
  }
  return new Promise((resolve, reject) => {
    axios.get(`${ApiEndPointLatestNews}?per_page=10&categories=${catCode}`).then((result) => {
      if (result) {
        resolve(result);
      }
    })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getLatestNewsList = createAsyncThunk("applicant/getLatestNewsList", async (_, thunkAPI) => {
  try {
    var locText = localStorage.getItem("i18nextLng");
    var catCode = 38;
    if (locText === "hi") {
      catCode = 45;
    }
    if (locText === "mr") {
      catCode = 43;
    }
    const response = await axios.get(ApiEndPointLatestNews + "?per_page=10&categories=" + catCode);
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

export const latestNewsSlice = createSlice({
  name: "application",
  initialState: {
    isFetchingApplication: false,
    isSuccessResApplication: false,
    isSuccessReqApplication: false,
    isErrorApplication: false,
    errorMsgApplication: "",
    latestNewsData: [],
  },
  reducers: {
    clearApplicationState: (state) => {
      state.isFetchingApplication = false;
      state.isSuccessResApplication = false;
      state.isSuccessReqApplication = false;
      state.isErrorApplication = false;
      state.errorMsgApplication = "";
    },
    clearApplicationtData: (state) => {
      state.latestNewsData = [];
    },
  },
  extraReducers: {
    [getLatestNewsList.fulfilled]: (state, { payload }) => {
      state.latestNewsData = payload.data;
      state.isFetchingApplication = false;
      state.isSuccessReqApplication = payload.success;
    },
    [getLatestNewsList.pending]: (state) => {
      state.isFetchingApplication = true;
    },
    [getLatestNewsList.rejected]: (state, { payload }) => {
      state.isFetchingApplication = false;
      state.isErrorApplication = payload.error;
      state.errorMsgApplication = payload.message;
    }
  },
});

export const { clearApplicationState, clearApplicationtData } = latestNewsSlice.actions;

export const importantDatesSelector = (state) => state.application;
