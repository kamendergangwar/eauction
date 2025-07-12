import React from "react";
import Box from "@material-ui/core/Box";
import withWidth from "@material-ui/core/withWidth";
import FormCard from "../../molecules/Cards/FormCard/FormCard";
import UserProjects from "./UserProjects";
import { DashboardStyles } from "../DashboardPageComponents/Dashboard/Dashboard.styles";

const SelectProjectTab = (props) => {
  const classes = DashboardStyles();
  

  return (
    <div className={classes.mainRoot}>
      
      <FormCard>
        <Box className={classes.topTabSection}>
          
          <UserProjects />
        </Box>
      </FormCard>
    </div>
  );
};

export default withWidth()(SelectProjectTab);
