import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

const ApiEndPointApplications = ApiEndPoint + "/AgentApplicants/";

export const GetAgentApplicants = createAsyncThunk(
  "agent/AgentApplicants",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointApplications + localStorage.getItem("agentcode") + "?" + localStorage.getItem("applctnsDashboardApiParam") + "&Lang=" + localStorage.getItem("i18nextLng") 
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

export const getAgentReservationCategories = createAsyncThunk(
  "agentApplicant/getAgentReservationCategories",
  async (_, thunkAPI) => {
    try {
      const applicantID = localStorage.getItem("applicantId");
      const response = await axios.get(
        ApiEndPoint +
          "/ReservationCategory?ApplicantId=" + applicantID + "&Lang=" +
          localStorage.getItem("i18nextLng")
      );
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const saveSanctionLetter = createAsyncThunk(
  "agentApplicant/saveSanctionLetter",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + '/AgentApplicants/upload_senction_letter', requestData);
      let responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const AgentApplicantsSlice = createSlice({
  name: "agentApplicants",
  initialState: {
    isFetchingAgentApplicants: false,
    isSuccessResAgentApplicants: false,
    isSuccessReqAgentApplicants: false,
    isErrorAgentApplicants: false,
    errorMsgAgentApplicants: "",
    agentApplicantsData: {},
    isFetchingMasterData: false,
    isSuccessMasterData: false,
    isErrorMasterData: false,
    errorMsgMasterData: "",
    reservationCategoriesData: [],
    castCategory: [],
    reservationCategory: [],
    allCategory: [],

    isFetching: false,
    isSuccess: false,
    isSuccessSent: "",
    isError: false,
    errorMessage: "",
    documentId: {},
  },
  reducers: {
    clearAgentApplicantsState: (state) => {
      state.isFetchingAgentApplicants = false;
      state.isSuccessResAgentApplicants = false;
      state.isSuccessReqAgentApplicants = false;
      state.isErrorAgentApplicants = false;
      state.errorMsgAgentApplicants = "";
      state.isFetching= false;
      state.isSuccess= false;
      state.isError= false;
      state.isSuccessSent= "";
      state.errorMessage= "";
  
    },
    clearAgentApplicantsData: (state) => {
      state.agentApplicantsData = {};
      state.reservationCategoriesData = [];
      state.castCategory = [];
      state.reservationCategory = [];
      state.allCategory = [];
      state.documentId = {};
    },
    clearSanctionSuccessMsg: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [GetAgentApplicants.fulfilled]: (state, { payload }) => {
      state.isFetchingAgentApplicants = false;
      state.agentApplicantsData = payload.data;
      state.isSuccessResAgentApplicants = payload.success;
    },
    [GetAgentApplicants.pending]: (state) => {
      state.isFetchingAgentApplicants = true;
    },
    [GetAgentApplicants.rejected]: (state, { payload }) => {
      state.isFetchingAgentApplicants = false;
      state.isErrorAgentApplicants = payload.error;
      state.errorMessage = payload.message;
    },
    [getAgentReservationCategories.fulfilled]: (state, { payload }) => {
      state.reservationCategoriesData = payload?.data;
      state.castCategory        = [];
      state.reservationCategory = [];
      if(state.reservationCategoriesData) {
        state.reservationCategoriesData.forEach((item) => {
          const newItem = {
            value: item.ResrevationCatId,
            label: item.ReservationCategoryName,
            flatCount: +item.Count,
            infoDetail: JSON.parse(item.ReservationCategoryInfo)
          };
          if (item.ReservationType === "0") {
            state.reservationCategory.push(newItem);
          } else {
            state.castCategory.push(newItem);
          }

          // state.reservationCategory.push(newItem);
          // if (item.ReservationType === "1") {
          //   state.castCategory.push(newItem);
          // }
        });
        state.reservationCategoriesData.forEach((item) => {
          const newItem = {
            value: item.ResrevationCatId,
            label: item.ReservationCategoryName,
            flatCount: +item.Count
          };
          state.allCategory.push(newItem);
        });
      }
      state.isFetchingMasterData = false;
      state.isSuccessMasterData = true;
    },
    [getAgentReservationCategories.pending]: (state) => {
      state.isFetchingMasterData = true;
    },
    [getAgentReservationCategories.rejected]: (state, { payload }) => {
      state.isFetchingMasterData = false;
      state.isSuccessMasterData = false;
      state.isErrorMasterData = true;
      state.reservationCategoriesData = [];
      state.errorMsgMasterData = payload.message;
    },
    [saveSanctionLetter.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isSuccessSent = payload.message;
      state.documentId = payload.data;
    },
    [saveSanctionLetter.pending]: (state) => {
      state.isFetching = true;
      state.documentId = {};
    },
    [saveSanctionLetter.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
      // state.isSuccessSent = false;
    },

  },
});

export const { clearAgentApplicantsState, clearAgentApplicantsData,clearSanctionSuccessMsg } =
AgentApplicantsSlice.actions;

export const agentApplicantSelector = (state) => state.agentApplicants;
