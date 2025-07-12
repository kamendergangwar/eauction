import { Box, Button, Paper, Typography, makeStyles } from "@material-ui/core";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@material-ui/lab";
import moment from "moment";
import { useState } from "react";
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    paper: {
        position: "relative",
        padding: theme.spacing(2),
        background: "#8ca8d8",
        filter: "drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.15))",
        color: "#fff",
        "&::before": {
            left: "-13px",
            width: 0,
            height: 0,
            content: '""',
            position: "absolute",
            transform: "rotate(90deg)",
            borderColor: "#8ca8d8 transparent transparent transparent ",
            borderStyle: "solid",
            borderWidth: "15px 15px 0 0",
        }
    },
    oppositeContent: {
        maxWidth: "140px",
        paddingRight: theme.spacing(1),
        textAlign: "right",
    }
}));


const AgentCommentHistory = (props) => {
    const { allCommentData } = props;
    const classes = useStyles();
    const [expandedItems, setExpandedItems] = useState({});

    const truncateContent = (content, charLimit) => {
        if (content.length > charLimit) {
            return content.slice(0, charLimit) + '...';
        }
        return content;
    };

    const toggleExpand = (createdAt) => {
        setExpandedItems((prevExpanded) => ({
            ...prevExpanded,
            [createdAt]: !prevExpanded[createdAt]
        }));
    };


    return (
        <Box className={classes.root}>
            {allCommentData.length > 0 ?
                <Timeline>
                    {allCommentData.map((item) => (
                        <TimelineItem>
                            <TimelineOppositeContent className={classes.oppositeContent}>
                                <Typography style={{ color: "#fff" }} variant="body2">{moment(item.CreatedAt).format("MMM DD YYYY, h:mm a")}</Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary" />
                                <TimelineConnector style={{ backgroundColor: "#fff" }} />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Box className={classes.paper}>
                                    <Typography variant="body2" style={{wordBreak: "break-word"}}>
                                        {expandedItems[item.CreatedAt]
                                            ? item.Comment
                                            : truncateContent(item.Comment, 80)}
                                        {item.Comment.length > 80 && (
                                            <span style={{ color: "#0038C0", fontWeight: 600, cursor: "pointer" }} onClick={() => toggleExpand(item.CreatedAt)}>
                                                {expandedItems[item.CreatedAt] ? "  collapse" : "read more"}
                                            </span>
                                        )}
                                    </Typography>
                                </Box>
                            </TimelineContent>
                        </TimelineItem>))}
                </Timeline>
                :
                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' marginY={3} color="#fff">
                    <AnnouncementOutlinedIcon style={{ fontSize: "4rem" }} />
                    <Typography variant="h6">No comments found !!</Typography>
                </Box>
            }
        </Box>
    )
}

export default AgentCommentHistory;