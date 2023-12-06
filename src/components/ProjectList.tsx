import React from "react";
import ProjectNewForm from "./ProjectNewForm";
import { Project as IProject } from "./Types";
import Project from "./Project";
import Card from "./Utils/Card";

// interface ProjectArr {
//   listOfProjects: IProject[];
// }

const ProjectList = (props: ProjectListProps) => {
  const { listOfProjects, onClickingIndivProject } = props;
  return (
    <React.Fragment>
      <h1>Project List</h1>
      {listOfProjects.map((entry) => (
        <Card key={entry.id}>
          <Project
            onClickingDiv={onClickingIndivProject}
            key={entry.id}
            title={entry.title}
            link={entry.link}
            description={entry.description}
            id={entry.id}
          />
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ProjectList;
// We told Project list this:
// props = listOfProjects: [IProject, IProject, IProject];

// It's actually this:
// props = { listOfProjects: [IProject, IProject, IProject] }

type ProjectListProps = {
  listOfProjects: IProject[];
  onClickingIndivProject: (id: string) => void;
};
