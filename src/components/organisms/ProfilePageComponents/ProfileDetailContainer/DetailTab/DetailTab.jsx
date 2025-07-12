import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useTranslation, Trans } from "react-i18next";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: 15,
    margin: 10,

    border: "1px solid #D6D6D6",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    color: "#F27807",
    margin: 2,
  },
  pos: {
    marginBottom: 12,
  },
  list: {
    display: "flex",
    alignItems: "start",
    padding: 0,
  },
  item: {
    width: "auto",
    flex: "auto",
    maxWidth: 350,
  },
  text: {
    color: "#0F2940",
    fontSize: 13,
    fontFamily: "Noto Sans",
    maxWidth: "100%",
    wordBreak: "break-all",
    margin: 0,
  },
  // highlight: {
  //     color: "#0F2940",
  //     fontSize: 13,
  //     fontFamily: "Noto Sans",
  //     fontWeight: "bold"
  // }
});

function DetailTab({ selectedValue }) {
  const { t } = useTranslation("ProfilePageTrans");
  const classes = useStyles();

  return (
    <Fragment>
      <Grid key={new Date().getTime} style={{ backgroundColor: "#FFFFFF" }}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PersonOutlineIcon color="secondary" />
              <Typography
                className={classes.title}
                color="secondary"
                component={"span"}
              >
                {t("detailTab.basic.basicDetails")}
              </Typography>
            </div>

            <List className={classes.list}>
              <ListItem className={classes.item}>
                <ListItemText>
                  <p className={classes.text}>
                    {t("detailTab.basic.gender")}:{" "}
                    <strong>
                      {selectedValue.Gender === "1"
                        ? t("detailTab.basic.male")
                        : t("detailTab.basic.female")}
                    </strong>
                  </p>
                </ListItemText>
              </ListItem>
              <ListItem className={classes.item}>
                <p className={classes.text}>
                  {t("detailTab.basic.email")}:{" "}
                  <strong>
                    {selectedValue.EmailId &&
                    selectedValue.EmailId !=
                      "paymentgateway.bulk@heliosadvisory.com"
                      ? selectedValue.EmailId
                      : ""}
                  </strong>
                </p>
              </ListItem>
            </List>

            <List className={classes.list}>
              <ListItem className={classes.item}>
                <ListItemText>
                  <p className={classes.text}>
                    {" "}
                    {t("detailTab.basic.dob")}:{" "}
                    <strong>{selectedValue.DOB}</strong>
                  </p>
                </ListItemText>
              </ListItem>
              <ListItem className={classes.item}>
                <ListItemText>
                  <p className={classes.text}>
                    {t("detailTab.basic.kyc")}:{" "}
                    <strong>
                      {selectedValue.IsAadharVerified === "1" &&
                      selectedValue.isPanVerified === "1"
                        ? t("detailTab.basic.complete")
                        : t("detailTab.basic.incomplete") || "--"}
                    </strong>
                  </p>
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LocationOnOutlinedIcon color="secondary" />
              <Typography
                className={classes.title}
                color="secondary"
                component={"span"}
              >
                {t("detailTab.address.addressDetails")}
              </Typography>
            </div>

            <List className={classes.list}>
              <ListItem className={classes.item}>
                <p className={classes.text}>
                  {t("detailTab.address.roomNo")}:{" "}
                  <strong>{selectedValue.House}</strong>
                </p>
              </ListItem>
              <ListItem className={classes.item}>
                <p className={classes.text}>
                  {t("detailTab.address.pinCode")}:{" "}
                  <strong>{selectedValue.Pincode}</strong>
                </p>
              </ListItem>
              <ListItem className={classes.item}>
                <p className={classes.text}>
                  {t("detailTab.address.district")}:{" "}
                  <strong>{selectedValue.District}</strong>
                </p>
              </ListItem>
            </List>
            <List className={classes.list}>
              <ListItem className={classes.item}>
                <p className={classes.text}>
                  {t("detailTab.address.street")}:{" "}
                  <strong>{selectedValue.Street}</strong>
                </p>
              </ListItem>
              <ListItem className={classes.item}>
                <p className={classes.text}>
                  {t("detailTab.address.village")}:{" "}
                  <strong>{selectedValue.City}</strong>
                </p>
              </ListItem>
              <ListItem className={classes.item}>
                <p className={classes.text}>
                  {" "}
                  {t("detailTab.address.state")}:{" "}
                  <strong>{selectedValue.State}</strong>
                </p>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        {/* <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <ListAltOutlinedIcon color="secondary" />

                            <Typography
                                className={classes.title}
                                color="secondary"
                                component={"span"}
                            >
                                {t("detailTab.account.accountDetails")}
                            </Typography>
                        </div>

                        <List className={classes.list}>
                            <ListItem className={classes.item}>
                                <p className={classes.text}>
                                    {t("detailTab.account.accountNo")}:{" "}
                                    <strong>{selectedValue.AccountNo}</strong>
                                </p>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <p className={classes.text}>
                                    {t("detailTab.account.accountHolderName")}:{" "}
                                    <strong>
                                        {selectedValue.FirstName}&nbsp;{selectedValue.LastName}
                                    </strong>{" "}
                                </p>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <p className={classes.text}>
                                    {t("detailTab.account.isfc")}:{" "}
                                    <strong>{selectedValue.IFSCCode}</strong>
                                </p>
                            </ListItem>
                        </List>
                        <List className={classes.list}>
                            <ListItem className={classes.item}>
                                <p className={classes.text}>
                                    {t("detailTab.account.bankName")}:{" "}
                                    <strong>{selectedValue.BankName}</strong>
                                </p>
                            </ListItem>
                            <ListItem className={classes.item}>
                                <p className={classes.text}>
                                    {t("detailTab.account.branch")}:{" "}
                                    <strong>{selectedValue.BranchName}</strong>
                                </p>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card> */}
      </Grid>
    </Fragment>
  );
}

export default DetailTab;
