// Home.jsx
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Logout, UploadPhotoSuccess } from '../Redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto from '../Components/ProfilePhoto';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.userName);
  const email = useSelector((state) => state.auth.email);
  const photoUrl = useSelector((state) => state.auth.photoUrl);

  const handleLogout = () => {
    dispatch(Logout());
    navigate('/');
  };

  const handleUploadSuccess = (newPhotoUrl) => {
    dispatch(UploadPhotoSuccess(newPhotoUrl));
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 to-purple-600">
      <div className="bg-white p-8 shadow-md rounded-md w-96 text-center">
        <ProfilePhoto 
          photoUrl={photoUrl}
          onUploadSuccess={handleUploadSuccess}
        />

        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome, {userName}!</h2>
        <h4 className="text-xl text-red-600 font-medium">{email}</h4>
        <p className="text-gray-600">Explore and enjoy your personalized space.</p>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
