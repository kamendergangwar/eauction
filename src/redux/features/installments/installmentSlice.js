import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEndPoint } from "../../../utils/Common";
import axios from "axios";

//all installment detail data get api
export const getInstallments = createAsyncThunk(
    "installment/get",
    async (__, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/PostLottery/ApplicantPaymentSchedule/${localStorage.getItem("applicantId")}`
                // "https://rest.cidcohomes.com/restapi/applicationservice/PostLottery/ApplicantPaymentSchedule/19"
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

//installmet get payment summary api
export const getInstallmentSummary = createAsyncThunk(
    "installment/getInstallmentSummary",
    async (request, thunkAPI) => {
        try {
            const response = await axios.get(
                `${ApiEndPoint}/InstallmentsTransactions/paymentSummary/${localStorage.getItem("applicantId")}/?RequestType=PayInstallment&installmentId=${request.id}&installmentNumber=${request.number} `
                // `https://rest.cidcohomes.com/restapi/applicationservice/InstallmentsTransactions/paymentSummary/19/?RequestType=PayInstallment&installmentId=${request.id}&installmentNumber=${request.number} `
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

//installment create trans api
export const installmentCreateTrans = createAsyncThunk(
    "installment/installmentCreateTrans",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${ApiEndPoint}/InstallmentsTransactions/createTransaction`,
                // `https://rest.cidcohomes.com/restapi/applicationservice/InstallmentsTransactions/createTransaction`, 
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

//sbi payment gateway api
export const installmentSbiReq = createAsyncThunk(
    "installment/installmentSbiReq",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${ApiEndPoint}/InstallmentsTransactions/sbi_request`,
                // 'https://rest.cidcohomes.com/restapi/applicationservice/InstallmentsTransactions/sbi_request',
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

//get installment transaction detail api
export const installmentTransDetail = createAsyncThunk(
    "installment/installmentTransDetail",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${ApiEndPoint}/InstallmentsTransactions/TrasactionDetails`,
                // `https://rest.cidcohomes.com/restapi/applicationservice/InstallmentsTransactions/TrasactionDetails`,
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

export const InstallmentSlice = createSlice({
    name: "installments",
    initialState: {
        //get isntallmets data initial state
        isFetchingInstallment: false,
        isSuccessInstallment: false,
        isErrorInstallment: false,
        errorMessageInstallment: "",
        installmentData: {},

        //installmet get payment summary intial state
        isFetchingSummary: false,
        isSuccessSummary: false,
        isErrorSummary: false,
        errorMessageSummary: "",
        summaryData: {},

        //installment create trans intial state
        isFetchingCreateTrans: false,
        isSuccessCreateTrans: false,
        isErrorCreateTrans: false,
        errorMessageCreateTrans: "",
        createTransData: {},

        //sbi payment gateway api intial state
        isFetchingSbiReq: false,
        isSuccessSbiReq: false,
        isErrorSbiReq: false,
        errorMessageSbiReq: "",
        sbiReqData: {},

        //installment transaction detail api intial state
        isFetchingTransDetail: false,
        isSuccessTransDetail: false,
        isErrorTransDetail: false,
        errorMessageTransDetail: "",
        transDetailData: {},
    },
    reducers: {
        clearInstallmentState: (state) => {
            state.isFetchingInstallment = false;
            state.isSuccessInstallment = false;
            state.isErrorInstallment = false;
            state.errorMessageInstallment = "";
        },
        clearInstallmentData: (state) => {
            state.installmentData = {};
        },
        clearInstallmentTransState: (state) => {
            state.isFetchingSummary = false;
            state.isSuccessSummary = false;
            state.isErrorSummary = false;
            state.errorMessageSummary = "";
            state.isFetchingCreateTrans = false;
            state.isSuccessCreateTrans = false;
            state.isErrorCreateTrans = false;
            state.errorMessageCreateTrans = "";
            state.createTransData = {};
            state.isFetchingSbiReq = false;
            state.isSuccessSbiReq = false;
            state.isErrorSbiReq = false;
            state.errorMessageSbiReq = "";
            state.sbiReqData = {};
        },
        clearInstallmentTransData: (state) => {
            state.sbiReqData = {};
            state.createTransData = {};
            state.sbiReqData = {};
        },
        clearTransDetailState: (state) => {
            state.isFetchingTransDetail = false;
            state.isSuccessTransDetail = false;
            state.isErrorTransDetail = false;
            state.errorMessageTransDetail = "";
        },
        clearTransDetailData: (state) => {
            state.transDetailData = {};
        },
    },
    extraReducers: {
        //get installments data api
        [getInstallments.fulfilled]: (state, { payload }) => {
            state.isFetchingInstallment = false;
            state.isErrorInstallment = payload.error;
            state.errorMessageInstallment = payload.message;
            state.isSuccessInstallment = payload.success;
            state.installmentData = payload.data;
        },
        [getInstallments.pending]: (state) => {
            state.isFetchingInstallment = true;
        },
        [getInstallments.rejected]: (state, { payload }) => {
            state.isFetchingInstallment = false;
            state.errorMessageInstallment = payload.message;
            state.isErrorInstallment = payload.error;
        },
        //pay summary api
        [getInstallmentSummary.fulfilled]: (state, { payload }) => {
            state.isFetchingSummary = false;
            state.isErrorSummary = payload.error;
            state.errorMessageSummary = payload.message;
            state.isSuccessSummary = payload.success;
            state.summaryData = payload.data;
        },
        [getInstallmentSummary.pending]: (state) => {
            state.isFetchingSummary = true;
        },
        [getInstallmentSummary.rejected]: (state, { payload }) => {
            state.isFetchingSummary = false;
            state.errorMessageSummary = payload.message;
            state.isErrorSummary = payload.error;
        },
        //create trans api
        [installmentCreateTrans.fulfilled]: (state, { payload }) => {
            state.isFetchingCreateTrans = false;
            state.isErrorCreateTrans = payload.error;
            state.errorMessageCreateTrans = payload.message;
            state.isSuccessCreateTrans = payload.success;
            state.createTransData = payload.data;
        },
        [installmentCreateTrans.pending]: (state) => {
            state.isFetchingCreateTrans = true;
        },
        [installmentCreateTrans.rejected]: (state, { payload }) => {
            state.isFetchingCreateTrans = false;
            state.errorMessageCreateTrans = payload.message;
            state.isErrorCreateTrans = payload.error;
        },
        //sbi payment gateway api
        [installmentSbiReq.fulfilled]: (state, { payload }) => {
            state.isFetchingSbiReq = false;
            state.isErrorSbiReq = payload.error;
            state.errorMessageSbiReq = payload.message;
            state.isSuccessSbiReq = payload.success;
            state.sbiReqData = payload.data;
        },
        [installmentSbiReq.pending]: (state) => {
            state.isFetchingSbiReq = true;
        },
        [installmentSbiReq.rejected]: (state, { payload }) => {
            state.isFetchingSbiReq = false;
            state.errorMessageSbiReq = payload.message;
            state.isErrorSbiReq = payload.error;
        },
        //installmet trans detail api
        [installmentTransDetail.fulfilled]: (state, { payload }) => {
            state.isFetchingTransDetail = false;
            state.isErrorTransDetail = payload.error;
            state.errorMessageTransDetail = payload.message;
            state.isSuccessTransDetail = payload.success;
            state.transDetailData = payload.data;
        },
        [installmentTransDetail.pending]: (state) => {
            state.isFetchingTransDetail = true;
        },
        [installmentTransDetail.rejected]: (state, { payload }) => {
            state.isFetchingTransDetail = false;
            state.errorMessageTransDetail = payload.message;
            state.isErrorTransDetail = payload.error;
        },
    },
});

export const { clearInstallmentState, clearInstallmentData, clearInstallmentTransState, clearInstallmentTransData, clearTransDetailState, clearTransDetailData } = InstallmentSlice.actions;

export const InstallmentSliceSelector = (state) => state.installments;
