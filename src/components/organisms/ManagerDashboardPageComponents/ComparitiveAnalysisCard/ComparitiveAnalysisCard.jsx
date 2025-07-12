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
import { ManagerDashboardStyles } from "../ManagerDashboard.styles";
import Image from "../../../../assets/Profile.jpg";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from "react-redux";
import { getManagerComparitiveAnalysis, managerDashboardSelector } from "../../../../redux/features/agent/AgentManagerDashboardSlice";
import moment from "moment";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

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

/* const rows = [
  {
    agentName: "Agent 1",
    totalCompleted: 50,
    overallSuccRate: 5,
    totalEarning: "400",
    lead: 10,
    completed: 15,
    inProgress: 20,
    value: 50
  },
  {
    agentName: "Agent 2",
    totalCompleted: 45,
    overallSuccRate: 10,
    totalEarning: "500",
    lead: 10,
    completed: 10,
    inProgress: 10,
    value: 25
  },
  {
    agentName: "Agent 3",
    totalCompleted: 10,
    overallSuccRate: 20,
    totalEarning: "1000",
    lead: 3,
    completed: 3,
    inProgress: 3,
    value: 60
  }
]; */

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
  { id: 'agentName', numeric: false, disablePadding: false, label: 'Agent Name' },
  { id: 'overallStats', numeric: false, disablePadding: false, label: 'Overall Stats' },
  { id: 'totalCompleted', numeric: true, disablePadding: false, label: 'Total Completed' },
  { id: 'overallSuccessRate', numeric: true, disablePadding: false, label: 'Overall Success Rate' },
  { id: 'totalEarnings', numeric: true, disablePadding: false, label: 'Total Earnings' },
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
            align={headCell.numeric ? 'center' : 'left'}
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

const BorderLinearProgress = withStyles((theme) => ({
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
}))(LinearProgress);

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

