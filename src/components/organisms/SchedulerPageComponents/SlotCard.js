import { Button, Typography, CardContent, Card, CardActions } from "@material-ui/core";
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ScheduleStyle } from './Schedule.style';
import CloseIcon from '@material-ui/icons/Close';
const SlotCard = (props) => {
    const { slotData, setSelectedSlot } = props;
    const classes = ScheduleStyle();
    const { t } = useTranslation("Appointment");
    return (
        <>
            <Card variant="outlined" className={classes.scheduleDateCard}>
                <CardContent style={{ "padding": "16px 13px" }}>
                    <Typography variant="h5" component="h2" fontWeight="fontWeightBold" className={`${classes.slotCount} ${slotData.totalSlot == 0 ? classes.notAvailable : slotData.totalSlot > 10 ? classes.hightAvailablity : classes.lowAvailablity}`}>
                        {slotData.totalSlot == 0 ? <CloseIcon className={classes.redCrossIcon} /> : slotData.totalSlot}
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.slotText}>
                        {slotData.totalSlot == 0 ? `${t("scheduleAppointment.Slot.noSlot")}` : `${t("scheduleAppointment.Slot.yesSlot")}`}
                    </Typography>
                </CardContent>
                <CardActions className={classes.bookNow} justifyContent="center">
                    {/* disabled={!slotData.totalSlot} */}
                    <Button size="small" className={classes.ButtonBook} onClick={() => setSelectedSlot(slotData)} disabled={!slotData.totalSlot}>
                        {t("scheduleAppointment.Slot.bookBtn")}
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}
export default SlotCard