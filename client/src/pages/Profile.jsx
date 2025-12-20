import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React from "react";

import { fetchUserProfile } from "../features/user/userSlice";
import ProfileHeader from "../components/profile/ProfileHeader";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { profile, isLoading } = useSelector((state) => state.user);

  // Load profile on page load
  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, [dispatch, id]);

  if (isLoading || !profile) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <ProfileHeader profile={profile} />
    </div>
  );
};

export default Profile;
