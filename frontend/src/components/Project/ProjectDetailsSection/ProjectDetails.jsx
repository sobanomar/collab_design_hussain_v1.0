import Tabs from "./Tabs";
import TeamTabDetail from "./TeamTabDetail";
import { useState } from "react";
import PropTypes from "prop-types";
import DiscussionsTabDetail from "./DiscussionsTabDetails";
import DiagramTabDetail from "./DiagramTabDetail";

const ProjectDetails = ({
  data,
  refreshProject,
  handleVersionsClick,
  selectedVersion,
}) => {
  const tabOptions = ["Diagrams", "Team", "Discussions"];
  const [activeTab, setActiveTab] = useState("Diagrams");

  const changeActiveTab = (TabName) => {
    setActiveTab(TabName);
    if (TabName === "Team") {
      refreshProject();
    }
  };

  return (
    <div
      className="bg-[#F3F4F6] dark:bg-dark-900  flex justify-center"
      style={{ minHeight: `calc(100vh - 100px)` }}
    >
      <div className="w-[90%] lg:w-[70%] transition-all duration-800">
        <Tabs
          tabOptions={tabOptions}
          activeTab={activeTab}
          switchTab={changeActiveTab}
        />
        {activeTab === "Team" && (
          <div className="animate-fadeIn">
            <TeamTabDetail
              pendingInvites={data.pendingInvites}
              team={data.members}
              projectId={data._id}
              owner={data.owner}
              refreshProject={refreshProject}
              projectStatus={data.status}
            />
          </div>
        )}
        {activeTab === "Diagrams" && (
          <div className="animate-fadeIn">
            <DiagramTabDetail
              diagrams={data.diagrams}
              projectName={data.name}
              projectStatus={data.status}
              handleVersionsClick={handleVersionsClick}
              selectedVersion={selectedVersion}
              refreshProject={refreshProject}
            />
          </div>
        )}
        {activeTab === "Discussions" && (
          <div className="animate-fadeIn">
            <DiscussionsTabDetail
              projectId={data._id}
              projectName={data.name}
              members={data.members}
              owner={data.owner}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ProjectDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectDetails;
