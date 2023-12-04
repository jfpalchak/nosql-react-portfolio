import React from "react";

const ProjectNewForm = () => {
  return (
    <React.Fragment>
      <h1>New Project Form</h1>
      <form>
        <input type="text" name="title" placeholder="Profile Title" />
        <input type="text" name="link" placeholder="Profile Link" />
        <input type="text" name="description" placeholder="Profile Description" />
        <button type="submit">Add Project</button>
      </form>
    </React.Fragment>
  );
};

export default ProjectNewForm;
