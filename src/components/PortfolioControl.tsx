import React, { useState, useEffect } from "react";
import db from "./../firebase";
import { collection, addDoc, deleteDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Profile from "./Profile";
import ProfileEditForm from "./ProfileEditForm";
import Card from "./Utils/Card";
import ProjectList from "./ProjectList";
import ProjectNewForm from "./ProjectNewForm";
import ProjectEditForm from "./ProjectEditForm";
import ProjectDetail from "./ProjectDetail";
import { Project as IProject } from "./Types";

const PortfolioControl = () => {
  // State slices controlled by useState
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectListVisible, setProjectListVisible] = useState(false);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [profile, setProfile] = useState<IProfile>({ name: "", bio: "", skills: "" });
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  // const [error, setError] = useState(null);

  // grabbing projects
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

  // grabbing Profile information
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "profiles"),
      (collectionSnapshot) => {
        const doc = collectionSnapshot.docs[0]; // only the one profile
        const userProfile = {
          name: doc.data().name,
          bio: doc.data().bio,
          skills: doc.data().skills,
        };
        setProfile(userProfile);
      },
      (error) => {
        console.log(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  // Functions -- for Profile
  const handleEditProfileButtonClick = () => {
    setProfileEdit(!profileEdit);
  };

  const handleEditingProfile = async (profile: IProfile) => {
    const profileRef = doc(db, "profiles", "to3n3S0H3EVjiTci2Rgx");
    await updateDoc(profileRef, { ...profile });
    setProfile(profile);
    setProfileEdit(false);
  };

  // Functions -- for Projects
  const handleAddProjectButtonClick = () => {
    setProjectListVisible(!projectListVisible);
  };

  const handleEditProjectButtonClick = () => {
    setProjectEdit(true);
  };

  const handleAddingNewProjectToList = async (newProjectData: IProject) => {
    await addDoc(collection(db, "projects"), newProjectData);
    setProjectListVisible(true);
  };

  const handleEditingProject = async (project: IProject) => {
    const projectRef = doc(db, "projects", project.id!);
    await updateDoc(projectRef, { ...project });
    setProjectEdit(false);
  };

  // Write a function that will be sent to each Project card. Upon clicking it, shows the user Project Details, which also displays an Edit and Delete button.
  const handleChangingSelectedProject = (targetProjectId: string) => {
    const targetProject = projectList.filter((target) => target.id === targetProjectId)[0];
    setSelectedProject(targetProject);
    // setProjectListVisible(false);
  };

  const handleResetSelectedProject = () => {
    setSelectedProject(null);
  };

  const handleDeletingProjectfromList = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
    setSelectedProject(null);
  };

  return (
    // Rendering Components; passing in props (functions & state)
    <React.Fragment>
      <main style={mainStyle}>
        <Card>
          {profileEdit ? (
            <ProfileEditForm profile={profile} onClickingProfileUpdate={handleEditingProfile} />
          ) : (
            <Profile profile={profile} onEditProfileButtonClick={handleEditProfileButtonClick} />
          )}
          <button onClick={handleEditProfileButtonClick}>{profileEdit ? "Back" : "Edit"}</button>
        </Card>
        <Card>
          {projectListVisible ? (
            <ProjectList listOfProjects={projectList} onClickingIndivProject={handleChangingSelectedProject} />
          ) : (
            <ProjectNewForm onFormSubmit={handleAddingNewProjectToList} />
          )}
          <button onClick={handleAddProjectButtonClick}>{projectListVisible ? "Add" : "Back"}</button>
        </Card>
        <div style={projectDetailStyle}>
          {selectedProject != null ? (
            <Card>
              <ProjectDetail
                project={selectedProject}
                onClickingBack={handleResetSelectedProject}
                onClickingEdit={handleEditProjectButtonClick}
                onClickingDelete={handleDeletingProjectfromList}
              />
            </Card>
          ) : null}
        </div>
      </main>
    </React.Fragment>
  );
};

// Styling & Typing
const projectDetailStyle = {
  position: "fixed" as const,
  color: "black",
};

const mainStyle = {
  display: "flex",
  justifyContent: "space-around",
};

interface IProfile {
  name: string;
  bio: string;
  skills: string;
}

// interface Project {
//   id?: string;
//   title: string;
//   link: string;
//   description: string;
// }

export default PortfolioControl;
