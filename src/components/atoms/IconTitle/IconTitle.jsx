import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  titleIconRoot: {
    display: "flex",
    // alignItems: "center",  
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1.5)
    }
  },
  title: {
    color: "#00437E",
    fontWeight: "bold",
    fontSize: "1.1rem"
  },
}));
const IconTitle = (props) => {
  const { icon, title, titleVariant, alignItems } = props;
  const classes = useStyles();
  return (
    <Box className={classes.titleIconRoot} alignItems={alignItems === undefined ? "center" : alignItems}>
      {icon}
      <Typography className={classes.title} variant={titleVariant === undefined ? "h6" : titleVariant}>
        {title}
      </Typography>
    </Box>
  );
};

export default IconTitle;
