import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { handle } = useParams();
  return <div>User Profile for @{handle}</div>;
}

export default UserProfile;
