import { Project as IProject } from "./Types";

const ProjectDetail = (props: ProjectDetailProps) => {
  const { project, onClickingBack, onClickingEdit, onClickingDelete, loggedIn } = props;

  return (
    <div>
      <h1>Project</h1>
      <p>Title: {project.title}</p>
      <p>Link:{project.link}</p>
      <p>Description: {project.description}</p>
      {loggedIn && <button onClick={onClickingEdit}>Edit</button>}
      {loggedIn && <button onClick={() => onClickingDelete(project.id!)}>Delete</button>}
      <button onClick={onClickingBack}>Back</button>
    </div>
  );
};

// ############
// #  TYPES
// ############

type ProjectDetailProps = {
  loggedIn: boolean;
  project: IProject;
  onClickingBack: () => void;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
};

export default ProjectDetail;
