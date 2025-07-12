import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";



// export const getRecentBids = createAsyncThunk(
//     "liveBid/getRecentBids",
//     async (id, thunkAPI) => {
//         try {
//             const data = {
//                 ProjectId: id
//             }
//             const response = await axios.post(ApiEndPoint + "/Auction/getBids", data);
//             let responseData = await response.data;
//             if (response.status === 200) {
//                 return responseData;
//             } else {
//                 return thunkAPI.rejectWithValue(responseData);
//             }
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.response.data);
//         }
//     }
// );

export const saveCorporate = createAsyncThunk(
    "nonIndividual/saveCorporate",
    async (requestData, thunkAPI) => {
        try {
           
            const response = await axios.post(ApiEndPoint + "/Applicant/saveCompanyDetails", requestData);
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


// get Coroporate details  
export const getCorporate = createAsyncThunk(
    "nonIndividual/getCorporate",
    async (_, thunkAPI) => {
        try {
           
            const response = await axios.get(ApiEndPoint + "/Applicant/Coorporate_Details/" + localStorage.getItem('applicantId'));
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

// get legal status option

export const getLegalStatus = createAsyncThunk(
    "nonIndividual/getLegalStatus",
    async (_, thunkAPI) => {
        try {
            let data = {
                ApplicantId: localStorage.getItem('applicantId')
              };
            const response = await axios.get(ApiEndPoint + "/Auction/get_legal_status" ,data);
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
// Bidder Get Details Data
export const getBidderSelectionData = createAsyncThunk(
    "nonIndividual/getbidderData",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(
          ApiEndPoint +
          "/Auction/get_bidder_details/" +
          localStorage.getItem("applicantId") 
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
  
export const nonIndividualSlice = createSlice({
    name: "nonIndividual",
    initialState: {
        //eauction get recents bids of a project
        // isFetchingRecentBids: false,
        // isSuccessRecentBids: false,
        // isErrorRecentBids: false,
        // recentBidsData: [],
        // errorMessageRecentBids: "",
        //eauction Save Corporate
        isFetchingSaveCorporate: false,
        isSuccessSaveCorporate: false,
        isErrorSaveCorporate: false,
        saveCorporateData: [],
        errorMessageSaveCorporate: "",
        // get corporate data
        isFetchingGetCorporate: false,
        isSuccessGetCorporate: false,
        isErrorGetCorporate: false,
        getCorporateData: [],
        errorMessageGetCorporate: "",
        // get bidder data
        isFetchingGetBidderData: false,
        isSuccessGetBidderData: false,
        isErrorGetBidderData: false,
        getBidderData: [],
        errorMessageGetBidderData: "",
// get legal data
isFetchingGetLegalStatus: false,
isSuccessGetLegalStatus: false,
isErrorGetLegalStatus: false,
getLegalStatusData: [],
errorMessageGetLegalStatus: "",

    },
    reducers: {
        // clearRecentBidsState: (state) => {
        //     state.isFetchingRecentBids = false;
        //     state.isSuccessRecentBids = false;
        //     state.isErrorRecentBids = false;
        //     state.errorMessageRecentBids = "";
        //     state.recentBidsData = [];
        // },
        clearsaveCorporateState: (state) => {
            state.isFetchingSaveCorporate = false;
            state.isSuccessSaveCorporate = false;
            state.isErrorSaveCorporate = false;
            state.errorMessageSaveCorporate = "";
            state.saveCorporateData = []
        },
        cleargetCorporateState: (state) => {
            state.isFetchingGetCorporate = false;
            state.isSuccessGetCorporate = false;
            state.isErrorGetCorporate = false;
            state.errorMessageGetCorporate = "";
            state.getCorporateData = [];

        },
        cleargetBidderState: (state) => {
            state.isFetchingGetBidderData = false;
            state.isSuccessGetBidderData = false;
            state.isErrorGetBidderData = false;
            state.errorMessageGetBidderData = "";
            state.getBidderData = [];

        },
        cleargetLegalStatusState: (state) => {
            state.isFetchingGetLegalStatus = false;
            state.isSuccessGetLegalStatus = false;
            state.isErrorGetLegalStatus = false;
            state.errorMessageGetLegalStatus = "";
            state.getLegalStatusData = [];

        },
    },
    extraReducers: {
        // [getRecentBids.fulfilled]: (state, { payload }) => {
        //     state.isFetchingRecentBids = false;
        //     state.isErrorRecentBids = payload.error;
        //     state.errorMessageRecentBids = payload.message;
        //     state.isSuccessRecentBids = payload.success;
        //     state.recentBidsData = payload.data;
        // },
        // [getRecentBids.pending]: (state) => {
        //     state.isFetchingRecentBids = true;
        // },
        // [getRecentBids.rejected]: (state, { payload }) => {
        //     state.isFetchingRecentBids = false;
        //     state.errorMessageRecentBids = payload.message;
        //     state.isErrorRecentBids = payload.error;
        // },
        [saveCorporate.fulfilled]: (state, { payload }) => {
            state.isFetchingSaveCorporate = false;
            state.isErrorSaveCorporate = payload.error;
            state.errorMessageSaveCorporate = payload.message;
            state.isSuccessSaveCorporate = payload.success;
            state.saveCorporateData = payload.data;
        },
        [saveCorporate.pending]: (state) => {
            state.isFetchingSaveCorporate = true;
        },
        [saveCorporate.rejected]: (state, { payload }) => {
            state.isFetchingSaveCorporate = false;
            state.errorMessageSaveCorporate = payload.message;
            state.isErrorSaveCorporate = payload.error;
        },
        [getCorporate.fulfilled]: (state, { payload }) => {
            state.isFetchingGetCorporate = false;
            state.isErrorGetCorporate = payload.error;
            state.errorMessageGetCorporate = payload.message;
            state.isSuccessGetCorporate = payload.success;
            state.getCorporateData = payload.data;
          
        },
        [getCorporate.pending]: (state) => {
            state.isFetchingGetCorporate = true;
        },
        [getCorporate.rejected]: (state, { payload }) => {
            state.isFetchingGetCorporate = false;
            state.errorMessageGetCorporate = payload.message;
            state.isErrorGetCorporate = payload.error;
        },
        //get Bidder Data 

        [ getBidderSelectionData.fulfilled]: (state, { payload }) => {
            state.isFetchingGetBidderData = false;
            state.isErrorGetBidderData = payload.error;
            state.errorMessageGetBidderData = payload.message;
            state.isSuccessGetBidderData = payload.success;
            state.getBidderData = payload.data;
          
        },
        [ getBidderSelectionData.pending]: (state) => {
            state.isFetchingGetBidderData = true;
        },
        [ getBidderSelectionData.rejected]: (state, { payload }) => {
            state.isFetchingGetBidderData = false;
            state.errorMessageGetBidderData = payload.message;
            state.isErrorGetBidderData = payload.error;
        },
        [getLegalStatus.fulfilled]: (state, { payload }) => {
            state.isFetchingGetLegalStatus = false;
            state.isErrorGetLegalStatus = payload.error;
            state.errorMessageGetLegalStatus = payload.message;
            state.isSuccessGetLegalStatus = payload.success;
            state.getLegalStatusData = payload.data;
          
        },
        [getLegalStatus.pending]: (state) => {
            state.isFetchingGetLegalStatus = true;
        },
        [getLegalStatus.rejected]: (state, { payload }) => {
            state.isFetchingGetLegalStatus = false;
            state.errorMessageGetLegalStatus = payload.message;
            state.isErrorGetLegalStatus = payload.error;
        },
    },
});

export const {  clearsaveCorporateState, cleargetCorporateState,cleargetBidderState } = nonIndividualSlice.actions;

export const NonIndividualSelector = (state) => state.nonIndividual;