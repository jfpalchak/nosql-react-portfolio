import React from "react";
import ReusableForm from "./ReusableForm";

// Use the defined type for the props
const ProjectNewForm = (props: ProjectNewFormProps) => {
  const handleNewProjectFormSubmission = (event: React.FormEvent<CustomForm>) => {
    event.preventDefault();

    console.log(event);

    const target = event.currentTarget.elements;
    // const target = event.target as typeof event.target & FormInputs;

    // Extract data from the form
    const data = {
      title: target.title.value,
      link: target.link.value,
      description: target.description.value,
    };

    // Call the onFormSubmit function from props with the project data
    props.onFormSubmit(data);
  };

  return (
    <React.Fragment>
      <h1>New Project Form</h1>
      <ReusableForm formSubmissionHandler={handleNewProjectFormSubmission} buttonText="Add Project" />
    </React.Fragment>
  );
};

// ############
// #  TYPES
// ############

// Define the type for the props
interface ProjectNewFormProps {
  onFormSubmit: (data: Project) => Promise<void>;
}

// Step 1: Extend
interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  link: HTMLInputElement;
  description: HTMLInputElement;
}

// Step 2
interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

interface Project {
  title: string;
  link: string;
  description: string;
}

// interface FormInputs {
//   title: { value: string };
//   link: { value: string };
//   description: { value: string };
// }

export default ProjectNewForm;
