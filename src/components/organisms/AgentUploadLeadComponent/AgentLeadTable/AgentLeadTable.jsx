import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Popover,
  useTheme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { AgentLeadViewsStyles } from "../AgentLeadViews.styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListIcon from "@material-ui/icons/List";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  agentLeadSelector,
  clearAddCommentState,
  clearChangeStatusState,
  clearCommentState,
  getAgentLeadData,
} from "../../../../redux/features/agent/AgentLeadSlice";
import DefaultMessageBox from "../../../atoms/DefaultMessageBox/DefaultMessageBox";
import AgentDeleteDialoogBox from "../../../molecules/DialogBoxes/AgentDeleteLeadDialogBox/AgentDeleteLeadDialogBox";
import AgentLeadViewDialogBox from "../../../molecules/DialogBoxes/AgentLeadViewDialogBox/AgentLeadViewDialogBox";
import AgentComment from "../AgentCommentAndStatus/AgentComment";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from "prop-types";
import moment from "moment";

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: 80,
    height: 80,
    display: "inline-block",
    transform: "rotate(90deg)",
  },
  bottom: {
    color: "#F8F8F8",
  },
  top: {
    color: "#0BEB57",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0038C0",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
    padding: "0px 24px",
    lineHeight: "1"
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const statusList = [
  {
    value: 0,
    label: "Unattended",
  },
  {
    value: 1,
    label: "Call Back",
  },
  {
    value: 2,
    label: "Reminder",
  },
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
  {
    value: 6,
    label: "Not connected",
  },
  {
    value: 7,
    label: "Connected",
  },
  {
    value: 8,
    label: "Site Visit"
  }
];

const shortCategory = [
  {
    value: 1,
    label: "General"
  },
  {
    value: 2,
    label: "SC"
  },
  {
    value: 3,
    label: "ST"
  },
  {
    value: 4,
    label: "NT"
  },
  {
    value: 5,
    label: "DT"
  },
  {
    value: 6,
    label: "RM"
  },
  {
    value: 7,
    label: "State Gov."
  },
  {
    value: 8,
    label: "Journalist"
  },
  {
    value: 9,
    label: "CIDCO Emp."
  },
  {
    value: 10,
    label: "PAP"
  },
  {
    value: 11,
    label: "Divyang"
  },
  {
    value: 12,
    label: "Ex-Servicemen "
  },
  {
    value: 13,
    label: "Mathadi Kamgar"
  },
];

const stepper = [
  {
    value: 1,
    label: "Applicant Sign Up"
  },
  {
    value: 2,
    label: "KYC"
  },
  {
    value: 3,
    label: "Personal details"
  },
  {
    value: 4,
    label: "Add Co-Applicant"
  },
  {
    value: 5,
    label: "Category Details"
  },
  {
    value: 6,
    label: "Upload Documents"
  },
  {
    value: 7,
    label: "Application Fee"
  },
  {
    value: 8,
    label: "Document Verification"
  },
  {
    value: 9,
    label: "Select Flat"
  },
  {
    value: 10,
    label: "Booking Fee"
  },
  {
    value: 11,
    label: "LOI Generation"
  },
  {
    value: 12,
    label: "Allotment Letter"
  },
  {
    value: 13,
    label: "Installments"
  },
];

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;


  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        title="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page" title="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        title="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        title="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const AgentLeadTable = (props) => {
  const history = useHistory();
  const {
    cardData,
    storeLeadData,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    filterCategoryData,
    agentProfile,
    selectedStatus
  } = props;
  const classes = AgentLeadViewsStyles();
  const { t } = useTranslation("AgentLeadPageTrans");

  const [openLeadViewDialog, setOpenLeadViewDialog] = React.useState(false);
  const [openCommentDialog, SetOpenCommentDialog] = React.useState(false);
  const [leadData, setLeadData] = React.useState([]);

  const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(25);
  /* const [selectedFromDate, setSelectedFromDate] = useState(new Date('2021-08-09'));
  const [selectedToDate, setSelectedToDate] = useState(new Date('2021-08-10')); */
  const dispatch = useDispatch();
  const {
    agentLeadData,
    isFetchingAgentLead,
    isSuccessResAgentLead,
    isErrorAgentLead,
    errorMsgAgentLead,
    isSuccessResUploadAgentLead,
    isErroruploadAgentLead,
    errorMessageUploadpdateLead,
  } = useSelector(agentLeadSelector);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, storeLeadData.length - page * rowsPerPage);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleModalClose = () => {
    setOpenLeadViewDialog(false);
  };
  const handleCommentClose = () => {
    dispatch(getAgentLeadData());
    SetOpenCommentDialog(false);
    dispatch(clearCommentState());
    dispatch(clearAddCommentState());
    dispatch(clearChangeStatusState());
  }

  /* 
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
   */
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableRowData.length - page * rowsPerPage);

  const handleDisplayLabelRows = (from, to, count) => {
    return "";
  };

  function truncateString(str, numWords) {
    if (str) {
      const words = str.split(" ");
      if (words.length > numWords) {
        return words.slice(0, numWords).join(" ") + " ...";
      }
    }
    return str;
  }

  const categoryMapping = {};
  shortCategory.forEach((category) => {
    categoryMapping[category.value] = category.label;
  });
  const categoryTittleMapping = {};
  filterCategoryData.forEach((category) => {
    categoryTittleMapping[category.value] = category.label;
  });

  function CategoryName({ row }) {
    const categoryLabel = categoryMapping[row.category] || "--";
    const categoryTittle = categoryTittleMapping[row.category] || "--";
    const truncatedLabel = truncateString(categoryLabel, 2);

    return (
      <StyledTableCell align="center" title={categoryTittle} >
        {categoryLabel}
      </StyledTableCell>
    );
  }

  return (
    <div className={classes.root}>
      {/* {isFetchingAgentLead && (
        <Loading isOpen={isFetchingAgentLead} />
      )}
      {isErrorAgentLead && (
        <AlertBox severity="error">{errorMsgAgentLead}</AlertBox>
      )} */}
      {/* <Box component={Paper} className={classes.container}> */}
      <Grid item xs={12} style={{ padding: "8px 14px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid container alignItems="center">
              <span className={`_0 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Unattended</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <span className={`_1 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Call Back</Typography>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Grid container alignItems="center">
              <span className={`_2 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Reminder</Typography>
            </Grid>
          </Grid> */}
          <Grid item>
            <Grid container alignItems="center">
              <span className={`_3 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Call successful</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <span className={`_4 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Call not picked</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <span className={`_8 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Site Visit</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <span className={`_5 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Not Intrested</Typography>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Grid container alignItems="center">
              <span className={`_6 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Not Connected</Typography>
            </Grid>
          </Grid> */}
          {/* <Grid item>
            <Grid container alignItems="center">
              <span className={`_7 ${classes.statusLegends}`}></span>
              <Typography style={{ fontSize: 12 }}>Connected</Typography>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm>
          {storeLeadData.length > 0 && (
            <Box p={1} marginRight={1}>
              <TableContainer component={Paper}>
                <Table
                  size="small"
                  className="tableView"
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="center" style={{ borderLeft: "12px solid #0038C0" }}>Date</StyledTableCell>
                      <StyledTableCell align="center">{selectedStatus == 8 ? "Site Visit Time" : "Call Back"}</StyledTableCell>
                      <StyledTableCell align="center">Client Name</StyledTableCell>
                      <StyledTableCell align="center">Mobile No</StyledTableCell>
                      <StyledTableCell align="center">Category</StyledTableCell>
                      {/* <StyledTableCell align="center">{t("Requirment")}</StyledTableCell> */}
                      <StyledTableCell align="center">Location</StyledTableCell>
                      <StyledTableCell align="center">Comment</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {storeLeadData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.agentName);
                        const activeStep = row.ApplicantActiveStep;
                        const divideResult = activeStep / 13;
                        const Activeprogress = Math.round(divideResult * 100) + '%';
                        const ActiveStep = stepper.find((step) => step.value == activeStep)

                        return (
                          <StyledTableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            style={{
                              backgroundColor: row.ApplicantActiveStep && "#50f16b57"

                            }}
                            selected={isItemSelected}
                          >
                            <StyledTableCell className={`${classes.status} _${row.status}`} title={statusList.find((status) => status.value == row.status)?.label || "--"}>
                              {row.dateOfVisit || "--"}
                            </StyledTableCell>
                            {selectedStatus != 8 ? <StyledTableCell align="left" title={row.callBackTime ? moment(row.callBackTime).format("Do MMM, h:mm a") : "--"}>
                              {row.callBackTime ? <strong>{moment(row.callBackTime).format("Do MMM, h:mm a")}</strong> : "--"}
                            </StyledTableCell>
                              :
                              <StyledTableCell align="left" title={row.siteVisitTime ? moment(row.siteVisitTime).format("Do MMM, h:mm a") : "--"}>
                                {row.siteVisitTime ? <strong>{moment(row.siteVisitTime).format("Do MMM, h:mm a")}</strong> : "--"}
                              </StyledTableCell>}
                            <StyledTableCell align="left" title={row.name}>
                              {truncateString(row.name, 2) || "--"}
                            </StyledTableCell>
                            <StyledTableCell align="left" title={row.mobileNo}>
                              <strong>{row.mobileNo || "--"}</strong>
                              {row.ApplicantActiveStep != null && <><br />
                                <Box textAlign="center" paddingTop="3px" fontWeight="bold" color="blue" fontSize="12px" title={`Customer is Registered | Progress: ${Activeprogress} | Active Step : ${ActiveStep.value} (${ActiveStep.label})`}>
                                  ({ActiveStep.label})
                                </Box>
                              </>}
                            </StyledTableCell>
                            <CategoryName key={index} row={row} />
                            {/* <StyledTableCell align="center" title={row.requirement}>
                              {truncateString(row.requirement, 2) || "--"}
                            </StyledTableCell> */}
                            <StyledTableCell align="center" title={row.location}>
                              {truncateString(row.location, 2) || "--"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Box
                                hover
                                style={{
                                  cursor: "pointer",
                                  color: "#007AE7",
                                  hover: "",
                                }}
                              >
                                <IconButton
                                  title="view Lead detail"
                                  color="primary"
                                  onClick={() => {
                                    setLeadData(row);
                                    // setOpenLeadViewDialog(true);
                                    SetOpenCommentDialog(true);
                                  }}
                                >
                                  <ListIcon />
                                </IconButton>
                              </Box>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: (53) * emptyRows }}>
                        <TableCell colSpan={5} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
                <TablePagination
                  // rowsPerPageOptions={[25, 50, 100, { label: 'All', value: -1 }]}
                  rowsPerPageOptions={[25, 50, 100]}
                  labelDisplayedRows={handleDisplayLabelRows}
                  component="div"
                  count={storeLeadData.length}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                // showLastButton={storeLeadData.length>=rowsPerPage}
                />
              </TableContainer>
            </Box>
          )}
          {storeLeadData.length == 0 && (
            <div>
              <Box textAlign="center" paddingY={8}>
                <Box className={classes.errorMsgView}>
                  <Typography style={{ fontSize: 16 }}>
                    No Records Found !!
                  </Typography>
                </Box>
              </Box>
            </div>
          )}
          {/* {storeLeadData.length == 0 &&
            <DefaultMessageBox   />
          } */}
        </Grid>

        <AgentLeadViewDialogBox
          filterCategoryData={filterCategoryData}
          openLeadViewDialog={openLeadViewDialog}
          onClose={handleModalClose}
          leadData={leadData}
        />
        {(agentProfile && openCommentDialog) && <AgentComment
          filterCategoryData={filterCategoryData}
          openCommentDialog={openCommentDialog}
          onClose={handleCommentClose}
          leadData={leadData}
          agentProfile={agentProfile}
        />}
      </Grid>
    </div>
  );
};

export default AgentLeadTable;
