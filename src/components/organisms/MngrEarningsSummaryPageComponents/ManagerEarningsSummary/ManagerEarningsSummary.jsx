import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
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
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
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
import Slider from '@material-ui/core/Slider';
import {
  SuccessRupeesIcon, TotalAgentsIcon
} from "../../../atoms/SvgIcons/SvgIcons";
import { ManagerEarningsSummaryStyles } from "../ManagerEarningsSummary.styles";
import Image from "../../../../assets/Profile.jpg";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSelector, useDispatch } from "react-redux";
import { getManagerAgentEarningDetails, managerDashboardSelector } from "../../../../redux/features/agent/AgentManagerDashboardSlice";
import moment from "moment";
import Loading from "../../../atoms/Loading/Loading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";

/* const tableRows = [
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
}; */

function rangeSliderValueText(value) {
  return `${value}`;
}

const ManagerEarningsSummary = (props) => {
  const { cardData } = props;
  const classes = ManagerEarningsSummaryStyles();
  const { t } = useTranslation("ManagerDashboardPageTrans");
  const history = useHistory();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [sortByParam, setSortByParam] = useState("");
  const [empSearchText, setEmpSearchText] = useState("");
  const [avtiveSchemeIs, setAvtiveSchemeIs] = useState(false);
  const dispatch = useDispatch();
  const {
    isSuccessResMngrAgentEarningDetails,
    isFetchingMngrAgentEarningDetails,
    isErrorMngrAgentEarningDetails,
    errorMsgMngrAgentEarningDetails,
    mngrAgentEarningDetailsData,
  } = useSelector(managerDashboardSelector);
  const [applicantList, setApplicantList] = useState([]);
  const [tableRowCount, setTableRowCount] = useState(0);
  // const [tableRowData, setTableRowData] = useState(tableRows);
  const [priceRangeValue, setPriceRangeValue] = React.useState([0, 0]);
  const [sliderMaxVal, setSliderMaxVal] = React.useState(100);
  const [priceRangeSliderMarks, setPriceRangeSliderMarks] = React.useState([]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
  };

  /* const handleFromDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedFromDate(date);
  };
  const handleToDateChange = (date) => {
    setSelectedPeriod("");
    setSelectedToDate(date);
  }; */

  useEffect(() => {
    // let params = "perpage=5&page=1&search=&sortby=asc&pricefrom=10&priceto=80&activescheme=1&schemeid=false";
    applyFilterEvent();
  }, [dispatch, t, sortByParam, empSearchText, avtiveSchemeIs, rowsPerPage, page]);

  const applyFilterEvent = () => {
    let params = "search=" + empSearchText;
    if (sortByParam) {
      params += "&sortby=" + sortByParam;
    }
    if (priceRangeValue[0] || priceRangeValue[1]) {
      params += "&pricefrom=" + priceRangeValue[0];
      params += "&priceto=" + priceRangeValue[1];
    }
    if (avtiveSchemeIs) {
      params += "&activescheme=0&schemeid=1";
    } else {
      params += "&activescheme=1&schemeid=false";
    }
    params += "&perpage=" + rowsPerPage + "&page=" + (page + 1);

    localStorage.setItem("mngrEarningDetailsApiParam", params);
    dispatch(getManagerAgentEarningDetails());
  };

  useEffect(() => {
    setPriceRangeValue([0, 0]);
    if (mngrAgentEarningDetailsData?.Agents) {
      setTableRowCount(mngrAgentEarningDetailsData.Total);
      setApplicantList(mngrAgentEarningDetailsData.Agents);
      setSliderMaxVal(mngrAgentEarningDetailsData.TotalEarnings);
      if (mngrAgentEarningDetailsData.TotalEarnings) {
        let sliderMarksGen = [];
        sliderMarksGen.push({
          value: 0,
          label: '0',
        });
        let marksMiddVal = mngrAgentEarningDetailsData.TotalEarnings / 2;
        sliderMarksGen.push({
          value: marksMiddVal,
          label: marksMiddVal,
        });
        sliderMarksGen.push({
          value: mngrAgentEarningDetailsData.TotalEarnings,
          label: mngrAgentEarningDetailsData.TotalEarnings,
        });
        setPriceRangeSliderMarks(sliderMarksGen);
      }
    }
  }, [mngrAgentEarningDetailsData]);

  /* const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedPeriod(newPeriod);
    }
  }; */

  /* const switchHandleChange = (event) => {
    setAvtiveSchemeIs(!avtiveSchemeIs);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }; */

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
    setRowsPerPage(parseInt(event.target.value, 25));
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
  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableRowData.length - page * rowsPerPage);

  const numberWithCommas = (amount_val) => {
    return isNaN(amount_val) ? "0" : amount_val.toString().split('.')[0].length > 3 ? amount_val.toString().substring(0, amount_val.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + amount_val.toString().substring(amount_val.toString().split('.')[0].length - 3) : amount_val.toString();
  };

  return (
    <div className={classes.root}>
      {/* {isFetchingAgentAnalDashboard && <Loading isOpen={isFetchingAgentAnalDashboard} />}
      {isErrorAgentAnalDashboard && (
        <AlertBox severity="error">{errorMsgAgentAnalDashboard}</AlertBox>
      )} */}
      <Box component={Paper} className={classes.container}>
        <Grid container alignItems="center" justify="space-between" style={{ marginBottom: 30 }}>
          <Grid item>
            <IconButton onClick={() => history.push("/manager-dashboard")}>
              <KeyboardBackspaceOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TextField
              type="text"
              variant="outlined"
              className={`${classes.filterInputBox} search`}
              placeholder={t("earningsSummaryPage.searchInputPlaceholder")}
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
          <Grid item xs>
            <Typography variant="h6" color="primary" className={classes.cardTitle}>{t("earningsSummaryPage.title")}</Typography>
            <Typography className={classes.subTitle}>{t("earningsSummaryPage.subTitle")}</Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography className={classes.totalLabel}>
                      <TotalAgentsIcon className={classes.rupeesIconBox} /> {t("earningsSummaryPage.totalAgentsLabel")} </Typography>
                  </Grid>
                  <Grid item>
                    <strong className={classes.totalAmount}>{numberWithCommas(mngrAgentEarningDetailsData.TotalAgents)}</strong>
                  </Grid>
                </Grid>
              </Grid>
              <Divider orientation="vertical" flexItem className={classes.verticalLine} />
              <Grid item>
                <Grid container alignItems="center" justify="space-between" style={{ marginBottom: 8 }}>
                  <Grid item>
                    <Typography className={classes.totalLabel}>
                      <SuccessRupeesIcon className={classes.rupeesIconBox} /> {t("earningsSummaryPage.totalEarningsLabel")} </Typography>
                  </Grid>
                  <Grid item>
                    <strong className={classes.totalAmount}>{numberWithCommas(mngrAgentEarningDetailsData.TotalEarnings)}</strong>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box paddingTop={4} paddingX={2}>
          <Slider
            value={priceRangeValue}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="on"
            aria-labelledby="range-slider"
            getAriaValueText={rangeSliderValueText}
            marks={priceRangeSliderMarks}
            min={0}
            max={sliderMaxVal}
          />
        </Box>
        <Grid container alignItems="center" justify="space-between" style={{ marginBottom: 8 }}>
          <Grid item>
            {priceRangeValue[0] > 0 || priceRangeValue[1] > 0 &&
              <Typography className={classes.filteredText}>{t("earningsSummaryPage.listView.filterText")} <strong>{t("earningsSummaryPage.listView.filterRsText")} {priceRangeValue[0]} - {t("earningsSummaryPage.listView.filterRsText")} {priceRangeValue[1]}</strong></Typography>
            }
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={() => applyFilterEvent()}>Apply Filter</Button>
          </Grid>
        </Grid>
        <Box paddingTop={2}>
          <Grid container spacing={2}>
            {applicantList.map((row, i) => (
              <Grid item sm={6} key={i}>
                <Box component={Paper} p={1}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <CardMedia
                        className={classes.profileImgCover}
                        image={row.Image || Image}
                        title="Profile Cover"
                      />
                    </Grid>
                    <Grid item xs>
                      <Grid container alignItems="center" justify="space-between">
                        <Grid item><Typography>{row.FirstName || "--"}</Typography></Grid>
                        <Grid item><Typography className={classes.appCountInBox}>{row.TotalSubmitted || "--"} {t("earningsSummaryPage.listView.applicationsText")}</Typography></Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <SuccessRupeesIcon className={classes.rupeesIconBox} /> {numberWithCommas(row.Price) || "--"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box component={Paper} p={1} marginRight={1}> */}
        {/* <TableContainer>
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
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {row.ProjectDuration}
                      </TableCell>
                      <TableCell>
                        {row.ProjectName}
                      </TableCell>
                      <TableCell align="center">
                        {row.TotalInprogress}
                      </TableCell>
                      <TableCell align="center">
                        {row.TotalCompleted}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer> */}
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={tableRowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
        {/* </Box> */}
      </Box>
    </div>
  );
};

export default ManagerEarningsSummary;
