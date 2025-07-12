import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// import { ApiEndPoint } from "./ApplicantAuthSlice";

const ApiEndPointFamilyDetails = ApiEndPoint + "/FamilyDetails/";

export const addFamilyMember = createAsyncThunk(
  "familyMember/addFamilyMember",
  async (familyMemberData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointFamilyDetails,
        familyMemberData
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

export const editFamilyMember = createAsyncThunk(
  "familyMember/editFamilyMember",
  async (familyMemberData, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPointFamilyDetails + localStorage.getItem("familyMemberId"),
        familyMemberData
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

export const deleteFamilyMember = createAsyncThunk(
  "familyMember/deleteFamilyMember",
  async (familyMemberId, thunkAPI) => {
    try {
      const response = await axios.delete(
        ApiEndPointFamilyDetails + familyMemberId
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

export const getFamilyMembers = createAsyncThunk(
  "familyMember/getFamilyMembers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointFamilyDetails +
        "ApplicantFamily/" +
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
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const applicantFamilyInfoSlice = createSlice({
  name: "applicantFamilyInfo",
  initialState: {
    isFetchingFamilyMember: false,
    isSuccessFamilyMembers: false,
    isErrorFamilyMember: false,
    errorMsgFamilyMember: "",
    familyMembersData: [],
    isSuccessAddMember: false,
    addMemberData: {},
    isSuccessEditMember: false,
    editMemberData: {},
    isSuccessDeleteMember: false,
    jointOwnerExist: false,
  },
  reducers: {
    clearFamilyState: (state) => {
      state.isFetchingFamilyMember = false;
      state.isSuccessFamilyMembers = false;
      state.isErrorFamilyMember = false;
      state.errorMsgFamilyMember = "";
      state.isSuccessAddMember = false;
      state.isSuccessEditMember = false;
    },
    clearFamilyData: (state) => {
      state.addMemberData = {};
      state.editMemberData = {};
      state.familyMembersData = [];
    },
    setJointowner: (state, action) => {
      state.jointOwnerExist = action.payload;
    },
  },
  extraReducers: {
    [addFamilyMember.fulfilled]: (state, { payload }) => {
      state.addMemberData = payload.data[0];
      state.isFetchingFamilyMember = false;
      state.isSuccessAddMember = payload.success;
    },
    [addFamilyMember.pending]: (state) => {
      state.isFetchingFamilyMember = true;
    },
    [addFamilyMember.rejected]: (state, { payload }) => {
      state.isFetchingFamilyMember = false;
      state.isErrorFamilyMember = true;
      state.errorMsgFamilyMember = payload.message;
    },
    [editFamilyMember.fulfilled]: (state, { payload }) => {
      state.editMemberData = payload.data[0];
      state.isFetching = false;
      state.isSuccessEditMember = payload.success;
    },
    [editFamilyMember.pending]: (state) => {
      state.isFetching = true;
    },
    [editFamilyMember.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMsgFamilyMember = payload.message;
    },
    [deleteFamilyMember.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccessDeleteMember = payload.success;
    },
    [deleteFamilyMember.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteFamilyMember.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMsgFamilyMember = payload.message;
    },
    [getFamilyMembers.fulfilled]: (state, { payload }) => {
      state.familyMembersData = payload.data;
      state.isFetchingFamilyMember = false;
      state.isSuccessFamilyMembers = payload.success;
    },
    [getFamilyMembers.pending]: (state) => {
      state.isFetchingFamilyMember = true;
      state.familyMembersData = [];
      state.isSuccessFamilyMembers = false;
    },
    [getFamilyMembers.rejected]: (state, { payload }) => {
      state.isSuccessFamilyMembers = false;
      state.isErrorFamilyMember = true;
      state.errorMsgFamilyMember = payload.message;
    },
  },
});

export const { clearFamilyState, clearFamilyData, setJointowner } =
  applicantFamilyInfoSlice.actions;

export const familyMemberSelector = (state) => state.applicantFamilyInfo;
