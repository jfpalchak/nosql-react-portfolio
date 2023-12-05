// import React, { FormEvent } from "react";

// const ProjectNewForm = (props: ProjectNewForm) => {
//   const handleNewProjectFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const target = event.currentTarget;

//     const data = {
//       name: target.name.value,
//       email: target.email.value,
//       password: target.password.value,
//       confirmPassword: target.confirmPassword.value,
//       conditionsAccepted: target.conditionsAccepted.checked,
//     };

//     props.onFormSubmit({
//       title: event.target.title.value,
//       link: event.target.link.value,
//       description: event.target.description.value,
//     });
//   };

//   return (
//     <React.Fragment>
//       <h1>New Project Form</h1>
//       <form onSubmit={handleNewProjectFormSubmission}>
//         <input type="text" name="title" placeholder="Profile Title" />
//         <input type="text" name="link" placeholder="Profile Link" />
//         <input type="text" name="description" placeholder="Profile Description" />
//         <button type="submit">Add Project</button>
//       </form>
//     </React.Fragment>
//   );
// };

// // type FormEvent = React.FormEvent<HTMLFormElement>;

// interface CustomElements {
//   title: string;
//   link: string;
//   description: string;
// }

// // type FormEvent = {
// //   target: HTMLInputElement;
// // };

// // type FormData = {
// //   title: string;
// //   link: string;
// //   description: string;
// // };

// type ProjectNewForm = {
//   onFormSubmit: (x: object) => Promise<void>;
// };

// export default ProjectNewForm;

import React from "react";

// Define the type for the props
interface ProjectNewFormProps {
  onFormSubmit: (data: Project) => void;
}

// Use the defined type for the props
const ProjectNewForm: React.FC<ProjectNewFormProps> = (props) => {
  const handleNewProjectFormSubmission = (event: React.FormEvent<CustomForm>) => {
    event.preventDefault();

    console.log(event);

    const target = event.currentTarget.elements;

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
      <form onSubmit={handleNewProjectFormSubmission}>
        <input type="text" name="title" placeholder="Profile Title" />
        <input type="text" name="link" placeholder="Profile Link" />
        <input type="text" name="description" placeholder="Profile Description" />
        <button type="submit">Add Project</button>
      </form>
    </React.Fragment>
  );
};

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

export default ProjectNewForm;
