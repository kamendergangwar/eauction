import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBankDetails } from "../../../utils/Common";



export const getBankDetails = createAsyncThunk(
    "bankDetails/getBankDetails",
    async (_, thunkAPI) => {
      try {
        const IFSC = localStorage.getItem("ifsc_code");
        // const response = await axios.get(
        //   ApiBankDetails +
        //     "IFSC/" + "HDFC0004245"+"/" 
        // );
        const response = await axios.get(`${ApiBankDetails}IFSC/${IFSC}/`)
        let responseData = await response.data;
        if (response.status === 200||response.status === 201) {
          return responseData;
        } else {
          return thunkAPI.rejectWithValue(responseData);
        }
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );
// export const getBankDetails = createAsyncThunk('bankInfo/fetchBankInfo', async (ifscCode) => {
//     const response = await axios.get(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode}/`);
//     return response.data;
//   });

  export const bankDetailsSlice = createSlice({
    name: "bankdetail",
    initialState: {
      //eauction Single project listing
      isFetchingbankDetails: false,
      isSuccessbankDetails: false,
      isErrorbankDetails: false,
      bankDetailsData: [],
      errorMessagebankDetails: "",
      
    },
    reducers: {
      clearBankDetailData: (state) => {
        state.isFetchingbankDetails = false;
        state.isSuccessbankDetails = false;
        state.isErrorbankDetails = false;
        state.errorMessagebankDetails = "";
      },
      
    },
    extraReducers: {
      
      [getBankDetails.fulfilled]: (state, { payload }) => {
        state.isFetchingbankDetails = false;
        state.isErrorbankDetails = payload.error;
        state.errorMessagebankDetails = payload.message;
        state.isSuccessbankDetails = payload.success;
        state.bankDetailsData = payload;
      },
      [getBankDetails.pending]: (state) => {
        state.isFetchingbankDetails = true;
      },
      [getBankDetails.rejected]: (state, { payload }) => {
        state.isFetchingbankDetails = false;
        state.errorMessagebankDetails = payload.message;
        state.isErrorbankDetails = payload.error;
      },
      
    },
  });
  
  export const {  clearBankDetailData } = bankDetailsSlice.actions;
  
  export const BankDetailSelector = (state) => state.bankDetails;