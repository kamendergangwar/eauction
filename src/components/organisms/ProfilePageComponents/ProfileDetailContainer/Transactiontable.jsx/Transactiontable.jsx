import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTranslation, Trans } from "react-i18next";
import { useState } from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
    link: {
        color: "blue",
        fontWeight: "#007AE7",
    },
});

function Transactiontable(userData) {
    const [applicantData, setApplicantData] = useState(
        userData.userData.ApplicationDetails
    );


    const { t } = useTranslation("ProfilePageTrans");
    function createData(Transaction, Date, Amount, Reciept) {
        return { Transaction, Date, Amount, Reciept };
    }

    const rows = [
        createData(
            "SBI453458383",
            "12 Dec, 2014",
            2200,
            t("transactionTable.tableRow.download")
        ),
        createData(
            "CBI483483483",
            "12 Dec, 2014",
            1900.0,
            t("transactionTable.tableRow.download")
        ),
    ];

    const classes = useStyles();
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <h4>{t("transactionTable.tableRow.transcationId")}</h4>
                            </TableCell>
                            <TableCell align="right">
                                <h4>{t("transactionTable.tableRow.date")}</h4>
                            </TableCell>
                            <TableCell align="right">
                                <h4>{t("transactionTable.tableRow.amount")}</h4>
                            </TableCell>
                            <TableCell align="right">
                                <h4>{t("transactionTable.tableRow.reciept")}</h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicantData?.length ? (
                            applicantData.map((data) => {
                                return data.TransactionDetails.map((detail, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell align="left">{detail.TransactionId}</TableCell>
                                            <TableCell align="right">
                                                {detail.CreatedAt.slice(0, 11)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {" "}
                                                &#8377;&nbsp;{detail.AmountPaid}
                                            </TableCell>
                                            <TableCell align="right" className={classes.link}>
                                                {detail.InvoiceNo}
                                            </TableCell>
                                        </TableRow>
                                    );
                                });
                            })) : ("")}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Transactiontable;
