import { Button, Typography, Toolbar, Grid, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from "moment";
import * as yup from "yup";
import { Card, CardContent } from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import Loading from "../../atoms/Loading/Loading";
import IconButton from "@material-ui/core/IconButton";
import { ProjectSearchIcon, SearchKendraIcon } from "../../atoms/SvgIcons/SvgIcons";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DomainIcon from '@material-ui/icons/Domain';
import { ScheduleStyle } from './Schedule.style';
import SlotCard from "./SlotCard";
import Alert from '@material-ui/lab/Alert';
import { ApiEndPoint } from "../../../utils/Common";
import {
    applicantSelector, getOfficeCenters, searchByPinCode, clearApplicantData, getApplicant,
} from "../../../redux/features/applicant/ApplicantSlice";
const ScheduleAppointment = () => {
    const classes = ScheduleStyle();
    const formikRef = useRef();
    const { t } = useTranslation("Appointment");
    const history = useHistory();
    const dispatch = useDispatch();
    const [personName, setPersonName] = React.useState([]);
    const [showAppointmentSlot, setShowAppointmentSlot] = useState(true);
    const [month, setMonth] = useState([
        'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ])
    const {
        isFetchingAppointmentData,
        isSuccessAppointmentCancel,
        applicantData,
        isFetchingApplicantGet,
        isSuccessResApplicantGet,
        isSuccessResOfflineCenter,
        OfflineCenterData,
        isFetchingOfflineCenter,
        isSuccessSearchCode,
        isErrorSearchCode,
        errorMsgSearchCode,
        SearchCodeData,

    } = useSelector(applicantSelector);

    const [date, setDate] = useState([
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
    ])
    const [tabVal, setTabVal] = useState(0);
    const [dateTab, setDateTab] = useState(0);
    const [selectedTabValue, setSelectedTabValue] = useState(0);
    const [centerAddressList, setCenterAddressList] = useState([]);
    const [SlotData, setSlotData] = useState([]);
    const [totalSlotCount, setTotalSlotCount] = useState(0);
    const [currentTotalSlotCount, setCurrentTotalSlotCount] = useState(0);
    const [dateRange, setDateRange] = useState([]);
    const [remainingDate, setRemainingDate] = useState([]);
    const [showLeftArrow, setShowLeftArrow] = useState(true);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [counter, setCounter] = useState(0);
    const [bookAppointmentallowed, setBookAppointmentallowed] = useState(false);

    const handleChangeTab = (e, val) => {
        setTabVal(val);
    }
    const handleChangeDate = (e, val) => {
        setDateTab(val)
    }
    const handleTabChange = (event, newValue) => {
        setSelectedTabValue(newValue);
    };

    const locationName = [
        {
            value: "1",
            title: "mumbai",
        },
        {
            value: "2",
            title: "naviMumbai",
        },
        {
            value: "3",
            title: "pune",
        },
    ];

    const filterLocationList = [
        {
            "title": "Ulwe-Bamandongri",
            "value": 77
        },
        {
            "title": "Ulwe-Kharkopar",
            "value": 76
        }
    ]

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const staticStates = [
        {
            name: "Maharashtra",
            id: 1,
        },
        {
            name: "Manipur",
            id: 2,
        },
        {
            name: "Meghalaya",
            id: 3,
        },
        {
            name: "Mizoram",
            id: 4,
        }
    ]

    const staticDistrict = [
        {
            name: "Thane",
            id: 1,
        },
        {
            name: "Wardha",
            id: 2,
        },
        {
            name: "Washim",
            id: 3,
        },
        {
            name: "Yavatmal",
            id: 4,
        }
    ]

    const handleChange1 = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const initialValues = {
        searchedQuestion: ""
    };
    const validationSchema = yup.object({
        searchedQuestion: yup
            .string()
            .required(
                "Search something"
            )
            .matches(
                /^[a-zA-Z ]*$/,
                "Write properly"
            ),
    });

    useEffect(() => {
        if (isSuccessResOfflineCenter) {
            setCenterAddressList(OfflineCenterData.center_details);
            setDateRange(OfflineCenterData.slot_details.allDateList);
            setSlotData(OfflineCenterData.slot_details.monthDateSlots);

            let today = new Date();
            let cMonth = (today.getMonth() < 9 ? '0' : '') + (today.getMonth() + 1)
            let currentDate = `${today.getFullYear()}-${cMonth}-${today.getDate()}`

            const lastDay = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('YYYY-MM-DD');


            // OfflineCenterData.slot_details.allDateList[0] == currentDate, 
            if (totalSlotCount == 0) {

                localStorage.setItem('slotCount', OfflineCenterData.slot_details.monthDateSlotsLength);
            }

            // setShowLeftArrow(OfflineCenterData.slot_details.allDateList[0] > currentDate);

            // Left Arrow hide/show logic
            if (currentDate > OfflineCenterData.slot_details.allDateList[0]) {
                setShowLeftArrow(false);
            }


            setTotalSlotCount(OfflineCenterData.slot_details.monthDateSlotsLength);
            var date1 = new Date();


            // Right Arrow hide/show logic
            if (lastDay == OfflineCenterData.slot_details.allDateList[OfflineCenterData.slot_details.allDateList.length - 1]) {
                setShowRightArrow(lastDay == OfflineCenterData.slot_details.allDateList[OfflineCenterData.slot_details.allDateList.length - 1] ? false : true);
                // setShowLeftArrow(true);
            } else if (OfflineCenterData.slot_details.allDateList.length < 6) {
                setShowRightArrow(false);
            } else {
                setShowRightArrow(true);
            }

            dispatch(clearApplicantData());
            // dispatch(getApplicant());
        }
    }, [isSuccessResOfflineCenter]);



    useEffect(() => {

        let sCount = localStorage.getItem('slotCount');

        if (totalSlotCount != 0 && totalSlotCount > sCount) {
            setShowLeftArrow(true)
        } else if (totalSlotCount == 0 && sCount == 12) {
            setShowLeftArrow(true)
        } else if (totalSlotCount == 12 && sCount == 12) {
            setShowLeftArrow(false)
        } else if (totalSlotCount == sCount) {
            setShowLeftArrow(false)
        }
    }, [totalSlotCount])

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(searchByPinCode(values.searchedQuestion))
    };

    const handleSearch = (allFaqList, data) => (
        allFaqList.filter((obj) => (
            Object.values(obj)
                .flat()
                .some((v) => (
                    `${v}`.toLowerCase().includes(`${data}`.toLowerCase())
                ))
        ))
    );

    const clearSearch = () => {
        formikRef.current.setFieldValue("searchedQuestion", "");
        dispatch(clearApplicantData());
        // let jsonData = {
        //     "pintCode": "",
        //     "applicantId": localStorage.getItem("applicantId"),
        //     "serviceId": 1,
        //     "SelectedDate": ""
        // };

        // dispatch(getOfficeCenters(jsonData));
        setCenterAddressList([]);
        setDateRange([]);
        setSlotData([]);
        setShowAppointmentSlot(false);
    }


    useEffect(() => {
        let today = new Date();
        let currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        let jsonData = {
            "pintCode": 455112,
            "applicantId": localStorage.getItem("applicantId"),
            "serviceId": 1,
            "SelectedDate": currentDate
        };

        dispatch(getOfficeCenters(jsonData));
        dispatch(getApplicant());
        getRemanningDays();
    }, []);

    // useEffect(() => {
    //     if (isSuccessSearchCode) {
    //         let jsonData = {
    //             "pintCode": formikRef.current.values.searchedQuestion,
    //             "applicantId": localStorage.getItem("applicantId"),
    //             "serviceId": 1,
    //             "SelectedDate": "2022-08-30"
    //         };

    //         dispatch(getOfficeCenters(jsonData));
    //         setShowAppointmentSlot(true);
    //     }
    // }, [isSuccessSearchCode])


    const getSlots = (date) => {
        let jsonData = {
            "pintCode": 455112,
            "applicantId": localStorage.getItem("applicantId"),
            "serviceId": 1,
            "SelectedDate": date,
        };

        dispatch(getOfficeCenters(jsonData));
    }


    var getRemanningDays = function () {
        var date = new Date();
        var time = new Date(date.getTime());
        time.setMonth(date.getMonth() + 1);
        time.setDate(0);
        setRemainingDate(time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0)
    }

    const showPreviousWeek = () => {
        const firstDate = dateRange[0];
        getRemanningDays();

        var parts = firstDate.split('-');
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        var mydate = moment(new Date(parts[0], parts[1] - 1, parts[2] - 16)).format('YYYY-M-DD');
        let today = new Date();
        let currentDate = `${firstDate - 6}`
        let today1 = new Date();
        let currentDate1 = `${today1.getFullYear()}-${today1.getMonth() + 1}${today1.getDate() - 7}`
        let jsonData = {
            "pintCode": 455112,
            "applicantId": localStorage.getItem("applicantId"),
            "serviceId": 1,
            "SelectedDate": mydate
        };

        dispatch(getOfficeCenters(jsonData));
        dispatch(getApplicant());
    }

    const showNextWeek = () => {
        setCounter(counter + 7);
        let daysLeft = Math.round(remainingDate / 7);
        let today = new Date();
        // dateTo = moment().format('YYYY-M-DD');
        const LastDate = dateRange[dateRange.length - 1]
        let today2 = moment(LastDate).add(7, 'd').format('YYYY-M-DD');
        let today1 = new Date(LastDate + 7);


        const date = new Date(LastDate);

        date.setDate(date.getDate());
        let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        let jsonData = {
            "pintCode": 455112,
            "applicantId": localStorage.getItem("applicantId"),
            "serviceId": 1,
            "SelectedDate": currentDate
        };

        dispatch(getOfficeCenters(jsonData));
        dispatch(getApplicant());
    }

    const onSlotClick = (slotDetails) => {
        slotDeducted(slotDetails);
        localStorage.setItem("SelectedSlot", JSON.stringify(slotDetails));
    }

    const slotDeducted = async (slotDetails) => {
        console.log(slotDetails.centerDetails?.center_id, slotDetails.totalSlot, slotDetails.date, "check data")
        const response = await mySlotDeducted(slotDetails?.centerDetails?.center_id, slotDetails.totalSlot, slotDetails.date, 1);
        // setSlotTimeRecord(response?.slotData?.slottime);
        if (response.error==true) {
            setBookAppointmentallowed(true);
        } else {
            setBookAppointmentallowed(false);
        }
        if (response.success == true && response?.data.appointment_center_slot) {
            history.push("/book-slot");
            // appointment_center_slot[0]
            console.log(response, response?.data.appointment_center_slot, "response.data.appointment_center_slot KKKK")
            localStorage.setItem("activeSlot", JSON.stringify(response.data.appointment_center_slot[0]));
        }
    }

    async function mySlotDeducted(centerId, slotNo, selectedDate, serviceId) {
        let applicantId = localStorage.getItem("applicantId");
        let url = await fetch(`
        ${ApiEndPoint}/appointment/API/Appointment/tempSlotBook?slotNo=${slotNo}&centerId=${centerId}&selectedDate=${selectedDate}&serviceId=${serviceId}&applicantId=${applicantId}`,
            {
                headers: {
                    Authorization: localStorage.getItem("jwtToken"),
                }
            },
        );
        let response = url.json();
        response = await response;
        return response;
    }

    return (
        <>
            {(isFetchingApplicantGet || isFetchingOfflineCenter) && (
                <Loading isOpen={isFetchingApplicantGet || isFetchingOfflineCenter} />
            )}
            <div className={classes.mainContainer} style={{ height: "100%" }}>
                <Grid container className="header">
                    <Button variant="text" style={{ flexGrow: 1, justifyContent: "start" }} onClick={() => history.push("/dashboard")}><ArrowBackIcon /></Button>
                    {applicantData &&
                        <Typography variant="h6" className="pageTitle">
                            {applicantData.appointment_details?.length > 0 ? `${t("scheduleAppointment.title")}` : `${t("scheduleAppointment.title1")}`}
                        </Typography>
                    }
                </Grid>

                {/* <Box className="searchContainer">
                    <Box className="tabsView">
                        <Tabs
                            vari="scrollable"
                            scrollButtons="auto"
                            value={selectedTabValue}
                            onChange={handleTabChange}
                            aria-label="Floor Tabs"
                            variant="scrollable"
                            TabIndicatorProps={{
                                style: {
                                    display: "none",
                                },
                            }}
                        >
                            <Tab label="Search by PIN" />
                            <hr className="verticalline" />
                            <Tab label="Search by District" />
                        </Tabs>
                    </Box>
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item md={8}>
                            <Box className={classes.filterSection}>
                                {selectedTabValue == 0 && <Box display="flex" justifyContent="center" alignItems="flex-start">
                                    <Formik initialValues={initialValues} onSubmit={onSubmit} innerRef={formikRef} enableReinitialize>
                                        {({ submitForm }) => (
                                            <Form noValidate autoComplete="off">
                                                <FormControl
                                                    className={classes.globSearchInputBox}
                                                    control="input"
                                                    variant="outlined"
                                                    placeholder="Enter your PIN"
                                                    name="searchedQuestion"
                                                    type="text"
                                                    id="searchedQuestion"
                                                    // required
                                                    inputProps={{ maxLength: 50 }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <>
                                                                {formikRef.current?.values?.searchedQuestion?.length > 0 ? (<InputAdornment position="end">
                                                                    <IconButton className={classes.clearIcon}>
                                                                        <ClearOutlinedIcon onClick={() => clearSearch()} />
                                                                    </IconButton>
                                                                </InputAdornment>) : ""}
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        type="submit"
                                                                        aria-label="Submit"
                                                                        edge="end" className={classes.searchIcon}
                                                                    >
                                                                        <SearchOutlinedIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            </>
                                                        ),
                                                    }}
                                                />
                                                {isErrorSearchCode && <Box mt={3}>
                                                    <Alert severity="warning">{errorMsgSearchCode}</Alert>
                                                </Box>}

                                            </Form>
                                        )}
                                    </Formik>
                                </Box>
                                }
                                {selectedTabValue == 2 && <Box display="flex"
                                    justifyContent="center"
                                    alignItems="flex-start" style={{ backgroundColor: "#F4F4F4", padding: "9.6px 0px 16px" }}>
                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            options={staticStates}
                                            debug
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        className={classes.root}
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={
                                                            <CheckBoxIcon fontSize="small" className={classes.root} />
                                                        }
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.name}
                                                </React.Fragment>
                                            )}
                                            renderInput={(params) => <TextField {...params} label="Select State" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Autocomplete
                                            options={staticDistrict}
                                            debug
                                            getOptionLabel={(option) => option.name}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        className={classes.root}
                                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={
                                                            <CheckBoxIcon fontSize="small" className={classes.root} />
                                                        }
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.name}
                                                </React.Fragment>
                                            )}
                                            renderInput={(params) => <TextField {...params} label="Select District" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Button variant="contained" color="primary" className={classes.searchIconBtn}>
                                            <ProjectSearchIcon />
                                        </Button>
                                    </Grid>
                                </Box>}
                            </Box>
                        </Grid>
                    </Box>
                </Box> */}
                <div className="appointmentContainer" style={{ minHeight: "500px", padding: "15px 10px" }}>
                    <Grid container >
                        <Grid item md={4} >
                            <Box className={classes.sideContainer}>
                                <Grid container>
                                    {(applicantData?.appointment_details?.length > 0 && applicantData) &&
                                        <Box className={classes.oldAppointmentSection}>
                                            <Typography variant="h6" className={classes.subHeading} style={{ paddingTop: '8px' }}>
                                                {t("scheduleAppointment.previousAppointmentTitle")}
                                            </Typography >
                                            <Grid item md={12}>
                                                <Typography component="p" variant='subtitle1' style={{ padding: '8px 0px 10px', fontWeight: '600' }}>{t("scheduleAppointment.appointmentCenterLabel")}</Typography>
                                                <Box className={classes.centerAddress}>
                                                    <DomainIcon className={classes.noteIcon} />
                                                    <Typography component="span" variant='h6' color="primary" className={classes.fontBoldStyle}>
                                                        {applicantData?.appointment_details[0]?.center_area}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.centerAddress}>
                                                    <Typography component="p" variant='body2' className={classes.details}>{applicantData?.appointment_details[0]?.center_address}, {applicantData.appointment_details[0]?.center_pincode}</Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item md={12} >
                                                <Typography component="p" variant='subtitle1' style={{ paddingBottom: '10px', fontWeight: '600' }}>{t("scheduleAppointment.scheduledOn")}</Typography>
                                                <Box className={classes.centerAddress}>
                                                    <EventNoteIcon className={classes.noteIcon} />
                                                    <Typography component="span" variant='body2' color="primary" className={classes.fontBoldStyle} style={{ fontWeight: 400 }}>
                                                        {moment(applicantData?.appointment_details[0]?.book_date).format("ddd, Do MMMM, YYYY")}
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.centerAddress}>
                                                    <AccessTimeIcon className={classes.noteIcon} />
                                                    <Typography component="span" variant='body2' color="primary" className="timeTxt">{applicantData?.appointment_details[0]?.start_time} - {applicantData.appointment_details[0]?.end_time}</Typography>
                                                </Box>
                                            </Grid>
                                        </Box>
                                    }
                                    {(applicantData?.appointment_details?.length > 0 && applicantData) && <hr />}
                                    <Grid item lg={12}>
                                        <Typography variant="h5" className={classes.subHeading}>
                                            {t("scheduleAppointment.docCenterTitle")}
                                        </Typography>
                                        {/* <Typography variant="body1" className={classes.subSmallHeading}>
                                            Slot Search Results ({centerAddressList.length} Center {centerAddressList.length > 1 && '(s)'} Found)
                                        </Typography> */}
                                    </Grid>

                                    {(showAppointmentSlot == true && applicantData) &&

                                        <Grid item lg={12}>
                                            {centerAddressList.map((item, index) => (
                                                <Card className={classes.sideCard} variant="outlined" key={index}>
                                                    <CardContent>
                                                        <Box component="div" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <BusinessIcon className={classes.titleIcon} />
                                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                                {item.center_area}
                                                            </Typography>
                                                        </Box>
                                                        <Typography className={classes.pos} color="textSecondary">
                                                            {item.center_address}, {item.center_pincode}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </Grid>
                                    }

                                </Grid>


                            </Box>
                        </Grid>
                        {/* style={{ padding: 10 }} */}
                        <Grid item md={8}>
                            {/* <AppBar position='static' color="transparent" style={{ boxShadow: 'none' }}>
                                    <Tabs value={tabVal} onChange={handleChangeTab}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                    >
                                        {
                                            month.map((months) => {
                                                return <Tab label={months} style={{ minWidth: '90px', fontSize: 14 }} />
                                            })
                                        }
                                    </Tabs>
                                </AppBar> */}
                            {/* <AppBar position='static' color="transparent" style={{ borderRadius: '40px' }}>
                                    <Tabs value={dateTab} onChange={handleChangeDate}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                    >
                                        {
                                            date.map((dates) => {
                                                return <Tab label={dates} style={{ minWidth: '90px', fontWeight: 'bold', fontSize: '19px' }} />
                                            })
                                        }
                                    </Tabs>
                                </AppBar> */}

                            {/* <AppBar position='static' color="transparent" style={{ borderRadius: '40px' }}>
                                    <Tabs value={dateTab} onChange={handleChangeDate} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
                                        {
                                            dateRange.map((dates) => {
                                                return <Tab label={moment(dates).format("DD MMM, YYYY")} style={{ minWidth: '90px', fontWeight: 'bold', fontSize: '19px' }} onClick={() => getSlots(dates)} />
                                            })
                                        }
                                    </Tabs>
                                </AppBar> */}
                            {/* <AppBar position='static' color="transparent" style={{ boxShadow: 'none' }}>
                                    <Tabs centered>
                                        <Tab label='Monday' style={{ minWidth: '105px', textTransform: 'capitalize' }} />
                                        <Tab label='Tuesday' style={{ minWidth: '105px', textTransform: 'capitalize' }} />
                                        <Tab label='Wednesday' style={{ minWidth: '105px', textTransform: 'capitalize' }} />
                                        <Tab label='Thursday' style={{ minWidth: '105px', textTransform: 'capitalize' }} />
                                        <Tab label='Friday' style={{ minWidth: '105px', textTransform: 'capitalize' }} />
                                        <Tab label='Saturday' style={{ minWidth: '105px', textTransform: 'capitalize' }} />
                                        <Tab label='Sunday' style={{ minWidth: '105px', textTransform: 'capitalize' }} />
                                    </Tabs>
                                </AppBar> */}
                            {/* style={{ marginLeft: '30px', }}  */}
                            <Grid container>
                                {/* width: '100%', */}
                                <Box className="centerListRow" style={{ display: 'flex', padding: '15px 0!important' }}>

                                </Box>
                            </Grid>
                            <Box className="centerBox">
                                <Box className="center-main" style={{ height: "275px", overflowY: 'auto' }}>
                                    <Grid container>
                                        {/* width: '100%', */}
                                        <Box className="centerListRow" style={{ display: 'flex', padding: '15px 0!important' }}>
                                            <Grid item md={12}>
                                                <Grid item md={12}>
                                                    <Box className={classes.slotContainer}>
                                                        {(dateRange.length > 0 && showLeftArrow) && <IconButton aria-label="delete" className="prevBtn" size="small" onClick={() => showPreviousWeek()}>
                                                            <ArrowBackIosIcon fontSize="inherit" />
                                                        </IconButton>}
                                                        <ul className={classes.slotHeaderWrap}>
                                                            <>
                                                                {/* onClick={() => getSlots(dates)}  */}
                                                                {
                                                                    dateRange.map((dates) => {
                                                                        return <li style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center', color: '#00437E', padding: '5px 21px' }}>
                                                                            {moment(dates).format("DD MMM")}
                                                                            <br />
                                                                            <span style={{ fontWeight: 'normal', fontSize: '12px' }}>
                                                                                {moment(dates).format("dddd")}
                                                                            </span>
                                                                        </li>
                                                                    })
                                                                }
                                                            </>
                                                        </ul>

                                                        {(dateRange.length > 0 && showRightArrow) && <IconButton aria-label="delete" className="nextBtn" size="small" onClick={() => showNextWeek()}>
                                                            <ArrowForwardIosIcon fontSize="inherit" />
                                                        </IconButton>}

                                                    </Box>
                                                </Grid>
                                                <ul className={classes.slotAvailableWrap}>
                                                    {SlotData.map((item, index) => (
                                                        <>
                                                            {
                                                                item.map((slot) => (
                                                                    <li>
                                                                        <Box className={classes.slotsBox}>
                                                                            <SlotCard slotData={slot} setSelectedSlot={onSlotClick} />
                                                                        </Box>
                                                                    </li>
                                                                ))
                                                            }
                                                        </>
                                                    ))}
                                                    {/* <li>
                                                            <Box className={classes.slotsBox}>
                                                                N/A
                                                            </Box>
                                                        </li>
                                                        <li>
                                                            <Box className={classes.slotsBox}>
                                                                100 Slots
                                                            </Box>
                                                        </li>
                                                        <li>
                                                            <Box className={classes.slotsBox}>
                                                                100 Slots
                                                            </Box>
                                                        </li>
                                                        <li>
                                                            <Box className={classes.slotsBox}>
                                                                100 Slots
                                                            </Box>
                                                        </li>
                                                        <li>
                                                            <Box className={classes.slotsBox}>
                                                                100 Slots
                                                            </Box>
                                                        </li> */}
                                                </ul>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Box>
                                {bookAppointmentallowed == true && (<Alert severity="error">Your Are Not Applicable To Book Appointment</Alert>)}
                            </Box>
                            {/* <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', marginTop: '20px' }}>
                                    {SlotData.map((item, index) => (
                                        <Box component="div">
                                            {item.map((slot) => (
                                                <SlotCard slotData={slot} />
                                            ))}
                                        </Box>
                                    ))}
                                </Box> */}
                        </Grid>
                    </Grid>

                    {/* {showAppointmentSlot == false &&
                        <Box className={classes.searchNotFound}>
                            <img className={classes.iconStyle} src={SearchSevaKendra} alt="Loading" />
                            <Typography variant="h6">
                                Search Nearby Seva Kendra
                            </Typography>
                        </Box>
                    } */}
                </div>
            </div >
        </>
    )
}
export default ScheduleAppointment;