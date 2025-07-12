import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Hidden from "@material-ui/core/Hidden";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { setJointowner } from "../../../../redux/features/applicant/ApplicantFamilyInfoSlice";
import { useDispatch } from "react-redux";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  customTableContainer: {
    overflowX: "initial",
  },
});

const FamilyData = (props) => {
  const { familyData, handleOnEdit, handleOnDelete } = props;
  const { t } = useTranslation("FamilyDetailsPageTrans");
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("familyData", familyData);
    const found = familyData.some((element) => element.ownership === "yes");
    if (found) {
      dispatch(setJointowner(true));
    } else {
      dispatch(setJointowner(false));
    }
  }, [familyData]);

  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <TableContainer classes={{ root: classes.customTableContainer }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh")}
                </TableCell>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh1")}
                </TableCell>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh2")}
                </TableCell>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh3")}
                </TableCell>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh4")}
                </TableCell>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh5")}
                </TableCell>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh6")}
                </TableCell>
                <TableCell>
                  {t("addFamilyDetailForm.familyTable.tableTh7")}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {familyData.map((row, index) => (
                <TableRow key={index} style={{ textTransform: "capitalize" }}>
                  <TableCell>{row.ownership}</TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>
                    {(() => {
                      if (row.gender === "1") {
                        return "Male";
                      } else if (row.gender === "2") {
                        return "Female";
                      } else {
                        return "Other";
                      }
                    })()}
                  </TableCell>
                  <TableCell>{row.relationship}</TableCell>
                  <TableCell>
                    {row.aadhaarNumber == "0" ? "" : row.aadhaarNumber}
                  </TableCell>
                  <TableCell>
                    {row.mobileNumber == "0" ? "" : row.mobileNumber}
                  </TableCell>
                  {/* <TableCell>{row.photoFile}</TableCell> */}
                  <TableCell>
                    <Avatar
                      alt={row.memberName}
                      variant="rounded"
                      src={row.photoFile}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOnEdit(row)}
                    >
                      <EditOutlinedIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOnDelete(row)}
                    >
                      <DeleteOutlineOutlinedIcon
                        fontSize="small"
                        color="primary"
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Hidden>
      <Hidden only={["md", "lg"]}>
        {familyData.map((row, index) => (
          <Card
            key={index}
            elevation={2}
            style={{ marginBottom: 10, textTransform: "capitalize" }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={row.memberName}
                  variant="rounded"
                  src={row.photoFile}
                />
              }
              action={
                <Box paddingTop={1}>
                  <IconButton
                    size="small"
                    aria-label="edit"
                    onClick={() => handleOnEdit(row)}
                  >
                    <EditOutlinedIcon color="primary" />
                  </IconButton>
                  {"\t"}
                  <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={() => handleOnDelete(row)}
                  >
                    <DeleteOutlineOutlinedIcon color="primary" />
                  </IconButton>
                </Box>
              }
              title={
                <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                  {t("addFamilyDetailForm.familyTable.tableTh1")}:{" "}
                  <span style={{ fontWeight: 600 }}>{row.memberName}</span>
                </Typography>
              }
            />
            <CardContent>
              <Box display="flex" flexDirection="row">
                <Box>
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("addFamilyDetailForm.familyTable.tableTh2")}:{" "}
                    <span style={{ fontWeight: 600 }}> {row.age}</span>
                  </Typography>
                </Box>
                <Box marginLeft={3}>
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("addFamilyDetailForm.familyTable.tableTh3")}:{" "}
                    <span style={{ fontWeight: 600 }}>
                      {(() => {
                        if (row.gender === "1") {
                          return "Male";
                        } else if (row.gender === "2") {
                          return "Female";
                        } else {
                          return "Other";
                        }
                      })()}
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="row" marginY={2}>
                <Box>
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("addFamilyDetailForm.familyTable.tableTh4")}:{" "}
                    <span style={{ fontWeight: 600 }}> {row.relationship}</span>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="row" marginY={2}>
                <Box>
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("addFamilyDetailForm.familyTable.tableTh5")}:
                    <span style={{ fontWeight: 600 }}>
                      {" "}
                      {row.aadhaarNumber}
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="row" marginY={2}>
                <Box>
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("addFamilyDetailForm.familyTable.tableTh6")}:
                    <span style={{ fontWeight: 600 }}> {row.mobileNumber}</span>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="row" marginY={2}>
                <Box>
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("addFamilyDetailForm.familyTable.tableTh")}:{" "}
                    <span style={{ fontWeight: 600 }}>{row.ownership}</span>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Hidden>
    </>
  );
};

export default FamilyData;
