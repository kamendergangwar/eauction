import { makeStyles } from "@material-ui/core/styles";

export const AgentProfileViewsStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 3, 3),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    height: "80vh",
    padding: theme.spacing(1.5, 10),
    // height: 560,
    overflow: "auto",
    // [theme.breakpoints.only("md")]: {
    // height: 450,
    // },
    [theme.breakpoints.only("xs")]: {
      height: "75vh",
      // height: 450,
    },
  },
  profileCoverBox: {
    backgroundColor: "#012D54",
    boxShadow: "0 4px 20px rgb(23 33 61 / 10%)",
    borderRadius: 10,
    color: "#fff",
    padding: theme.spacing(3.5, 12.5),
    marginBottom: theme.spacing(2),
    "&.innerSection": {
      backgroundColor: "#fff",
      color: "#65707D"
    }
  },
  profileImgSection: {
    display: "inline-block",
    position: "relative",
    marginBottom: theme.spacing(3)
  },
  uploadPhotoBtn: {
    backgroundColor: "#007AE7",
    border: "4px solid #012D54",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    right: 0,
    "&:hover": {
      backgroundColor: "#007AE7"
    }
  },
  profileImgCover: {
    borderRadius: "50%",
    border: "4px solid #012D54",
    width: 170,
    height: 170,
  },
  agentFullName: {
    fontWeight: "bold",
    fontSize: "1.52rem",
    marginBottom: theme.spacing(2)
  },
  agentGenderView: {
    color: "#C4C4C4",
    fontWeight: 600,
    fontSize: "1rem",
    "& .MuiSvgIcon-root": {
      verticalAlign: "sub",
      marginRight: theme.spacing(1)
    }
  },
  sectionCardTitle: {
    color: "#007AE7",
    fontWeight: 800,
    fontSize: "1.6rem",
    marginBottom: theme.spacing(4)
  },
  switchLabel: {
    "& .MuiTypography-body1": {
      color: "#4C5D6C",
      fontWeight: "bold",
      fontSize: "0.8rem"
    }
  },
  sectionLabel: {
    color: "#65707D",
    fontWeight: 500,
  },
  sectionValue: {
    color: "#0F2940",
    fontWeight: "bold",
  }
}));