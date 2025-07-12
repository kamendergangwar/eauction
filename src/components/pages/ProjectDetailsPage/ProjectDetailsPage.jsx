import React from "react";
import Layout from "../Layout/Layout";
import ProjectDetailsView from "../../organisms/ProjectDetailsPageComponents/ProjectDetailsView/ProjectDetailsView";

const ProjectDetailsPage = () => {
  return (
    <Layout isStepper={false} noScrollIs={true}>
      <ProjectDetailsView />
    </Layout>
  );
};

export default ProjectDetailsPage;
