import * as React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import styles from "./AgentComment.module.css";
import { Button, Dialog, DialogTitle, DialogActions, Slide, DialogContent, Typography, IconButton, Box, Grid, Divider, Avatar, Badge, withStyles, Snackbar, CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import clsx from "clsx";
import AgentCommentHistory from "./AgentCommentHistory";
import FormControl from "../../../molecules/FormControl/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { addLeadComment, agentLeadSelector, clearAddCommentState, clearChangeStatusState, getLeadComment, updateLeadStatus } from "../../../../redux/features/agent/AgentLeadSlice";
import Loading from "../../../atoms/Loading/Loading";
import { Alert } from "@material-ui/lab";
import TextField from '@material-ui/core/TextField';
import CustomDateTimePicker from "../../../molecules/FormControl/components/CustomDatePicker/custonDateAndTimePicker";
import moment from "moment";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    dialogActions: {
        justifyContent: "center",
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(3),
    },

    dialogBoxTitle: {
        padding: theme.spacing(1.5),
        display: "flex",
        justifyContent: "space-between",
        "& .MuiDialogTitle-root": {
            padding: 0,
        },
        "& h2": {
            color: "#007AE7",
            fontSize: "1.5rem",
            fontWeight: "bold",
        },
    },
    dotView: {
        backgroundColor: "#E63626",
        borderRadius: "50%",
        display: "inline-block",
        width: 10,
        height: 10,
        marginLeft: theme.spacing(1.4),
    },
    dialogContentSec: {
        display: "flex",
        padding: theme.spacing(0, 4.5, 2),
    },
    commentHistory: {
        overflow: "auto",
        background: "#668bcb",
        borderRadius: theme.spacing(1),
        margin: theme.spacing(1.5),
        "&::-webkit-scrollbar-track": {
            background: "rgb(255 255 255 / 55%)",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #0038C0 0%, #006FD5 100%)",
        },
    },
    commentAvatar: {
        backgroundColor: "#ff5722",
        width: 36,
        height: 36
    },
    textField: {
        width: "100%",
    },
}));

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
    //     value: 2,
    //     label: "Reminder",
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
    //     value: 6,
    //     label: "Not connected",
    // },
    // {
    //     value: 7,
    //     label: "Connected",
    // },
    {
        value: 8,
        label: "Site Visit"
    }
];

function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
}

function getInitials(name) {
    const words = name.split(' ');
    let initials = '';

    for (let i = 0; i < Math.min(2, words.length); i++) {
        if (words[i].length > 0) {
            initials += words[i][0].toUpperCase();
        }
    }

    return initials;
}

const MyAvatar = ({ name }) => {
    const initials = getInitials(name);
    const classes = useStyles();
    return (
        <Avatar className={classes.commentAvatar}>
            {initials}
        </Avatar>
    );
};

const useDynamicHeightField = (element, value) => {
    useEffect(() => {
        if (!element || !element.current) return;

        element.current.style.height = "auto";
        element.current.style.height = element.current.scrollHeight + "px";
    }, [element, value]);
};

const INITIAL_HEIGHT = 46;

