import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "none",
    // backgroundColor: "red",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const StepperDrawer = (props) => {
  const { item, step } = props;
  // console.log(step);
  const { t } = useTranslation();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const steps = [
    t("stepperSection.step1"),
    t("stepperSection.step2"),
    t("stepperSection.step3"),
    t("stepperSection.step4"),
    t("stepperSection.step5"),
    t("stepperSection.step6"),
    t("stepperSection.step7"),
  ];

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        <Typography variant="h6" gutterBottom>
          {item}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {steps.map((label) => (
          <Box p={1} key={label}>
            <Typography variant="h6">{label}</Typography>
          </Box>
        ))}
      </Collapse>
    </Card>
  );
};

export default StepperDrawer;
