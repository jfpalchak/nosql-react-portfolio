import React, { useState } from "react";
import Profile from "./Profile";
import ProjectList from "./ProjectList";
import Card from "./Utils/Card";
import ProfileEditForm from "./ProfileEditForm";
import ProjectNewForm from "./ProjectNewForm";
import ProjectEditForm from "./ProjectEditForm";

const PortfolioControl = () => {
  // State slices controlled by useState
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectListVisible, setProjectListVisible] = useState(true);

  // Functions

  // Conditional rendering
  let currentlyVisibleState = null;
  currentlyVisibleState = (
    <>
      <div className="container">
        <Profile />
        <ProjectList />
      </div>
    </>
  );

  // let currentlyShownCard = null;

  return (
    // Rendering Components; passing in props (functions & state)
    <main style={mainStyle}>
      <h3>Placeholder</h3>
      <Card>{profileEdit ? <ProfileEditForm /> : <Profile />}</Card>
      <Card>{projectListVisible ? <ProjectList /> : <ProjectNewForm />}</Card>
    </main>
  );
};

const mainStyle = {
  display: "flex",
  justifyContent: "space-around",
};

export default PortfolioControl;
