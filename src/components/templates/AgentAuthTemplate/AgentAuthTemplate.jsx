import React from "react";
import AgentHeader from "../../atoms/AgentHeader/AgentHeader";
import AgentAuthCard from "../../molecules/Cards/AgentAuthCard/AgentAuthCard";

const AgentAuthTemplate = (props) => {
  const { children } = props;
  return (
    <>
      <AgentHeader />
      <AgentAuthCard>{children}</AgentAuthCard>
    </>
  );
};

export default AgentAuthTemplate;
