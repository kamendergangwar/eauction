import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

const ApiEndPointAgentLead = ApiEndPoint + "/AgentCSV/";

export const uploadAgentLeadData = createAsyncThunk(
  "agentLeads/uploadAgentlead",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointAgentLead + "importCSV",
        requestData
      );
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

export const getAgentLeadData = createAsyncThunk(
  "agent/AgentLead",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${ApiEndPointAgentLead}getAgentLeads/${localStorage.getItem("agentcode")}${localStorage.getItem("agentLeadApiParam")}`);
      //+ "?Lang=" + localStorage.getItem("i18nextLng")
      // { headers }
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

export const getLeadComment = createAsyncThunk(
  "agent/AgentLead/getComment",
  async (leadID, thunkAPI) => {
    try {
      const response = await axios.get(`${ApiEndPoint}/AgentLeads/LeadLogs/${localStorage.getItem("agentcode")}?LeadId=${leadID}`);
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

export const addLeadComment = createAsyncThunk(
  "agent/AgentLead/addComment",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/AgentLeads/AddComment",
        requestData
      );
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

export const updateLeadStatus = createAsyncThunk(
  "agent/AgentLead/updateLeadStatus",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.patch(
        ApiEndPoint + `/AgentLeads/ChangeStatus/${localStorage.getItem('agentcode')}`,
        requestData
      );
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

export const agentLeadSlice = createSlice({
  name: "agentLead",
  initialState: {
    isFetchingAgentLead: false,
    isSuccessResAgentLead: false,
    isSuccessReqAgentLead: false,
    isErrorAgentLead: false,
    errorMsgAgentLead: "",
    agentLeadData: {},
    isFetchinguploadAgentLead: false,
    updateAgentLeadData: {},
    isSuccessResuploadAgentLead: false,

    isErroruploadAgentLead: false,
    errorMessageuploadLead: "",
    agentUploadLeadResponse: false,
    successMsgUploadLead: "",

    isFetchingComment: false,
    isSuccessComment: false,
    isErrorComment: false,
    errorMsgComment: "",
    successMsgComment: "",
    commentData: {},

    isFetchingAddComment: false,
    isSuccessAddComment: false,
    isErrorAddComment: false,
    errorMsgAddComment: "",
    successMsgAddComment: "",
    addCommentData: {},

    isFetchingChangeStatus: false,
    isSuccessChangeStatus: false,
    isErrorChangeStatus: false,
    errorMsgChangeStatus: "",
    successMsgChangeStatus: "",
    changeStatusData: {}

  },
  reducers: {
    clearAgentLeadState: (state) => {
      state.isFetchingAgentLead = false;
      state.isSuccessResAgentLead = false;
      state.isSuccessReqAgentLead = false;
      state.isErrorAgentLead = false;
      state.errorMsgAgentLead = "";

    },
    clearUpdateRes: (state) => {
      state.isSuccessResuploadAgentLead = false;
    },
    clearAgentLeadData: (state) => {
      state.agentLeadData = {};
      state.updateAgentLeadData = {};
    },
    clearAgentUploadLeadResponse: (state) => {
      state.agentUploadLeadResponse = false
    },
    clearCommentState: (state) => {
      state.isFetchingAddComment = false;
      state.isSuccessComment = false;
      state.isErrorComment = false;
      state.errorMsgComment = "";
      state.successMsgComment = "";
      state.commentData = {}
    },
    clearAddCommentState: (state) => {
      state.isFetchingComment = false;
      state.isSuccessAddComment = false;
      state.isErrorAddComment = false;
      state.errorMsgAddComment = "";
      state.successMsgAddComment = "";
      // state.addCommentData = {}
    },
    clearChangeStatusState: (state) => {
      state.isFetchingChangeStatus = false;
      state.isSuccessChangeStatus = false;
      state.isErrorChangeStatus = false;
      state.errorMsgChangeStatus = "";
      state.successMsgChangeStatus = "";
      // state.changeStatusData = {}
    }
  },
  // reducers: {
  //   LeadSelectOrDeselect: (state, action) => {
  //     state.isEStampSelected = action.payload;
  //   },
  //   clearSuccessMsg: (state) => {
  //     state.isSuccess = false;
  //   },
  // },
  extraReducers: {
    [getAgentLeadData.fulfilled]: (state, { payload }) => {
      state.isFetchingAgentLead = false;
      state.agentLeadData = payload.data;
      state.isSuccessResAgentLead = payload.success;
    },
    [getAgentLeadData.pending]: (state) => {
      state.isFetchingAgentLead = true;
    },
    [getAgentLeadData.rejected]: (state, { payload }) => {
      state.isFetchingAgentLead = false;
      state.isErrorAgentLead = payload.error;
      state.errorMsgAgentLead = payload.message;
    },
    [uploadAgentLeadData.fulfilled]: (state, { payload }) => {
      state.isFetchingUploadAgentLead = false;
      state.updateAgentLeadData = payload.data;
      state.isSuccessResUploadAgentLead = payload.success;
      state.errorMessageUploadLead = payload.error_logs?.length ? payload.error_logs[0] : [];
      state.agentUploadLeadResponse = payload.message == "" ? false : true;
      state.successMsgUploadLead = payload.message;
      state.isErrorUploadAgentLead = payload.error;
    },
    [uploadAgentLeadData.pending]: (state) => {
      state.isFetchingUploadAgentLead = true;
    },
    [uploadAgentLeadData.rejected]: (state, { payload }) => {
      state.isFetchingUploadAgentLead = false;
      state.isErrorUploadAgentLead = payload.error;
      state.errorMessageUploadLead = payload.message;
    },
    [getLeadComment.fulfilled]: (state, { payload }) => {
      state.isFetchingComment = false;
      state.commentData = payload.data;
      state.isSuccessComment = payload.success;
      state.successMsgComment = payload.message
    },
    [getLeadComment.pending]: (state) => {
      state.isFetchingComment = true;
    },
    [getLeadComment.rejected]: (state, { payload }) => {
      state.isFetchingComment = false;
      state.isErrorComment = payload?.error ? payload?.error : true;
      state.errorMsgComment = payload?.message ? payload?.message : "Something went Wrong.Please try again!";
    },
    [addLeadComment.fulfilled]: (state, { payload }) => {
      state.isFetchingAddComment = false;
      // state.addCommentData = payload.data;
      state.commentData = payload.data;
      state.isSuccessAddComment = payload.success;
      state.successMsgAddComment = payload.message
    },
    [addLeadComment.pending]: (state) => {
      state.isFetchingAddComment = true;
    },
    [addLeadComment.rejected]: (state, { payload }) => {
      state.isFetchingAddComment = false;
      state.isErrorAddComment = payload?.error ? payload?.error : true;
      state.errorMsgAddComment = payload?.message ? payload?.message : "Something went Wrong.Please try again!";
    },
    [updateLeadStatus.fulfilled]: (state, { payload }) => {
      state.isFetchingChangeStatus = false;
      state.changeStatusData = payload.data;
      state.isSuccessChangeStatus = payload.success;
      state.successMsgChangeStatus = payload.message;
      state.isErrorChangeStatus = payload?.error;
      state.errorMsgChangeStatus = payload?.message;
    },
    [updateLeadStatus.pending]: (state) => {
      state.isFetchingChangeStatus = true;
    },
    [updateLeadStatus.rejected]: (state, { payload }) => {
      state.isFetchingChangeStatus = false;
      state.isErrorChangeStatus = payload?.error ? payload?.error : true;
      state.errorMsgChangeStatus = payload?.message ? payload?.message : "Something went Wrong.Please try again!";
    },
  },
});

export const { clearAgentLeadState, clearAgentLeadData, clearUpdateRes, clearAgentUploadLeadResponse, clearCommentState, clearAddCommentState, clearChangeStatusState } = agentLeadSlice.actions;

export const agentLeadSelector = (state) => state.agentLead;
