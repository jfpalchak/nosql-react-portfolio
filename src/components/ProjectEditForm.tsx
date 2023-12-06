import React from "react";
import ReusableForm from "./ReusableForm";

const ProjectEditForm = (props: ProjectEditFormProps) => {
  const { project, onClickingUpdateProject, onClickingBack } = props;

  const handleEditProjectFormSubmission = (e: React.FormEvent<CustomForm>) => {
    e.preventDefault();

    const target = e.currentTarget.elements;

    onClickingUpdateProject({
      title: target.title.value,
      link: target.link.value,
      description: target.link.value,
      id: project.id,
    });
  };

  return (
    <React.Fragment>
      <h1>Project Edit Form</h1>
      <ReusableForm formSubmissionHandler={handleEditProjectFormSubmission} backClickHandler={onClickingBack} buttonText="Update" />
      {/* <button type="button" onClick={onClickingBack}>
        Back
      </button> */}
    </React.Fragment>
  );
};

// ############
// #  TYPES
// ############

type ProjectEditFormProps = {
  onClickingUpdateProject: (data: IProject) => Promise<void>;
  onClickingBack: () => void;
  project: IProject;
};

interface IProject {
  title: string;
  link: string;
  description: string;
  id?: string;
}

interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  link: HTMLInputElement;
  description: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default ProjectEditForm;
