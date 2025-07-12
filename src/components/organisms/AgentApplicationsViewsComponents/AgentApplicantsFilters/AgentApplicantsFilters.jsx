import React, { useEffect, useState, useRef } from "react";
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
import AgentApplicantCard from "../AgentApplicantCard/AgentApplicantCard";
import {
  FilterIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { getProjectsListData, clearProjectListData, projectDataSelector } from "../../../../redux/features/projectdata/ProjectDataSlice";
import { AgentApplicationsViewsStyles } from "../AgentApplicationsViews.styles";
import Image from "../../../../assets/Profile.jpg";
import { masterDataSelector } from "../../../../redux/features/masterdata/MasterDataSlice";




const applicationStatusList = [
  { value: "all", label: "All" },
  // { value: "1", label: "Registration" },
  { value: "PersonalDetails", label: "Personal Details" },
  { value: "CategoryDetails", label: "Category Details" },
  { value: "Submit Document", label: "Submit Document" },
  { value: "Payment", label: "Payment" },
  // { value: "6", label: "E-stamping and E-signing" }
];

const PaymentModeList = [
  { value: "all", label: "All" },
  { value: "offline", label: "Offline" },
  { value: "online", label: "Online" }
];


const AgentApplicantsFilters = (props) => {
  const { width, applicationsData, setSearchedText, searchedText, setSelectedCategory, setSelectedStatus, selectedStatus, setClear, clear, setApplicationProject, applicationProject, setSelectedTab, disabledStatus} = props;
  console.log("props",props);
  const { t } = useTranslation("AgentApplicationDashboardPageTrans");
  const classes = AgentApplicationsViewsStyles();
  const [applicantsFullName, setApplicantsFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [marritalStatus, setMarritalStatus] = React.useState("");
  const [formValues, setFormValues] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterProjectListData, setFilterProjectListData] = useState([]);
  const [filterCategoryData, setFilterCategoryData] = useState([]);
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
    searchApplicant: "",
    applicationCategory: "",
    applicationProject: "",
    applicationStatus: "",
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

  useEffect(()=> {
    getProjectsListData();
  },[])


  useEffect(()=>{
    if(isSuccessMasterData){
      clearProjectListData()
    }
  },[isSuccessMasterData])

  useEffect(() => {
    let getFilterParamsObj = localStorage.getItem("appDashboardFiltersParam");
    if (getFilterParamsObj !== null) {
      let newObj = JSON.parse(getFilterParamsObj);
      //console.log("filters1", newObj)
      if (newObj.status) {
        for (let p = 0; p < applicationStatusList.length; p++) {
          const element = applicationStatusList[p];
          if (element.label == newObj.status) {
            setSelectedStatus(element.value);
            const savedValues = {
              applicationStatus: element.value,
              applicationProject: "",
              applicationCategory: ""
            };
            setFormValues(savedValues);
          }
        }
      }
    }
  }, []);


  useEffect(()=> {
    if(isSuccessMasterData) {
      setFilterCategoryData(allCategory);
    }
    if(isSuccessProjectListData) {
      setFilterProjectListData(ProListData);
    }
  },[isSuccessMasterData, isSuccessProjectListData])

  const onSubmit = (values, { setSubmitting }) => {
    // console.log("valuesdgd",values);
    setSubmitting(false);
    setSearchedText(values.searchApplicant);
    setSelectedCategory(values.applicationCategory);
    setSelectedStatus(values.applicationStatus);
    setApplicationProject(values.applicationProject)

  };

  const formClearEvent = () => {

    const formik = formikRef.current;
    formik.resetForm();
    setClear(true);
    setApplicationProject("");
    setSelectedCategory("");
    setSelectedStatus("");
    //setSelectedTab(0);
    // console.log("enter apply", clear);
  };

  useEffect(() => {
    const formik = formikRef.current;
    formik.resetForm();
  }, [t]);

  return (
    <Grid>
      {/* {console.log("vikram",ProListData)} */}
      <Formik
        initialValues={formValues || initialValues}
        onSubmit={onSubmit}
        innerRef={formikRef}
      >
        {({ submitForm, values }) => (
          <Form noValidate autoComplete="off">
            {/* {console.log("Formvalue", formValues)} */}
            <Grid container spacing={1} alignItems="center">
              <Grid item md={5} xs={12} className={classes.searchBoxCol}>
                <FormControl
                  control="input"
                  variant="outlined"
                  placeholder={t("filterSection.searchLabel")}
                  name="searchApplicant"
                  type="text"
                  value={searchedText}
                  onChange={(e) => setSearchedText(e.target.value)}
                  id="searchApplicant"
                  className={`${classes.filterInputBox} searchBox`}
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
                <ButtonGroup disableElevation variant="contained" color="primary">
                  <Button>One</Button>
                  <Button>Two</Button>
                </ButtonGroup>
              </Grid> */}
            </Grid>
            <Box paddingY={2}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography className={classes.appFilterLabel}><FilterIcon />{t("filterSection.filterTitle")}</Typography>
                </Grid>
                <Grid item xs>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    label={t("filterSection.categoryLabel")}
                    name="applicationCategory"
                    id="applicationCategory"
                    options={filterCategoryData}
                    className={`${classes.filterInputBox} filterInputs`}
                  />
                </Grid>
                <Grid item sm xs={12}>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    label={t("filterSection.projectLabel")}
                    name="applicationProject"
                    id="applicationProject"
                    options={filterProjectListData}
                    className={`${classes.filterInputBox} filterInputs`}
                  />
                </Grid>
                <Grid item sm xs={12}>
                  <FormControl
                    control="selectbox"
                    variant="outlined"
                    label={t("filterSection.statusLabel")}
                    name="applicationStatus"
                    id="applicationStatus"
                    //value={formValues.applicationStatus}
                    options={PaymentModeList}
                    className={`${classes.filterInputBox} filterInputs`}
                    disabled={disabledStatus}
                  />
                </Grid>
                <Grid item sm={"auto"} xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={submitForm}>
                    {t("filterSection.filterBtnText")}
                  </Button>
                </Grid>
                {(values.searchApplicant || values.applicationCategory || values.applicationProject || values.applicationStatus) &&
                  <Grid item sm={"auto"} xs={12}>
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => formClearEvent()}>
                      {t("filterSection.clearBtnText")}
                    </Button>
                  </Grid>
                }
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      {/* <Box>
        <AgentApplicantCard applicationsData={applicationsData} />
      </Box>
      <Box className={classes.gridPagination}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={500}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box> */}
    </Grid>
  );
};

export default withWidth()(AgentApplicantsFilters);
