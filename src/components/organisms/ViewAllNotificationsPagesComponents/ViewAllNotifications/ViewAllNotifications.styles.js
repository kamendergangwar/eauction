import { makeStyles } from "@material-ui/core/styles";
const boxShadow = "0px 4px 20px rgba(0, 56, 192, 0.1)";

export const ViewAllNotificationsStyles = makeStyles((theme) => ({
  mainRoot: {
    backgroundColor: "#FFFFFF",
    boxShadow: boxShadow,
    borderRadius: 10,
    padding: theme.spacing(2),
    position: "relative"
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1
  },
  listContainer: {
    marginTop: theme.spacing(5)
  },
  notifyContainer: {
    marginBottom: theme.spacing(5)
  },
  notiGroupTtitle: {
    color: "rgba(76, 93, 108, 0.8)",
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1.2),
    padding: theme.spacing(0, 3.5)
  },
  listRoot: {
    padding: 0
  },
  listItemBox: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 20px rgba(0, 56, 192, 0.1)",
    borderRadius: 10,
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(1.5),
    "& .MuiListItemText-root": {
      margin: 0,
      paddingLeft: theme.spacing(3),
      position: "relative",
      "&:before": {
        backgroundColor: "#FF3351",
        borderRadius: "50%",
        content: "''",
        position: "absolute",
        width: 6,
        height: 6,
        left: 5,
        top: 7
      },
    },
    "& .MuiTypography-body1": {
      color: "#0F2940",
      fontSize: "0.8rem",
      marginBottom: theme.spacing(2)
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "#4C5D6C",
      fontSize: "0.7rem",
      textAlign: "right",
      fontWeight: 600
    },

    "&.earlier": {
      "& .MuiListItemText-root": {
        "&:before": {
          backgroundColor: "#0038C0",
        }
      }
    }
  }
}));
