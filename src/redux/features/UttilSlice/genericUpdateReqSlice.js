import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEndPoint } from "../../../utils/Common";
import axios from "axios";

export const genericUpdateReq = createAsyncThunk(
    "Utils/genericUpdateReq",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${ApiEndPoint}/OtherRequestDocuments/RequestUpdateApplicant`,
                requestData
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

export const ApplicantReqHistory = createAsyncThunk(
    "Utils/applicantReqHistory",
    async (__, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/OtherRequestDocuments/UpdateApplicantRequestsHistory/${localStorage.getItem(
                    "applicantId"
                )}`
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

//get request data for addcoapplicant other request
export const AddCoApplicantHistory = createAsyncThunk(
    "addCoApplicant/addCoApplicantHistory",
    async (__, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/applicant/coApplicant_history_data/${localStorage.getItem("applicantId")}`
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

//get temp data for add coapplicant during raising form
export const getTempAddCoAppReq = createAsyncThunk(
    "addCoApplicant/getTempAddCoAppReq",
    async (__, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/Applicant/RequestGetCoApplicantDetails/${localStorage.getItem("applicantId")}`
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

//delete add co applicant request if payment not done and kyc is done so, temp request is created
export const cancelAddCoApplicantReq = createAsyncThunk(
    "addCoApplicant/cancelAddCoApplicantReq",
    async (requestID, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/Applicant/RequestDeleteCoApplicantDetails/${localStorage.getItem("applicantId")}/${requestID}`
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

export const GenericReqSlice = createSlice({
    name: "genericRequest",
    initialState: {
        isFetchingGenericUpdateReq: false,
        isSuccessGenericUpdateReq: false,
        isErrorGenericUpdateReq: false,
        genericUpdateReqData: "",
        errorMessageGenericUpdateReq: "",

        isFetchingGetReqHistory: false,
        isSuccessGetReqHistory: false,
        isErrorGetReqHistory: false,
        getReqHistoryData: "",
        errorMessageGetReqHistory: "",
        requestType: "",
        allReqData: "",

        //add co applicant history data intial state
        isFetchingCoApplicantReq: false,
        isSuccessCoApplicantReq: false,
        isErrorCoApplicantReq: false,
        coApplicantReqData: "",
        errorMessageCoApplicantReq: "",

        // get temp co applicant initial state
        isFetchingTempAddCoAppReq: false,
        isSuccessTempAddCoAppReq: false,
        isErrorTempAddCoAppReq: false,
        tempAddCoAppReqData: "",
        errorMessageTempAddCoAppReq: "",

        //delete add co applicant request initial state
        isFetchingDltAddCoAppReq: false,
        isSuccessDltAddCoAppReq: false,
        isErrorDltAddCoAppReq: false,
        dltAddCoAppReqData: "",
        errorMessageDltAddCoAppReq: "",

    },
    reducers: {
        clearGenericUpdateReqState: (state) => {
            state.isFetchingGenericUpdateReq = false;
            state.isSuccessGenericUpdateReq = false;
            state.isErrorGenericUpdateReq = false;
            state.errorMessageGenericUpdateReq = "";
        },
        clearGetReqHistoryState: (state) => {
            state.isFetchingGetReqHistory = false;
            state.isSuccessGetReqHistory = false;
            state.isErrorGetReqHistory = false;
            state.errorMessageGetReqHistory = "";
            state.requestType = "";
            state.allReqData = "";
        },
        clearCoApplicantReqState: (state) => {
            state.isFetchingCoApplicantReq = false;
            state.isSuccessCoApplicantReq = false;
            state.isErrorCoApplicantReq = false;
            state.errorMessageGetReqHistory = "";
            state.errorMessageCoApplicantReq = "";
        },
        clearTempAddCoAppReqState: (state) => {
            state.isSuccessTempAddCoAppReq = false;
            state.isFetchingTempAddCoAppReq = false;
            state.isErrorTempAddCoAppReq = false;
            state.errorMessageTempAddCoAppReq = "";
        },
        clearDltAddCoAppReqState: (state) => {
            state.isFetchingDltAddCoAppReq = false;
            state.isSuccessDltAddCoAppReq = false;
            state.isErrorDltAddCoAppReq = false;
            state.errorMessageDltAddCoAppReq = "";
            state.dltAddCoAppReqData = "";
        }
    },
    extraReducers: {
        [genericUpdateReq.fulfilled]: (state, { payload }) => {
            state.isFetchingGenericUpdateReq = false;
            state.isErrorGenericUpdateReq = payload.error;
            state.errorMessageGenericUpdateReq = payload.message;
            state.isSuccessGenericUpdateReq = payload.success;
            state.genericUpdateReqData = payload.data;
        },
        [genericUpdateReq.pending]: (state) => {
            state.isFetchingGenericUpdateReq = true;
        },
        [genericUpdateReq.rejected]: (state, { payload }) => {
            state.isFetchingGenericUpdateReq = false;
            state.errorMessageGenericUpdateReq = payload.message;
            state.genericUpdateReqErrorData = payload.data;
            state.isErrorGenericUpdateReq = payload.error;
        },
        [ApplicantReqHistory.fulfilled]: (state, { payload }) => {
            state.isFetchingGetReqHistory = false;
            state.isErrorGetReqHistory = payload.error;
            state.errorMessageGetReqHistory = payload.message;
            state.isSuccessGetReqHistory = payload.success;
            state.getReqHistoryData = payload.data[0];
            state.allReqData = payload.data;
            state.requestType = payload.data[0]?.RequestDetails;
        },
        [ApplicantReqHistory.pending]: (state) => {
            state.isFetchingGetReqHistory = true;
        },
        [ApplicantReqHistory.rejected]: (state, { payload }) => {
            state.isFetchingGetReqHistory = false;
            state.getReqHistoryData = payload.data;
            state.isErrorGetReqHistory = payload.error;
            state.errorMessageGetReqHistory = payload.message;
        },

        //add co applicant history data
        [AddCoApplicantHistory.fulfilled]: (state, { payload }) => {
            state.isFetchingCoApplicantReq = false;
            state.isErrorCoApplicantReq = payload.error;
            state.errorMessageCoApplicantReq = payload.message;
            state.isSuccessCoApplicantReq = payload.success;
            state.coApplicantReqData = payload.data;
        },
        [AddCoApplicantHistory.pending]: (state) => {
            state.isFetchingCoApplicantReq = true;
        },
        [AddCoApplicantHistory.rejected]: (state, { payload }) => {
            state.isFetchingCoApplicantReq = false;
            state.errorMessageCoApplicantReq = payload.message;
            state.isErrorCoApplicantReq = payload.error;
        },

        // get temp co applicant during rasing request
        [getTempAddCoAppReq.fulfilled]: (state, { payload }) => {
            state.isFetchingTempAddCoAppReq = false;
            state.isErrorTempAddCoAppReq = payload.error;
            state.errorMessageTempAddCoAppReq = payload.message;
            state.isSuccessTempAddCoAppReq = payload.success;
            state.tempAddCoAppReqData = payload.data;
        },
        [getTempAddCoAppReq.pending]: (state) => {
            state.isFetchingTempAddCoAppReq = true;
        },
        [getTempAddCoAppReq.rejected]: (state, { payload }) => {
            state.isFetchingTempAddCoAppReq = false;
            state.errorMessageTempAddCoAppReq = payload.message;
            state.isErrorTempAddCoAppReq = payload.error;
        },

        //delete add co applicant request if payment not done and kyc is done -- data
        [cancelAddCoApplicantReq.fulfilled]: (state, { payload }) => {
            state.isFetchingDltAddCoAppReq = false;
            state.isErrorDltAddCoAppReq = payload.error;
            state.errorMessageDltAddCoAppReq = payload.message;
            state.isSuccessDltAddCoAppReq = payload.success;
            state.dltAddCoAppReqData = payload.data;
        },
        [cancelAddCoApplicantReq.pending]: (state) => {
            state.isFetchingDltAddCoAppReq = true;
        },
        [cancelAddCoApplicantReq.rejected]: (state, { payload }) => {
            state.isFetchingDltAddCoAppReq = false;
            state.errorMessageDltAddCoAppReq = payload.message;
            state.isErrorDltAddCoAppReq = payload.error;
        },
    },
});

export const { clearGenericUpdateReqState, clearGetReqHistoryState, clearCoApplicantReqState, clearTempAddCoAppReqState, clearDltAddCoAppReqState } =
    GenericReqSlice.actions;

export const GenericUpdateReqSliceSelector = (state) => state.genericRequest;