export default function AgentComment(props) {
    const { openCommentDialog, onClose, leadData, filterCategoryData, agentProfile } = props;
    const { t } = useTranslation("AgentProfilePageTrans");
    const formikRef = React.useRef();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [remainingChars, setRemainingChars] = useState(280);
    const [allCommentData, setAllCommentData] = useState([]);
    const [statusvalue, setStatusValue] = useState({ status: "0", callBackTime: new Date(), siteVisitTime: new Date() });

    const { isFetchingComment,
        isSuccessComment,
        isErrorComment,
        errorMsgComment,
        successMsgComment,
        commentData,

        isFetchingAddComment,
        isSuccessAddComment,
        isErrorAddComment,
        errorMsgAddComment,
        successMsgAddComment,
        addCommentData,

        isFetchingChangeStatus,
        isSuccessChangeStatus,
        isErrorChangeStatus,
        errorMsgChangeStatus,
        successMsgChangeStatus,
        changeStatusData,

    } = useSelector(agentLeadSelector);

    useEffect(() => {
        if (leadData) {
            dispatch(getLeadComment(leadData.LeadId))
        }
    }, [leadData])

    useEffect(() => {
        if (!openCommentDialog) {
            setIsExpanded(false);
            setCommentValue("");
            setRemainingChars(280);
        }
    }, [openCommentDialog]);

    useEffect(() => {
        if (isSuccessComment && commentData) {
            setAllCommentData(commentData.Comments);
            let status = {
                status: commentData.Status,
                // callBackTime: new Date(),
                callBackTime: commentData.callBackTime,
                siteVisitTime: commentData.siteVisitTime
            }
            setStatusValue(status)
            formikRef.current.setFieldValue("status", commentData.Status);
            formikRef.current.setFieldValue("callBackTime", commentData.callBackTime);
            formikRef.current.setFieldValue("siteVisitTime", commentData.siteVisitTime);
        }
    }, [commentData, isSuccessComment])

    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);
    useDynamicHeightField(textRef, commentValue);

    const onExpand = () => {
        if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
    };

    const onChange = (e) => {
        const newValue = e.target.value;
        setCommentValue(newValue);
        const remaining = 280 - newValue.length;
        setRemainingChars(remaining);
    };


    const onCloseBox = () => {
        setCommentValue("");
        setIsExpanded(false);
        setRemainingChars(280);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (commentValue && leadData) {
            let data = {
                "AgentCode": localStorage.getItem('agentId'),
                "LeadId": leadData.LeadId,
                "Comment": commentValue
            }
            dispatch(addLeadComment(data));
        }
    };

    useEffect(() => {
        if (isSuccessAddComment) {
            setCommentValue("");
            // dispatch(getLeadComment(leadData.LeadId))
        }
    }, [isSuccessAddComment])

    const onSubmitStatus = (values, { setSubmitting }) => {
        setSubmitting(false);
        if (values && leadData && (statusvalue.status != values.status || statusvalue.status == 1 || statusvalue.status == 8)) {
            let data = {
                "LeadId": leadData.LeadId,
                "Status": values.status,
                "callBackTime": values.status == 1 ? values.callBackTime ? moment(values.callBackTime).format('YYYY-MM-DD HH:mm:ss') : null : null,
                "siteVisitTime": values.status == 8 ? values.siteVisitTime ? moment(values.siteVisitTime).format('YYYY-MM-DD HH:mm:ss') : null : null
            }
            dispatch(updateLeadStatus(data));
        }
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => { dispatch(clearAddCommentState()); dispatch(clearChangeStatusState()) }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const truncateContent = (content, charLimit) => {
        if (content.length > charLimit) {
            return content.slice(0, charLimit) + '...';
        }
        return content;
    };

    return (
        <>
            <Dialog
                open={openCommentDialog}
                // onClose={() => onClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth
            >
                {(isFetchingComment) && <Loading isOpen={(isFetchingComment)} />}
                <Snackbar open={isSuccessAddComment}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={5000}
                    TransitionComponent={TransitionLeft}
                    onClose={() => dispatch(clearAddCommentState())}
                    action={action} >
                    <Alert onClose={() => dispatch(clearAddCommentState())} severity="success" variant="filled">
                        {successMsgAddComment}
                    </Alert>
                </Snackbar>
                <Snackbar open={isSuccessChangeStatus}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={5000}
                    TransitionComponent={TransitionLeft}
                    onClose={() => dispatch(clearChangeStatusState())}
                    action={action} >
                    <Alert onClose={() => dispatch(clearChangeStatusState())} severity="success" variant="filled">
                        {successMsgChangeStatus}
                    </Alert>
                </Snackbar>
                <Snackbar open={isErrorChangeStatus}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={5000}
                    TransitionComponent={TransitionLeft}
                    onClose={() => dispatch(clearChangeStatusState())}
                    action={action} >
                    <Alert onClose={() => dispatch(clearChangeStatusState())} severity="error" variant="filled">
                        {errorMsgChangeStatus}
                    </Alert>
                </Snackbar>
                <Grid className={classes.dialogBoxTitle}>
                    <Grid item >
                        {leadData.name && <Typography variant="body2">Lead Name : <strong>{truncateContent(leadData.name, 25)}</strong></Typography>}
                        {leadData.mobileNo && <Typography variant="body2">Mobile No.  : <strong>{leadData.mobileNo}</strong></Typography>}
                    </Grid>
                    <DialogTitle id="alert-dialog-title">Leads Comment & Status</DialogTitle>
                    <IconButton
                        onClick={() => onClose(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Divider variant="middle" />
                <DialogContent className={classes.dialogContentSec}>
                    <Grid container direction="column" xs={5}>
                        <form
                            onSubmit={onSubmit}
                            ref={containerRef}
                            className={clsx(styles["comment-box"], {
                                [styles.expanded]: isExpanded,
                                [styles.collapsed]: !isExpanded,
                                [styles.modified]: commentValue.length > 0
                            })}
                            style={{
                                minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
                            }}
                        >
                            <div className={styles.header}>
                                <div className={styles.user}>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                    >
                                        <MyAvatar name={agentProfile?.FirstName} />
                                    </StyledBadge>
                                    <span style={{ fontWeight: 600, marginLeft: 10 }}>{agentProfile?.FirstName}</span>
                                </div>
                            </div>
                            {/* <label className={styles.commentLabel} htmlFor="comment">Make a Comment</label> */}
                            <textarea
                                ref={textRef}
                                onClick={onExpand}
                                onFocus={onExpand}
                                onChange={onChange}
                                className={styles["comment-field"]}
                                placeholder="Make a Comment"
                                value={commentValue}
                                name="comment"
                                id="comment"
                                maxLength={280}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <div className={styles.actions} style={{ justifyContent: commentValue ? "space-between" : "flex-end" }}>
                                {commentValue && <p style={{ color: remainingChars == 0 ? "rgb(244, 67, 54)" : "grey", fontStyle: "italic", fontSize: 11 }}><strong>{remainingChars}</strong> characters remaining</p>}
                                <Grid item>
                                    <Button onClick={onCloseBox} color="primary" size="small" style={{ minWidth: 0, marginRight: 10 }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" size="small" color="primary" disabled={(commentValue.length < 1 || isFetchingAddComment)}>
                                        {isFetchingAddComment && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                                        {!isFetchingAddComment && <>Comment</>}
                                        {isFetchingAddComment && <>Saving...</>}
                                    </Button>
                                </Grid>
                            </div>
                        </form>
                        <Grid item>
                            <Typography variant="h6">Mark Status</Typography>
                            <Formik
                                initialValues={statusvalue}
                                onSubmit={onSubmitStatus}
                                innerRef={formikRef}
                            >
                                {({ submitForm, setFieldValue, values }) => (
                                    <Form noValidate autoComplete="off">
                                        <Grid container xs={12}>
                                            <FormControl
                                                margin="dense"
                                                control="selectbox"
                                                variant="outlined"
                                                label="Status"
                                                name="status"
                                                id="status"
                                                options={statusList}
                                                className={`${classes.filterInputBox} filterInputs`}
                                            />
                                        </Grid>
                                        {values.status == 1 && <Grid container xs={12}>
                                            <CustomDateTimePicker
                                                id="callBackTime"
                                                name="callBackTime"
                                                label="Schedule call back"
                                                className={classes.textField}
                                                variant='outlined'
                                                margin="dense"
                                                clearable
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>}
                                        {values.status == 8 && <Grid container xs={12}>
                                            <CustomDateTimePicker
                                                id="siteVisitTime"
                                                name="siteVisitTime"
                                                label="Schedule Site Visit Time"
                                                className={classes.textField}
                                                variant='outlined'
                                                margin="dense"
                                                clearable
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>}
                                        <Box textAlign="right" paddingTop={0.5}>
                                            <Button onClick={submitForm} autoFocus variant="contained" color="primary" size="small" disabled={isFetchingChangeStatus}>
                                                {isFetchingChangeStatus && <CircularProgress size={20} style={{ marginRight: "10px" }} />}
                                                {!isFetchingChangeStatus && <>Save status</>}
                                                {isFetchingChangeStatus && <>Saving...</>}
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Grid>
                    {allCommentData && <Grid item xs={7} className={classes.commentHistory}>
                        <AgentCommentHistory allCommentData={allCommentData} />
                    </Grid>}
                </DialogContent>
            </Dialog>
        </>
    );
}
