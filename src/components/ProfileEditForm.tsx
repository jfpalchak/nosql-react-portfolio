import React from "react";

type FormEvent = React.FormEvent<HTMLFormElement>;

const ProfileEditForm = (props: object) => {
  const editProfile = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <h1>Edit Profile Form</h1>
      <form onSubmit={editProfile}>
        <input type="text" name="name" placeholder="Profile Name" />
        <br />
        <input type="text" name="bio" placeholder="Profile Bio" />
        <br />
        <input type="text" name="skills" placeholder="Profile Skills" />
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </React.Fragment>
  );
};

export default ProfileEditForm;
