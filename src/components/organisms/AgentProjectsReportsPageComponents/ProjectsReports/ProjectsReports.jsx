import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  SuccessRupeesIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { AgentProjectsReportsStyles } from "../AgentProjectsReports.styles";
import ProjectOverviewChart from "../ProjectOverviewChart/ProjectOverviewChart";
import Image from "../../../../assets/Profile.jpg";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from "react-redux";
import { getAgentProjectOverviewDetails, agentApplicantsSelector } from "../../../../redux/features/agent/AgentAnalDashboardSlice";
import moment from "moment";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

import { useHistory, useLocation } from "react-router-dom";
import { ApplicationDtlsIcon, ApplicationDownloadIcon, BlackBackArrowIcon, SourceQuestionIcon } from "../../../atoms/SvgIcons/SvgIcons";


// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: 80,
    height: 80,
    display: "inline-block",
    transform: "rotate(90deg)"
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

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();
  const history   = useHistory();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={80}
        thickness={5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={80}
        thickness={5}
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ transform: "rotate(-90deg)" }}
      >
        <Typography variant="caption" style={{
          color: "#0F2940",
          fontWeight: "bold",
          fontSize: "0.8rem"
        }}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </div>
  );
}

const tableRows = [
  {
    ProjectDuration: "05 Apr’21 - 19 Aug’21",
    ProjectName: "22 - Taloja",
    TotalInprogress: 100,
    TotalCompleted: 400
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: '01', textCenterIs: false, disablePadding: false, label: 'Sr.No.' },
  { id: '02', textCenterIs: true, disablePadding: false, label: 'Project Duration' },
  { id: '03', textCenterIs: false, disablePadding: false, label: 'Project Name' },
  { id: '04', textCenterIs: true, disablePadding: false, label: 'Total In progress' },
  { id: '05', textCenterIs: true, disablePadding: false, label: 'Total Completed' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.textCenterIs ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

/* const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: props => ({
    borderRadius: 8,
    backgroundImage: props.barcolor
  })
}))(LinearProgress); */

/* const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
})); */

const ProjectsReports = (props) => {
  const history   = useHistory();
  const { cardData } = props;
  const classes = AgentProjectsReportsStyles();
  const { t } = useTranslation("AnalyDashboardPageTrans");

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [selectedPeriod, setSelectedPeriod] = useState("this_year");
  const [sortByParam, setSortByParam] = useState("");
  const [empSearchText, setEmpSearchText] = useState("");
  const [avtiveSchemeIs, setAvtiveSchemeIs] = useState(false);
  /* const [selectedFromDate, setSelectedFromDate] = useState(new Date('2021-08-09'));
  const [selectedToDate, setSelectedToDate] = useState(new Date('2021-08-10')); */
  const dispatch = useDispatch();
  const {
    isFetchingAgentProjectOverview,
    isSuccessResAgentProjectOverview,
    isErrorAgentProjectOverview,
    errorMsgAgentProjectOverview,
    agentProjectOverviewData,
  } = useSelector(agentApplicantsSelector);
  const [tableRowCount, setTableRowCount] = useState(0);
  const [tableRowData, setTableRowData] = useState(tableRows);

  /* const handleFromDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedToDate(date);
  }; */

  useEffect(() => {
    // let params = "perpage=10&page=1&sortby=asc&search=1&activescheme=1&schemeid=false";
    let params = "search=" + empSearchText;
    if (sortByParam) {
      params += "&sortby=" + sortByParam;
    }
    if (avtiveSchemeIs) {
      params += "&activescheme=0&schemeid=1";
    } else {
      params += "&activescheme=1&schemeid=false";
    }
    params += "&perpage=" + rowsPerPage + "&page=" + (page + 1);

    localStorage.setItem("agntProjectOverviewApiParam", params);
    dispatch(getAgentProjectOverviewDetails());
  }, [dispatch, t, selectedPeriod, empSearchText, sortByParam, avtiveSchemeIs, rowsPerPage, page]);

  useEffect(() => {
    console.log("agentProjectOverviewData", agentProjectOverviewData);
    if (isSuccessResAgentProjectOverview) {
      setTableRowCount(agentProjectOverviewData.Total);
      setTableRowData(agentProjectOverviewData.ProjectList);
    }
  }, [agentProjectOverviewData]);

  /* const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
    }
  }; */

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /* const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }; */

  const handleChangePage = (event, newPage) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(newPage);
  };

  /* const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; */
  /* 
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
   */
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableRowData.length - page * rowsPerPage);

  const handleDisplayLabelRows = (from, to, count) => {
      return "";
  }
  return (
    <div className={classes.root}>
      {/* {isFetchingAgentAnalDashboard && <Loading isOpen={isFetchingAgentAnalDashboard} />}
      {isErrorAgentAnalDashboard && (
        <AlertBox severity="error">{errorMsgAgentAnalDashboard}</AlertBox>
      )} */}
      <Box component={Paper} className={classes.container}>
      <IconButton
          className={classes.backBtn}
          onClick={() => history.push("/cfc-analytics-dashboard")}
        >
          <BlackBackArrowIcon fontSize="small" />
        </IconButton>
        <Grid container alignItems="center" justify="space-between" style={{ marginBottom: 30 }}>
          <Grid item>
            <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("reportsPage.title")}</Typography>
            {/* <Typography className={classes.subTitle}>{t("reportsPage.subTitle1")} <strong>Renuka</strong> {t("reportsPage.subTitle2")}</Typography> */}
          </Grid>
          <Grid item>
            <TextField
              type="text"
              variant="outlined"
              className={`${classes.filterInputBox} search`}
              placeholder={t("reportsPage.searchInputPlaceholder")}
              value={empSearchText}
              onChange={(event) => setEmpSearchText(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      /* onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword} */
                      edge="end"
                    >
                      <SearchOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm>
            <Box component={Paper} p={1} marginRight={1}>
              <TableContainer>
                <Table
                  className="tableView"
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  {/* <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={tableRowCount}
                  /> */}

                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {t("reportsPage.tableView.head1")}
                      </TableCell>
                      <TableCell align="center">
                        {t("reportsPage.tableView.head2")}
                      </TableCell>
                      <TableCell>
                        {t("reportsPage.tableView.head3")}
                      </TableCell>
                      <TableCell align="center">
                        {t("reportsPage.tableView.head4")}
                      </TableCell>
                      <TableCell align="center">
                        {t("reportsPage.tableView.head5")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(tableRowData, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.agentName);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                          >
                            <TableCell>
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">
                              {row.ProjectDuration || "--"}
                            </TableCell>
                            <TableCell>
                              <strong>{row.ProjectName || "--"}</strong>
                            </TableCell>
                            <TableCell align="center">
                              {row.Inprogress || "--"}
                            </TableCell>
                            <TableCell align="center">
                              {row.Completed || "--"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                labelDisplayedRows={handleDisplayLabelRows}
                component="div"
                count={tableRowCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
              />
            </Box>
          </Grid>
          <Grid item>
            {isSuccessResAgentProjectOverview &&
              <ProjectOverviewChart agentProjectOverviewData={agentProjectOverviewData} />
            }
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProjectsReports;
