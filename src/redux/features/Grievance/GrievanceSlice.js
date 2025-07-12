import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

const ApiEndPointGrievance = ApiEndPoint + "/Grievance";

export const raiseGrievance = createAsyncThunk(
  "grievance / raiseGrievance",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPointGrievance, requestData, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      const responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const getGrievanceDetails = createAsyncThunk(
  "grievance / getGrievanceDetails",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${ApiEndPointGrievance}/details/${requestData}`
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const searchGrievance = createAsyncThunk(
  "grievance / grievanceFilter",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPointGrievance}/grievanceFilter/${localStorage.getItem("applicantId")}?grievanceSearch=${requestData?.searchString}&grievanceType=${requestData?.type}&grievanceStatus=${requestData?.grievanceStatus}`,
        requestData
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const searchGrievanceFilter = createAsyncThunk(
  "grievance / searchGrievanceFilter",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPointGrievance}/search`,
        requestData
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const getGrievanceCategories = createAsyncThunk(
  "grievance / getGrievanceCategories",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(`${ApiEndPointGrievance}/category`);
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const getGrievanceStatus = createAsyncThunk(
  "grievance / getGrievanceStatus",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(`${ApiEndPointGrievance}/status`);
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGrievanceType = createAsyncThunk(
  "grievance / getGrievanceType",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(`${ApiEndPointGrievance}/type`);
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateGrievanceStatus = createAsyncThunk(
  "grievance / updateGrievanceStatus",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.put(
        `${ApiEndPointGrievance}/update_status`,
        requestData,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const getGrievanceLog = createAsyncThunk(
  "grievance / getGrievanceLog",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${ApiEndPointGrievance}/logs/${requestData}`
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const setGrievanceLog = createAsyncThunk(
  "grievance / setGrievanceLog",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPointGrievance}/logs`,
        requestData
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGrievanceList = createAsyncThunk(
  "grievance / getGrievanceList",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${ApiEndPointGrievance}/getGrievances/${localStorage.getItem("applicantId")}?page=1&sortby=desc`
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);


export const getApplicantsGrievancesChat = createAsyncThunk(
  "grievance / getApplicantsGrievancesChat",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${ApiEndPointGrievance}/getApplicantsGrievancesChat/${requestData.caseNumber}`
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const grievanceSlice = createSlice({
  name: "grievance",
  initialState: {
    isFetchingGrievance: false,
    isGrievanceSuccess: false,
    grievanceSuccessMsg: false,
    grievanceData: [],
    isGrievanceError: false,
    grievanceErrorMsg: false,
    isSearchFetching: false,
    issearchSuccess: false,
    searchSuccessMsg: false,
    searchData: [],
    searchError: false,
    searchErrorMsg: false,
    isCategoryFetching: false,
    isCategorySuccess: false,
    categorySuccessMsg: false,
    categoryData: [],
    categoryDataList: [],
    categoryError: false,
    categoryErrorMsg: false,
    isTypeFetching: false,
    isTypeSuccess: false,
    typeSuccessMsg: false,
    typeData: [],
    typeDataList: [],
    typeError: false,
    typeErrorMsg: false,
    isStatusFetching: false,
    isStatusSuccess: false,
    statusSuccessMsg: false,
    statusData: [],

    statusError: false,
    statusErrorMsg: false,
    isLogFetching: false,
    isLogSuccess: false,
    logSuccessMsg: false,
    logData: [],
    logError: false,
    logErrorMsg: false,
    logPost: false,
    logPostData: "",
    isFilterFetching: false,
    isFilterSuccess: false,
    filterData: [],
    isFilterError: false,
    isGetStatusFetching: false,
    isGetStatusSuccess: false,
    statusDataList: [],
    isGetStatusError: false,

    GrievanceListFetching: false,
    GrievanceListSuccess: false,
    GrievanceListSuccessMsg: false,
    GrievanceListData: [],
    GrievanceListError: false,
    GrievanceListErrorMsg: false,

    isFetchingGriDetail: false,
    isGriDetailSuccess: false,
    griDetailSuccessMsg: false,
    GriDetailData: [],
    isGriDetailError: false,
    griDetailErrorMsg: false,

    ChatFetching: false,
    ChatSuccess: false,
    ChatSuccessMsg: false,
    ChatRecords: [],
    ChatError: false,
    ChatErrorMsg: false,
  },
  reducers: {
    clearSuccessMsg: (state) => {
      state.isGrievanceSuccess = false;
      state.grievanceErrorMsg = false;
      state.grievanceData = [];
      state.ChatFetching = false;
      state.ChatSuccess =false;
      state.ChatSuccessMsg = false;
      state.ChatRecords = [];
      state.GrievanceListSuccess = false;
      state.GrievanceListFetching = false;

    },
  },
  extraReducers: {
    [raiseGrievance.fulfilled]: (state, { payload }) => {
      state.isFetchingGrievance = false;
      state.isGrievanceSuccess = payload.success;
      state.grievanceErrorMsg = payload.message;
      state.grievanceData = payload.data;
      //   console.log(state.grievanceData);
    },
    [raiseGrievance.pending]: (state) => {
      state.isFetchingGrievance = true;
      state.isGrievanceError = false;
      state.grievanceErrorMsg = false;
    },
    [raiseGrievance.rejected]: (state, { payload }) => {
      state.isFetchingGrievance = false;
      state.isGrievanceError = true;
      state.grievanceErrorMsg = payload.message;
      state.isGrievanceSuccess = payload.success;
    },
    [getGrievanceDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingGriDetail = false;
      state.isGriDetailSuccess = true;
      state.griDetailSuccessMsg = payload.message;
      state.GriDetailData = payload.data;
      //   console.log(state.grievanceData);
    },
    [getGrievanceDetails.pending]: (state) => {
      state.isFetchingGriDetail = true;
      state.isGriDetailSuccess = false;
    },
    [getGrievanceDetails.rejected]: (state, { payload }) => {
      state.isFetchingGriDetail = false;
      state.isGriDetailError = true;
      state.griDetailErrorMsg = payload.message;
    },
    [searchGrievance.fulfilled]: (state, { payload }) => {
      state.isSearchFetching = false;
      state.issearchSuccess = payload.success;
      state.searchSuccessMsg = payload.message;
      state.searchData = payload.data;
      //   console.log(state.grievanceData);
    },
    [searchGrievance.pending]: (state) => {
      state.isSearchFetching = true;
      state.isGrievanceError = false;
      state.issearchSuccess = false;
    },
    [searchGrievance.rejected]: (state, { payload }) => {
      state.isSearchFetching = false;
      state.searchError = true;
      state.searchErrorMsg = payload.message;
      state.issearchSuccess = payload.success;
      state.searchData = payload.data;
    },

    [getGrievanceCategories.fulfilled]: (state, { payload }) => {
      state.isCategoryFetching = false;
      state.isCategorySuccess = true;
      state.categorySuccessMsg = payload.message;
      state.categoryData = payload.data;
      payload.data.forEach((element) => {
        state.categoryDataList.push({ value: element.id, label: element.name });
      });
      //   console.log(state.grievanceData);
    },
    [getGrievanceCategories.pending]: (state) => {
      state.isCategoryFetching = true;
    },
    [getGrievanceCategories.rejected]: (state, { payload }) => {
      state.isCategoryFetching = false;
      state.categoryError = true;
      state.categoryErrorMsg = payload.message;
    },
    [getGrievanceStatus.fulfilled]: (state, { payload }) => {
      state.isGetStatusFetching = false;
      state.isGetStatusSuccess = true;
      payload.data.forEach((element) => {
        state.statusDataList.push({ value: element.id, label: element.name });
      });
      //   console.log(state.grievanceData);
    },
    [getGrievanceStatus.pending]: (state) => {
      state.isGetStatusFetching = true;
    },
    [getGrievanceStatus.rejected]: (state, { payload }) => {
      state.isGetStatusFetching = false;
      state.isGetStatusError = true;
    },
    /////////////////////////////////////////////////
    [getGrievanceType.fulfilled]: (state, { payload }) => {
      state.isTypeFetching = false;
      state.isTypeSuccess = true;
      state.typeSuccessMsg = payload.message;
      state.typeData = payload.data;
      payload.data.forEach((element) => {
        state.typeDataList.push({ value: element.id, label: element.name });
      });
    },
    [getGrievanceType.pending]: (state) => {
      state.isTypeFetching = true;
    },
    [getGrievanceType.rejected]: (state, { payload }) => {
      state.isTypeFetching = false;
      state.typeError = true;
      state.typeErrorMsg = payload.message;
    },
    [updateGrievanceStatus.fulfilled]: (state, { payload }) => {
      state.isStatusFetching = false;
      state.isStatusSuccess = true;
      state.statusSuccessMsg = payload.message;
      state.statusData = payload.data;

      //   console.log(state.grievanceData);
    },
    [updateGrievanceStatus.pending]: (state) => {
      state.isStatusFetching = true;
      state.isStatusSuccess = false;
      state.statusError = false;
    },
    [updateGrievanceStatus.rejected]: (state, { payload }) => {
      state.isStatusFetching = false;
      state.statusError = true;
      state.statusErrorMsg = payload.message;
    },
    [getGrievanceLog.fulfilled]: (state, { payload }) => {
      state.isLogFetching = false;
      state.isLogSuccess = true;
      state.logSuccessMsg = payload.message;
      state.logData = payload.data;
      //   console.log(state.grievanceData);
    },
    [getGrievanceLog.pending]: (state) => {
      state.isLogFetching = true;
      state.isLogSuccess = false;
    },
    [getGrievanceLog.rejected]: (state, { payload }) => {
      state.isLogsFetching = false;
      state.logError = true;
      state.logErrorMsg = payload.message;
    },
    [setGrievanceLog.fulfilled]: (state, { payload }) => {
      state.logPost = false;
      state.logPostData = payload.data;
    },
    [setGrievanceLog.pending]: (state, { payload }) => {
      state.logPost = true;
    },
    [setGrievanceLog.rejected]: (state, { payload }) => {
      state.logPost = false;
    },

    [searchGrievanceFilter.fulfilled]: (state, { payload }) => {
      state.isFilterFetching = false;
      state.isFilterSuccess = true;
      state.filterData = payload.data;
      //   console.log(state.grievanceData);
    },
    [searchGrievanceFilter.pending]: (state) => {
      state.isFilterFetching = true;
    },
    [searchGrievanceFilter.rejected]: (state, { payload }) => {
      state.isFilterFetching = false;
      state.isFilterError = true;
    },
    [getGrievanceList.fulfilled]: (state, { payload }) => {
      state.GrievanceListFetching = false;
      state.GrievanceListSuccess = true;
      state.GrievanceListData = payload.data;
      state.GrievanceListError = payload.error;
    },
    [getGrievanceList.pending]: (state) => {
      state.GrievanceListFetching = true;
      state.GrievanceListSuccess = false;
    },
    [getGrievanceList.rejected]: (state, { payload }) => {
      state.GrievanceListFetching = false;
      state.GrievanceListError = true;
      state.GrievanceListErrorMsg = payload.message;
    },

    [getApplicantsGrievancesChat.fulfilled]: (state, { payload }) => {
      state.ChatFetching = false;
      state.ChatSuccess = payload.success;
      state.ChatRecords = payload.data;
    },
    [getApplicantsGrievancesChat.pending]: (state) => {
      state.ChatFetching = true;
    },
    [getApplicantsGrievancesChat.rejected]: (state, { payload }) => {
      state.ChatFetching = false;
      state.ChatError = true;
      state.ChatErrorMsg = payload.message;
    },
    
  },
});

export const { clearSuccessMsg } = grievanceSlice.actions;
export const grievanceSelector = (state) => state.grievance;
