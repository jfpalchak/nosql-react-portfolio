import React from "react";

type ProfileProps = {
  onEditProfileButtonClick: () => void;
};

const Profile = (props: ProfileProps) => {
  return (
    <React.Fragment>
      <h1>Profile</h1>
      <h3>Name</h3>
      <h3>Bio</h3>
      <h3>Skills</h3>
      {/* <button onClick={props.onEditProfileButtonClick}>Edit Profile</button> */}
    </React.Fragment>
  );
};

export default Profile;
