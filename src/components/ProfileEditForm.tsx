import React from "react";

const ProfileEditForm = () => {
  return (
    <React.Fragment>
      <h3>Edit Profile Form - Placeholder</h3>
      <form>
        <input type="text" name="name" placeholder="Profile Name." />
        <input type="text" name="bio" placeholder="Profile Bio." />
        <input type="text" name="skills" placeholder="Profile Skills." />
        <button type="submit">Edit Profile</button>
      </form>
    </React.Fragment>
  );
};

export default ProfileEditForm;
