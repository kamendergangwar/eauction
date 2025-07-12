import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";



export const getRecentBids = createAsyncThunk(
    "liveBid/getRecentBids",
    async (id, thunkAPI) => {
        try {
            const data = {
                ProjectId: id
            }
            const response = await axios.post(ApiEndPoint + "/Auction/getBids", data);
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

export const placeBid = createAsyncThunk(
    "liveBid/placeBid",
    async (requestData, thunkAPI) => {
        try {
            const response = await axios.post(ApiEndPoint + "/Auction/addBid", requestData);
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



export const liveBidSlice = createSlice({
    name: "liveBid",
    initialState: {
        //eauction get recents bids of a project
        isFetchingRecentBids: false,
        isSuccessRecentBids: false,
        isErrorRecentBids: false,
        recentBidsData: [],
        errorMessageRecentBids: "",
        //eauction place bid
        isFetchingPlaceBid: false,
        isSuccessPlaceBid: false,
        isErrorPlaceBid: false,
        placeBidData: [],
        errorMessagePlaceBid: "",
    },
    reducers: {
        clearRecentBidsState: (state) => {
            state.isFetchingRecentBids = false;
            state.isSuccessRecentBids = false;
            state.isErrorRecentBids = false;
            state.errorMessageRecentBids = "";
            state.recentBidsData = [];
        },
        clearPlaceBidState: (state) => {
            state.isFetchingPlaceBid = false;
            state.isSuccessPlaceBid = false;
            state.isErrorPlaceBid = false;
            state.errorMessagePlaceBid = "";
            state.placeBidData = []
        },
    },
    extraReducers: {
        [getRecentBids.fulfilled]: (state, { payload }) => {
            state.isFetchingRecentBids = false;
            state.isErrorRecentBids = payload.error;
            state.errorMessageRecentBids = payload.message;
            state.isSuccessRecentBids = payload.success;
            state.recentBidsData = payload.data;
        },
        [getRecentBids.pending]: (state) => {
            state.isFetchingRecentBids = true;
        },
        [getRecentBids.rejected]: (state, { payload }) => {
            state.isFetchingRecentBids = false;
            state.errorMessageRecentBids = payload.message;
            state.isErrorRecentBids = payload.error;
        },
        [placeBid.fulfilled]: (state, { payload }) => {
            state.isFetchingPlaceBid = false;
            state.isErrorPlaceBid = payload.error;
            state.errorMessagePlaceBid = payload.message;
            state.isSuccessPlaceBid = payload.success;
            state.placeBidData = payload.data;
        },
        [placeBid.pending]: (state) => {
            state.isFetchingPlaceBid = true;
        },
        [placeBid.rejected]: (state, { payload }) => {
            state.isFetchingPlaceBid = false;
            state.errorMessagePlaceBid = payload.message;
            state.isErrorPlaceBid = payload.error;
        },
    },
});

export const { clearRecentBidsState, clearPlaceBidState } = liveBidSlice.actions;

export const LiveBidSelector = (state) => state.liveBid;