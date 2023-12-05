import React, { useState } from "react";
import Profile from "./Profile";
import ProjectList from "./ProjectList";
import Card from "./Utils/Card";
import ProfileEditForm from "./ProfileEditForm";
import ProjectNewForm from "./ProjectNewForm";
import ProjectEditForm from "./ProjectEditForm";
import db from "./../firebase";
import { collection, addDoc } from "firebase/firestore";

const PortfolioControl = () => {
  // State slices controlled by useState
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectListVisible, setProjectListVisible] = useState(false);

  // Functions

  const handleEditProfileButtonClick = () => {
    setProfileEdit(!profileEdit);
  };

  const handleAddProjectButtonClick = () => {
    setProjectListVisible(!projectListVisible);
  };
  // onAddProjectButtonClick = { handleAddProjectButtonClick };

  const handleAddingNewProjectToList = async (newProjectData: Project) => {
    await addDoc(collection(db, "projects"), newProjectData);
    setProjectListVisible(true);
  };

  // Conditional rendering
  // let currentlyVisibleState = null;
  // currentlyVisibleState = (
  //   <>
  //     <div className="container">
  //       <Profile />
  //       <ProjectList />
  //     </div>
  //   </>
  // );

  // let currentlyShownCard = null;

  return (
    // Rendering Components; passing in props (functions & state)
    <main style={mainStyle}>
      {/* <h3>Placeholder</h3> */}
      <Card>
        {profileEdit ? <ProfileEditForm /> : <Profile onEditProfileButtonClick={handleEditProfileButtonClick} />}
        <button onClick={handleEditProfileButtonClick}>{profileEdit ? "Back" : "Edit"}</button>
      </Card>
      <Card>
        {projectListVisible ? <ProjectList /> : <ProjectNewForm onFormSubmit={handleAddingNewProjectToList} />}
        <button onClick={handleAddProjectButtonClick}>{projectListVisible ? "Add" : "Back"}</button>
      </Card>
    </main>
  );
};

const mainStyle = {
  display: "flex",
  justifyContent: "space-around",
};

interface Project {
  title: string;
  link: string;
  description: string;
}

export default PortfolioControl;
