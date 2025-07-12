import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";

export const razorpayCreateTrans = createAsyncThunk(
  "razorpayPaymentGateway/razorpayCreateTrans",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/Payment/createtrans",
        params
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

//---------FCFS craete trans ------------
export const applicationPaymentCreateTrans = createAsyncThunk(
  "razorpayPaymentGateway/applicationPaymentCreateTrans",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint +
          "/ApplicationTransaction/createTransaction?Lang=" +
          localStorage.getItem("i18nextLng"),
        params
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

//---------E-auction Fee craete trans ------------
export const eauctionPaymentCreateTrans = createAsyncThunk(
  "razorpayPaymentGateway/e-auctionPaymentCreateTrans",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
         ApiEndPoint +'/AllApplicationTransations/createTransaction?Lang='+ localStorage.getItem("i18nextLng"),
        params
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

export const flatPaymentCreateTrans = createAsyncThunk(
  "razorpayPaymentGateway/nocPaymentCreateTrans",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint +
          "/NocTransaction/createNocTransaction?Lang=" +
          localStorage.getItem("i18nextLng"),
        params
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

export const initRazorpayPaymentGateways = createAsyncThunk(
  "razorpayPaymentGateway/initRazorpayPaymentGateways",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(ApiEndPoint + "/Payment/init", params);
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

export const sendRazorpayResponse = createAsyncThunk(
  "razorpayPaymentGateway/sendRazorpayResponse",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/Payment/response",
        params
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

export const razorpayTransmode = createAsyncThunk(
  "razorpayPaymentGateway/razorpayTransmode",
  async (params, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPoint +
          "/Payment/transmode" +
          "?Lang=" +
          localStorage.getItem("i18nextLng"),
        params
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

export const sbiTransmode = createAsyncThunk(
  "sbigetway/sbi_request",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/SbiGetway/sbi_request",
        params
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

export const sbiTrasactionDetails = createAsyncThunk(
  "sbigetway/sbiTrasactionDetails",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint + "/SbiGetway/trasactionDetails",
        params
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

//FCFS sbi request
export const applicationPaymentSbiTransmode = createAsyncThunk(
  "sbigetway/application_payment_sbi_request",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint +
          "/ApplicationTransaction/sbi_request_emd_auction",
        params
      // const response = await axios.post(
      //   "http://localhost/rest-api/applicationservice/ApplicationTransaction/sbi_request_applicationFees?Lang=" +
      //     localStorage.getItem("i18nextLng"),
      //   params
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

//Eauction sbi request
export const eauctionPaymentSbiTransmode = createAsyncThunk(
  "sbigetway/eauction_payment_sbi_request",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
         ApiEndPoint +'/AllApplicationTransations/sbi_request',
        params
      // const response = await axios.post(
      //   "http://localhost/rest-api/applicationservice/ApplicationTransaction/sbi_request_applicationFees?Lang=" +
      //     localStorage.getItem("i18nextLng"),
      //   params
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

export const flatPaymentSbiTransmode = createAsyncThunk(
  "sbigetway/flat_payment_sbi_request",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint +
          "/NocTransaction/sbi_request_flatFees?Lang=" +
          localStorage.getItem("i18nextLng"),
          params
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

//FCFS SBI TRANSACTION DETAILS
export const applicationFeeSbiTransDetails = createAsyncThunk(
  "sbigetway/applicationFeeSbiTransDetails",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint +
          "/ApplicationTransaction/emdProjectTrasactionDetails",
        params
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

// eauction fees sbi trans response
export const eauctionFeeSbiTransDetails = createAsyncThunk(
  "sbigetway/eauctionFeeSbiTransDetails",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint +
          "/AllApplicationTransations/TrasactionDetails",
        params
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


export const nocSbiTransDetails = createAsyncThunk(
  "sbigetway/nocSbiTransDetails",
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(
        ApiEndPoint +
          "/NocTransaction/NocTrasactionDetails?Lang=" +
          localStorage.getItem("i18nextLng"),
        params
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
export const documentapiverify = createAsyncThunk(
  "DocumentVerification/documentapiverify",
  async (params, thunkAPI) => {
    try {
      const response = await axios.put(
        ApiEndPoint +
        "/DocumentVerification/documentapiverify",
        {
          "ApplicantId": localStorage.getItem("applicantId")
        }
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

export const razorpayPaymentGatewaySlice = createSlice({
  name: "razorpayPaymentGateway",
  initialState: {
    isFetchingRazorpayCreateTrans: false,
    isSuccessResRazorpayCreateTrans: false,
    isErrorRazorpayCreateTrans: false,
    errorMsgRazorpayCreateTrans: "",
    razorpayCreateTransData: {},
    //
    isFetchingRazorpayPaymentInit: false,
    isSuccessResRazorpayPaymentInit: false,
    isErrorRazorpayPaymentInit: false,
    errorMsgRazorpayPaymentInit: "",
    razorpayPaymentInitData: {},
    //
    isFetchingRazorpayAfterPayment: false,
    isSuccessResRazorpayAfterPayment: false,
    isErrorRazorpayAfterPayment: false,
    errorMsgRazorpayAfterPayment: "",
    razorpayAfterPaymentData: {},

    isFetchingRazorpayTransmode: false,
    isSuccessResRazorpayTransmode: false,
    isErrorRazorpayTransmode: false,
    errorMsgRazorpayTransmode: "",
    razorpayTransmodeData: {},

    isFetchingSbiTrasactionDetails: false,
    isSuccessResSbiTrasactionDetails: false,
    isErrorSbiTrasactionDetails: false,
    errorMsgSbiTrasactionDetails: "",
    sbiTrasactionDetailsData: {},

    isFetchingSbiTransmode: false,
    isSuccessResSbiTransmode: false,
    isErrorSbiTransmode: false,
    errorMsgSbiTransmode: "",
    sbiTransmodeData: {},

    //FCFS create trans
    isFetchingApplicationPaymentCreateTrans: false,
    isSuccessResApplicationPaymentCreateTrans: false,
    isErrorApplicationPaymentCreateTrans: false,
    errorMsgApplicationPaymentCreateTrans: "",
    applicationPaymentCreateTransData: {},

    //E-acution Fees create trans
    isFetchingEauctionPaymentCreateTrans: false,
    isSuccessResEauctionPaymentCreateTrans: false,
    isErrorEauctionPaymentCreateTrans: false,
    errorMsgEauctionPaymentCreateTrans: "",
    eauctionPaymentCreateTransData: {},

    //Flat create trans
    isFetchingFlatPaymentCreateTrans: false,
    isSuccessResFlatPaymentCreateTrans: false,
    isErrorFlatPaymentCreateTrans: false,
    errorMsgFlatPaymentCreateTrans: "",
    flatPaymentCreateTransData: {},

    isFetchingFlatPaymentSbiTransmode: false,
    isSuccessFlatPaymentResSbiTransmode: false,
    isErrorFlatPaymentSbiTransmode: false,
    errorMsgFlatPaymentSbiTransmode: "",
    flatPaymentsbiTransmodeData: {},

    //FCFS SBI request
    isFetchingApplicationPaymentSbiTransmode: false,
    isSuccessApplicationPaymentResSbiTransmode: false,
    isErrorApplicationPaymentSbiTransmode: false,
    errorMsgApplicationPaymentSbiTransmode: "",
    applicationPaymentsbiTransmodeData: {},
    //E-auction Fee  SBI request
    isFetchingEauctionPaymentSbiTransmode: false,
    isSuccessEauctionPaymentResSbiTransmode: false,
    isErrorEauctionPaymentSbiTransmode: false,
    errorMsgEauctionPaymentSbiTransmode: "",
    eauctionPaymentsbiTransmodeData: {},

    //FCFS SBI trans detail
    isFetchingApplicationFeeSbiTransDetails: false,
    isSuccessResApplicationFeeSbiTransDetails: false,
    isErrorApplicationFeeSbiTransDetails: false,
    errorMsgApplicationFeeSbiTransDetails: false,
    applicationFeeSbiTransDetailsData: {},

    //eauction fees trans detail
    isFetchingEauctionFeeSbiTransDetails: false,
    isSuccessResEauctionFeeSbiTransDetails: false,
    isErrorEauctionFeeSbiTransDetails: false,
    errorMsgEauctionFeeSbiTransDetails: false,
    eauctionFeeSbiTransDetailsData: {},

    //NOC trans detail
    isFetchingNocSbiTransDetails: false,
    isSuccessResNocSbiTransDetails: false,
    isErrorNocSbiTransDetails: false,
    errorMsgNocSbiTransDetails: false,
    nocSbiTransDetailsData: {},
  },
  reducers: {
    clearRazorpayCreateTransState: (state) => {
      state.isFetchingRazorpayCreateTrans = false;
      state.isSuccessResRazorpayCreateTrans = false;
      state.isErrorRazorpayCreateTrans = false;
      state.errorMsgRazorpayCreateTrans = "";
    },
    clearRazorpayPaymentGatewayState: (state) => {
      state.isFetchingRazorpayPaymentInit = false;
      state.isSuccessResRazorpayPaymentInit = false;
      state.isErrorRazorpayPaymentInit = false;
      state.errorMsgRazorpayPaymentInit = "";
    },
    clearRazorpayAfterPaymentStates: (state) => {
      state.isFetchingRazorpayAfterPayment = false;
      state.isSuccessResRazorpayAfterPayment = false;
      state.isErrorRazorpayAfterPayment = false;
      state.errorMsgRazorpayAfterPayment = "";
    },
    clearRazorpayTransmodeStates: (state) => {
      state.isFetchingRazorpayTransmode = false;
      state.isSuccessResRazorpayTransmode = false;
      state.isErrorRazorpayTransmode = false;
      state.errorMsgRazorpayTransmode = "";
    },
    clearSbiTransmodeStates: (state) => {
      state.isFetchingSbiTransmode = false;
      state.isSuccessResSbiTransmode = false;
      state.isErrorSbiTransmode = false;
      state.errorMsgSbiTransmode = "";

      state.isFetchingSbiTrasactionDetails = false;
      state.isSuccessResSbiTrasactionDetails = false;
      state.isErrorSbiTrasactionDetails = false;
      state.errorMsgSbiTrasactionDetails = "";
      state.sbiTrasactionDetailsData = {};
    },

    //FCFS SBI
    clearApplicationPaymentSbiTransmodeStates: (state) => {
      state.isFetchingApplicationPaymentSbiTransmode = false;
      state.isSuccessApplicationPaymentResSbiTransmode = false;
      state.isErrorApplicationPaymentSbiTransmode = false;
      state.errorMsgApplicationPaymentSbiTransmode = "";

      state.isFetchingApplicationFeeSbiTransDetails = false;
      state.isSuccessResApplicationFeeSbiTransDetails = false;
      state.isErrorApplicationFeeSbiTransDetails = false;
      state.errorMsgApplicationFeeSbiTransDetails = "";
      state.applicationFeeSbiTransDetailsData = {};
      
    },

    clearEauctionPaymentSbiTransmodeStates: (state) => {
      state.isFetchingEauctionPaymentSbiTransmode = false;
      state.isSuccessEauctionPaymentResSbiTransmode = false;
      state.isErrorEauctionPaymentSbiTransmode = false;
      state.errorMsgEauctionPaymentSbiTransmode = "";

      state.isFetchingEauctionFeeSbiTransDetails = false;
      state.isSuccessResEauctionFeeSbiTransDetails = false;
      state.isErrorEauctionFeeSbiTransDetails = false;
      state.errorMsgEauctionFeeSbiTransDetails = "";
      state.eauctionFeeSbiTransDetailsData = {};
    },
    
    clearFlatPaymentSbiTransmodeStates: (state) => {
      state.isFetchingFlatPaymentSbiTransmode = false;
      state.isSuccessFlatPaymentResSbiTransmode = false;
      state.isErrorFlatPaymentSbiTransmode = false;
      state.errorMsgFlatPaymentSbiTransmode = "";

      
      state.isFetchingNocSbiTransDetails = false;
      state.isSuccessResNocSbiTransDetails = false;
      state.isErrorNocSbiTransDetails = false;
      state.errorMsgNocSbiTransDetails = "";
      state.nocSbiTransDetailsData = {};
    },

    

    clearRazorpayPaymentGatewayData: (state) => {
      state.razorpayCreateTransData = {};
      state.applicationPaymentCreateTransData = {};
      state.flatPaymentCreateTransData = {};
      state.razorpayPaymentInitData = {};
      state.razorpayTransmodeData = {};
    },
    setApplicationsForRazorpayPaymentGateway: (state, action) => {
      state.razorpayPaymentInitData.push(action.payload);
    },
    //FCFS changes
    clearApplicationPaymentCreateTransState: (state) => {
      state.isFetchingApplicationPaymentCreateTrans = false;
      state.isSuccessResApplicationPaymentCreateTrans = false;
      state.isErrorApplicationPaymentCreateTrans = false;
      state.errorMsgApplicationPaymentCreateTrans = "";
    },
     //E-auction changes
     clearEauctionPaymentCreateTransState: (state) => {
      state.isFetchingEauctionPaymentCreateTrans = false;
      state.isSuccessResEauctionPaymentCreateTrans = false;
      state.isErrorEauctionPaymentCreateTrans = false;
      state.errorMsgEauctionPaymentCreateTrans = "";
    },
    clearFlatPaymentCreateTransState: (state) => {
      state.isFetchingFlatPaymentCreateTrans = false;
      state.isSuccessResFlatPaymentCreateTrans = false;
      state.isErrorFlatPaymentCreateTrans = false;
      state.errorMsgFlatPaymentCreateTrans = "";
    },
  },
  extraReducers: {
    [razorpayCreateTrans.fulfilled]: (state, { payload }) => {
      state.isFetchingRazorpayCreateTrans = false;
      state.isSuccessResRazorpayCreateTrans = payload.success;
      state.razorpayCreateTransData = payload.data;
    },
    [razorpayCreateTrans.pending]: (state) => {
      state.isFetchingRazorpayCreateTrans = true;
    },
    [razorpayCreateTrans.rejected]: (state, { payload }) => {
      state.isFetchingRazorpayCreateTrans = false;
      state.isErrorRazorpayCreateTrans = payload.error;
      state.errorMsgRazorpayCreateTrans = payload.message;
    },
    // FCFS Create Trans
    [applicationPaymentCreateTrans.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicationPaymentCreateTrans = false;
      state.isSuccessResApplicationPaymentCreateTrans = payload.success;
      state.applicationPaymentCreateTransData = payload.data;
    },
    [applicationPaymentCreateTrans.pending]: (state) => {
      state.isFetchingApplicationPaymentCreateTrans = true;
    },
    [applicationPaymentCreateTrans.rejected]: (state, { payload }) => {
      state.isFetchingApplicationPaymentCreateTrans = false;
      state.isErrorApplicationPaymentCreateTrans = payload.error;
      state.errorMsgApplicationPaymentCreateTrans = payload.message;
    },

    // E-auction Create Trans
    [eauctionPaymentCreateTrans.fulfilled]: (state, { payload }) => {
      state.isFetchingEauctionPaymentCreateTrans = false;
      state.isSuccessResEauctionPaymentCreateTrans = payload.success;
      state.eauctionPaymentCreateTransData = payload.data;
    },
    [eauctionPaymentCreateTrans.pending]: (state) => {
      state.isFetchingEauctionPaymentCreateTrans = true;
    },
    [eauctionPaymentCreateTrans.rejected]: (state, { payload }) => {
      state.isFetchingEauctionPaymentCreateTrans = false;
      state.isErrorEauctionPaymentCreateTrans = payload.error;
      state.errorMsgEauctionPaymentCreateTrans = payload.message;
    },
    [flatPaymentCreateTrans.fulfilled]: (state, { payload }) => {
      state.isFetchingFlatPaymentCreateTrans = false;
      state.isSuccessResFlatPaymentCreateTrans = payload.success;
      state.flatPaymentCreateTransData = payload.data;
    },
    [flatPaymentCreateTrans.pending]: (state) => {
      state.isFetchingFlatPaymentCreateTrans = true;
    },
    [flatPaymentCreateTrans.rejected]: (state, { payload }) => {
      state.isFetchingFlatPaymentCreateTrans = false;
      state.isErrorFlatPaymentCreateTrans = payload.error;
      state.errorMsgFlatPaymentCreateTrans = payload.message;
    },
    //
    [initRazorpayPaymentGateways.fulfilled]: (state, { payload }) => {
      state.isFetchingRazorpayPaymentInit = false;
      state.isSuccessResRazorpayPaymentInit = payload.success;
      state.razorpayPaymentInitData = payload.data;
    },
    [initRazorpayPaymentGateways.pending]: (state) => {
      state.isFetchingRazorpayPaymentInit = true;
    },
    [initRazorpayPaymentGateways.rejected]: (state, { payload }) => {
      state.isFetchingRazorpayPaymentInit = false;
      state.isErrorRazorpayPaymentInit = payload.error;
      state.errorMsgRazorpayPaymentInit = payload.message;
    },
    //
    [sendRazorpayResponse.fulfilled]: (state, { payload }) => {
      state.isFetchingRazorpayAfterPayment = false;
      state.isSuccessResRazorpayAfterPayment = payload.success;
      state.razorpayAfterPaymentData = payload.data;
      state.isErrorRazorpayAfterPayment = payload.error;
      state.errorMsgRazorpayAfterPayment = payload.message;
    },
    [sendRazorpayResponse.pending]: (state) => {
      state.isFetchingRazorpayAfterPayment = true;
    },
    [sendRazorpayResponse.rejected]: (state, { payload }) => {
      state.isFetchingRazorpayAfterPayment = false;
      state.isErrorRazorpayAfterPayment = payload.error;
      state.errorMsgRazorpayAfterPayment = payload.message;
    },
    //
    [razorpayTransmode.fulfilled]: (state, { payload }) => {
      state.isFetchingRazorpayTransmode = false;
      state.isSuccessResRazorpayTransmode = payload.success;
      state.razorpayTransmodeData = payload.data;
    },
    [razorpayTransmode.pending]: (state) => {
      state.isFetchingRazorpayTransmode = true;
    },
    [razorpayTransmode.rejected]: (state, { payload }) => {
      state.isFetchingRazorpayTransmode = false;
      state.isSuccessResRazorpayTransmode = payload.success;
      state.isErrorRazorpayTransmode = payload.error;
      state.errorMsgRazorpayTransmode = payload.message;
      state.razorpayTransmodeData = {};
    },

    [sbiTransmode.fulfilled]: (state, { payload }) => {
      state.isFetchingSbiTransmode = false;
      state.isSuccessResSbiTransmode = payload.success;
      state.sbiTransmodeData = payload.data;
    },
    [sbiTransmode.pending]: (state) => {
      state.isFetchingSbiTransmode = true;
    },
    [sbiTransmode.rejected]: (state, { payload }) => {
      state.isFetchingSbiTransmode = false;
      state.isSuccessResSbiTransmode = payload.success;
      state.isErrorSbiTransmode = payload.error;
      state.errorMsgSbiTransmode = payload.message;
      state.sbiTransmodeData = {};
    },

    [sbiTrasactionDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingSbiTrasactionDetails = false;
      state.isSuccessResSbiTrasactionDetails = payload.success;
      state.sbiTrasactionDetailsData = payload.data;
    },
    [sbiTrasactionDetails.pending]: (state) => {
      state.isFetchingSbiTrasactionDetails = true;
    },
    [sbiTrasactionDetails.rejected]: (state, { payload }) => {
      state.isFetchingSbiTrasactionDetails = false;
      state.isSuccessResSbiTrasactionDetails = payload.success;
      state.isErrorSbiTrasactionDetails = payload.error;
      state.errorMsgSbiTrasactionDetails = payload.message;
      state.sbiTrasactionDetailsData = {};
    },

    //FCFS sbi request gateway
    [applicationPaymentSbiTransmode.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicationPaymentSbiTransmode = false;
      state.isSuccessApplicationPaymentResSbiTransmode = payload.success;
      state.applicationPaymentsbiTransmodeData = payload.data;
      state.errorMsgApplicationPaymentSbiTransmode = payload.message;
      state.isErrorApplicationPaymentSbiTransmode = payload.error;
    },
    [applicationPaymentSbiTransmode.pending]: (state) => {
      state.isFetchingApplicationPaymentSbiTransmode = true;
    },
    [applicationPaymentSbiTransmode.rejected]: (state, { payload }) => {
      state.isFetchingApplicationPaymentSbiTransmode = false;
      state.isSuccessApplicationPaymentResSbiTransmode = payload.success;
      state.isErrorApplicationPaymentSbiTransmode = payload.error;
      state.errorMsgApplicationPaymentSbiTransmode = payload.message;
      state.applicationPaymentsbiTransmodeData = {};
    },


     //E-acution Fess sbi request gateway
     [eauctionPaymentSbiTransmode.fulfilled]: (state, { payload }) => {
      state.isFetchingEauctionPaymentSbiTransmode = false;
      state.isSuccessEauctionPaymentResSbiTransmode = payload.success;
      state.eauctionPaymentsbiTransmodeData = payload.data;
      state.errorMsgEauctionPaymentSbiTransmode = payload.message;
      state.isErrorEauctionPaymentSbiTransmode = payload.error;
    },
    [eauctionPaymentSbiTransmode.pending]: (state) => {
      state.isFetchingEauctionPaymentSbiTransmode = true;
    },
    [eauctionPaymentSbiTransmode.rejected]: (state, { payload }) => {
      state.isFetchingEauctionPaymentSbiTransmode = false;
      state.isSuccessEauctionPaymentResSbiTransmode = payload.success;
      state.isErrorEauctionPaymentSbiTransmode = payload.error;
      state.errorMsgEauctionPaymentSbiTransmode = payload.message;
      state.eauctionPaymentsbiTransmodeData = {};
    },
    
    [flatPaymentSbiTransmode.fulfilled]: (state, { payload }) => {
      state.isFetchingFlatPaymentSbiTransmode = false;
      state.isSuccessFlatPaymentResSbiTransmode = payload.success;
      state.flatPaymentsbiTransmodeData = payload.data;
      state.errorMsgFlatPaymentSbiTransmode = payload.message;
      state.isErrorFlatPaymentSbiTransmode = payload.error;
    },
    [flatPaymentSbiTransmode.pending]: (state) => {
      state.isFetchingFlatPaymentSbiTransmode = true;
    },
    [flatPaymentSbiTransmode.rejected]: (state, { payload }) => {
      state.isFetchingFlatPaymentSbiTransmode = false;
      state.isSuccessFlatPaymentResSbiTransmode = payload.success;
      state.isErrorFlatPaymentSbiTransmode = payload.error;
      state.errorMsgFlatPaymentSbiTransmode = payload.message;
      state.flatPaymentsbiTransmodeData = {};
    },

    //fcfs sbi trans detail
    [applicationFeeSbiTransDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicationFeeSbiTransDetails = false;
      state.isSuccessResApplicationFeeSbiTransDetails = payload.success;
      state.applicationFeeSbiTransDetailsData = payload.data;
    },
    [applicationFeeSbiTransDetails.pending]: (state) => {
      state.isFetchingApplicationFeeSbiTransDetails = true;
    },
    [applicationFeeSbiTransDetails.rejected]: (state, { payload }) => {
      state.isFetchingApplicationFeeSbiTransDetails = false;
      state.isSuccessResApplicationFeeSbiTransDetails = payload.success;
      state.isErrorApplicationFeeSbiTransDetails = payload.error;
      state.errorMsgApplicationFeeSbiTransDetails = payload.message;
      state.applicationFeeSbiTransDetailsData = {};
    },
    // e-auction trans detail
    [eauctionFeeSbiTransDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingEauctionFeeSbiTransDetails = false;
      state.isSuccessResEauctionFeeSbiTransDetails = payload.success;
      state.eauctionFeeSbiTransDetailsData = payload.data;
    },
    [eauctionFeeSbiTransDetails.pending]: (state) => {
      state.isFetchingEauctionFeeSbiTransDetails = true;
    },
    [eauctionFeeSbiTransDetails.rejected]: (state, { payload }) => {
      state.isFetchingEauctionFeeSbiTransDetails = false;
      state.isSuccessResEauctionFeeSbiTransDetails = payload.success;
      state.isErrorEauctionFeeSbiTransDetails = payload.error;
      state.errorMsgEauctionFeeSbiTransDetails = payload.message;
      state.eauctionFeeSbiTransDetailsData = {};
    },
    [nocSbiTransDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingNocSbiTransDetails = false;
      state.isSuccessResNocSbiTransDetails = payload.success;
      state.nocSbiTransDetailsData = payload.data;
    },
    [nocSbiTransDetails.pending]: (state) => {
      state.isFetchingNocSbiTransDetails = true;
    },
    [nocSbiTransDetails.rejected]: (state, { payload }) => {
      state.isFetchingNocSbiTransDetails = false;
      state.isSuccessResNocSbiTransDetails = payload.success;
      state.isErrorNocSbiTransDetails = payload.error;
      state.errorMsgNocSbiTransDetails = payload.message;
      state.nocSbiTransDetailsData = {};
    },
  },
});

export const {
  clearRazorpayCreateTransState,
  clearApplicationPaymentCreateTransState,
  clearFlatPaymentCreateTransState,
  clearRazorpayPaymentGatewayState,
  clearRazorpayPaymentGatewayData,
  setApplicationsForRazorpayPaymentGateway,
  clearRazorpayAfterPaymentStates,
  clearRazorpayTransmodeStates,
  clearSbiTransmodeStates,
  clearApplicationPaymentSbiTransmodeStates,
  clearFlatPaymentSbiTransmodeStates,
  clearEauctionPaymentSbiTransmodeStates,
} = razorpayPaymentGatewaySlice.actions;

export const razorpayPaymentGatewaySelector = (state) =>
  state.razorpayPaymentGateway;
