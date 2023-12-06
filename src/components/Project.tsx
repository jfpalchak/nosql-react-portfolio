import React from "react";

const Project = (props: ProjectProps) => {
  const { onClickingDiv } = props;
  return (
    <React.Fragment>
      <div onClick={() => onClickingDiv(props.id!)}>
        <h1>Project</h1>
        <p>Title: {props.title}</p>
        <p>Link: {props.link}</p>
        <p>Description: {props.description}</p>
      </div>
    </React.Fragment>
  );
};

type ProjectProps = {
  title: string;
  link: string;
  description: string;
  id?: string;
  onClickingDiv: (id: string) => void;
};

export default Project;
