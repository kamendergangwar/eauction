import React, { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";

const SavedProjects = (props) => {
  const { applicationsList } = props;
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (applicationsList.length > 0) {
      setProjectList([]);
      applicationsList.forEach((item) => {
        if (item.ApplicationStatus === "0") {
          let newItem = {
            applicationId: item.ApplicationId,
            reservationIds: [item.ReservationId],
            schemeName: item.ProjectDetails.scheme,
            schemeId: item.schemeId,
            projectId: item.ProjectId,
            location: item.ProjectDetails.address,
            gps: item.ProjectDetails.gps,
            lat: item.ProjectDetails.lat,
            lng: item.ProjectDetails.lng,
            images: item.ProjectDetails.images,
            isSelected: true,
          };
          if (item.ProjectDetails.attributes) {
            newItem.title = item.ProjectDetails.attributes["Title"];
            newItem.price = item.ProjectDetails.attributes["Base Price"];
            newItem.carpetArea = item.ProjectDetails.attributes["Carpet Area"];
            newItem.bhk = item.ProjectDetails.attributes["Type"];
            newItem.status =
              item.ProjectDetails.attributes["Development Status"];
            newItem.reraId = item.ProjectDetails.attributes["Rera Id"];
            newItem.about = item.ProjectDetails.attributes["About"];
            newItem.incomeGroup =
              item.ProjectDetails.attributes["Income Group"];
            newItem.amenities = item.ProjectDetails.attributes["amenities"];
            newItem.floorPlan = item.ProjectDetails.attributes["floor_plan"];
          }
          setProjectList((prevData) => [...prevData, newItem]);
        }
      });
    }
  }, [applicationsList]);

  return (
    <>
      {projectList.map((item, index) => (
        <React.Fragment key={`SavedProject` + index}>
          {item.isSelected && (
            <ProjectCard
              key={index}
              isSelected={item.isSelected}
              projectDetails={item}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default SavedProjects;
