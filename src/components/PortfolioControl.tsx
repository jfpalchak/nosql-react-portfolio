import React, { useState } from "react";
import Profile from "./Profile";
import ProjectList from "./ProjectList";
import Card from "./Utils/Card";
import ProfileEditForm from "./ProfileEditForm";
import ProjectNewForm from "./ProjectNewForm";
import ProjectEditForm from "./ProjectEditForm";
import db from "./../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const PortfolioControl = () => {
  // State slices controlled by useState
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectListVisible, setProjectListVisible] = useState(false);
  const [projectList, setProjectList] = useState([]);

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

  const handleEditingProject = async (project: Project) => {
    const projectRef = doc(db, "projects", project.id!);
    await updateDoc(projectRef, { ...project });
    setProjectEdit(false);
  };

  // Conditional rendering

  return (
    // Rendering Components; passing in props (functions & state)
    <main style={mainStyle}>
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
  id?: string;
  title: string;
  link: string;
  description: string;
}

export default PortfolioControl;
