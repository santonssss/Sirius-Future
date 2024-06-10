import React from "react";

type UserProfileProps = {
  name: string;
  description?: string;
  imageUrl: string;
};

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  description,
  imageUrl,
}) => {
  return (
    <div className="users">
      <img src={imageUrl} alt="user" />
      <div className="users__title">
        <span>{name}</span>
        {description && <span>{description}</span>}
      </div>
    </div>
  );
};
export {};
export default UserProfile;
