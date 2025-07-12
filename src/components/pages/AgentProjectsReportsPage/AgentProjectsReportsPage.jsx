import React from "react";
import AgentLayout from "../AgentLayout/AgentLayout";
import ProjectsReports from "../../organisms/AgentProjectsReportsPageComponents/ProjectsReports/ProjectsReports";

const AgentProjectsReportsPage = () => {
  return (
    <AgentLayout isStepper={false}>
      <ProjectsReports />
    </AgentLayout>
  );
};

export default AgentProjectsReportsPage;
