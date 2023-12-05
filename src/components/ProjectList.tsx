import React from "react";
import ProjectNewForm from "./ProjectNewForm";
import { Project as IProject } from "./Types";
import Project from "./Project";

// interface ProjectArr {
//   listOfProjects: IProject[];
// }

const ProjectList = (props: { listOfProjects: IProject[] }) => {
  const { listOfProjects } = props;

  return (
    <React.Fragment>
      <h1>Project List</h1>
      {listOfProjects.map((entry: IProject) => (
        <Project title={entry.title} link={entry.link} description={entry.description} id={entry.id} />
      ))}
    </React.Fragment>
  );
};

export default ProjectList;
// We told Project list this:
// props = IProject;

// It's actually this:
// props = { listOfProjects: [IProject, IProject, IProject] }

// props = { listOfProjects: [ IProject, IProject, IProject] }

type ProjectListProps = { listOfProjects: IProject[] };
