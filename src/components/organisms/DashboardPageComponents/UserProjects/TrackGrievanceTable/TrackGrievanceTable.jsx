import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as yup from "yup";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import FormControl from "../../../../molecules/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/Clear';
import Hidden from "@material-ui/core/Hidden";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { projectDataSelector } from "../../../../../redux/features/projectdata/ProjectDataSlice";
import Loading from "../../../../atoms/Loading/Loading";
import AlertBox from "../../../../atoms/AlertBox/AlertBox";
import { UploadFileIcon, ToolsIcon, NextArrowIcon1, BackArrowIcon, DateLastUpdateIcon } from "../../../../atoms/SvgIcons/SvgIcons";
import { TrackGrievanceTableStyles } from "./TrackGrievanceTable.styles";
import {
  GrievanceCategoryList,
  GrievanceTypeList,
} from "../../../../../utils/MasterData";
import {
  grievanceSelector,
  getGrievanceDetails,
  searchGrievance,
  searchGrievanceFilter,
  getGrievanceList,
  clearSuccessMsg
} from "../../../../../redux/features/Grievance/GrievanceSlice";

const familyData = [
  {
    GrievanceNo: "Nilesh Singh",
    GrievanceType: "Payment Issue",
    GrievanceSubType: "Money debited but still showing pending",
    RegDate: "24 - Jun - 21",
    Status: "Pending",
    Remarks: "",
  },
  {
    GrievanceNo: "Nilesh Singh",
    GrievanceType: "Lottery Issue",
    GrievanceSubType: "",
    RegDate: "24 - Jun - 21",
    Status: "In Progress",
    Remarks: "",
  },
];

// console.log(GrievanceTypeList[1].label);
const grievanceStatusList = [
  { value: "1", label: "Pending" },
  { value: "2", label: "In progress" },
  { value: "3", label: "Completed" },
];