const ComparitiveAnalysisCard = (props) => {
  const { managerDashboardData, avtiveSchemeIs } = props;
  const classes = ManagerDashboardStyles();
  const { t } = useTranslation("ManagerDashboardPageTrans");

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [selectedPeriod, setSelectedPeriod] = useState("this_year");
  const [empSearchText, setEmpSearchText] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState(new Date('2021-08-09'));
  const [selectedToDate, setSelectedToDate] = useState(new Date('2021-08-10'));
  const dispatch = useDispatch();
  const {
    isFetchingManagerDashboard,
    isSuccessResManagerDashboard,
    isErrorManagerDashboard,
    errorMsgManagerDashboard,
    comparitiveAnalysisData,
  } = useSelector(managerDashboardSelector);
  const [tableRowCount, setTableRowCount] = useState(0);
  const [tableRowData, setTableRowData] = useState([]);

  const handleFromDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedToDate(date);
  };

  useEffect(() => {
    // let params = "time_range=date_range&from_date=2021-08-09&to_date=2021-08-10";
    let params = "search=" + empSearchText + "&time_range=";
    let from_date = moment(selectedFromDate).format("YYYY-MM-DD");
    let to_date = moment(selectedToDate).format("YYYY-MM-DD");
    if (selectedPeriod) {
      params += selectedPeriod;
    } else {
      params += "date_range&from_date=" + from_date + "&to_date=" + to_date;
    }
    params += "&perpage=" + rowsPerPage + "&page=" + (page + 1);
    if (avtiveSchemeIs) {
      params += "&activescheme=0&schemeid=1";
    } else {
      params += "&activescheme=1&schemeid=false";
    }
    localStorage.setItem("comparitiveAnalysisApiParam", params);
    dispatch(getManagerComparitiveAnalysis());
  }, [dispatch, t, selectedPeriod, selectedFromDate, selectedToDate, empSearchText, avtiveSchemeIs, rowsPerPage, page]);

  useEffect(() => {
    if (comparitiveAnalysisData?.total) {
      setTableRowCount(comparitiveAnalysisData.total);
      let table_res_data = comparitiveAnalysisData.data;
      let modifiedData = [];
      for (let i = 0; i < table_res_data.length; i++) {
        let element = table_res_data[i];
        let leadCount = parseFloat(element.TotalSubmitted) + parseFloat(element.TotalIncomplete);
        let totalPerc = ((leadCount / managerDashboardData.TotalApplications) * 100).toFixed(1);
        let newObj = {
          ...element,
          lead: leadCount,
          overallSuccessRate: parseFloat(((element.HighestApplications / managerDashboardData.TotalApplications) * 100).toFixed(1)),
          totalPercentage: totalPerc,
          // leadPerc: ((leadCount / totalPerc) * 100).toFixed(1),
          submittedPerc: ((element.TotalSubmitted / totalPerc) * 100).toFixed(1),
          inCompletePerc: ((element.TotalIncomplete / totalPerc) * 100).toFixed(1),
        };
        modifiedData.push(newObj);
      }
      setTableRowData(modifiedData);
    }
  }, [comparitiveAnalysisData]);

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
    }
  };

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableRowData.length - page * rowsPerPage);

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val) ? "0" : amount_val.toString().split('.')[0].length > 3 ? amount_val.toString().substring(0, amount_val.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + amount_val.toString().substring(amount_val.toString().split('.')[0].length - 3) : amount_val.toString();
  };

  return (
    <Box component={Paper} p={1}>
      <Grid container alignItems="center" justify="space-between" style={{ marginBottom: 30 }}>
        <Grid item>
          <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("comparitiveAnalysisCard.title")}</Typography>
          <Typography className={classes.subTitle}>{t("comparitiveAnalysisCard.subTitle")}</Typography>
        </Grid>
        <Grid item>
          <TextField
            type="text"
            variant="outlined"
            className={`${classes.filterInputBox} search`}
            placeholder={t("comparitiveAnalysisCard.searchInputPlaceholder")}
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
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Box>
            <ToggleButtonGroup
              value={selectedPeriod}
              exclusive
              onChange={handlePeriodChange}
              aria-label="Data Period"
              className={classes.toggleBtnsContainer}
            >
              <ToggleButton value="all" aria-label="All">
                {t("comparitiveAnalysisCard.toggleButtonGroup.button1")}
              </ToggleButton>
              <ToggleButton value="last_week" aria-label="Last Week">
                {t("comparitiveAnalysisCard.toggleButtonGroup.button2")}
              </ToggleButton>
              <ToggleButton value="last_2_week" aria-label="Last 2 Week">
                {t("comparitiveAnalysisCard.toggleButtonGroup.button3")}
              </ToggleButton>
              <ToggleButton value="last_month" aria-label="Last Month">
                {t("comparitiveAnalysisCard.toggleButtonGroup.button4")}
              </ToggleButton>
              <ToggleButton value="this_year" aria-label="This Year">
                {t("comparitiveAnalysisCard.toggleButtonGroup.button5")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item>
          {/* <Button variant="contained" size="small" startIcon={<CalendarTodayOutlinedIcon />}> 08 Apr’2021 - 19 Apr’2021</Button> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="from-date-picker-dialog"
              label="From Date"
              format="MMM-dd-yyyy"
              value={selectedFromDate}
              onChange={handleFromDateChange}
              className={classes.datePickerCont}
            />
            <KeyboardDatePicker
              id="to-date-picker-dialog"
              label="To Date"
              format="MMM-dd-yyyy"
              value={selectedToDate}
              onChange={handleToDateChange}
              className={classes.datePickerCont}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <Box paddingTop={2}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tableRowCount}
            />
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
                        <Grid container alignItems="center">
                          <Grid item>
                            <CardMedia
                              className={classes.profileImgCover}
                              image={row.Image || Image}
                              title="Profile Cover"
                            /></Grid>
                          <Grid item>
                            <Typography>{row.FirstName || "--"}</Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography>{t("comparitiveAnalysisCard.overallStatusLabels.label1")} <strong>{row.lead}</strong> | {t("comparitiveAnalysisCard.overallStatusLabels.label2")} <strong>{row.TotalSubmitted}</strong> | {t("comparitiveAnalysisCard.overallStatusLabels.label3")} <strong>{row.TotalIncomplete}</strong></Typography>
                        <Box>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs>
                              {/* <LinearProgress variant="determinate" value={50} className={classes.projOvrProgressLine} /> */}
                              <BorderLinearProgress variant="determinate" value={parseFloat(row.totalPercentage)} barcolor={`linear-gradient(90deg, #E63626 ${row.inCompletePerc}%, #F2CC07 ${row.submittedPerc}%, #0BEB57 100%)`} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" color="textSecondary">{`${Math.round(row.totalPercentage)}%`}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Button size="small" color="primary">{row.TotalSubmitted} Applications</Button>
                      </TableCell>
                      <TableCell align="center">
                        <FacebookCircularProgress variant="determinate" value={parseFloat(row.overallSuccessRate)} />
                      </TableCell>
                      <TableCell align="center"><SuccessRupeesIcon className={classes.rupeesIconBox} />{numberWithCommas(row.Price)}/-</TableCell>
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
          component="div"
          count={tableRowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default ComparitiveAnalysisCard;
