import React from "react";
import { useTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AgentIconTitle from "../../../atoms/AgentIconTitle/AgentIconTitle";
import { AppDetailsViewStyles } from "../AppDetailsView/AppDetailsView.styles";
import { useHistory } from "react-router-dom";
import {
  CategoryIcon,
  UploadFileIcon
} from "../../../atoms/SvgIcons/SvgIcons";

const familyData = [{
  name: "Nilesh Singh",
  age: "28",
  gender: "Male",
  relationship: "Spouse",
  aadhaarNumber: "999-999-999",
  phoneNumber: "7788994455",
  jointOwner: "No",
  photoFile: "Image.jpg",
}];

const FamilyDetails = (props) => {
  const { width, familyMembersData } = props;
  const classes = AppDetailsViewStyles();
  const { t } = useTranslation("AgentAppDetailsViewPageTrans");
  const history = useHistory();

  return (
    <Box className={classes.secContainer}>
      <Grid container alignItems="center">
        <Grid item>
          <AgentIconTitle
            icon={<CategoryIcon fontSize="large" />}
            title={t("applicatntProfilePage.familyDetailForm.title")}
          />
        </Grid>
        <Grid item style={{ paddingLeft: 15 }}>
          <Button
            startIcon={<EditOutlinedIcon />}
            color="primary"
            component="span"
            style={{ fontSize: 12 }}
            onClick={() => history.push("/family-details")}
          >
            {t("applicatntProfilePage.familyDetailForm.editButtonText")}
          </Button>
        </Grid>
      </Grid>
      <div className={classes.tableContainer}>
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
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh1")}
                  </TableCell>
                  <TableCell>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh2")}
                  </TableCell>
                  <TableCell>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh3")}
                  </TableCell>
                  <TableCell>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh4")}
                  </TableCell>
                  <TableCell>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh5")}
                  </TableCell>
                  <TableCell>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh6")}
                  </TableCell>
                  <TableCell>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh7")}
                  </TableCell>
                  <TableCell>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh8")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {familyMembersData.map((row, index) => (
                  <TableRow key={index} style={{ textTransform: "capitalize" }}>
                    <TableCell>{row.RelativeFullName}</TableCell>
                    <TableCell>{row.Age}</TableCell>
                    <TableCell>{(() => {
                      if (row.Gender === "1") {
                        return "Male";
                      } else if (row.Gender === "2") {
                        return "Female";
                      } else {
                        return "Other";
                      }
                    })()}</TableCell>
                    <TableCell>{row.Relationship}</TableCell>
                    <TableCell>{row.AadharNo}</TableCell>
                    <TableCell>{row.MobileNo}</TableCell>
                    <TableCell>{row.JointOwner == "1" ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Avatar
                        alt={row.RelativeFullName}
                        variant="rounded"
                        src={row.ImagePath}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Hidden>
        <Hidden only={["md", "lg"]}>
          {familyMembersData.map((row, index) => (
            <Card
              key={index}
              elevation={2}
              style={{ marginBottom: 10, textTransform: "capitalize" }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt={row.RelativeFullName}
                    variant="rounded"
                    src={row.ImagePath}
                  />
                }
                action={
                  <Box paddingTop={1}>
                    <IconButton
                      size="small"
                      aria-label="edit"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    {"\t"}
                    <IconButton
                      size="small"
                      aria-label="delete"
                    >
                      <DeleteOutlineOutlinedIcon color="primary" />
                    </IconButton>
                  </Box>
                }
                title={
                  <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                    {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh1")}:{" "}
                    <span style={{ fontWeight: 600 }}>{row.RelativeFullName || "--"}</span>
                  </Typography>
                }
              />
              <CardContent>
                <Box display="flex" flexDirection="row">
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh2")}:{" "}
                      <span style={{ fontWeight: 600 }}> {row.Age || "--"}</span>
                    </Typography>
                  </Box>
                  <Box marginLeft={3}>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh3")}:{" "}
                      <span style={{ fontWeight: 600 }}>
                        {(() => {
                          if (row.Gender === "1") {
                            return "Male";
                          } else if (row.Gender === "2") {
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
                      {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh4")}:{" "}
                      <span style={{ fontWeight: 600 }}> {row.Relationship || "--"}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY={2}>
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh5")}:
                      <span style={{ fontWeight: 600 }}>
                        {row.AadharNo || "--"}
                      </span>
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY={2}>
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh6")}:
                      <span style={{ fontWeight: 600 }}> {row.MobileNo || "--"}</span>
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="row" marginY={2}>
                  <Box>
                    <Typography variant="body2" style={{ color: "#4C5D6C" }}>
                      {t("applicatntProfilePage.familyDetailForm.familyTable.tableTh7")}:{" "}
                      <span style={{ fontWeight: 600 }}>{row.JointOwner == "1" ? "Yes" : "No"}</span>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Hidden>
      </div>
    </Box>
  );
};

export default withWidth()(FamilyDetails);
