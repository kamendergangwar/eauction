import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEndPoint } from "../../../utils/Common";
import axios from "axios";

export const genericPaymentSummary = createAsyncThunk(
    "Utils/GenericTransaction",
    async (type, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/AllApplicationTransations/paymentSummary/${localStorage.getItem("applicantId")}?RequestType=${type}&Lang=${localStorage.getItem("i18nextLng")}`
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

export const genericCreateTrans = createAsyncThunk(
    "Utils/GenericCreateTrans",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${ApiEndPoint}/AllApplicationTransations/createTransaction/${localStorage.getItem("applicantId")}?Lang=${localStorage.getItem("i18nextLng")}`,
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

export const genericSbiReq = createAsyncThunk(
    "Utils/GenericSbiReq",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${ApiEndPoint}/AllApplicationTransations/sbi_request?Lang=${localStorage.getItem("i18nextLng")}`,
                requestData
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

export const genericTransDetail = createAsyncThunk(
    "Utils/GenericTransDetail",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${ApiEndPoint}/AllApplicationTransations/TrasactionDetails`,
                requestData
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


export const GenericTransactionSlice = createSlice({
    name: "genericTransaction",
    initialState: {
        isFetchingGenericPaySummary: false,
        isSuccessGenericPaySummary: false,
        isErrorGenericPaySummary: false,
        genericPaySummaryData: [],
        errorMessageGenericPaySummary: "",

        isFetchingGenericCreateTrans: false,
        isSuccessGenericCreateTrans: false,
        isErrorGenericCreateTrans: false,
        genericCreateTransData: [],
        errorMessageGenericCreateTrans: "",

        isFetchingGenericSbiReq: false,
        isSuccessGenericSbiReq: false,
        isErrorGenericSbiReq: false,
        genericSbiReqData: [],
        errorMessageGenericSbiReq: "",

        isFetchingGenericTransDetail: false,
        isSuccessGenericTransDetail: false,
        isErrorGenericTransDetail: false,
        genericTransDetailData: [],
        errorMessageGenericTransDetail: ""
    },
    reducers: {
        clearGenericPaySummaryState: (state) => {
            state.isFetchingGenericPaySummary = false;
            state.isSuccessGenericPaySummary = false;
            state.isErrorGenericPaySummary = false;
            state.errorMessageGenericPaySummary = "";
        },
        clearGenericCreateTransState: (state) => {
            state.isFetchingGenericCreateTrans = false;
            state.isSuccessGenericCreateTrans = false;
            state.isErrorGenericCreateTrans = false;
            state.errorMessageGenericCreateTrans = "";
        },
        clearGenericSbiReqState: (state) => {
            state.isFetchingGenericSbiReq = false;
            state.isSuccessGenericSbiReq = false;
            state.isErrorGenericSbiReq = false;
            state.errorMessageGenericSbiReq = "";
        },
        clearGenericTransDetailState: (state) => {
            state.isFetchingGenericTransDetail = false;
            state.isSuccessGenericTransDetail = false;
            state.isErrorGenericTransDetail = false;
            state.errorMessageGenericTransDetail = "";
        },
    },
    extraReducers: {
        [genericPaymentSummary.fulfilled]: (state, { payload }) => {
            state.isFetchingGenericPaySummary = false;
            state.isErrorGenericPaySummary = payload.error;
            state.errorMessageGenericPaySummary = payload.message;
            state.isSuccessGenericPaySummary = payload.success;
            state.genericPaySummaryData = payload.data;
        },
        [genericPaymentSummary.pending]: (state) => {
            state.isFetchingGenericPaySummary = true;
        },
        [genericPaymentSummary.rejected]: (state, { payload }) => {
            state.isFetchingGenericPaySummary = false;
            state.errorMessageGenericPaySummary = payload.message;
            state.isErrorGenericPaySummary = payload.error;
        },
        [genericCreateTrans.fulfilled]: (state, { payload }) => {
            state.isFetchingGenericCreateTrans = false;
            state.isErrorGenericCreateTrans = payload.error;
            state.errorMessageGenericCreateTrans = payload.message;
            state.isSuccessGenericCreateTrans = payload.success;
            state.genericCreateTransData = payload.data;
        },
        [genericCreateTrans.pending]: (state) => {
            state.isFetchingGenericCreateTrans = true;
        },
        [genericCreateTrans.rejected]: (state, { payload }) => {
            state.isFetchingGenericCreateTrans = false;
            state.errorMessageGenericCreateTrans = payload.message;
            state.isErrorGenericCreateTrans = payload.error;
        },
        [genericSbiReq.fulfilled]: (state, { payload }) => {
            state.isFetchingGenericSbiReq = false;
            state.isErrorGenericSbiReq = payload.error;
            state.errorMessageGenericSbiReq = payload.message;
            state.isSuccessGenericSbiReq = payload.success;
            state.genericSbiReqData = payload.data;
        },
        [genericSbiReq.pending]: (state) => {
            state.isFetchingGenericSbiReq = true;
        },
        [genericSbiReq.rejected]: (state, { payload }) => {
            state.isFetchingGenericSbiReq = false;
            state.errorMessageGenericSbiReq = payload.message;
            state.isErrorGenericTransDetail = payload.error;
        },
        [genericTransDetail.fulfilled]: (state, { payload }) => {
            state.isFetchingGenericTransDetail = false;
            state.isErrorGenericTransDetail = payload.error;
            state.errorMessageGenericTransDetail = payload.message;
            state.isSuccessGenericTransDetail = payload.success;
            state.genericTransDetailData = payload.data;
        },
        [genericTransDetail.pending]: (state) => {
            state.isFetchingGenericTransDetail = true;
        },
        [genericTransDetail.rejected]: (state, { payload }) => {
            state.isFetchingGenericTransDetail = false;
            state.errorMessageGenericTransDetail = payload.message;
            state.genericTransDetailData = payload.data;
            state.isErrorGenericTransDetail = payload.error;
        },
    },
});

export const { clearGenericPaySummaryState, clearGenericCreateTransState, clearGenericSbiReqState, clearGenericTransDetailState } = GenericTransactionSlice.actions;

export const GenericTransactionSelector = (state) => state.genericTransaction;