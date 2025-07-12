export const ImageSizes = {
  TenKB: 10240,
  FiftyKB: 51200,
  TwoMB: 2097152,
  FiveMB: 5242880,
};

export const TechnicalBidSizes = {
  TenKB: 10240,
  FiftyKB: 51200,
  TwoMB: 2097152,
  FiveMB: 5242880,
};
export const Fcfs_Flow = true;

export const fallback_msg = 'Something went wrong! Please try again later.'

export const SupportedFormats = {
  ZipFormats: [
    "application/octet-stream",
    "application/zip",
    "application/x-zip",
    "application/x-zip-compressed",
  ],
  PhotoFormats: ["image/jpg", "image/jpeg", "image/png"],
  DocsFormats: ["image/jpeg", "image/jpeg", "image/png", "application/pdf"],
  PdfFormats: ["application/pdf"],
};

// Google Catpcha
// export const SiteKey = "6LcJmX0bAAAAAF2xsQ4lgFLh8pvhIACTIecBM1OP";
// export const SecretKey = "6LcJmX0bAAAAAKsCjM564lV1fz0sf5-yju9jBT5H";
// Google Catpcha
export const SiteKey = "6LecdXMeAAAAABLsmrQ41nhr-4IejL1l-HxFDOWv";
export const SecretKey = "6LecdXMeAAAAANRCO9Wis2lQkvP2hxaJ_TzqkCYJ";

// export const apiEndPoint = "http://35.200.197.80/rest-api/applicationservice";
// export const ApiEndPoint =
//   "https://rest-api.helioscart.com/rest-api/applicationservice";

// V2 EndPoint
// export const ApiEndPoint = "https://v2-rest-api.helioscart.com/rest-api/applicationservice";

// DEV EndPoint
export const ApiEndPoint = "https://resteauctiondev.cidcohomes.com/rest-api/applicationservice";
//export const ApiEndPoint = "https://resteauctionprod.cidcohomes.com/applicationservice";
//export const ApiEndPoint = "https://restlotterydev.cidcohomes.com/rest-api/applicationservice";
export const ApiBankDetails = "https://bank-apis.justinclicks.com/API/V1/";
// UAT EndPoint
// export const ApiEndPoint = "https://restlotteryuat.cidcohomes.com/rest-api/applicationservice";
//ImageEndpoint
export const ImageEndpoint = "https://resteauctiondev.cidcohomes.com/rest-api/applicationservice/uploads/project_images/"
// PROD EndPoint
// export const ApiEndPoint = "https://rest.cidcohomes.com/restapi/applicationservice";

// export const ApiEndPoint = "https://rest.cidcohomes.com/restapi/applicationservice";

// V2 info WEB SITE
// export const InfoWebSiteUrl = "https://v2-infobeta.helioscart.com/";

// UAT info WEB SITE
// export const InfoWebSiteUrl = "https://infouat.cidcohomes.com/";

// PROD info WEB SITE
export const InfoWebSiteUrl = "https://cidcohomes.com/";

// info WEB SITE
//export const ProjectApiEndPoint =  "https://infobeta.helioscart.com/wp-json/wp/v2/";

// PROD 
export const ProjectApiEndPoint = "https://cidcohomes.com/wp-json/wp/v2/";


// info WEB SITE
// export const SelectProjectApiEndPoint = "https://infouat.cidcohomes.com/wp-json/wp/v2/";

// PROD WEB SITE
export const SelectProjectApiEndPoint = "https://cidcohomes.com/wp-json/wp/v2/";

// info WEB SITE
// export const FilterListApiEndPoint = "https://infouat.cidcohomes.com/";

// PROD WEB SITE
export const FilterListApiEndPoint = "https://cidcohomes.com/";

// export const TopNewsApiEndPoint =
//   "https://odishadigital.com/masshousinglatest/wp-json/wp/v2";

//Google Map
export const GoogleMapApiKey = "AIzaSyDaUHJitsGWwwy-_BrJ--GIOqD3vBHNFXk";

//CCAVENUE Payment Gateway
export const MerchantId = 409325;
//localhost
export const WorkingKey = "F5E52C8DE2295602E2CDFB1A6A54455A";
export const AccessCode = "AVJB03IG83AZ89BJZA";
//https://beta.helioscart.com
// export const WorkingKey = "F730C96141106AAFAD28BB4D9A6267CD";
// export const AccessCode = "AVHB03IG83AZ87BHZA";

export const EStampingIds = {
  AffidavitB: 1,
  AffidavitC: 2,
  AffidavidA: 3,
  AffidavitD: 4,
  AffidavitE: 5,
  AffidavitF: 6,
};

export const Documents = [
  { value: 1, docName: "Domicile" },
  { value: 2, docName: ["IncomeDetailSelf", "IncomeDetaSpouseAccordion"] },
  { value: 3, docName: "Affidavit" },
  { value: 4, docName: ["Caste", "CasteValidity", "AffidavitF"] },
  { value: 7, docName: "AffidavitD" },
  { value: 8, docName: "Journalist" },
  { value: 9, docName: "PersonalManager" },
  { value: 10, docName: "PAP" },
  { value: 11, docName: "Disability" },
  { value: 12, docName: "ExService" },
  { value: 13, docName: "APMCRegistration" },
  { value: 14, docName: "AffidavitB" },
  { value: 15, docName: "AffidavitC" },
  { value: 16, docName: "PMAYAccordion" },
];
