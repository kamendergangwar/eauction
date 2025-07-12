import React, { useState } from 'react'
import ProfileWrap from '../ProfileWrap/ProfileWrap';
import { LoanApplicationStyle } from './LoanApplication.style';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import { CloseIcon } from '../../../atoms/SvgIcons/SvgIcons';
import NocStage1 from './NocStages/NocStage1';
import NocDetails from './NocDetails/NocDetails';
import { useEffect } from 'react';

const LoanApplication = () => {
    const history = useHistory();
    const classes = LoanApplicationStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const dispatch = useDispatch();
    const [nocStage, setNocStage] = useState(0);
    const [isRequiredLoan, setIsRequiredLoan] = React.useState(false);


    return (
        <ProfileWrap>
            <div className={classes.docContainer}>

                <Box className={classes.pageHeader}>
                    {nocStage == 0 && <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="h4" className={classes.pageTitle}>{t("Mortgage NOC Details")}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant='outlined' color='primary' style={{ paddingTop: 0 }} onClick={() => setNocStage(1)} >Request Mortgage NOC</Button>
                        </Grid>
                    </Grid>}
                    {nocStage == 1 && <Grid container alignItems="center" style={{ marginBottom: 16 }}>
                        <IconButton
                            aria-label="close"
                            onClick={() => setNocStage(0)}
                            style={{ marginRight: 8 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant='h6' style={{fontWeight: "bold"}}>
                            Request Mortgage NOC
                            {/* <br />
                            <Typography variant='body2'>All your past flat cancellation history will appear here.</Typography> */}
                        </Typography>
                    </Grid>}
                </Box>
                {nocStage == 1 && <NocStage1 setNocStage={setNocStage} />}
                {nocStage == 0 && <NocDetails setNocStage={setNocStage}/>}
            </div>

            <Dialog open={isRequiredLoan} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 1 }} style={{ padding: "8px 24px 0 24px" }}>
                    <Grid container xs={12}>
                        <Grid item xs={11} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}></Grid>
                        <Grid container justifyContent="center" xs={1}>
                            <IconButton
                                aria-label="close"
                                onClick={() => setIsRequiredLoan(false)}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Box paddingBottom={3}>
                        <Typography variant="h6" style={{ fontWeight: "700" }}>Steps to apply for Loan</Typography>
                        <Box>
                            <ol>
                                <li>To get started, Upload the sanction letter on the "Generate NOC Page" within the application platform.</li>
                                <li>Select the bank for which you would like to generate the No Objection Certificate (NOC).</li>
                                <li>Proceed to make the payment for the NOC through the designated payment method.</li>
                            </ol>
                        </Box>
                        <Typography variant="subtitle2">Once your payment is completed the NOC Letter will be made available to you in 4/5 business days</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </ProfileWrap>

    )
}

export default LoanApplication