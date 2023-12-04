import React from "react";

const ProjectEditForm = () => {
  return (
    <React.Fragment>
      <h1>Project Edit Form</h1>
      <form>
        <input type="text" name="title" placeholder="Profile Title" />
        <input type="text" name="link" placeholder="Profile Link" />
        <input type="text" name="description" placeholder="Profile Description" />
        <button type="submit">Update Project</button>
      </form>
    </React.Fragment>
  );
};

export default ProjectEditForm;
