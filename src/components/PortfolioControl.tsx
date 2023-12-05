import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import ProjectList from "./ProjectList";
import Card from "./Utils/Card";
import ProfileEditForm from "./ProfileEditForm";
import ProjectNewForm from "./ProjectNewForm";
import ProjectEditForm from "./ProjectEditForm";
import db from "./../firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Project as IProject } from "./Types";

const PortfolioControl = () => {
  // State slices controlled by useState
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectListVisible, setProjectListVisible] = useState(false);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "projects"),
      (collectionSnapshot) => {
        // do something with our data
        const projects: IProject[] = [];
        collectionSnapshot.forEach((doc) => {
          projects.push({
            title: doc.data().title,
            link: doc.data().link,
            description: doc.data().description,
            id: doc.id,
          });
        });
        setProjectList(projects);
        console.log(projectList);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unSubscribe();
  }, []);

  // Functions
  const handleEditProfileButtonClick = () => {
    setProfileEdit(!profileEdit);
  };

  const handleAddProjectButtonClick = () => {
    setProjectListVisible(!projectListVisible);
  };
  // onAddProjectButtonClick = { handleAddProjectButtonClick };

  const handleAddingNewProjectToList = async (newProjectData: IProject) => {
    await addDoc(collection(db, "projects"), newProjectData);
    setProjectListVisible(true);
  };

  const handleEditingProject = async (project: IProject) => {
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
        {projectListVisible ? <ProjectList listOfProjects={projectList} /> : <ProjectNewForm onFormSubmit={handleAddingNewProjectToList} />}
        <button onClick={handleAddProjectButtonClick}>{projectListVisible ? "Add" : "Back"}</button>
      </Card>
    </main>
  );
};

const mainStyle = {
  display: "flex",
  justifyContent: "space-around",
};

// interface Project {
//   id?: string;
//   title: string;
//   link: string;
//   description: string;
// }

export default PortfolioControl;