const TrackGrievanceTable = (props) => {
  const classes = TrackGrievanceTableStyles();
  const { t } = useTranslation("DashboardPageTrans");
  const [filter, setFilter] = useState(false);
  const [detail, setDetail] = useState([]);
  const [griType, setGriType] = useState("");
  const [trackGreRecord, setTrackGreRecord] = useState([]);
  const [grievanceStatusRecord, setGrievanceStatusRecord] = useState([]);
  const [typeRecord, setTypeRecord] = useState([]);
  const [stateValue, setStateValue, getStateValue] = useState("");
  const dispatch = useDispatch();
  const { isProjectDataFetching, isProjectDataError, projectDataErrorMessage } =
    useSelector(projectDataSelector);

  const {
    isGrievanceSuccess,
    grievanceData,
    isFetchingGrievance,
    isSearchFetching,
    issearchSuccess,
    searchData,
    filterData,
    isFilterFetching,
    isFilterSuccess,
    typeDataList,
    isTypeSuccess,
    statusDataList,
    GrievanceListSuccess,
    GrievanceListData,
    GrievanceListError,
    GrievanceListErrorMsg,
  } = useSelector(grievanceSelector);

  const formikRef = useRef();

  const initialValues = {
    fullName: "",
    emailId: "",
    mobileNumber: "",
    grievanceType1: "",
    grievanceStatus: ""
  };
  const viewDetail = (data) => {
    // console.log(data);
    // const requestData = {
    //   grievanceNumber: data.grievance_number,
    // };
    props.setGriDetailsData(data);
    // dispatch(getGrievanceDetails(data.grievance_number));
    props.setGrievanceSecStates("details");
  };



  useEffect(() => {
    if (typeDataList) {
      const uniqueType = typeDataList.filter((v, i, a) => a.findIndex(t => (t.value == v.value)) === i);
      setTypeRecord(uniqueType);
    }
  }, [typeDataList]);



  useEffect(() => {
    setTrackGreRecord(searchData);
    const uniqueStatus = statusDataList.filter((v, i, a) => a.findIndex(t => (t.value == v.value)) === i);
    setGrievanceStatusRecord(uniqueStatus);
  }, [searchData, issearchSuccess]);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (values.fullName) {
      const requestData = {
        fullName: values.fullName,
      };
      // console.log("requestData", requestData);
      // dispatch(loginUser(requestData));
    }
  };


  const handleFilter = (type) => {
    let paramsData = {
      searchString: "",
      type: "",
      grievanceStatus: ""
    }

    paramsData.searchString = formikRef.current.values.searchByUniqueNumber != undefined ? formikRef.current.values.searchByUniqueNumber : "";
    paramsData.type = localStorage.getItem("grievanceType1") ? localStorage.getItem("grievanceType1") : "";
    paramsData.grievanceStatus = localStorage.getItem("grievanceStatus") ? localStorage.getItem("grievanceStatus") : "";

    dispatch(searchGrievance(paramsData));

  }

  useEffect(() => {
    dispatch(getGrievanceList());
  }, [dispatch])


  useEffect(() => {
    if (GrievanceListSuccess) {
      setTrackGreRecord(GrievanceListData.data);
      dispatch(clearSuccessMsg());
    }
  }, [GrievanceListSuccess, GrievanceListData])


  const clearFilter = () => {
    formikRef.current.setFieldValue("searchByUniqueNumber", "");
    formikRef.current.setFieldValue("grievanceType1", "");
    formikRef.current.setFieldValue("grievanceStatus", "");

    localStorage.setItem('grievanceType1', "");
    localStorage.setItem('grievanceStatus', "");
    localStorage.setItem('seachContent', "");
    dispatch(getGrievanceList());
    setFilter(false);
  }

  return (
    <div>
      {/* {console.log(trackGreRecord, "trackGreRecord")} */}
      {isSearchFetching && <Loading isOpen={isSearchFetching} />}
      {isProjectDataError && (
        <AlertBox severity="error">{projectDataErrorMessage}</AlertBox>
      )}
      <div className={classes.trackTableContainer}>
        <Box>
          <Typography variant="h6">{t("trackGrievanceTable.title")}</Typography>
          <Grid container alignItems="center">
            <Grid item md xs={12}>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                innerRef={formikRef}
              >
                {({ submitForm, setFieldValue }) => (
                  <Form noValidate autoComplete="off">
                    <Grid
                      container
                      spacing={1}
                      className={classes.grievanceFilterSec}
                    >
                      <Grid item md={5} xs={12}>
                        <FormControl
                          control="input"
                          variant="outlined"
                          placeholder={t(
                            "trackGrievanceTable.filterSection.searchByUniqueNumberLabel"
                          )}
                          name="searchByUniqueNumber"
                          type="text"
                          label={t(
                            "trackGrievanceTable.filterSection.searchByUniqueNumberLabel"
                          )}
                          id="searchByUniqueNumber"
                          className={classes.filterInputBox}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Attach File"
                                  onClick={(e) => {
                                    handleFilter();
                                    localStorage.setItem('seachContent', formikRef.current.values.searchByUniqueNumber);
                                    setFilter(true)
                                  }}
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
                      <Grid item md={3} xs={12}>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          placeholder={t(
                            "trackGrievanceTable.filterSection.grievanceTypeLabel"
                          )}
                          label={t(
                            "trackGrievanceTable.filterSection.grievanceTypeLabel"
                          )}
                          name="grievanceType1"
                          id="grievanceType1"
                          options={typeRecord}
                          className={classes.filterInputBox}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setFieldValue("grievanceType1", e.target.value);
                              localStorage.setItem('grievanceType1', e.target.value);
                              handleFilter();
                              setFilter(true);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item md={3} xs={6}>
                        <FormControl
                          control="selectbox"
                          variant="outlined"
                          placeholder={t(
                            "trackGrievanceTable.filterSection.grievanceStatusLabel"
                          )}
                          label={t(
                            "trackGrievanceTable.filterSection.grievanceStatusLabel"
                          )}
                          name="grievanceStatus"
                          id="grievanceStatus"
                          options={grievanceStatusRecord}
                          className={classes.filterInputBox}
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setFieldValue("grievanceStatus", e.target.value);
                              localStorage.setItem('grievanceStatus', e.target.value);
                              handleFilter();
                              setFilter(true);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item md={1} xs={6}>
                        {filter && (<IconButton aria-label="clear" className={classes.margin} size="medium" onClick={(e) => clearFilter()}>
                          <ClearIcon fontSize="inherit" />
                        </IconButton>)}
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.raisNewGrievanceBtn}
                onClick={() => props.setGrievanceSecStates("form")}
              >
                {t("trackGrievanceTable.raiseNewGrievanceBtnTxt")}
              </Button>
            </Grid>
          </Grid>
          {/* <Hidden>
            
          </Hidden> */}
          <TableContainer classes={{ root: classes.customTableContainer }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    {t("trackGrievanceTable.table.tableTh0")}
                  </TableCell>
                  <TableCell>
                    {t("trackGrievanceTable.table.tableTh1")}
                  </TableCell>
                  <TableCell>
                    {t("trackGrievanceTable.table.tableTh2")}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {t("trackGrievanceTable.table.tableTh3")}
                  </TableCell>
                  {/* <TableCell style={{ textAlign: "center" }}>
                      {t("trackGrievanceTable.table.tableTh4")}
                    </TableCell> */}
                  <TableCell style={{ textAlign: "center" }}>
                    {t("trackGrievanceTable.table.tableTh5")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trackGreRecord &&
                  trackGreRecord.map((item) => {
                    return (
                      <TableRow
                        key={item.grvid}
                        style={{ textTransform: "capitalize" }} className="GriTableRow"
                      >
                        <TableCell>
                          <Typography className="grievanceNo">
                            <strong>{item.caseNumber}</strong>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="grievanceType">
                            {/* <strong>Lottery Refund</strong>  */}
                            <strong>{item.grievance_category}</strong>
                          </Typography>
                          <small className="grievanceSubType">{item.description}</small>
                        </TableCell>
                        <TableCell> <DateLastUpdateIcon className="dateIcon" /><span className="dateTxt">{moment(new Date(item.CreatedAt)).format("DD-MMM-YY")}</span></TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {/* {row || "In Progress"} */}
                          {(item.status == "pending" || item.status == "Under Review" || item.status == "In Progress" || item.status == "Transferred") && (
                            <span className="statusTag warningLabel">
                              {item.status}
                            </span>
                          )}

                          {(item.status == "New" || item.status == "Reopen") && (
                            <span className="statusTag successLabel">
                              {item.status}
                            </span>
                          )}

                          {(item.status == "Closed." || item.status == "Resolved") && (
                            <span className="statusTag closedLabel">
                              {item.status}
                            </span>
                          )}
                        </TableCell>
                        {/* <TableCell style={{ textAlign: "center" }}>
                            {row.Remarks || "--"}
                          </TableCell> */}
                        <TableCell style={{ textAlign: "center" }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => viewDetail(item)}
                          >
                            {t("trackGrievanceTable.actionBtnTxt")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {/* {filter && filterData.length > 0
                    ? filterData.map((row) => {
                        return (
                          <TableRow
                            key={row.grievance_number}
                            style={{ textTransform: "capitalize" }}
                          >
                            <TableCell>
                              {row.grievance_number || "--"}
                            </TableCell>
                            <TableCell>
                              <Typography style={{ fontWeight: "bold" }}>
                                {row?.grievances_type || ""}
                              </Typography>
                              <small>{row?.grievance_category || ""}</small>
                            </TableCell>
                            <TableCell>{row.RegDate || "--"}</TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <span
                                className={`${classes.grievanceStatus} ${
                                  row.Status == "In Progress"
                                    ? "inProgress"
                                    : ""
                                }`}
                              >
                                {row?.status || "In Progress"}
                              </span>
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {row.Remarks || "--"}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => viewDetail(row.grievance_number)}
                              >
                                {t("trackGrievanceTable.actionBtnTxt")}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : " No Data found"} */}
              </TableBody>
            </Table>

            {trackGreRecord == undefined && (<AlertBox severity="error">grivance does not exists</AlertBox>)}

            {/* { trackGreRecord && GrievanceListSuccess &&
                <AlertBox severity="error">grivance does not exists</AlertBox>
              } */}

            {trackGreRecord != undefined && trackGreRecord.length == 0 && (<AlertBox severity="error">{"No Record Found"}</AlertBox>)}

            {/* {trackGreRecord.length==0 && issearchSuccess==false && (
                <AlertBox severity="error">{"No Record Found"}</AlertBox>
              )} */}
          </TableContainer>
          {/* <Hidden only={["sm", "md", "lg"]}>
            <Box className={classes.trckListBoxCont}>
              {familyData.map((row, index) => (
                <Card className={classes.trckDetlsCardRoot} key={index}>
                  <CardHeader
                    titleTypographyProps={{ variant: "button" }}
                    title={row.RegDate || "--"}
                    subheader={
                      <Button
                        type="button"
                        size="small"
                        style={{
                          fontWeight: "normal",
                          backgroundColor: "#edf5ff",
                          color: "#45688d",
                          cursor: "default",
                        }}
                        disableTouchRipple
                      >
                        {row.GrievanceNo || "--"}
                      </Button>
                    }
                  />
                  <CardContent>
                    <Box display="flex" marginY={1}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {t("trackGrievanceTable.table.tableTh1")}:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: "bold" }}
                          >
                            {row.GrievanceType || "--"}
                          </Typography>
                          <small>{row.GrievanceSubType}</small>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box display="flex" marginY={1}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {t("trackGrievanceTable.table.tableTh4")}:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: "bold" }}
                          >
                            {row.Remarks || "--"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box display="flex" marginY={1}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {t("trackGrievanceTable.table.tableTh3")}:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <span
                            className={`${classes.grievanceStatus} ${
                              row.Status == "In Progress" ? "inProgress" : ""
                            }`}
                          >
                            {row.Status}
                          </span>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box textAlign="center" marginTop={3}>
                      <Button variant="outlined" color="primary" size="small">
                        {t("trackGrievanceTable.actionBtnTxt")}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Hidden> */}
        </Box>
      </div>
    </div>
  );
};

export default TrackGrievanceTable;
