import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiEndPoint } from "../../../utils/Common";
// import { ApiEndPoint } from "../applicant/ApplicantAuthSlice";
const logApiEndPoint = ApiEndPoint + "/crm/opportunity";
const schemeApiEndPoint = ApiEndPoint + "/SchemeDetails/checkSchemeExpiration";

export const createAccountLog = createAsyncThunk(
  "grievance/createAccountLog",
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(`${logApiEndPoint}`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAccessToken = createAsyncThunk(
  "grievance/getAccessToken",
  async (requestData, thunkAPI) => {
    let formData = new FormData();
    formData.append("grant_type", "password");
    formData.append(
      "client_id",
      "3MVG9Nvmjd9lcjRmsTqUQ97gH7um_bI6oMz2mH2TCY9CyZs3tBs8iL1_CS1Q9kCZ.vAoP73Mti3AeGgpWOO3N"
    );
    formData.append(
      "client_secret",
      "647706D99C580B87CD87428CCFF683A4A3DD21F34EAA947079E8D1DCA77E2939"
    );
    formData.append("username", "tech_cloud@helioscart.com.qa");
    formData.append("password", "helioscart2@qacZy8MruLJLMnnAbxmtDf80XL");
    try {
      const response = await axios.post(
        `https://test.salesforce.com/services/oauth2/token`,
        formData
      );
      const responseData = await response.data;
      if (response.status === 200) {
        localStorage.setItem("jwtToken", responseData.access_token);
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMaritalStatusList = createAsyncThunk(
  "masterData/getMaritalStatusList",
  async (Pincode, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/DropDownStatus/MaritalStatus?Lang=" +
          localStorage.getItem("i18nextLng")
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

export const getGenderList = createAsyncThunk(
  "masterData/getGenderList",
  async (Pincode, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/DropDownStatus/Gender?Lang=" +
          localStorage.getItem("i18nextLng")
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


export const getSubReservationCategories = createAsyncThunk(
  "masterData/getSubReservationCategories", 
  async (ReservationCategoryID, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/ReservationCategory/reservationSubCategories/" + ReservationCategoryID + "?Lang=" +
        localStorage.getItem("i18nextLng")
      );
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
)

export const getFamilyRelationshipList = createAsyncThunk(
  "masterData/getFamilyRelationshipList",
  async (MarritalStatus, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/DropDownStatus/FamilyRelationship?Lang=" +
          localStorage.getItem("i18nextLng") +
          "&maritalStatus=" +
          MarritalStatus
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

export const getPincodeDetails = createAsyncThunk(
  "masterData/getPincodeDetails",
  async (Pincode, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/PincodeDetails/" +
          Pincode +
          "?Lang=" +
          localStorage.getItem("i18nextLng")
      );
      let responseData = await response.data;
      if (response.status === 201) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getReservationCategories = createAsyncThunk(
  "masterData/getReservationCategories",
  async (_, thunkAPI) => {
    try {
      const applicantID = localStorage.getItem("applicantId");
      if(+applicantID > 0) {
        const response = await axios.get(
          ApiEndPoint +
            "/ReservationCategory?ApplicantId=" + applicantID + "&Lang=" +
            localStorage.getItem("i18nextLng")
        );
        let responseData = await response.data;
        if (response.status === 200) {
          return responseData;
        } else {
          return thunkAPI.rejectWithValue(responseData);
        }
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getBillingDetails = createAsyncThunk(
  "masterData/getBillingDetails",
  async (IncomeGroup, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/BillingDetails/" +
          IncomeGroup +
          "?Lang=" +
          localStorage.getItem("i18nextLng") + "&ApplicantId=" + localStorage.getItem("applicantId")
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

export const getUserManual = createAsyncThunk(
  "masterData/HelpDeskFiles",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/HelpDeskFiles" + "?Lang=" + params
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

export const getPaymentSummery = createAsyncThunk(
  "masterData/getPaymentSummery",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint +
          "/EMDWorkFlow/paymentsummery?ApplicantId=" +
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


//-----FCFS application payment Summary API-----
export const getApplicationPaymentSummary = createAsyncThunk(
  "masterData/getApplicationPaymentSummary",
  async (data, thunkAPI) => {
    try {
      
      const response = await axios.post(
        ApiEndPoint +
          "/ApplicationTransaction/paymentSummary/" +
          localStorage.getItem("applicantId") +
          "?Lang=" +
          localStorage.getItem("i18nextLng"),data
            
          
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

//E-acution Fees PAyment Summart
export const getEauctionPaymentSummary = createAsyncThunk(
  "masterData/getEauctionPaymentSummary",
  async (data, thunkAPI) => {
    try {
      
      const response = await axios.get(
        ApiEndPoint +
          "/AllApplicationTransations/paymentSummary/" +
          localStorage.getItem("applicantId") +
          '?RequestType=eAuctionFee' 
          
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

export const getBankList = createAsyncThunk(
  "masterData/getBankList",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/EMDWorkFlow/banklist?" + params
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

export const getFeeStructure = createAsyncThunk(
  "masterData/getFeeStructure",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/EMDWorkFlow/feestructure?" + params
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

export const getEChallanPdfFile = createAsyncThunk(
  "masterData/getEChallanPdfFile",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/PDFDownloader/echallan/" + params
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

export const convertAmountToWords = createAsyncThunk(
  "masterData/convertAmountToWords",
  async (Amount, thunkAPI) => {
    try {
      const response = await axios.get(
        ApiEndPoint + "/Applicant/convertAmountToWords/" + Amount
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

export const isSchemeExpired = createAsyncThunk(
  "masterData/isSchemeExpired",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${schemeApiEndPoint}`,
        {
          ApplicantId: localStorage.getItem("applicantId"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      const responseData = await response.data;
      if (response.status === 200) {
        return responseData;
      } else {
        return thunkAPI.rejectWithValue(responseData);
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const masterDataSlice = createSlice({
  name: "masterData",
  initialState: {
    isFetchingMasterData: false,
    isSuccessMasterData: false,
    isErrorMasterData: false,
    errorMsgMasterData: "",
    reservationCategoriesData: [],
    castCategory: [],
    reservationCategory: [],
    allCategory: [],
    billingDetails: [],
    totalBill: 0,
    totalEStampBill: 0,
    pincodeDetailsData: [],
    isFetchingPincode: false,
    isSuccessPincode: false,
    isErrorPincode: false,
    errorMsgPincode: "",

    relationshipListData: [],
    isFetchingRelationship: false,
    isSuccessRelationship: false,
    isErrorRelationship: false,
    errorMsgRelationship: "",

    genderListData: [],
    isFetchingGender: false,
    isSuccessGender: false,
    isErrorGender: false,
    errorMsgGender: "",
    
    SubCategoryListData: [],
    isFetchingSubCategory: false,
    isSuccessSubCategory: false,
    isErrorSubCategory: false,
    errorMsgSubCategory: "",

    maritalStatusListData: [],
    isFetchingMaritalStatus: false,
    isSuccessMaritalStatus: false,
    isErrorMaritalStatus: false,
    errorMsgMaritalStatus: "",

    downloadUsermanual: [],
    isFetchingUsermanual: false,
    isSuccessUsermanual: false,
    isErrorUsermanual: false,
    errorMsgUsermanual: "",

    downloadBanklist: [],
    isFetchingBanklist: false,
    isErrorBanklist: false,
    isSuccessBanklist: false,
    errorMsgBanklist: "",

    dataFeeStrcr: {},
    isFetchingFeeStrcr: false,
    isErrorFeeStrcr: false,
    isSuccessFeeStrcr: false,
    errorMsgFeeStrcr: "",

    dataPaymentSummry: {},
    isFetchingPaymentSummry: false,
    isErrorPaymentSummry: false,
    isSuccessPaymentSummry: false,
    errorMsgPaymentSummry: "",

    dataApplicationPaymentSummry: {},
    isFetchingApplicationPaymentSummry: false,
    isErrorApplicationPaymentSummry: false,
    isSuccessApplicationPaymentSummry: false,
    errorMsgApplicationPaymentSummry: "",
//e-auction Payment summary

dataEauctionPaymentSummry: {},
    isFetchingEauctionPaymentSummry: false,
    isErrorEauctionPaymentSummry: false,
    isSuccessEauctionPaymentSummry: false,
    errorMsgEauctionPaymentSummry: "",

    dataAmountToWords: {},
    isFetchingAmountToWords: false,
    isErrorAmountToWords: false,
    isSuccessAmountToWords: false,
    errorMsgAmountToWords: "",

    dataScheme: {},
    isFetchingScheme: false,
    isErrorScheme: false,
    isSuccessScheme: false,
    errorMsgScheme: "",
  },
  reducers: {
    clearMasterDataState: (state) => {
      state.isFetchingMasterData = false;
      state.isSuccessMasterData = false;
      state.isErrorMasterData = false;
      state.errorMsgMasterData = "";

      state.isFetchingRelationship = false;
      state.isSuccessRelationship = false;
      state.isErrorRelationship = false;
      state.errorMsgRelationship = "";

      state.isFetchingGender = false;
      state.isSuccessGender = false;
      state.isErrorGender = false;
      state.errorMsgGender = "";

      state.isFetchingMaritalStatus = false;
      state.isSuccessMaritalStatus = false;
      state.isErrorMaritalStatus = false;
      state.errorMsgMaritalStatus = "";

      state.isFetchingPincode = false;
      state.isSuccessPincode = false;
      state.isErrorPincode = false;
      state.errorMsgPincode = "";

      state.isFetchingBanklist = false;
      state.isErrorBanklist = false;
      state.isSuccessBanklist = false;
      state.errorMsgBanklist = "";

      state.isFetchingFeeStrcr = false;
      state.isErrorFeeStrcr = false;
      state.isSuccessFeeStrcr = false;
      state.errorMsgFeeStrcr = "";

      state.isFetchingPaymentSummry = false;
      state.isErrorPaymentSummry = false;
      state.isSuccessPaymentSummry = false;
      state.errorMsgPaymentSummry = "";

      state.isFetchingApplicationPaymentSummry = false;
      state.isErrorApplicationPaymentSummry = false;
      state.isSuccessApplicationPaymentSummry = false;
      state.errorMsgApplicationPaymentSummry = "";
    },

    clearMasterDataList: (state) => {
      state.reservationCategoriesData = [];
      state.castCategory = [];
      state.reservationCategory = [];
      state.allCategory = [];
    },
    clearBillingDetails: (state) => {
      state.billingDetails = [];
    },
    clearRelationshipListData: (state) => {
      state.relationshipListData = [];
    },
    clearGenderListData: (state) => {
      state.genderListData = [];
    },
    clearMaritalStatusListData: (state) => {
      state.maritalStatusListData = [];
    },
    calculateTotalBill: (state, action) => {
      state.totalBill = action.payload;
    },
    calculateEStampTotalBill: (state, action) => {
      state.totalEStampBill = action.payload;
    },
    clearBankListData: (state) => {
      state.downloadBanklist = [];
    },
    clearFeeStrcrData: (state) => {
      state.dataFeeStrcr = [];
    },
    clearPaymentSummryData: (state) => {
      state.dataPaymentSummry = [];
    },
    clearApplicationPaymentSummryData: (state) => {
      state.dataApplicationPaymentSummry = [];
    },
    clearEauctionPaymentSummryData: (state) => {
      state.dataEauctionPaymentSummry = [];
    },
    clearUserManualData: (state) => {
      state.downloadUsermanual = [];
    },
  },
  extraReducers: {
    [getMaritalStatusList.fulfilled]: (state, { payload }) => {
      state.maritalStatusListData = payload.data;
      state.isFetchingMaritalStatus = false;
      state.isSuccessMaritalStatus = true;
      state.isErrorMaritalStatus = false;
      state.errorMsgMaritalStatus = "";
    },
    [getMaritalStatusList.pending]: (state) => {
      state.maritalStatusListData = [];
      state.isFetchingMaritalStatus = true;
      state.isSuccessMaritalStatus = false;
    },
    [getMaritalStatusList.rejected]: (state, { payload }) => {
      state.maritalStatusListData = [];
      state.isFetchingMaritalStatus = false;
      state.isSuccessMaritalStatus = false;
      state.isErrorMaritalStatus = true;
      state.errorMsgMaritalStatus = payload.message;
    },
    //
    [getGenderList.fulfilled]: (state, { payload }) => {
      state.genderListData = payload.data;
      state.isFetchingGender = false;
      state.isSuccessGender = true;
      state.isErrorGender = false;
      state.errorMsgGender = "";
    },
    [getGenderList.pending]: (state) => {
      state.genderListData = [];
      state.isFetchingGender = true;
      state.isSuccessGender = false;
    },
    [getGenderList.rejected]: (state, { payload }) => {
      state.genderListData = [];
      state.isFetchingGender = false;
      state.isSuccessGender = false;
      state.isErrorGender = true;
      state.errorMsgGender = payload.message;
    },
    [getSubReservationCategories.fulfilled]: (state, { payload }) => {
      state.SubCategoryListData = payload.data;
      state.isFetchingSubCategory = false;
      state.isSuccessSubCategory = true;
      state.isErrorSubCategory = false;
      state.errorMsgSubCategory = "";
    },
    [getSubReservationCategories.pending]: (state) => {
      state.SubCategoryListData = [];
      state.isFetchingSubCategory = true;
      state.isSuccessSubCategory = false;
    },
    [getSubReservationCategories.rejected]: (state, { payload }) => {
      state.SubCategoryListData = [];
      state.isFetchingSubCategory = false;
      state.isSuccessSubCategory = false;
      state.isErrorSubCategory = true;
      state.errorMsgSubCategory = payload.message;
    },
    //
    [getFamilyRelationshipList.fulfilled]: (state, { payload }) => {
      state.relationshipListData = payload.data;
      state.isFetchingRelationship = false;
      state.isSuccessRelationship = true;
      state.isErrorRelationship = false;
      state.errorMsgRelationship = "";
    },
    [getFamilyRelationshipList.pending]: (state) => {
      state.relationshipListData = [];
      state.isFetchingRelationship = true;
      state.isSuccessRelationship = false;
    },
    [getFamilyRelationshipList.rejected]: (state, { payload }) => {
      state.relationshipListData = [];
      state.isFetchingRelationship = false;
      state.isSuccessRelationship = false;
      state.isErrorRelationship = true;
      state.errorMsgRelationship = payload.message;
    },
    //
    [getPincodeDetails.fulfilled]: (state, { payload }) => {
      state.pincodeDetailsData = payload.data;
      state.isFetchingPincode = false;
      state.isSuccessPincode = true;
      state.isErrorPincode = false;
      state.errorMsgPincode = "";
    },
    [getPincodeDetails.pending]: (state) => {
      state.isFetchingPincode = true;
      state.pincodeDetailsData = [];
      state.isSuccessPincode = false;
    },
    [getPincodeDetails.rejected]: (state, { payload }) => {
      state.isFetchingPincode = false;
      state.isSuccessPincode = false;
      state.isErrorPincode = true;
      state.pincodeDetailsData = [];
      state.errorMsgPincode = payload.message;
    },
    [getReservationCategories.fulfilled]: (state, { payload }) => {
      state.reservationCategoriesData = payload?.data;
      state.castCategory        = [];
      state.reservationCategory = [];
      if(state.reservationCategoriesData) {
        state.reservationCategoriesData.forEach((item) => {
          const newItem = {
            value: item.ResrevationCatId,
            label: item.ReservationCategoryName,
            flatCount: +item.Count,
            infoDetail: JSON.parse(item.ReservationCategoryInfo)
          };
          if (item.ReservationType === "0") {
            state.reservationCategory.push(newItem);
          } else {
            state.castCategory.push(newItem);
          }

          // state.reservationCategory.push(newItem);
          // if (item.ReservationType === "1") {
          //   state.castCategory.push(newItem);
          // }
        });
        state.reservationCategoriesData.forEach((item) => {
          const newItem = {
            value: item.ResrevationCatId,
            label: item.ReservationCategoryName,
            flatCount: +item.Count
          };
          state.allCategory.push(newItem);
        });
      }
      state.isFetchingMasterData = false;
      state.isSuccessMasterData = true;
    },
    [getReservationCategories.pending]: (state) => {
      state.isFetchingMasterData = true;
    },
    [getReservationCategories.rejected]: (state, { payload }) => {
      state.isFetchingMasterData = false;
      state.isSuccessMasterData = false;
      state.isErrorMasterData = true;
      state.reservationCategoriesData = [];
      state.errorMsgMasterData = payload.message;
    },
    [getBillingDetails.fulfilled]: (state, { payload }) => {
      state.isFetchingMasterData = false;
      state.isSuccessMasterData = payload.success;
      state.billingDetails = payload.data;
    },
    [getBillingDetails.pending]: (state) => {
      state.isFetchingMasterData = true;
    },
    [getBillingDetails.rejected]: (state, { payload }) => {
      state.billingDetails = [];
      state.isFetchingMasterData = false;
      state.isSuccessMasterData = payload.success;
      state.isErrorMasterData = true;
      state.errorMsgMasterData = payload.message;
    },
    // getUserManual
    [getUserManual.fulfilled]: (state, { payload }) => {
      state.isFetchingUsermanual = false;
      state.isSuccessUsermanual = payload.success;
      state.downloadUsermanual = payload.data;
    },
    [getUserManual.pending]: (state) => {
      state.isSuccessUsermanual = false;
      state.isFetchingUsermanual = true;
    },
    [getUserManual.rejected]: (state, { payload }) => {
      state.downloadUsermanual = [];
      state.isFetchingUsermanual = false;
      state.isSuccessUsermanual = payload.success;
      state.isErrorUsermanual = true;
      state.errorMsgUsermanual = payload.message;
    },
    // ----
    [getBankList.fulfilled]: (state, { payload }) => {
      state.isFetchingBanklist = false;
      state.isSuccessBanklist = payload.success;
      state.downloadBanklist = payload.data;
      state.isErrorBanklist = payload.error;
      state.errorMsgBanklist = payload.message;
    },
    [getBankList.pending]: (state) => {
      state.isFetchingBanklist = true;
    },
    [getBankList.rejected]: (state, { payload }) => {
      state.downloadBanklist = [];
      state.isFetchingBanklist = false;
      state.isErrorBanklist = payload.error;
      state.errorMsgBanklist = payload.message;
    },
    // ----
    [getFeeStructure.fulfilled]: (state, { payload }) => {
      state.isFetchingFeeStrcr = false;
      state.isSuccessFeeStrcr = payload.success;
      state.dataFeeStrcr = payload.data;
    },
    [getFeeStructure.pending]: (state) => {
      state.isFetchingFeeStrcr = true;
    },
    [getFeeStructure.rejected]: (state, { payload }) => {
      state.dataFeeStrcr = [];
      state.isFetchingFeeStrcr = false;
      state.isErrorFeeStrcr = true;
      state.errorMsgFeeStrcr = payload?.message;
    },
    // ----
    [getPaymentSummery.fulfilled]: (state, { payload }) => {
      state.isFetchingPaymentSummry = false;
      state.isSuccessPaymentSummry = payload.success;
      state.dataPaymentSummry = payload.data;
    },
    [getPaymentSummery.pending]: (state) => {
      state.isFetchingPaymentSummry = true;
    },
    [getPaymentSummery.rejected]: (state, { payload }) => {
      state.dataPaymentSummry = [];
      state.isFetchingPaymentSummry = false;
      state.isErrorPaymentSummry = true;
      state.errorMsgPaymentSummry = payload?.message;
    },

    //----Application fee payment summary for fcfs
    [getApplicationPaymentSummary.fulfilled]: (state, { payload }) => {
      state.isFetchingApplicationPaymentSummry = false;
      state.isSuccessApplicationPaymentSummry = payload.success;
      state.dataApplicationPaymentSummry = payload.data;
    },
    [getApplicationPaymentSummary.pending]: (state) => {
      state.isFetchingApplicationPaymentSummry = true;
    },
    [getApplicationPaymentSummary.rejected]: (state, { payload }) => {
      state.dataApplicationPaymentSummry = [];
      state.isFetchingApplicationPaymentSummry = false;
      state.isErrorApplicationPaymentSummry = true;
      state.errorMsgApplicationPaymentSummry = payload?.message;
    },
 //----Eauction fee payment summary for fcfs
 [getEauctionPaymentSummary.fulfilled]: (state, { payload }) => {
  state.isFetchingEauctionPaymentSummry = false;
  state.isSuccessEauctionPaymentSummry = payload.success;
  state.dataEauctionPaymentSummry = payload.data;
},
[getEauctionPaymentSummary.pending]: (state) => {
  state.isFetchingEauctionPaymentSummry = true;
},
[getEauctionPaymentSummary.rejected]: (state, { payload }) => {
  state.dataEauctionPaymentSummry = [];
  state.isFetchingEauctionPaymentSummry = false;
  state.isErrorEauctionPaymentSummry = true;
  state.errorMsgEauctionPaymentSummry = payload?.message;
},

    [convertAmountToWords.fulfilled]: (state, { payload }) => {
      state.isFetchingAmountToWords = false;
      state.isSuccessAmountToWords = payload.success;
      state.dataAmountToWords = payload.data;
    },
    [convertAmountToWords.pending]: (state) => {
      state.isFetchingAmountToWords = true;
    },
    [convertAmountToWords.rejected]: (state, { payload }) => {
      state.dataAmountToWords = [];
      state.isFetchingAmountToWords = false;
      state.isErrorAmountToWords = true;
      state.errorMsgAmountToWords = payload?.message;
    },

    [isSchemeExpired.fulfilled]: (state, { payload }) => {
      state.isErrorScheme = payload.error;
      state.isFetchingScheme = false;
      state.isSuccessScheme = payload.success;
      state.dataScheme = payload.data;
      state.errorMsgScheme = payload?.message;
    },
    [isSchemeExpired.pending]: (state) => {
      state.isFetchingScheme = true;
    },
    [isSchemeExpired.rejected]: (state, { payload }) => {
      state.dataScheme = [];
      state.isFetchingScheme = false;
      state.isErrorScheme = payload.error;
      state.errorMsgScheme = payload?.message;
    },
  },
});

export const {
  clearMasterDataState,
  clearMasterDataList,
  calculateTotalBill,
  calculateEStampTotalBill,
  clearRelationshipListData,
  clearGenderListData,
  clearMaritalStatusListData,
  clearFeeStrcrData,
  clearUserManualData,
  clearEauctionPaymentSummryData,
} = masterDataSlice.actions;

export const masterDataSelector = (state) => state.masterData;
