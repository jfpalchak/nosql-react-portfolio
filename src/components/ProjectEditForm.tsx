import React from "react";
import ReusableForm from "./ReusableForm";

const ProjectEditForm = (props: ProjectEditFormProps) => {
  const { project } = props;

  const handleEditProjectFormSubmission = (e: React.FormEvent<CustomForm>) => {
    e.preventDefault();

    const target = e.currentTarget.elements;

    props.onEditProjectSubmit({
      title: target.title.value,
      link: target.link.value,
      description: target.link.value,
      id: project.id,
    });
  };

  return (
    <React.Fragment>
      <h1>Project Edit Form</h1>
      <ReusableForm formSubmissionHandler={handleEditProjectFormSubmission} buttonText="Update" />
    </React.Fragment>
  );
};

// ############
// #  TYPES
// ############

type ProjectEditFormProps = {
  onEditProjectSubmit: (data: Project) => void;
  project: Project;
};

interface Project {
  title: string;
  link: string;
  description: string;
  id: string;
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
