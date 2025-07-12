import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { ImportantDatesIcon } from "../../../atoms/SvgIcons/SvgIcons";
import IconTitle from "../../../atoms/IconTitle/IconTitle";
// import { useSelector, useDispatch } from "react-redux";
import { importantDatesSelector, getImpDatesListDummy } from "../../../../redux/features/dashboard/ImportantDatesSlice";
import CompLoading from "../../../atoms/Loading/CompLoading";
import AlertBox from "../../../atoms/AlertBox/AlertBox";
import ImpDatesBgIcon from "../../../../assets/dashboard/impDatesBgIcon.png";

const boxShadow = "0px 4px 20px rgba(0, 56, 192, 0.1)";
const useStyles = makeStyles((theme) => ({
  mainRoot: {
    backgroundColor: "#FFFFFF",
    boxShadow: boxShadow,
    borderRadius: 10,
    padding: theme.spacing(2),
    position: "relative"
  },
  cardContainer: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {

    },
  },
  cardRoot: {
    backgroundColor: "#FFFFFF",
    boxShadow: boxShadow,
    borderRadius: 10,
    display: "flex",
    marginBottom: theme.spacing(1.25),
    [theme.breakpoints.down("sm")]: {
      boxShadow: "none",
      borderRadius: 0,
      marginBottom: theme.spacing(0),
      borderBottom: "1px solid #EEEEEE",
    },
  },
  dateViewCol: {
    padding: theme.spacing(1, 0.5, 1, 1)
  },
  dateViewBox: {
    backgroundImage: `url(${ImpDatesBgIcon})`,
    width: 55,
    height: 60,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative"
  },
  yearView: {
    color: "#FFFFFF",
    fontSize: "0.6rem",
    fontWeight: "bold",
    position: "absolute",
    top: "16px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  monthNdDateView: {
    color: "#00437E",
    fontSize: "1.2rem",
    fontWeight: 900,
    position: "absolute",
    bottom: 2,
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    "& .month": {
      fontSize: "0.8rem"
    }
  },
  details: {
    padding: theme.spacing(1.5),
  },
  /* dateText: {
    color: "#ffff",
    [theme.breakpoints.between("sm", "md")]: {
      paddingTop: theme.spacing(1),
    },
  }, */
  shortTitle: {
    color: "#00437E",
    fontWeight: 600,
    fontSize: "1rem",
    overflow: "hidden",
    "-webkit-lineClamp": 1,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      "-webkit-lineClamp": "inherit",
      fontSize: "0.875rem",
    },
  },
  shortPara: {
    color: "#4C5D6C",
    fontSize: "0.8rem",
    fontFamily: ["Poppins", '"Noto Sans"', "sans-serif"].join(","),
    overflow: "hidden",
    "-webkit-lineClamp": 1,
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    [theme.breakpoints.down("sm")]: {
      "-webkit-lineClamp": 2,
      fontSize: "0.75rem",
    },
  },
  readMoreBtn: {
    padding: theme.spacing(0, 0.5),
    color: "#0A5DE2",
    fontWeight: "bold",
    fontSize: "0.8rem",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
      fontWeight: 500,
    },
  }
}));

const ImportantDates = () => {
  const classes = useStyles();
  const { t } = useTranslation("DashboardPageTrans");
  // const dispatch = useDispatch();
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("Error, Something went wrong, please try again after some time.");
  const [isFetching, setIsFetching] = React.useState(true);
  const [importantDatesList, setImpDatesData] = React.useState([]);

  /* const importantDatesList = [
    {
      title: "Project Name",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Project Name",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Project Name",
      description: "Lorem ipsum dolor sit amet",
    },
  ]; */

  useEffect(() => {
    setIsFetching(true);
    getImpDatesListDummy().then((response) => {
      if (response && response.status === 200) {
        if (response.data.result.length > 0) {
          setImpDatesData(response.data.result);
          setIsError(false);
        } else {
          setImpDatesData([]);
          setIsError(true);
        }
        setIsFetching(false);
      }
    }).catch((error) => {
      setImpDatesData([]);
      setIsFetching(false);
      setIsError(true);
    });
  }, [t]);

  const stripHtmlTags = (str) => {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  };

  return (
    <div className={classes.mainRoot}>
      <IconTitle
        icon={<ImportantDatesIcon fontSize="large" />}
        title={t("importantDates.title")}
        titleVariant="body1"
      />
      <div className={classes.cardContainer}>
        {isFetching && <CompLoading isOpen={isFetching} />}
        {isError && <AlertBox severity="error">{errorMessage}</AlertBox>}
        {importantDatesList.map((itemObj, index) => (
          <Box key={index}>
            {itemObj.content.rendered.length > 0 && (
              <Card className={classes.cardRoot}>
                <Box className={classes.dateViewCol}>
                  <Box className={classes.dateViewBox}>
                    <Typography variant="h4" className={classes.yearView}>{moment(itemObj.date).format("YYYY")}</Typography>
                    <Typography className={classes.monthNdDateView}>{moment(itemObj.date).format("DD")} <span className="month">{moment(itemObj.date).format("MMM")}</span></Typography>
                    {/* <img src={ImpDatesBgIcon} alt="Icon" /> */}
                    {/* <Typography variant="subtitle2" className={classes.dateText}>{moment(itemObj.date).format("MMM")}</Typography>
                <Typography variant="h5" className={classes.dateText}>{moment(itemObj.date).format("DD")}</Typography> */}
                  </Box>
                </Box>
                <div className={classes.details}>
                  <Typography variant="subtitle2" className={classes.shortTitle}>{itemObj.title.rendered}</Typography>
                  <Grid container alignItems="flex-end">
                    <Grid item xs>
                      <Typography color="textSecondary" className={classes.shortPara}>
                        {stripHtmlTags(itemObj.content.rendered)}
                      </Typography>
                    </Grid>
                    <Grid item xs="auto">
                      {itemObj.content.rendered.length > 40 &&
                        <a href={itemObj.link} target="_blank" className={classes.readMoreBtn} rel="noopener noreferrer">{t("importantDates.readMore")}</a>
                      }
                    </Grid>
                  </Grid>
                </div>
              </Card>
            )}
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ImportantDates;
