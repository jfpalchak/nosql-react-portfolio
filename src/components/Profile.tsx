import React from "react";

const Profile = (props: ProfileProps) => {
  const { profile } = props;
  return (
    <React.Fragment>
      <h1>Profile</h1>
      <h3>Name: {profile.name}</h3>
      <h3>Bio: {profile.bio}</h3>
      <h3>Skills: {profile.skills}</h3>
      <button onClick={props.onEditProfileButtonClick}>Edit Profile</button>
    </React.Fragment>
  );
};

// ############
// #  TYPES
// ############

type ProfileProps = {
  onEditProfileButtonClick: () => void;
  profile: IProfile;
};

interface IProfile {
  name: string;
  bio: string;
  skills: string;
}

export default Profile;
