import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/student/profile');
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {profile.name}</p>
      <p>ID: {profile.id}</p>
      <p>Year: {profile.year}</p>
      <p>Stream: {profile.stream}</p>
      {/* Add form to update profile details */}
    </div>
  );
};

export default Profile;
