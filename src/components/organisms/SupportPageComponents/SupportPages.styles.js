import { makeStyles } from "@material-ui/core/styles";

export const SupportPagesStyles = makeStyles((theme) => ({
  rootContainer: {
    padding: theme.spacing(3),
    /* display: "flex",
    flexDirection: "column",
    alignItems: "center", */
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  pageTitle: {
    color: "#00437E",
    marginBottom: theme.spacing(3),
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center"
  },
  pageSubTitle: {
    color: "#263238",
    fontWeight: 600,
    fontSize: "1.2rem",
    marginBottom: theme.spacing(2),
  },
  contentSection: {
    padding: theme.spacing(0, 4),
    marginBottom: theme.spacing(4),
    "&:last-child": {
      marginBottom: 0
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      "& ol": {
        paddingLeft: theme.spacing(2)
      }
    }
  },
  innerContSec: {
    "&&>li": {
      marginBottom: theme.spacing(2),
      "&:last-child": {
        marginBottom: 0
      }
    }
  },
  alphabeticalOrderList: {
    "&&>li": {
      marginBottom: theme.spacing(1.2),
      "&:last-child": {
        marginBottom: 0
      }
    }
  },
  sectionTitle: {
    color: "#263238",
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: theme.spacing(2),
  },
  sectionPara: {
    fontSize: "0.8rem",
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      marginBottom: 0
    },
    "&.note": {
      paddingTop: theme.spacing(1.2)
    },
    "&.bold": {
      fontWeight: "bold"
    }
  },
  infoBox: {
    maxWidth: 350,
    "&>.MuiGrid-container": {
      padding: theme.spacing(1.5, 0)
    }
  },
  underlinePara: {
    borderBottom: "1px dashed #263238"
  },
  portalLink: {
    display: "inline-block",
    marginLeft: theme.spacing(0.5)
  },
  tableContainer: {
    width: "100%",
    border: "1px solid black",
    borderCollapse: "collapse",
    textAlign: "left",
    "& th": {
      border: "1px solid black",
      padding: theme.spacing(1)
    },
    "& td": {
      border: "1px solid black",
      padding: theme.spacing(1)
    }
  }
}));
