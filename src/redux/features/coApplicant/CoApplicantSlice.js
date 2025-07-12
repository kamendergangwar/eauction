import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

// import { apiEndPoint } from "./ApplicantAuthSlice";

const ApiEndPointApplicant = ApiEndPoint + "/CoApplicant/";
// const ApiEndPointPanCardDtls = ApiEndPoint + "/PanCardDetails/";

// export const headers = {
//   Authorization: localStorage.getItem("jwtToken"),
// };

export const getCoApplicantDetails = createAsyncThunk(
  "coApplicant/getCoApplicantDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPointApplicant + localStorage.getItem("applicantId") + "?Lang=" + localStorage.getItem("i18nextLng")
        // { headers }
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

export const coApplicantUploadFiles = createAsyncThunk(
  "coApplicant/coApplicantUploadFiles",
  async (applicantData, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPointApplicant + localStorage.getItem("applicantId"), applicantData
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

export const editCoApplicant = createAsyncThunk(
  "coApplicant/editCoApplicant",
  async (applicantData, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPointApplicant + "AddCoApplicant", applicantData
      );
      let responseData = await response.data;
      if (response.status === 201) {
        let res_obj = {
          ...responseData,
          type: applicantData.Type
        };
        return res_obj;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const deleteCoApplicant = createAsyncThunk(
  "coApplicant/deleteCoApplicant",
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(
        ApiEndPointApplicant + localStorage.getItem("applicantId")
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

export const getPreferencesList = createAsyncThunk(
  "coApplicant/getPreferences",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + '/DropDownStatus/projectPrefernce/'+localStorage.getItem("applicantId")
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

export const addApplicantPreferences = createAsyncThunk(
  "coApplicant/addPreferences",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        `${ApiEndPoint}/Applicant/addPreferences/${localStorage.getItem("applicantId")}?dropDownIds=${params}`

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

export const coApplicantSlice = createSlice({
  name: "coApplicant",
  initialState: {
    isFetchingCoApplicantUpload: false,
    isSuccessResCoApplicantUpload: false,
    isErrorCoApplicantUpload: false,
    errorMsgCoApplicantUpload: "",
    coApplicantDataUpload: {},

    isFetchingGetCoApplicant: false,
    isSuccessResGetCoApplicant: false,
    isErrorGetCoApplicant: false,
    errorMsgGetCoApplicant: "",
    coApplicantData: {},

    isFetchingCoApplicantEdit: false,
    isSuccessResCoApplicantEdit: false,
    isErrorCoApplicantEdit: false,
    errorMsgCoApplicantEdit: "",
    coApplicantDataEdit: {},

    isFetchingCoApplicantDelete: false,
    isSuccessResCoApplicantDelete: false,
    isErrorCoApplicantDelete: false,
    errorMsgCoApplicantDelete: "",

    isFetchingGetPreferences: false,
    isSuccessResGetPreferences: false,
    isErrorGetPreferences: false,
    errorMsgGetPreferences: "",
    PreferencesData: {},
  },
  reducers: {
    clearCoApplicantState: (state) => {
      state.isFetchingCoApplicantUpload = false;
      state.isSuccessResCoApplicantUpload = false;
      state.isErrorCoApplicantUpload = false;
      state.errorMsgCoApplicantUpload = "";

      state.isFetchingGetCoApplicant = false;
      state.isSuccessResGetCoApplicant = false;
      state.isErrorGetCoApplicant = false;
      state.errorMsgGetCoApplicant = "";

      state.isFetchingCoApplicantEdit = false;
      state.isSuccessResCoApplicantEdit = false;
      state.isErrorCoApplicantEdit = false;
      state.errorMsgCoApplicantEdit = "";

      state.isFetchingCoApplicantDelete = false;
      state.isSuccessResCoApplicantDelete = false;
      state.isErrorCoApplicantDelete = false;
      state.errorMsgCoApplicantDelete = "";
    },
    clearCoApplicantData: (state) => {
      state.coApplicantData = {};
      state.coApplicantDataEdit = {};
      state.coApplicantDataUpload = {};
    },
  },
  extraReducers: {
    [coApplicantUploadFiles.fulfilled]: (state, { payload }) => {
      state.isFetchingCoApplicantUpload = false;
      state.isSuccessResCoApplicantUpload = payload.success;
      state.coApplicantDataUpload = payload;
    },
    [coApplicantUploadFiles.pending]: (state) => {
      state.isFetchingCoApplicantUpload = true;
      state.isErrorCoApplicantUpload = false;
      state.errorMsgCoApplicantUpload = "";
    },
    [coApplicantUploadFiles.rejected]: (state, { payload }) => {
      state.isFetchingCoApplicantUpload = false;
      state.isErrorCoApplicantUpload = payload.error;
      state.errorMsgCoApplicantUpload = payload.message;
    },
    // 
    [getCoApplicantDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingGetCoApplicant = false;
      /* if (payload.data) {
        state.coApplicantData = payload.data.filter(
          (item) => item.IsActive === "1"
        );
      } */
      state.coApplicantData = payload.data[0];
      state.isSuccessResGetCoApplicant = payload.success;
      state.isErrorGetCoApplicant = payload.error;
      state.errorMsgGetCoApplicant = payload.message;
    },
    [getCoApplicantDetails.pending]: (state) => {
      state.isFetchingGetCoApplicant = true;
      state.coApplicantData = {};
      state.isSuccessResGetCoApplicant = false;
    },
    [getCoApplicantDetails.rejected]: (state, { payload }) => {
      state.isFetchingGetCoApplicant = false;
      state.isErrorGetCoApplicant = payload.error;
      state.errorMsgGetCoApplicant = payload.message;
    },
    // 
    [editCoApplicant.fulfilled]: (state, { payload }) => {
      state.isFetchingCoApplicantEdit = false;
      state.isSuccessResCoApplicantEdit = payload.success;
      state.coApplicantDataEdit = payload;
    },
    [editCoApplicant.pending]: (state) => {
      state.isFetchingCoApplicantEdit = true;
      state.isErrorCoApplicantEdit = false;
      state.errorMsgCoApplicantEdit = "";
    },
    [editCoApplicant.rejected]: (state, { payload }) => {
      state.isFetchingCoApplicantEdit = false;
      state.isErrorCoApplicantEdit = payload.error;
      state.errorMsgCoApplicantEdit = payload.message;
    },
    // 
    [deleteCoApplicant.fulfilled]: (state, { payload }) => {
      state.isFetchingCoApplicantDelete = false;
      state.isSuccessResCoApplicantDelete = payload.success;
      state.isErrorCoApplicantDelete = payload.error;
      state.errorMsgCoApplicantDelete = payload.message;
    },
    [deleteCoApplicant.pending]: (state) => {
      state.isFetchingCoApplicantDelete = true;
      state.isErrorCoApplicantDelete = false;
      state.isSuccessResCoApplicantDelete = false;
      state.errorMsgCoApplicantDelete = "";
    },
    [deleteCoApplicant.rejected]: (state, { payload }) => {
      state.isFetchingCoApplicantDelete = false;
      state.isSuccessResCoApplicantDelete = payload.success;
      state.isErrorCoApplicantDelete = payload.error;
      state.errorMsgCoApplicantDelete = payload.message;
    },

    [getPreferencesList.fulfilled]: (state, { payload }) => {
      state.isFetchingGetPreferences = false;
      state.PreferencesData = payload.data;
      state.isSuccessResGetPreferences = payload.success;
      state.isErrorGetPreferences = payload.error;
      state.errorMsgGetPreferences = payload.message;
    },
    [getPreferencesList.pending]: (state) => {
      state.isFetchingGetPreferences = true;
      state.PreferencesData = {};
      state.isSuccessResGetPreferences = false;
    },
    [getPreferencesList.rejected]: (state, { payload }) => {
      state.isFetchingGetPreferences = false;
      state.isErrorGetPreferences = payload.error;
      state.errorMsgGetPreferences = payload.message;
    },

  },
});

export const { clearCoApplicantState, clearCoApplicantData } =
  coApplicantSlice.actions;

export const coApplicantSelector = (state) => state.coApplicant;
