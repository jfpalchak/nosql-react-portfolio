import React from "react";

const Project = (props: ProjectProps) => {
  return (
    <React.Fragment>
      <h1>Project</h1>
      <p>Title: {props.title}</p>
      <p>Link: {props.link}</p>
      <p>Description: {props.description}</p>
    </React.Fragment>
  );
};

type ProjectProps = {
  title: string;
  link: string;
  description: string;
  id?: string;
};

export default Project;
