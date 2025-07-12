import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

export const getDashboardCounts = createAsyncThunk(
    "dashboard/getDashboardCounts",
    async (__, thunkAPI) => {
        try {
            const requestData = { "ApplicantId": localStorage.getItem('applicantId') }
            const response = await axios.post(ApiEndPoint + '/Auction/dashboardCount', requestData);
            let responseData = await response.data;
            if (response.status === 200) {
                return responseData;
            } else {
                return thunkAPI.rejectWithValue(responseData);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const dashboardCountSlice = createSlice({
    name: "dashboardCount",
    initialState: {
        isFetchingDashboardCounts: false,
        isSuccessDashboardCounts: false,
        isErrorDashboardCounts: false,
        errorMessageDashboardCounts: "",
        dashboardCountsData: {},
    },
    reducers: {
        clearDashboardCountState: (state, action) => {
            state.isFetchingDashboardCounts = false;
            state.isSuccessDashboardCounts = false;
            state.isErrorDashboardCounts = false;
            state.errorMessageDashboardCounts = '';
            state.dashboardCountsData = {};
        },
    },
    extraReducers: {
        [getDashboardCounts.fulfilled]: (state, { payload }) => {
            state.isFetchingDashboardCounts = false;
            state.isSuccessDashboardCounts = payload.success;
            state.isErrorDashboardCounts = payload.error;
            state.errorMessageDashboardCounts = payload.message;
            state.dashboardCountsData = payload.data;
        },
        [getDashboardCounts.pending]: (state) => {
            state.isFetchingDashboardCounts = true;
        },
        [getDashboardCounts.rejected]: (state, { payload }) => {
            state.isFetchingDashboardCounts = false;
            state.isSuccessDashboardCounts = false;
            state.isErrorDashboardCounts = true;
            state.errorMessageDashboardCounts = payload?.message;
        },
    },
});

export const { clearDashboardCountState } = dashboardCountSlice.actions;

export const dashboardCountSelector = (state) => state.dashboardCount;
