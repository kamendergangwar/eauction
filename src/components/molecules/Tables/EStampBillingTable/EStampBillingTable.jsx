import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { useSelector, useDispatch } from "react-redux";
import {
  eStampSelectOrDeselect,
  documentsSelector,
} from "../../../../redux/features/file/DocumentsSlice";

import {
  eStampingSelector,
  getEstampSummary,
} from "../../../../redux/features/transaction/EstampingSlice";
import {
  applicantSlice,
  applicantSelector,
} from "../../../../redux/features/applicant/ApplicantSlice";
import { calculateEStampTotalBill } from "../../../../redux/features/masterdata/MasterDataSlice";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    fontWeight: 600,
  },
  tableFooter: {
    color: "#007ae7",
    fontWeight: 600,
  },
});

function createData(documentName, eStampFee, eSigningFee, total) {
  return { documentName, eStampFee, eSigningFee, total };
}

const EStampBillingTable = (props) => {
  const { isRemoveOption } = props;
  const classes = useStyles();
  const { t } = useTranslation("DocumentsPageTrans");
  const dispatch = useDispatch();
  const [sum, setSum] = useState("");
  const [newReservation, setNewReservation] = React.useState(null);

  const { isEStampSelected } = useSelector(documentsSelector);
  const { currentEstamping, reservationCat } = useSelector(eStampingSelector);
  const { applicantData, isSuccessResApplicant } =
    useSelector(applicantSelector);
  // const count = currentEstamping.length
  // currentEstamping[0].map((data) => {
  //   return console.log(data);
  // })
  // for (const value of currentEstamping) {
  //   console.log(value);
  // }

  // const amount = currentEstamping.map((data) => {
  //   return data.map((row) => {
  //     return total.push(parseInt(row.Total));
  //   });
  // });

  // let sum = 0;

  // for (let i = 0; i < total.length; i++) {
  //   sum += total[i];
  // }

  // function removeDuplicates(array) {
  //   return array.filter((a, b) => array.indexOf(a) === b);
  // }

  useEffect(() => {
    // dispatch(getEstampSummary())
    if (reservationCat?.length > 0) {
      let uniqueChars = [...new Set(reservationCat)];
      setNewReservation(uniqueChars);
      // console.log(reservationCat);
      let totalCount = 0;
      reservationCat.forEach((element) => {
        totalCount = parseInt(element.Total) + totalCount;
        setSum(totalCount);
      });
      dispatch(calculateEStampTotalBill(sum));
    }
  }, [dispatch, reservationCat, sum]);

  // console.log(sum);
  // useEffect(() => {
  //   if (isSuccessReqEstamping) {
  //     console.log(EstampingnData);
  //   }
  // }, [isSuccessReqEstamping, EstampingnData]);

  // const rows = [
  //   createData("Affidavit D (Government Employees)", 45, 35, 80),
  //   createData("Affidavit F (Minorities)", 0, 35, 35),
  //   createData("Affidavit B (Minorities)", 0, 35, 35),
  // ];

  const removeEStampAndESign = () => {
    dispatch(eStampSelectOrDeselect(!isEStampSelected));
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>
              {t("eStampForm.billingSummary.billingSummaryTable.tableTh0")}
            </TableCell>
            <TableCell className={classes.tableHeader}>
              {t("eStampForm.billingSummary.billingSummaryTable.tableTh1")}
            </TableCell>
            <TableCell className={classes.tableHeader}>
              {t("eStampForm.billingSummary.billingSummaryTable.tableTh2")}
            </TableCell>
            <TableCell className={classes.tableHeader}>
              {t("eStampForm.billingSummary.billingSummaryTable.tableTh3")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newReservation?.length > 0 &&
            newReservation.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {data.DocumentName}
                  </TableCell>
                  <TableCell>₹ {data.EstampAmnt}</TableCell>
                  <TableCell>₹ {data.EsignAmnt}</TableCell>
                  <TableCell>₹ {data.Total}</TableCell>
                </TableRow>
              );
            })}
          {!isRemoveOption && (
            <TableRow>
              <TableCell className={classes.tableFooter}>
                {t("eStampForm.billingSummary.billingSummaryTable.tableTh3")}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className={classes.tableFooter}>₹ {sum}</TableCell>
            </TableRow>
          )}
          {/* {isRemoveOption && (
            <TableRow>
              <TableCell>
                <Button
                  size="small"
                  color="primary"
                  style={{ fontWeight: 400 }}
                  startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
                  onClick={() => removeEStampAndESign()}
                >
                  {t("eStampForm.billingSummary.removeButtonText")}
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          )} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EStampBillingTable;
