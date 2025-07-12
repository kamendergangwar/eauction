import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import { Formik, Form, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconTitle from "../../../atoms/IconTitle/IconTitle";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { agentApplicantsSelector } from "../../../../redux/features/agent/AgentAnalDashboardSlice";
import FormControl from "../../../molecules/FormControl/FormControl";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import TablePagination from '@material-ui/core/TablePagination';
// import AgentApplicantCard from "../AgentApplicantCard/AgentApplicantCard";
import {
  FilterIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { getProjectsListData, clearProjectListData, projectDataSelector } from "../../../../redux/features/projectdata/ProjectDataSlice";
import { AgentLeadViewsStyles } from "../AgentLeadViews.styles";
import Image from "../../../../assets/Profile.jpg";
import { masterDataSelector, getReservationCategories } from "../../../../redux/features/masterdata/MasterDataSlice";
import { debounce } from "lodash";




// const applicationSortList = [
//   { value: "all", label: "All" },
//   // { value: "1", label: "Registration" },
//   { value: "PersonalDetails", label: "Personal Details" },
//   { value: "CategoryDetails", label: "Category Details" },
//   { value: "Submit Document", label: "Submit Document" },
//   { value: "Payment", label: "Payment" },
//   // { value: "6", label: "E-stamping and E-signing" }
// ];


const statusList = [
  {
    value: 0,
    label: "Unattended",
  },
  {
    value: 1,
    label: "Call Back",
  },
  // {
  //   value: 2,
  //   label: "Reminder",
  // },
  {
    value: 3,
    label: "Call Successful",
  },
  {
    value: 4,
    label: "Call not Picked up",
  },
  {
    value: 5,
    label: "Not interested",
  },
  // {
  //   value: 6,
  //   label: "Not connected",
  // },
  // {
  //   value: 7,
  //   label: "Connected",
  // },
  {
    value: 8,
    label: "Site Visit"
  }
];



const AgentLeadFilters = (props) => {
  const { width, applicationsData, setSearchedText, searchedText, setSelectedCategory, setSelectedSort, setSelectedStatus, selectedStatus, setClear, clear, setApplicationProject, applicationProject, setSelectedTab, disabledStatus, filterCategoryData } = props;
  const { t } = useTranslation("AgentLeadPageTrans");
  const classes = AgentLeadViewsStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [marritalStatus, setMarritalStatus] = React.useState("");
  const [formValues, setFormValues] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterProjectListData, setFilterProjectListData] = useState([]);
  const [value, setValue] = useState('');
  const formikRef = useRef();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const initialValues = {
    searchLead: "",
    applicationCategory: "",
    applicationProject: "",
    applicationSort: "",
    applicationStatus: null,
  };

  const {
    projectListData,
    ProListData,
    isSuccessProjectListData,
  } = useSelector(projectDataSelector)


  const {
    allCategory,
    isSuccessMasterData
  } = useSelector(masterDataSelector);


  const sortOptions = [
    { value: "asc", label: t("filterSection.ascTxt") },
    { value: "dsc", label: t("filterSection.dscTxt") },
  ];

  // useEffect(()=>{
  //   if(isSuccessMasterData){
  //     clearProjectListData()
  //   }
  // },[isSuccessMasterData])

  //   useEffect(() => {
  //     let getFilterParamsObj = localStorage.getItem("appDashboardFiltersParam");
  //     if (getFilterParamsObj !== null) {
  //       let newObj = JSON.parse(getFilterParamsObj);
  //       //console.log("filters1", newObj)
  //       if (newObj.status) {
  //         for (let p = 0; p < applicationSortList.length; p++) {
  //           const element = applicationSortList[p];
  //           if (element.label == newObj.status) {
  //             setSelectedStatus(element.value);
  //             const savedValues = {
  //               applicationSort: element.value,
  //               applicationProject: "",
  //               applicationCategory: ""
  //             };
  //             setFormValues(savedValues);
  //           }
  //         }
  //       }
  //     }
  //   }, []);

  const onSubmit = (values, { setSubmitting }) => {
    // console.log("valuesdgd",values);
    setSelectedCategory(values.applicationCategory);
    setSelectedSort(values.applicationSort);
    setSelectedStatus(values.applicationStatus)
    setSubmitting(false);

    setSearchedText(values.searchLead);

  };

  const formClearEvent = () => {
    const formik = formikRef.current;
    formik.resetForm();
    setClear(true);
    setSelectedCategory("");
    setSelectedSort("");
    setSelectedStatus("");
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]);


  const debounceFn = useMemo(() => debounce(handleDebounce, 500), []);

  function handleDebounce(inputValue) {
    setSearchedText(inputValue)
  };

  function handleChange(event) {
    setValue(event.target.value);
    debounceFn(event.target.value);
  };

  return (
    <Box m={2}>
      <Formik
        initialValues={formValues || initialValues}
        onSubmit={onSubmit}
        innerRef={formikRef}
      >
        {({ submitForm, values }) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={2} alignItems="center">
              <Grid item className={classes.searchBoxCol}>
                <FormControl
                  control="input"
                  variant="outlined"
                  placeholder="search by name or mobile no."
                  name="searchLead"
                  type="text"
                  value={value}
                  onChange={handleChange}
                  id="searchLead"
                  className={`${classes.filterInputBox} searchBox`}
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Attach File"
                          // onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="small"
                        >
                          <SearchOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* <Grid item>
                <Typography className={classes.appFilterLabel}><FilterIcon />{t("filterSection.filterTitle")}</Typography>
              </Grid> */}
              <Grid item xs>
                <FormControl
                  control="selectbox"
                  variant="outlined"
                  label={t("filterSection.categoryLabel")}
                  name="applicationCategory"
                  id="applicationCategory"
                  options={filterCategoryData}
                  className={`${classes.filterInputBox} filterInputs`}
                  margin="dense"
                />
              </Grid>
              {/* <Grid item sm xs={12}>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    label={t("filterSection.projectLabel")}
                    name="applicationProject"
                    id="applicationProject"
                    options={filterProjectListData}
                    className={`${classes.filterInputBox} filterInputs`}
                  />
                </Grid> */}
              <Grid item sm xs={12}>

                <FormControl
                  control="selectbox"
                  variant="outlined"
                  label="Filter By Status"
                  name="applicationStatus"
                  id="applicationStatus"
                  //value={formValues.applicationSort}
                  options={statusList}
                  className={`${classes.filterInputBox} filterInputs`}
                  disabled={disabledStatus}
                  margin="dense"
                />
              </Grid>
              <Grid item sm={"auto"} xs={12}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={submitForm}>
                  {t("filterSection.filterBtnText")}
                </Button>
              </Grid>
              {(values.searchLead || values.applicationCategory || values.applicationSort || values.applicationStatus || values.applicationStatus == 0) &&
                <Grid item sm={"auto"} xs={12}>
                  <Button
                    size="small"
                    color="primary"
                    type="button"
                    onClick={() => formClearEvent()}>
                    {t("filterSection.clearBtnText")}
                  </Button>
                </Grid>
              }
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default withWidth()(AgentLeadFilters);
