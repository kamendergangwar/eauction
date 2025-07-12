import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";



export const saveDecleration = createAsyncThunk(
    "applyProject/savedecleration",
    async (data, thunkAPI) => {
        try {
           
            const response = await axios.post(ApiEndPoint + "/ApplyNow/apply_now/"+ localStorage.getItem('applicantId')+"/"+localStorage.getItem('productId'),data );
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

// export const placeBid = createAsyncThunk(
//     "applyProject/placeBid",
//     async (requestData, thunkAPI) => {
//         try {
//             const response = await axios.post(ApiEndPoint + "/Auction/addBid", requestData);
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



export const applyProjectSlice = createSlice({
    name: "applyProject",
    initialState: {
        //eauction save Decleration Step for the project
        isFetchingSaveDecleration: false,
        isSuccessSaveDecleration: false,
        isErrorSaveDecleration: false,
        saveDeclerationData: [],
        errorMessageSaveDecleration: "",
        //eauction place bid
        // isFetchingPlaceBid: false,
        // isSuccessPlaceBid: false,
        // isErrorPlaceBid: false,
        // placeBidData: [],
        // errorMessagePlaceBid: "",
    },
    reducers: {
        clearSaveDeclerationState: (state) => {
            state.isFetchingSaveDecleration = false;
            state.isSuccessSaveDecleration = false;
            state.isErrorSaveDecleration = false;
            state.errorMessageSaveDecleration = "";
            state.saveDeclerationData = [];
        },
        // clearPlaceBidState: (state) => {
        //     state.isFetchingPlaceBid = false;
        //     state.isSuccessPlaceBid = false;
        //     state.isErrorPlaceBid = false;
        //     state.errorMessagePlaceBid = "";
        //     state.placeBidData = []
        // },
    },
    extraReducers: {
        [saveDecleration.fulfilled]: (state, { payload }) => {
            state.isFetchingSaveDecleration = false;
            state.isErrorSaveDecleration = payload.error;
            state.errorMessageSaveDecleration = payload.message;
            state.isSuccessSaveDecleration = payload.success;
            state.saveDeclerationData = payload.data;
        },
        [saveDecleration.pending]: (state) => {
            state.isFetchingSaveDecleration = true;
        },
        [saveDecleration.rejected]: (state, { payload }) => {
            state.isFetchingSaveDecleration = false;
            state.errorMessageSaveDecleration = payload.message;
            state.isErrorSaveDecleration = payload.error;
        },
        // [placeBid.fulfilled]: (state, { payload }) => {
        //     state.isFetchingPlaceBid = false;
        //     state.isErrorPlaceBid = payload.error;
        //     state.errorMessagePlaceBid = payload.message;
        //     state.isSuccessPlaceBid = payload.success;
        //     state.placeBidData = payload.data;
        // },
        // [placeBid.pending]: (state) => {
        //     state.isFetchingPlaceBid = true;
        // },
        // [placeBid.rejected]: (state, { payload }) => {
        //     state.isFetchingPlaceBid = false;
        //     state.errorMessagePlaceBid = payload.message;
        //     state.isErrorPlaceBid = payload.error;
        // },
    },
});

export const { clearSaveDeclerationState, } = applyProjectSlice.actions;

export const ApplyProjectSelector = (state) => state.applyProject;