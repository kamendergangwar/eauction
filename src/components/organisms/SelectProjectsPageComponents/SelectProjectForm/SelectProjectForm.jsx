import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import MapIcon from '@material-ui/icons/Map';
import ListAltIcon from '@material-ui/icons/ListAlt';
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
// import Button from "@material-ui/core/Button";
import { CircularProgress, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import { selectProjectFormStyles } from "./SelectProjectForm.styles";
import FormCard from "../../../molecules/Cards/FormCard/FormCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import ProjectCard from "../ProjectCard/ProjectCard";
import withWidth from "@material-ui/core/withWidth";
import FormControl from "../../../molecules/FormControl/FormControl";
import SubStepperBar2 from "../../../atoms/StepperBar/SubStepperBar2/SubStepperBar2";
import ConfirmDialogBox from "../../../molecules/DialogBoxes/ConfirmDialogBox/ConfirmDialogBox";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import moment from "moment";
import {
  ProjectSearchIcon,
  SelectProjTitleIcon,
  WhiteArrowIcon,
  ApplicationEditIcon,
} from "../../../atoms/SvgIcons/SvgIcons";
import ProjectFiltersDialogBox from "../../../molecules/DialogBoxes/ProjectFiltersDialogBox/ProjectFiltersDialogBox";
import { useSelector, useDispatch } from "react-redux";
import { ApplicantProgressSelector, getApplicantProgress } from "../../../../redux/features/ApplicantStepper/ApplicantStepperSlice";
import {
  getFcfsProjectList,
  getProjectsData,
  setDummyProjectList,
  projectDataSelector,
  clearProjectList,
  removeDuplicateProject,
  getFilterLocationList,
  clearLocationList,
  getApplicantSelectedFlat,
  clearProjectDataState,
} from "../../../../redux/features/projectdata/ProjectDataSlice";
import {
  getApplicant,
  applicantSelector,
  clearApplicantState,
  applicationFilter,
} from "../../../../redux/features/applicant/ApplicantSlice";
import {
  getApplication,
  addApplication,
  addToSalesForce,
  clearApplicationState,
  applicationSelector,
  editApplication,
} from "../../../../redux/features/application/ApplicationSlice";
import { preferencesSelector } from "../../../../redux/features/preferences/PreferencesSlice";

import {
  getStepperDetails,
  addEditStepper,
  clearSuperStepperEditVars,
} from "../../../../redux/features/stepper/StepperSlice";
import {
  getReservationCategories,
  masterDataSelector,
} from "../../../../redux/features/masterdata/MasterDataSlice";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import SavedProjects from "../SavedProjects/SavedProjects";
import FormTitleBox from "../../../atoms/FormTitleBox/FormTitleBox";
import StepperBar from "../../../atoms/StepperBar/StepperBar";
import { createAccountLog } from "../../../../redux/features/masterdata/MasterDataSlice";
import ImageMapper from 'react-img-mapper';
import ProjectMap from "../ProjectMap/ProjectMap";

const SelectProjectForm = (props) => {
  const { width } = props;
  const classes = selectProjectFormStyles();
  const { t } = useTranslation("ProjectDetailsPageTrans");
  // const formikRef = useRef();
  const history = useHistory();
  // const [skipDialogOpen, setSkipDialogOpen] = useState(false);
  const [isSelectedProjects, setSelectedProjects] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmScheme, setConfirmScheme] = useState(false);
  const [openFlatDialog, setOpenFlatDialog] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState();
  const [isFlatSelected, setIsFlatSelected] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const [tempLocFilterList, setTempLocFilterList] = useState([]);
  // const [tempTypeFilterList, setTempTypeFilterList] = useState([]);
  // const [locationFilterList, setLocationFilterList] = useState([]);
  // const [typeFilterList, setTypeFilterList] = useState([]);
  // const [projectFiltersList, setProjectFiltersList] = useState([]);
  // const [isActiveFilter, setActiveFilter] = useState(false);
  // const { reservationCategory, castCategory } = useSelector(masterDataSelector);
  // const stepperData = useSelector((state) => state.stepper.stepperData);
  // const isSuccessReqStepper = useSelector((state) => state.stepper.isSuccessReqStepper);
  const {
    isFetchingStepper,
    isSuccessResStepper,
    isSuccessReqStepper,
    stepperData,
  } = useSelector((state) => state.stepper);
  const dispatch = useDispatch();
  const [locationName, setLocationName] = useState([]);
  const [selectScheme, setSelectScheme] = React.useState("");
  const [initialScheme, setInitialScheme] = React.useState(
    localStorage.getItem("ApplicableScheme")
  );
  const [previousSelectedScheme, setPreviousSelectedScheme] = useState("");
  const [filterLocationList, setFilterLocationList] = useState([]);
  const [typeSelectedValue, setTypeSelectedValue] = useState({});
  const [priceSelectedValue, setPriceSelectedValue] = useState({});
  // const [checked, setChecked] = useState(true);
  const [allProjectListForSelect, setallProjectListForSelect] = useState([]);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [schemeDropdown, setSchemeDropdown] = useState(false);

  const [geoJson, setgeoJson] = useState(null);

  const [priceRangeList, setPriceRangeList] = useState([
    {
      value: "100000-1000000",
      title: "1-10 " + t("projectForm.formControl.priceRange.lackTxt"),
    },
    {
      value: "1000000-2000000",
      title: "10-20 " + t("projectForm.formControl.priceRange.lackTxt"),
    },
    {
      value: "2000000-3000000",
      title: "20-30 " + t("projectForm.formControl.priceRange.lackTxt"),
    },
    {
      value: "3000000-4000000",
      title: "30-40 " + t("projectForm.formControl.priceRange.lackTxt"),
    },
    {
      value: "4000000-5000000",
      title: "40-50 " + t("projectForm.formControl.priceRange.lackTxt"),
    },
    {
      value: "5000000-10000000",
      title: "50-100 " + t("projectForm.formControl.priceRange.lackTxt"),
    },
  ]);
  const [bookingEndDate, setBookingEndDate] = useState("");
  const [selectProjectBtnState, setSelectProjectBtnState] = useState(true);
  const { reservationCategory, castCategory } = useSelector(masterDataSelector);
  const { isSuccessBookingEndTime, bookingEndTime } = useSelector(preferencesSelector);

  const {
    isSchemeFetching,
    isSchemeSuccess,
    isSchemeError,
    schemeErrorMessage,
    demoProjectList,
    schemeData,
    schemeProjectList,

    locationListData,
    isFetchingLocationList,
    isSuccessLocationList,
    isErrorLocationList,
    errorMessageLocationList,
  } = useSelector(projectDataSelector);
  const { ApplicantStepperData, isSuccessProgressResStepper } = useSelector(ApplicantProgressSelector);

  const {
    isFetchingApplication,
    isSuccessReqAddApplication,
    AddApplicationResData,
    EditApplicationData,
    isSuccessResApplication,
    currentApplicationData,
    applicationBookingStatus,
    paidAndSelectedApplctnData,
    isErrorApplication,
    errorMsgApplication,
    applicationData,

    isSuccessReqEditApplication,
  } = useSelector(applicationSelector);
  const {
    applicantData,
    isSuccessResApplicantGet,
    isFetchingApplicantGet,
    isErrorApplicantGet,
    errorMessageGet,
  } = useSelector(applicantSelector);

  const {
    fcfsLocationListData,
    isFetchingFcfsLocationList,
    isSuccessFcfsLocationList,
    isErrorFcfsLocationList,
    errorMessageFcfsLocationList,
  } = useSelector(projectDataSelector);

  const {
    applicantSelectedFlat,
    isFetchingApplicantSelectedFlat,
    isSuccessApplicantSelectedFlat,
    isErrorApplicantSelectedFlat,
    errorMessageApplicantSelectedFlat,
  } = useSelector(projectDataSelector);


  useEffect(() => {
    if (isSuccessProgressResStepper) {
      ApplicantStepperData.superStepper.forEach(item => {
        // if (item.StepId == "8" && item.Status == "pending") {
        //   history.push("/dashboard");
        // }
        // if (item.StepId == "10" && item.Status == "completed") {
        //   history.push("/dashboard");
        // }
         if (item.StepId == "8" && item.Status == "completed") {
          setSelectProjectBtnState(false);
        }
      })
    }
  }, [isSuccessProgressResStepper])

  useEffect(() => {
    localStorage.setItem(
      "SelectScheme",
      localStorage.getItem("ApplicableScheme")
    );
  }, [initialScheme]);

  useEffect(() => {
    dispatch(getApplicantProgress());
    dispatch(getApplicant());
    dispatch(getFilterLocationList());
    dispatch(getApplication());
    dispatch(getReservationCategories());
    dispatch(getFcfsProjectList());
    // dispatch(getApplicantSelectedFlat());
    setPriceRangeList([
      {
        value: "100000-1000000",
        title: "1-10 " + t("projectForm.formControl.priceRange.lackTxt"),
      },
      {
        value: "1000000-2000000",
        title: "10-20 " + t("projectForm.formControl.priceRange.lackTxt"),
      },
      {
        value: "2000000-3000000",
        title: "20-30 " + t("projectForm.formControl.priceRange.lackTxt"),
      },
      {
        value: "3000000-4000000",
        title: "30-40 " + t("projectForm.formControl.priceRange.lackTxt"),
      },
      {
        value: "4000000-5000000",
        title: "40-50 " + t("projectForm.formControl.priceRange.lackTxt"),
      },
      {
        value: "5000000-10000000",
        title: "50-100 " + t("projectForm.formControl.priceRange.lackTxt"),
      },
    ]);
    // dispatch(applicationFilter([]));
    if (
      localStorage.getItem("SelectScheme") != null &&
      localStorage.getItem("SelectScheme") != "nonePmay"
    ) {
      localStorage.setItem(
        "ApplicableSchemeCopy",
        localStorage.getItem("ApplicableScheme")
      );
    } else if (
      localStorage.getItem("ApplicableScheme") == "nonePmay" &&
      localStorage.getItem("SelectScheme") == "nonePmay"
    ) {
      localStorage.setItem(
        "ApplicableSchemeCopy",
        localStorage.getItem("ApplicableScheme")
      );
    }
  }, [dispatch, t]);

  useEffect(() => {
    if (isSuccessResStepper) {
      let pageUrl;
      stepperData.superStepper.forEach((item) => {
        if (item.step == 1) {
          if (item.applicantKycStepper[0].title == "Verify Aadhaar") {
            if (item.applicantKycStepper[0].status != "completed") {
              pageUrl = "/auth-verify-aadhaar";
            }
          }

          if (
            item.applicantKycStepper[1].title == "Verify PAN" &&
            pageUrl == undefined
          ) {
            if (item.applicantKycStepper[1].status != "completed") {
              pageUrl = "/verify-pancard";
            }
          }
        }

        if (item.step == 1 && pageUrl == undefined) {
          if (item.status != "completed") {
            pageUrl = "/personal-details";
          }
        }
        // if(item.step == 4 && pageUrl == undefined){                                                   //flag for doc not verified and regiss payment not done
        //   if(item.status != "completed") {
        //     pageUrl = "/question-1"
        //   }
        // }
        // if(item.step == 4 && pageUrl == undefined){                                                   //flag for doc not verified and regiss payment  done
        //   if(item.status == "completed" && applicantData.isDocVerified == 0) {
        //     pageUrl = "/upload-documents"
        //   }
        // }
      });
      history.push(pageUrl);
    }
  }, [isSuccessResStepper]);

  useEffect(() => {
    if (applicantData && isSuccessResApplicantGet && selectScheme) {
      let locNameListIs = localStorage.getItem("locNameList");
      let stored_loc_value = [];
      if (locNameListIs) {
        stored_loc_value = JSON.parse(locNameListIs);
        setLocationName(stored_loc_value);
      } else {
        setLocationName([]);
      }
      let slctdTypeValIs = localStorage.getItem("slctdTypeVal");
      let stored_type_value = {};
      if (slctdTypeValIs) {
        stored_type_value = JSON.parse(slctdTypeValIs);
        setTypeSelectedValue(stored_type_value);
      } else {
        setTypeSelectedValue([]);
      }
      let slctdPriceValIs = localStorage.getItem("slctdPriceVal");
      let stored_price_value = {};
      if (slctdPriceValIs) {
        stored_price_value = JSON.parse(slctdPriceValIs);
        setPriceSelectedValue(stored_price_value);
      } else {
        setPriceSelectedValue([]);
      }
      filterProjectList(
        stored_loc_value,
        stored_type_value,
        stored_price_value,
      );
    }
  }, [applicantData, isSuccessResApplicantGet, selectScheme]);

  useEffect(() => {
    dispatch(clearProjectList());
    // setTempLocFilterList([]);
    // setTempTypeFilterList([]);

    schemeProjectList?.forEach((item) => {
      /* setTempLocFilterList((prevData) => [
        ...prevData,
        { value: item.address, label: item.address },
      ]); */
      let newItem = {
        // schemeName: schemeData.value,
        schemeId: item.category_id,
        projectId: item.idlisting,
        location: item.address,
        gps: item.gps,
        lat: item.lat,
        lng: item.lng,
        images: item.images,
        isSelected: false,
        projCastCategory: item.cast_category,
        projReservationCategory: item.reservation_category,
        reservationCategoryIds: item.attributes["Reservation Category"],
      };
      if (item.attributes) {
        newItem.title = item.attributes["Title"];
        newItem.price = item.attributes["Base Price"];
        newItem.carpetArea = item.attributes["Carpet Area"];
        newItem.bhk = item.attributes["Type"];
        newItem.status = item.attributes["Development Status"];
        newItem.reraId = item.attributes["Rera Id"];
        newItem.about = item.attributes["Overview Content"];
        newItem.incomeGroup = item.attributes["Income Group"];
        newItem.amenities = item.attributes["amenities"];
        newItem.amenitiesEnglish = item.attributes["amenitiesEnglish"];
        newItem.amenitiesMarathi = item.attributes["amenitiesMarathi"];
        newItem.amenitiesHindi = item.attributes["amenitiesHindi"];
        newItem.floorPlan = item.attributes["floor_plan"];
        newItem.castCategory = item.attributes["Cast Category"];
        newItem.totalTenements = item.attributes["Total Tenements"];
        newItem.projCategory = item.attributes["Category"];
        newItem.wingA = item.attributes["Wing A"];
        newItem.gallery = item.attributes["Gallery"];
        newItem.connectivity = item.attributes["Connectivity"];
        newItem.unitPlan = item.attributes["Unit plan"];
        /* setTempTypeFilterList((prevData) => [
          ...prevData,
          {
            value: item.attributes["Type"],
            label: item.attributes["Type"] + t("projectForm.bhkText"),
          },
        ]); */
      }
      dispatch(setDummyProjectList(newItem));
    });
  }, [schemeProjectList]);

  /* useEffect(() => {
    console.log("schemeData", schemeData);
    if (schemeData?.price_range) {
      let min_price = 10000;
      let max_price = 0;
      let grand_total_price = 10000000;
      let diff_price = 10000;

      while (max_price < grand_total_price) {
        max_price = min_price + diff_price;
        let range = min_price + "-" + max_price;
        console.log("range", range);
        // let temp_min_prc = min_price;
        min_price = max_price;
        // max_price = temp_min_prc + max_price;
      }
    }
  }, [schemeData]); */

  // useEffect(() => {
  //   if (applicationData.length > 0) {
  //     applicationData.forEach((item) => {
  //       const requestData = {
  //         Title: item?.ProjectDetails?.attributes?.Title,
  //         Location: item?.ProjectDetails?.attributes?.Location,
  //         ReservationId: item?.ReservationId,
  //         ApplicationId: item?.ApplicationId,
  //         Name: item?.ProjectDetails?.attributes?.Title,
  //         ApplicationStatus: item?.ApplicationStatus,
  //         ApplicantId: item?.ApplicantId,
  //         steps: "step_10",
  //         debug: 0
  //       };
  //       dispatch(createAccountLog(requestData));
  //     })
  //   }
  // }, [applicationData])

  useEffect(() => {
    setAllCategoryList([]);
    if (applicantData?.RservationCatIds) {
      const tempReservationCategory =
        applicantData?.RservationCatIds.split(",");
      let emptyArray = [];
      reservationCategory.forEach((item) => {
        tempReservationCategory.forEach((element) => {
          if (item.value == element.toString()) {
            emptyArray.push(item);
            // setAllCategoryList((prevData) => [...prevData, item]);
          }
        });
      });
      setAllCategoryList(emptyArray);
    }
    if (applicantData?.CasteCatId) {
      castCategory.forEach((item) => {
        // Default caste category General(GP) added
        if (applicantData.CasteCatId === item.value || "1" === item.value) {
          setAllCategoryList((prevData) => [...prevData, item]);
        }
      });
    }
  }, [applicantData, castCategory, reservationCategory]);

  /* useEffect(() => {
    let selectedProject = false;
    demoProjectList.forEach((item) => {
      if (item.isSelected) {
        selectedProject = true;
      }
    });
    let savedProject = false;
    if (applicationData) {
      if (applicationData.length > 0) {
        applicationData.forEach((item) => {
          if (item.ApplicationStatus === "0") {
            savedProject = true;
            dispatch(removeDuplicateProject(item.ProjectId));
          }
        });
      }
      setSelectedProjects(selectedProject || savedProject);
    }
  }, [demoProjectList]); */

  // console.log(idsArray, obj2, obj2.ProjectId, obj2.ReservationId, "PPPPPPPPPPPPPPPPPPPPP")

  // if (obj2.ProjectId == "39") {
  //   console.log(idsArray, obj2, obj2.ProjectId, obj2.ReservationId, "PPPPPPPPPPPPPPPPPPPPP")
  // }

  // let idsArray = ['7', '8', '9', '12'];
  // let idsArray = obj2.ReservationId?.split(",");

  useEffect(() => {
    if (isSchemeSuccess && allCategoryList.length > 0 && isSuccessFcfsLocationList) {
      let all_project_list = [];
      currentApplicationData.forEach((element_1) => {
        var uniqueResultOne = allCategoryList.filter(function (obj) {
          return !element_1.ApplicantCategory.some(function (obj2) {
            // let idsArray = obj2.ReservationId?.split(",");
            let SelectedCategoryId = "";
            // idsArray?.forEach((ids) => {
            if (obj.value == obj2.id) {
              SelectedCategoryId = obj;
            }
            // });
            return SelectedCategoryId;
          });
        });
        let new_obj = {
          schemeId: element_1.SchemeId,
          projectId: element_1.ProjectId,
          location: element_1.ProjectDetails.address,
          gps: element_1.ProjectDetails.gps,
          lat: element_1.ProjectDetails.lat,
          lng: element_1.ProjectDetails.lng,
          images: element_1.ProjectDetails.images,
          castCategory: element_1.ReservationId,
          castCategory: element_1.ProjectDetails.attributes["Cast Category"],
          applicationId: element_1.ApplicationId,
          isSelected: true,
          catForSelect: uniqueResultOne,
          // floorNo: applicationBookingStatus.Applicant_Booking_Status[0].FloorNo,
          // cost: applicationBookingStatus.Applicant_Booking_Status[0].Cost,
          // flatType: applicationBookingStatus.Applicant_Booking_Status[0].flat_type,
          // wing: applicationBookingStatus.Applicant_Booking_Status[0].Wing,
          // flatNo: applicationBookingStatus.Applicant_Booking_Status[0].FlatNo,
          title: "",
          price: "",
          carpetArea: "",
          bhk: "",
          status: "",
          reraId: "",
          about: "",
          incomeGroup: "",
          amenities: "",
          amenitiesEnglish: "",
          amenitiesMarathi: "",
          amenitiesHindi: "",
          floorPlan: "",
          totalTenements: "",
          projCategory: "",
          projCastCategory: element_1.ProjectDetails.cast_category,
          projReservationCategory:
            element_1.ProjectDetails.reservation_category,
          reservationCategoryIds:
            element_1.ProjectDetails.attributes["Reservation Category"],
          applicantCategory: element_1.ApplicantCategory,
        };
        if (element_1.ProjectDetails?.attributes) {
          new_obj.title = element_1.ProjectDetails.attributes["Title"];
          new_obj.price = element_1.ProjectDetails.attributes["Base Price"];
          new_obj.carpetArea =
            element_1.ProjectDetails.attributes["Carpet Area"];
          new_obj.bhk = element_1.ProjectDetails.attributes["Type"];
          new_obj.status =
            element_1.ProjectDetails.attributes["Development Status"];
          new_obj.reraId = element_1.ProjectDetails.attributes["Rera Id"];
          new_obj.about =
            element_1.ProjectDetails.attributes["Overview Content"];
          new_obj.incomeGroup =
            element_1.ProjectDetails.attributes["Income Group"];
          new_obj.amenities = element_1.ProjectDetails.attributes["amenities"];
          new_obj.amenitiesEnglish =
            element_1.ProjectDetails.attributes["amenitiesEnglish"];
          new_obj.amenitiesMarathi =
            element_1.ProjectDetails.attributes["amenitiesMarathi"];
          new_obj.amenitiesHindi =
            element_1.ProjectDetails.attributes["amenitiesHindi"];
          new_obj.floorPlan = element_1.ProjectDetails.attributes["floor_plan"];
          new_obj.totalTenements =
            element_1.ProjectDetails.attributes["Total Tenements"];
          new_obj.projCategory =
            element_1.ProjectDetails.attributes["Category"];
          new_obj.wingA = element_1.ProjectDetails.attributes["Wing A"];
          new_obj.gallery = element_1.ProjectDetails.attributes["Gallery"];
          new_obj.connectivity =
            element_1.ProjectDetails.attributes["Connectivity"];
          new_obj.unitPlan = element_1.ProjectDetails.attributes["Unit plan"];
        }
        all_project_list.push(new_obj);
      });

      demoProjectList.forEach((element_2) => {
        let filteredExistingPrjcts = paidAndSelectedApplctnData.filter(
          (elmnt) => elmnt.ProjectId === element_2.projectId
        );
        if (
          filteredExistingPrjcts.length < allCategoryList.length &&
          filteredExistingPrjcts[0]?.ProjectId != element_2.projectId
        ) {
          var uniqueResultOne = allCategoryList.filter(function (obj) {
            return !filteredExistingPrjcts.some(function (obj2) {
              let idsArray = obj2.ReservationId?.split(",");
              let SelectedCategoryId = "";
              idsArray?.forEach((ids) => {
                if (obj.value == ids) {
                  SelectedCategoryId = ids;
                }
              });
              return SelectedCategoryId;
            });
          });
          if (uniqueResultOne.length > 0) {
            let new_obj = {
              ...element_2,
              isSelected: false,
              catForSelect: uniqueResultOne,
            };
            all_project_list.push(new_obj);
          }
        }
      });
      let fcfs_project_list = [];
      let temp_geoJson = {
        type: 'FeatureCollection',
        features: [],
      }

      all_project_list.forEach((project) => {
        Object.keys(fcfsLocationListData).forEach((key, index) => {
          if (key == project.projectId) {
            var filter_obj = {
              ...project,
              No_Of_Floors: fcfsLocationListData[key].No_Of_Floors,
              No_Of_Towers: fcfsLocationListData[key].No_Of_Towers,
              No_Of_Units: fcfsLocationListData[key].No_Of_Units,
              Flat_Type: fcfsLocationListData[key].Flat_Type,
              map_tooltip: fcfsLocationListData[key].map_tooltip,
              No_Of_Units_Available: fcfsLocationListData[key].No_Of_Units_Available,
              ProjectId: fcfsLocationListData[key].ProjectId,
              mainCordinates: fcfsLocationListData[key].mainCordinates,
              preFillColor: fcfsLocationListData[key].preFillColor,
              shape: fcfsLocationListData[key].shape,
              towerImg: fcfsLocationListData[key].towerImg,
              towerImgCordinate: fcfsLocationListData[key].towerImgCordinate,
              ProjectName: fcfsLocationListData[key].ProjectName,
              TowerWiseFlatCount: fcfsLocationListData[key].TowerWiseFlatCount,
            };



            const feature = {
              type: 'Feature',
              properties: {
                id: index,
                name: fcfsLocationListData[key].ProjectName,
                projectId: fcfsLocationListData[key].ProjectId
              },
              geometry: {
                type: 'Polygon',
                coordinates: JSON.parse(fcfsLocationListData[key].mainCordinates),
              },
            }
            temp_geoJson.features.push(feature)
            fcfs_project_list.push(filter_obj);
          }
        });
      });
      setIsFlatSelected(false)
      fcfs_project_list.forEach((project) => {
        if (project.isSelected == true) {
          setIsFlatSelected(true);
          fcfs_project_list = [project]
        }
      })
      setgeoJson(temp_geoJson);
      setallProjectListForSelect(fcfs_project_list);
    }
  }, [
    isSuccessResApplication,
    currentApplicationData,
    isSchemeSuccess,
    demoProjectList,
    allCategoryList,
    isFlatSelected,
    isSuccessFcfsLocationList
  ]);
  useEffect(() => {
    if (isSuccessResApplicantGet && applicantData) {
      // let SchemeValue = localStorage.getItem("ApplicableScheme");
      let SchemeValue = applicantData.is_pmy;
      // setSelectScheme("no");
      setSelectScheme(SchemeValue == 0 ? "yes" : "no");
    }
  }, [applicantData, isSuccessResApplicantGet]);

  useEffect(() => {
    if (isSuccessResApplication && applicationBookingStatus) {
      setSelectedFlat(applicationBookingStatus);
      if (applicationBookingStatus?.length > 0) {
        ToggleMapList('list');
      } else {
        ToggleMapList('map');
      }
    }
  }, [isSuccessResApplication && applicationBookingStatus]);

  /* useEffect(() => {
    const removeDuplicateLoc = tempLocFilterList.filter((v, i) => {
      return tempLocFilterList.map((val) => val.value).indexOf(v.value) === i;
    });
    setLocationFilterList(removeDuplicateLoc);
    const removeDuplicateType = tempTypeFilterList.filter((v, i) => {
      return tempTypeFilterList.map((val) => val.value).indexOf(v.value) === i;
    });
    setTypeFilterList(removeDuplicateType);
  }, [tempLocFilterList, tempTypeFilterList]); */

  useEffect(() => {
    if (isSuccessLocationList && locationListData) {
      let temp_loc_list = [];
      /* for (const key in locationListData) {
        if (Object.hasOwnProperty.call(locationListData, key)) {
          const element = locationListData[key];
          let new_obj = {
            title: element,
            value: key
          };
          temp_loc_list.push(new_obj);
        }
        setFilterLocationList(temp_loc_list);
      } */
      for (let i = 0; i < locationListData.length; i++) {
        const element = locationListData[i];
        let new_obj = {
          title: element.location_name,
          value: element.location_id,
        };
        temp_loc_list.push(new_obj);
      }
      setFilterLocationList(temp_loc_list);
    }
  }, [isSuccessLocationList, locationListData]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocationName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeScheme = (event) => {
    setSchemeDropdown(!schemeDropdown);
    setPreviousSelectedScheme(selectScheme);
    setSelectScheme(event.target.value);
    setConfirmScheme(true);
  };

  const callingProjectFltrFn = () => {
    let loc = locationName;
    let type = typeSelectedValue;
    let price = priceSelectedValue;
    filterProjectList(loc, type, price);
  };

  const afterSelectingFlat = () => {
    dispatch(getApplication())
  }

  const filterProjectList = (loc, type, price) => {
    // let params_string = "&IsPMAY=yes&incgroup=" + applicantData.IncomeGroup + "&location=72,76";
    let params_string =
      "&IsPMAY=" +
      selectScheme +
      " +&incgroup=" +
      applicantData.IncomeGroup +
      "&rescat=" +
      applicantData.RservationCatIds +
      "&castcat=" +
      applicantData.CasteCatId;
    let loc_id_list = [];
    if (loc.length > 0) {
      localStorage.setItem("locNameList", JSON.stringify(loc));
      filterLocationList.forEach((element_1) => {
        loc.forEach((element_2) => {
          if (element_1.title === element_2) {
            loc_id_list.push(element_1.value);
          }
        });
      });
      var str = loc_id_list.join(",");
      params_string += "&location=" + str;
    } else {
      localStorage.removeItem("locNameList");
    }
    if (type?.title) {
      localStorage.setItem("slctdTypeVal", JSON.stringify(type));
      params_string += "&roomType=" + type.value;
    } else {
      localStorage.removeItem("slctdTypeVal");
    }
    if (price?.title) {
      localStorage.setItem("slctdPriceVal", JSON.stringify(price));
      params_string += "&price_range=" + price.value;
    } else {
      localStorage.removeItem("slctdPriceVal");
    }
    dispatch(getProjectsData(params_string));
  };

  const clearFilter = (param) => {
    if (param === "location") {
      setLocationName([]);
      filterProjectList([], typeSelectedValue, priceSelectedValue);
    } else if (param === "type") {
      setTypeSelectedValue({});
      filterProjectList(locationName, {}, priceSelectedValue);
    } else {
      setPriceSelectedValue({});
      filterProjectList(locationName, typeSelectedValue, {});
    }
  };

  const afterSelectedCatEvent = (project, resCatIds) => {
    let newItem = {
      ApplicantId: localStorage.getItem("applicantId"),
      SchemeId: project.schemeId,
      ProjectId: project.projectId,
      ReservationId: resCatIds.toString(),
      ApplicationStatus: "0",
      Type: "Project Details",
      Lang: localStorage.getItem("i18nextLng"),
      is_pmy: selectScheme == "yes" ? "0" : "1",
    };
    dispatch(addApplication(newItem));
  };

  const deSelectingProject = (requestData) => {
    dispatch(editApplication(requestData));
  };

  useEffect(() => {
    if (isSuccessReqEditApplication) {
      let newItem = {
        ApplicantId: localStorage.getItem("applicantId"),
        ApplicationsId: EditApplicationData,
      };

      dispatch(addToSalesForce(newItem));
      dispatch(clearApplicationState());
      dispatch(getApplication());
    }
  }, [isSuccessReqEditApplication]);

  /* const initialValues = {
    location: "",
    projectType: "",
    priceRange: "",
    reservationCategory: [],
  };

  const validationSchema = yup.object({}); */

  /* const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const selectedProjectList = [];
    demoProjectList.forEach((item) => {
      if (item.isSelected) {
        selectedProjectList.push(item);
      }
    });
    selectedProjectList.forEach((item) => {
      item.reservationIds.forEach((element) => {
        let newItem = {
          ApplicantId: localStorage.getItem("applicantId"),
          SchemeId: item.schemeId,
          ProjectId: item.projectId,idlisting
          ReservationId: element,
          ApplicationStatus: "0",
          Type: "Project Details",
          Lang: localStorage.getItem("i18nextLng"),
        };
        dispatch(addApplication(newItem));
      });
    });
    if (selectedProjectList.length === 0) {
      history.push("/submit-documents");
    }
  }; */

  useEffect(() => {
    if (isSuccessReqAddApplication) {
      let newItem = {
        ApplicantId: localStorage.getItem("applicantId"),
        ApplicationsId: AddApplicationResData,
      };
      dispatch(addToSalesForce(newItem));

      dispatch(clearApplicantState());
      dispatch(clearApplicationState());
      dispatch(getApplication());
      /* const stepper = stepperData.superStepper;
      const newStepper = [...stepper];
      newStepper[1] = {
        ...stepper[1],
        subStepper: [
          { ...stepper[1].subStepper[0] },
          {
            step: 1,
            description: "Select Project",
            completed: true,
          },
        ],
      };
      let superStepCompleted = 0;
      newStepper[1].subStepper.forEach((item) => {
        if (item.completed) {
          superStepCompleted += 1;
        }
      }); */
      /* if (superStepCompleted === 2) {
        newStepper[1] = {
          step: 1,
          description: "Category Details",
          completed: true,
          subStepper: [
            { ...stepper[1].subStepper[0] },
            { step: 1, description: "Select Project", completed: true },
          ],
        };
      } */
      /* const requestData = {
        Applicantid: localStorage.getItem("applicantId"),
        Stepper: { superStepper: newStepper },
      };
      dispatch(addEditStepper(requestData));
      dispatch(getStepperDetails()); */
      // history.push("/document-declaration");
    }
  }, [isSuccessReqAddApplication]);

  /* const handleOnSkip = (value) => {
    setSelectedValue(value);
    setSkipDialogOpen(true);
  };

  const handleCloseSkipDialog = (value) => {
    setSkipDialogOpen(false);
    setSelectedValue(value);
    if (value !== "No") {
      history.push("/submit-documents");
      setSelectedValue(null);
    }
  };

  const goPreviousPage = () => {
    history.push("/category-details");
  }; */

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccessBookingEndTime && bookingEndTime) {
      setBookingEndDate(moment(bookingEndTime.Applicant_Booking_Status[0].endTime).format("DD-MMM-YYYY"))
    }
  }, [isSuccessBookingEndTime])

  const handleConfirmScheme = () => {
    setConfirmScheme(false);
    let loc = locationName;
    let type = typeSelectedValue;
    let price = priceSelectedValue;
    filterProjectList(loc, type, price);
    if (selectScheme == "no") {
      localStorage.setItem("SelectScheme", "nonePmay");
    } else {
      localStorage.setItem("SelectScheme", "pmay");
    }
  };

  /* const locationList = [
    {
      value: "1",
      title: t(
        "projectForm.formControl.location.options.mumbai"
      ),
    },
    {
      value: "2",
      title: t(
        "projectForm.formControl.location.options.naviMumbai"
      ),
    },
    {
      value: "3",
      title: t(
        "projectForm.formControl.location.options.pune"
      ),
    },
  ]; */

  const projectTypeList = [
    {
      value: "1",
      title: t("projectForm.formControl.projectType.options.kh1BHK"),
    },
    {
      value: "2",
      title: t("projectForm.formControl.projectType.options.kh2BHK"),
    },
    // {
    //   value: "3",
    //   title: t("projectForm.formControl.projectType.options.kh3BHK"),
    // },
  ];

  /* const priceRangeList = [
    {
      value: "10000-20000",
      title: t(
        "projectForm.formControl.priceRange.options.price1"
      ),
    },
    {
      value: "20000-30000",
      title: t(
        "projectForm.formControl.priceRange.options.price2"
      ),
    },
    {
      value: "30000-40000",
      title: t(
        "projectForm.formControl.priceRange.options.price3"
      ),
    },
    {
      value: "40000-50000",
      title: t(
        "projectForm.formControl.priceRange.options.price4"
      ),
    },
  ]; */

  const updateStepperUI = () => {
    const stepper = stepperData.superStepper;
    const newStepper = [];
    for (let s = 0; s < stepper.length; s++) {
      const element = stepper[s];
      let new_obj = {};
      if (element.step == 2) {
        new_obj = {
          ...element,
          status: "completed",
        };
      } else if (element.step == 3) {
        new_obj = {
          ...element,
          status: "completed",
        };
      } else {
        new_obj = {
          ...element,
        };
      }
      newStepper.push(new_obj);
    }
    dispatch(addEditStepper(newStepper));
  };

  useEffect(() => {
    if (isSuccessReqStepper) {
      localStorage.removeItem("locNameList");
      localStorage.removeItem("slctdTypeVal");
      localStorage.removeItem("slctdPriceVal");
      // dispatch(getStepperDetails());
      dispatch(clearSuperStepperEditVars());
      history.push("/make-payments");
    }
  }, [isSuccessReqStepper]);

  const [showMapView, setshowMapView] = useState(true);

  const getMapStyles = () => {
    if (showMapView) {
      return { paddingTop: '0px' };
    }
  }

  const ToggleMapList = (type) => {
    if (type === 'map') {
      setshowMapView(true);
    } else {
      setshowMapView(false);
    }
  }

  const getListButtonOpacityStyle = () => {
    if (!showMapView) {
      return { minWidth: '90px', opacity: '0.4', };
    } else {
      return { minWidth: '90px', };
    }
  }

  const getMapButtonOpacityStyle = () => {
    if (showMapView) {
      return { minWidth: '90px', opacity: '0.4', top: "-webkit-calc(25% + 100px)" };
    } else {
      return { minWidth: '90px', top: "-webkit-calc(25% + 100px)", };
    }
  }

  const timeValidText = () => {
    const lang = localStorage.getItem("i18nextLng");
    if (lang == "en") {
      return (
        <>
          ({t('projectForm.timeValidTxt1')} {bookingEndDate}, {t('projectForm.timeValidTxt2')})
        </>
      );
    }
    if (lang == "hi") {
      return (
        <>
          ({bookingEndDate} {t('projectForm.timeValidTxt1')} {t('projectForm.timeValidTxt2')})
        </>
      );
    }

    if (lang == "mr") {
      return (
        <>
          ({bookingEndDate} {t('projectForm.timeValidTxt1')} {t('projectForm.timeValidTxt2')})
        </>
      );
    }
  };
  return (
    <>
      {(isSchemeFetching || isFetchingApplication || isFetchingFcfsLocationList) && (
        <Loading isOpen={isSchemeFetching || isFetchingApplication || isFetchingFcfsLocationList} />
      )}
      {isFetchingApplication && <Loading isOpen={isFetchingApplication} />}
      <FormCard >
        {!showMapView && <><Hidden smDown>
          <FormTitleBox
            title={!isFlatSelected ? t("projectForm.title1") : t("projectCard.selectedPreferencesText")}
            // backUrl={applicantData?.is_pmy == "1" ? "/select-preferences" : "dashboard"}
            backUrl={"dashboard"}
            titleIcon={<SelectProjTitleIcon fontSize="large" />}
          />
        </Hidden>
          <Hidden mdUp>
            <StepperBar
              callingForMobileIs={true}
              title={!isFlatSelected ? t("projectForm.title1") : t("projectCard.selectedPreferencesText")}
              backUrl={"dashboard"}
            />
          </Hidden></>}
        {isSuccessBookingEndTime && isFlatSelected && <span className={classes.timerValidText}>{timeValidText()}</span>}
        <div className={classes.formSection} style={{ ...getMapStyles() }}>
          {!isFlatSelected && <><Button
            variant="contained"
            color="primary"
            startIcon={<ListAltIcon />}
            onClick={() => ToggleMapList('list')}
            style={{ ...getListButtonOpacityStyle() }}
            className={classes.mapNavSticker}
          >
            {t("projectForm.listViewBtn")}
          </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="primary"
              startIcon={<MapIcon />}
              onClick={() => ToggleMapList('map')}
              style={{ ...getMapButtonOpacityStyle() }}
              className={classes.mapNavSticker}
            >
              {t("projectForm.mapViewBtn")}
            </Button></>}
          {!showMapView && (
            <Grid container alignItems="baseline">
              {!isFlatSelected && <Grid item md={12} xs={12}>
                <Box className={classes.filterSection}>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <div className={classes.filterInputCtrl}>
                        <InputLabel id="demo-mutiple-checkbox-label">
                          {" "}
                          {t("projectForm.formControl.location.locationLabel")}
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          value={locationName}
                          placeholder={t(
                            "projectForm.formControl.location.locationPlaceholder"
                          )}
                          onChange={handleChange}
                          input={<Input />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {filterLocationList.map((element, i) => (
                            <MenuItem key={i} value={element.title}>
                              <Checkbox
                                checked={locationName.indexOf(element.title) > -1}
                                color="primary"
                              />
                              <ListItemText primary={element.title} />
                            </MenuItem>
                          ))}
                        </Select>
                        {locationName.length > 0 && (
                          <IconButton
                            aria-label="Close"
                            edge="end"
                            size="small"
                            onClick={() => clearFilter("location")}
                          >
                            <CloseOutlinedIcon />
                          </IconButton>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className={classes.filterInputCtrl}>
                        <InputLabel htmlFor="type-select-placeholder-label">
                          {t(
                            "projectForm.formControl.projectType.projectTypeLabel"
                          )}
                        </InputLabel>
                        <Autocomplete
                          id="type-select-placeholder-label"
                          options={projectTypeList}
                          getOptionLabel={(option) => option.title || ""}
                          value={typeSelectedValue}
                          onChange={(event, newValue) => {
                            setTypeSelectedValue(newValue);
                          }}
                          /* renderOption={(option, { selected }) => (
                            <React.Fragment>
                              <Radio
                                checked={selected}
                                value={option.title}
                                color="primary"
                              />
                              {option.title}
                            </React.Fragment>
                          )} */
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <input
                                placeholder={t(
                                  "projectForm.formControl.projectType.typePlaceholder"
                                )}
                                type="text"
                                {...params.inputProps}
                              />
                            </div>
                          )}
                        />
                        {typeSelectedValue?.title && (
                          <IconButton
                            aria-label="Close"
                            edge="end"
                            size="small"
                            onClick={() => clearFilter("type")}
                          >
                            <CloseOutlinedIcon />
                          </IconButton>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className={`${classes.filterInputCtrl} withSearch`}>
                        <div style={{ position: "relative" }}>
                          <InputLabel htmlFor="price-select-placeholder-label">
                            {t(
                              "projectForm.formControl.priceRange.priceRangeLabel"
                            )}
                          </InputLabel>
                          <Autocomplete
                            id="price-select-placeholder-label"
                            options={priceRangeList}
                            getOptionLabel={(option) => option.title || ""}
                            value={priceSelectedValue}
                            onChange={(event, newValue) => {
                              setPriceSelectedValue(newValue);
                            }}
                            /* renderOption={(option, { selected }) => (
                              <React.Fragment>
                                <Radio
                                  checked={selected}
                                  // value={option.value}
                                  color="primary"
                                />
                                {option.title}
                              </React.Fragment>
                            )} */
                            renderInput={(params) => (
                              <div ref={params.InputProps.ref}>
                                <input
                                  placeholder={t(
                                    "projectForm.formControl.priceRange.priceRangePlaceholder"
                                  )}
                                  type="text"
                                  {...params.inputProps}
                                />
                              </div>
                            )}
                          />
                          {priceSelectedValue?.title && (
                            <IconButton
                              aria-label="Close"
                              edge="end"
                              size="small"
                              className="priceClearBtn"
                              onClick={() => clearFilter("price")}
                            >
                              <CloseOutlinedIcon />
                            </IconButton>
                          )}
                        </div>
                        {/* <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ProjectSearchIcon />}
                        className={classes.searchIconBtn}
                        onClick={() => callingProjectFltrFn()}
                      >
                        {t("projectForm.formControl.searchBtnTxt")}
                      </Button> */}
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.searchIconBtn}
                          onClick={() => callingProjectFltrFn()}
                        >
                          <ProjectSearchIcon />
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>}
              {/* <Grid item md={3} xs={12}>
              <Box className={classes.pmayFilterDiv}>
                <InputLabel id="pmay-label">
                  {t("switchSchemeForm.schemeTxt")}
                </InputLabel>
                <Select
                  style={{ display: "flex" }}
                  labelId="pmay-label"
                  disabled={
                    localStorage.getItem("ApplicableSchemeCopy") == "pmay"
                      ? false
                      : true
                  }
                  onClick={() => setSchemeDropdown(!schemeDropdown)}
                  value={selectScheme}
                  placeholder={t("switchSchemeForm.schemeTxt")}
                  onChange={handleChangeScheme}
                  open={
                    localStorage.getItem("ApplicableSchemeCopy") == "pmay"
                      ? schemeDropdown
                      : ""
                  }
                  IconComponent={() =>
                    localStorage.getItem("ApplicableSchemeCopy") == "pmay" ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        endIcon={<ApplicationEditIcon />}
                        onClick={() => {
                          setSchemeDropdown(!schemeDropdown);
                        }}
                      >
                        {t("switchSchemeForm.pmayBtn")}
                      </Button>
                    ) : (
                      ""
                    )
                  }
                >
                  <MenuItem value="yes">
                    {t("switchSchemeForm.PMAYTxt")}
                  </MenuItem>
                  <MenuItem value="no">
                    {t("switchSchemeForm.non-PMAY")}
                  </MenuItem>
                </Select>
              </Box>
            </Grid> */}
            </Grid>
          )}
          <div className={classes.projectListSection}>
            {demoProjectList.length === 0 && isSchemeSuccess && isSuccessResApplicantGet && (
              <AlertBox severity="error" style={{ marginBottom: 15 }}>
                {t("noProjectsErrorMsg")}
              </AlertBox>
            )}
            {isErrorApplication && (
              <AlertBox severity="error" style={{ marginBottom: 15 }}>
                {errorMsgApplication}
              </AlertBox>
            )}
            {/* {isErrorFcfsLocationList && (
              <AlertBox severity="error" style={{ marginBottom: 15 }}>
                {errorMessageFcfsLocationList}
              </AlertBox>
            )} */}
            {/* <ProjectCard
                isSelected={true}
                projectDetails={{
                  image: "",
                  schemeName: "Taloja, Sector-29",
                  title: "",
                  price: "5525000",
                  location: "",
                  bhk: "2",
                  status: "",
                  carpetArea: "27.29",
                  reraId: "",
                }}
              /> */}
            {!showMapView && allProjectListForSelect.map((item, i) => (
              <>
                <ProjectCard
                  key={i}
                  setAllCategoryList={setAllCategoryList}
                  projectDetails={item}
                  afterSelectedCatEvent={afterSelectedCatEvent}
                  deSelectingProject={deSelectingProject}
                  afterSelectingFlat={afterSelectingFlat}
                  selectedFlat={selectedFlat}
                  disabledBtnState={selectProjectBtnState}
                  isFlatSelected={isFlatSelected}
                />
              </>
            ))}
            {showMapView &&
              <ProjectMap
                allProject={allProjectListForSelect}
                setAllCategoryList={setAllCategoryList}
                afterSelectedCatEvent={afterSelectedCatEvent}
                deSelectingProject={deSelectingProject}
                afterSelectingFlat={afterSelectingFlat}
                selectedFlat={selectedFlat}
                disabledBtnState={selectProjectBtnState}
                geoJson={geoJson}
              />}
          </div>
        </div>
        {currentApplicationData?.length > 0 && <div className={classes.actionSection}>
          <Grid container alignItems="center" justify="flex-end">
            {isFetchingStepper && (
              <Grid item xs="auto">
                <Box>
                  <Typography className={classes.progressView}>
                    {t("savingLoaderTxt")}...
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs="auto" style={{ marginRight: "20px", display: !currentApplicationData?.length > 0 ? "none" : "" }}><span style={{ fontWeight: "600" }}>{t('projectForm.continuePaymentTxt')}</span></Grid>
            <Grid item xs="auto">
              <Button
                variant="contained"
                color="primary"
                endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                onClick={() => updateStepperUI()}
                disabled={
                  !currentApplicationData?.length > 0 || isFetchingStepper
                }
              >
                {isFetchingStepper && (
                  <CircularProgress size={20} style={{ marginRight: "10px" }} />
                )}
                {t("saveButtonText")}
              </Button>
            </Grid>
          </Grid>
        </div>}
      </FormCard>
      <ProjectFiltersDialogBox open={open} onClose={handleClose} />

      <Dialog
        fullScreen={fullScreen}
        open={confirmScheme}
        onClose={() => {
          setConfirmScheme(false);
          setSelectScheme(previousSelectedScheme);
        }}
        aria-labelledby="pmay-dialog"
      >
        <DialogTitle id="pmay-dialog">
          {t("switchSchemeForm.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* You are switching {previousSelectedScheme} to {selectScheme}  your result may vary. */}
            {t("switchSchemeForm.subTitle")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirmScheme} color="primary">
            {t("switchSchemeForm.okBtn")}
          </Button>
          <Button
            onClick={() => {
              setConfirmScheme(false);
              setSelectScheme(previousSelectedScheme);
            }}
            color="primary"
            autoFocus
          >
            {t("switchSchemeForm.cancelBtn")}
          </Button>
        </DialogActions>
      </Dialog>
      {/* <ConfirmDialogBox
        title={t("Translation:skipDialog.title")}
        description={t("Translation:skipDialog.description")}
        question={t("Translation:skipDialog.question")}
        selectedValue={selectedValue}
        open={skipDialogOpen}
        onClose={handleCloseSkipDialog}
      /> */}
    </>
  );
};

export default withWidth()(SelectProjectForm);
