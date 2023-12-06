import React from "react";

// Use the defined type for the props
const ReusableForm = (props: ReusableFormProps) => {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input type="text" name="title" placeholder="Profile Title" />
        <input type="text" name="link" placeholder="Profile Link" />
        <input type="text" name="description" placeholder="Profile Description" />
        <button type="submit">{props.buttonText}</button>
        <button type="button" onClick={props.backClickHandler}>
          Back
        </button>
      </form>
    </React.Fragment>
  );
};

// ############
// #  TYPES
// ############

// Define the type for the props
interface ReusableFormProps {
  formSubmissionHandler: (event: React.FormEvent<CustomForm>) => void;
  backClickHandler: () => void;
  buttonText: string;
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

export default ReusableForm;
