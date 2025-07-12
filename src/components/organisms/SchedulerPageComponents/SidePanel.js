import React from 'react';
import { Grid, Typography, Card, CardContent, Box } from "@material-ui/core"
import { ScheduleStyle } from './Schedule.style';
import BusinessIcon from '@material-ui/icons/Business';
const SidePanel = () => {
    const classes = ScheduleStyle();
    return (
        <>
            <Grid container className={classes.sideContainer}>
                <Grid item lg={12}>
                    <Typography variant="h5" className={classes.subHeading}>
                        Offline Centers
                    </Typography >
                    <Typography variant="body1" className={classes.subSmallHeading}>
                        Slot Search Results (25 Center(s) Found)
                    </Typography>
                </Grid>
                <Grid item lg={12}>
                    <Card className={classes.sideCard} variant="outlined">
                        <CardContent>
                            <Box component="div" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <BusinessIcon className={classes.titleIcon} />
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Nerul Post Office
                                </Typography>
                            </Box>
                            <Typography className={classes.pos} color="textSecondary">
                                UHP Karave Seawoods West Karave Village Karave Nagar Seawoods Navi Mumbai Maharashtra India, Thane, 400706
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.sideCard} variant="outlined">
                        <CardContent>
                            <Box component="div" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <BusinessIcon className={classes.titleIcon} />
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Nerul Post Office
                                </Typography>
                            </Box>
                            <Typography className={classes.pos} color="textSecondary">
                                UHP Karave Seawoods West Karave Village Karave Nagar Seawoods Navi Mumbai Maharashtra India, Thane, 400706
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.sideCard} variant="outlined">
                        <CardContent>
                            <Box component="div" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <BusinessIcon className={classes.titleIcon} />
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Nerul Post Office
                                </Typography>
                            </Box>
                            <Typography className={classes.pos} color="textSecondary">
                                UHP Karave Seawoods West Karave Village Karave Nagar Seawoods Navi Mumbai Maharashtra India, Thane, 400706
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default SidePanel