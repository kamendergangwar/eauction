import { Box, CircularProgress, Paper, Tooltip, Typography, makeStyles, withStyles } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import clsx from "clsx";
import PropTypes from "prop-types";
import { useMemo } from 'react';

const CustomTooltip = withStyles({
    tooltip: {
        backgroundColor: "#FFFFFF",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 11,
        boxShadow: "0px 4px 20px rgba(23, 33, 61, 0.06);",
        borderRadius: "8px",
        border: "1px solid rgba(0, 56, 192, 1)",
        maxWidth: 500,
    },
    arrow: {
        "&:before": {
            border: "1px solid rgba(0, 56, 192, 1)",
        },
        color: "#FFFFFF",
    },
})(Tooltip);


const DashboardBox = (props) => {
    const {
        title,
        icon,
        color = "#45CB85",
        selected = false,
        count = 0,
        desc,
        selectedColor = "#F6FCF9",
        handleClick,
        tooltipContent = "",
        isFetching = false,
    } = props;

    const useStyles = useMemo(() =>
        makeStyles((theme) => ({
            root: {
                display: 'flex',
                width: '181px',
                padding: theme.spacing(1, 2),
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '3.5px',
                borderRadius: 10,
                background: '#FFF',
                transition: 'all .2s ease-in-out',
                "&:hover": {
                    cursor: 'pointer',
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;'
                },
            },
            iconContainer: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20.428px',
                width: '40.856px',
                height: '40.856px',
                flexShrink: 0,
            },
            count: {
                marginLeft: 8,
                color: 'black',
                fontWeight: 'bolder',
                fontSize: '2rem'
            },
            title: {
                fontWeight: 600,
                textTransform: 'capitalize',
                "&:hover": {
                    textDecoration: 'underline'
                },
            },
            selected: (props) => ({
                transform: 'scale(1.05)',
                boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
                borderBottom: `5px solid ${props.color} !important`
                // '&::after': {
                //     content: '""',
                //     position: 'absolute',
                //     bottom: '-20px',
                //     left: '50%',
                //     transform: 'translateX(-50%)',
                //     width: '0',
                //     height: '0',
                //     borderLeft: '20px solid transparent',
                //     borderRight: '20px solid transparent',
                //     borderTop: `20px solid ${props.color}`,
                // }
            }),
            desc: {
                color: '#E70033',
                fontFamily: 'Poppins'
            }
        })),
        []
    );

    const classes = useStyles({ color });

    return (
        <Paper
            elevation={3}
            className={clsx(classes.root, {
                [classes.selected]: selected,
            })}
            style={{
                border: `0.5px solid ${color}`,
                color: color,
                background: selected ? selectedColor : "",
            }}
            onClick={handleClick}
        >
            <Box display="flex" justifyContent="space-between" width="100%">
                <div className={classes.iconContainer} style={{ background: color }}>
                    {icon}
                </div>
                {tooltipContent ? (
                    <CustomTooltip arrow enterTouchDelay={0} title={tooltipContent}>
                        <InfoIcon style={{ cursor: "pointer", fontSize: "20px" }} />
                    </CustomTooltip>
                ) : null}
            </Box>
            {isFetching ? (
                <Box marginY={1}>
                    <CircularProgress color={color} size={30} thickness={4.6} disableShrink />
                </Box>
            ) : (
                <Typography className={classes.count}>{count}</Typography>
            )}
            <Typography className={classes.title}>{title}</Typography>
            <Typography variant="subtitle2" className={classes.desc}>
                {desc}
            </Typography>
        </Paper>
    );
};

DashboardBox.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
    desc: PropTypes.string,
    selectedColor: PropTypes.string,
    handleClick: PropTypes.func,
    tooltipContent: PropTypes.string,
    isFetching: PropTypes.bool,
};

export default DashboardBox;

