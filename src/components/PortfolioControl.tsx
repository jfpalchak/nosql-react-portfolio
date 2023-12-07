import React, { useState, useEffect } from "react";
import { db, auth } from "./../firebase";
import { collection, addDoc, deleteDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Profile from "./Profile";
import ProfileEditForm from "./ProfileEditForm";
import Card from "./Utils/Card";
// import ProjectList from "./ProjectList";
import ProjectNewForm from "./ProjectNewForm";
import ProjectEditForm from "./ProjectEditForm";
import ProjectDetail from "./ProjectDetail";
import { Project as IProject } from "./Types";
import { Suspense } from "react";
import LoadingSpinner from "./Utils/LoadingSpinner.js";

const ProjectList = React.lazy(() => import("./ProjectList"));

const PortfolioControl = () => {
  // State slices controlled by useState
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectListVisible, setProjectListVisible] = useState(true);
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [profile, setProfile] = useState<IProfile>({ name: "", bio: "", skills: "" });
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  // const [error, setError] = useState(null);
  const isAuthorized = auth.currentUser ? true : false;

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
    setProjectEdit(!projectEdit);
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

  const handleChangingSelectedProject = (targetProjectId: string) => {
    const targetProject = projectList.filter((target) => target.id === targetProjectId)[0];
    setSelectedProject(targetProject);
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
            <ProfileEditForm profile={profile} onClickingProfileUpdate={handleEditingProfile} onClickingBack={handleEditProfileButtonClick} />
          ) : (
            <Profile loggedIn={isAuthorized} profile={profile} onEditProfileButtonClick={handleEditProfileButtonClick} />
          )}
          {/* <button onClickingBack={handleEditProfileButtonClick}>{profileEdit ? "Back" : "Edit"}</button> */}
        </Card>

        <Card>
          {projectListVisible ? (
            <Suspense fallback={<LoadingSpinner />}>
              <ProjectList
                loggedIn={isAuthorized}
                listOfProjects={projectList}
                onClickingIndivProject={handleChangingSelectedProject}
                onClickingAddProject={handleAddProjectButtonClick}
              />
            </Suspense>
          ) : (
            <ProjectNewForm onFormSubmit={handleAddingNewProjectToList} onClickingBack={handleAddProjectButtonClick} />
          )}
          {/* <button onClick={handleAddProjectButtonClick}>{projectListVisible ? "Add" : "Back"}</button> */}
        </Card>
        <div className="project-detail" style={projectDetailStyle}>
          {selectedProject ? (
            <Card>
              {!projectEdit ? (
                <ProjectDetail
                  loggedIn={isAuthorized}
                  project={selectedProject}
                  onClickingBack={handleResetSelectedProject}
                  onClickingEdit={handleEditProjectButtonClick}
                  onClickingDelete={handleDeletingProjectfromList}
                />
              ) : (
                <ProjectEditForm
                  onClickingBack={handleEditProjectButtonClick}
                  onClickingUpdateProject={handleEditingProject}
                  project={selectedProject}
                />
              )}
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
  top: 100,
  color: "black",
  boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
  borderRadius: 10,
};

const mainStyle = {
  display: "flex",
  justifyContent: "space-around",
};

// ############
// #  TYPES
// ############

interface IProfile {
  name: string;
  bio: string;
  skills: string;
}

export default PortfolioControl;
