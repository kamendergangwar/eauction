import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton, Button, FormControlLabel, FormControl, FormHelperText, TableContainer, Paper, Table, TableHead, TableRow, TableCell, withStyles, TableBody } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { CancelBookingStyle } from "../CancelBookingStyle.style";
import { WhiteArrowIcon } from "../../../../../atoms/SvgIcons/SvgIcons";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function CancelBookingStage1(props) {
    const { setCancelStage, setShowCancelForm } = props;
    const classes = CancelBookingStyle();
    const { t } = useTranslation("ProfilePageTrans");
    const history = useHistory();
    const [isConfirmCheckbox, setIsConfirmCheckbox] = useState(false);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);

    const updateConfirmCheckbox = (event) => {
        setIsConfirmCheckbox(event.target.checked);
        setIsError(false);
    };

    const proceedCancellation = () => {
        if (isConfirmCheckbox) {
            setCancelStage(2)
        } else {
            setIsError(true);
        }
    };

    return (
        <Box className={classes.tableContainer}>
            {/* <Typography variant="h6">Booking cancellation procedure</Typography> */}
            <ol style={{ fontSize: 15, lineHeight: 2 }}>
                {/* <li>If you're facing any problem, you can call us on our customer support helpline at <strong>+91 9930870000</strong> (Timing: 8 AM to 10 PM) for immediate assistance.</li> */}
                <li>To initiate the cancellation process, kindly fill out the cancellation form and upload the required documents. After successful document verification, your cancellation request will be processed promptly.</li>
                <li>Amount to be deducted for cancellation is as follows:</li>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sr No.</StyledTableCell>
                                <StyledTableCell align="left">If the letter requesting to cancel the booking is received</StyledTableCell>
                                <StyledTableCell align="left">Amount to be deducted</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">1</StyledTableCell>
                                <StyledTableCell align="left">Immediate after LOI generation.</StyledTableCell>
                                <StyledTableCell align="left">1% of the cost of the said unit.</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">2</StyledTableCell>
                                <StyledTableCell align="left">Within 30 days from issuance of the allotment letter.</StyledTableCell>
                                <StyledTableCell align="left">1% of the cost of the said unit</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">3</StyledTableCell>
                                <StyledTableCell align="left">Within 31 to 60 days from issuance of the allotment letter.</StyledTableCell>
                                <StyledTableCell align="left">1.5% of the cost of the said unit.</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">4</StyledTableCell>
                                <StyledTableCell align="left">After 61 days from the issuance of the allotment letter.</StyledTableCell>
                                <StyledTableCell align="left">2% of the cost of the said unit.</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <li>We recommend reviewing our terms and conditions for cancellations and modifications for a more detailed understanding of our policies.</li>
            </ol>
            <FormControl component="fieldset" error={!isConfirmCheckbox}>
                <FormControlLabel
                    name="isPuccaHouse"
                    checked={isConfirmCheckbox}
                    onChange={updateConfirmCheckbox}
                    control={<Checkbox color="primary" />}
                    label='I have read all the instructions, and I agree to all the terms and conditions.'
                    labelPlacement="end"
                />
                <FormHelperText>{isError ? 'Please agree to the terms and conditions.' : ''}</FormHelperText>
            </FormControl>
            <Grid xs={12} container justifyContent="center" style={{ gap: 20 }}>
                <Button color="primary" onClick={() => setShowCancelForm(false)}>
                    Cancel
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    endIcon={<WhiteArrowIcon style={{ fill: "transparent" }} />}
                    className={classes.proceedBtn}
                    onClick={() => proceedCancellation()}
                >
                    Procced
                </Button>

            </Grid>
        </Box>
    );
}

export default CancelBookingStage1;