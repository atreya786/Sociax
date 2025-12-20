import { useDispatch } from "react-redux";
import { toggleFollow } from "../../features/user/userSlice";

const ProfileHeader = ({ profile }) => {
  const dispatch = useDispatch();

  // Handle follow button click
  const handleFollow = () => {
    dispatch(toggleFollow(profile._id));
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{profile.email}</h2>
          <p className="text-sm text-gray-600">
            Followers {profile.followers?.length || 0}
          </p>
        </div>

        <button
          onClick={handleFollow}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          {profile.isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
