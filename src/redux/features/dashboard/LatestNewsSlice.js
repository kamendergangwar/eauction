import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint, ProjectApiEndPoint } from "../../../utils/Common";
// import { apiEndPoint } from "../applicant/ApplicantAuthSlice";

const ApiEndPointLatestNews = ProjectApiEndPoint + "posts";


export const getLatestNewsListDummy = () => {
  var locText = localStorage.getItem("i18nextLng");
  var catCode = 38;
  if (locText === "hi") {
    catCode = 45;
  }
  if (locText === "mr") {
    catCode = 43;
  }
  return new Promise((resolve, reject) => {
    axios.get(`${ApiEndPointLatestNews}?per_page=10&categories=${catCode}`).then((result) => {
      if (result) {
        resolve(result);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};

export const getLatestNewsList = createAsyncThunk("latestNews/getLatestNewsList", async (_, thunkAPI) => {
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
  name: "latestNews",
  initialState: {
    isFetchingLatestNews: false,
    isSuccessResLatestNews: false,
    isSuccessReqLatestNews: false,
    isErrorLatestNews: false,
    errorMsgLatestNews: "",
    latestNewsData: [],
  },
  reducers: {
    clearLatestNewsState: (state) => {
      state.isFetchingLatestNews = false;
      state.isSuccessResLatestNews = false;
      state.isSuccessReqLatestNews = false;
      state.isErrorLatestNews = false;
      state.errorMsgLatestNews = "";
    },
    clearLatestNewstData: (state) => {
      state.latestNewsData = [];
    },
  },
  extraReducers: {
    [getLatestNewsList.fulfilled]: (state, { payload }) => {
      state.latestNewsData = payload.data;
      state.isFetchingLatestNews = false;
      state.isSuccessReqLatestNews = payload.success;
    },
    [getLatestNewsList.pending]: (state) => {
      state.isFetchingLatestNews = true;
    },
    [getLatestNewsList.rejected]: (state, { payload }) => {
      state.isFetchingLatestNews = false;
      state.isErrorLatestNews = payload.error;
      state.errorMsgLatestNews = payload.message;
    }
  },
});

export const { clearLatestNewsState, clearLatestNewstData } = latestNewsSlice.actions;

export const latestNewsSelector = (state) => state.latestNews;
