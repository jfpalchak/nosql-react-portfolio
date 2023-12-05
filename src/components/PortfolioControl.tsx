import React, { useState, useEffect } from "react";
import db from "./../firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Profile from "./Profile";
import ProfileEditForm from "./ProfileEditForm";
import Card from "./Utils/Card";
import ProjectList from "./ProjectList";
import ProjectNewForm from "./ProjectNewForm";
import ProjectEditForm from "./ProjectEditForm";
import { Project as IProject } from "./Types";

const PortfolioControl = () => {
  // State slices controlled by useState
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectListVisible, setProjectListVisible] = useState(false);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [profile, setProfile] = useState<IProfile>({ name: "", bio: "", skills: "" });
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

  // Functions
  const handleEditProfileButtonClick = () => {
    setProfileEdit(!profileEdit);
  };

  const handleAddProjectButtonClick = () => {
    setProjectListVisible(!projectListVisible);
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

  const handleEditingProfile = async (profile: IProfile) => {
    const profileRef = doc(db, "profiles", "to3n3S0H3EVjiTci2Rgx");
    await updateDoc(profileRef, { ...profile });
    setProfile(profile);
    setProfileEdit(false);
  };

  return (
    // Rendering Components; passing in props (functions & state)
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
