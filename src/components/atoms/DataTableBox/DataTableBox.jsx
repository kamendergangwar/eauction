import { Box, Button, Grid, Hidden, Typography, makeStyles } from "@material-ui/core";
import { DownloadPrimaryIcon } from "../SvgIcons/SvgIcons";

const useStyles = makeStyles((theme) => ({
    DataTableBox: (props) => ({

        padding: 2,
        color: props.color,
        "& .infoLabel": {
            // color: "#65707D",
            fontWeight: "300",
            fontSize: props.fontSize || "0.75rem",
            lineHeight: "24px"
        },

        "& .infoValue": {
            // color: "#0F2940",
            fontWeight: props.fontWeight || "500",
            fontSize: props.fontSize || "0.875rem",
        },
    }),
}));

const DataTableBox = (props) => {
    const { label, value, type = 'text', action, color = '', fontWeight = '', fontSize = '0.875rem' } = props;
    const classes = useStyles({ color, fontWeight, fontSize });
    return (
        <Grid container alignItems="center" className={classes.DataTableBox}>
            <Grid item xs="auto" md={5}>
                <Typography className="infoLabel">
                    {label}
                </Typography>
            </Grid>
            <Hidden xsDown>
                <Grid item xs="auto">
                    <Box className="colonTxt">:</Box>
                </Grid>
            </Hidden>
            <Grid item xs={12} md={6}>
                {type === 'button' ?
                    <Button size="small" style={{ float: 'right' }} startIcon={<DownloadPrimaryIcon />} variant="outlined" color='primary' onClick={action}>
                        Download
                    </Button>
                    :
                    <Typography className="infoValue" style={{ textAlign: "right" }}>
                        {value}
                    </Typography>
                }
            </Grid>
        </Grid>
    )
};

export default DataTableBox;