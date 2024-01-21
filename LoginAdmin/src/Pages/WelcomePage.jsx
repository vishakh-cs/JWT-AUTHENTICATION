// Home.jsx
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LoginSuccess, Logout, UploadPhotoSuccess, logoutUser } from '../Redux/AuthSlice';
import { useNavigate ,} from 'react-router-dom';
import ProfilePhoto from '../Components/ProfilePhoto';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.userName);
  const email = useSelector((state) => state.auth.email);
  const photoUrl = useSelector((state) => state.auth.profileImage);
  const token = useSelector((state)=>state.auth.token)
  console.log("photo",photoUrl);
  console.log("token",token);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const parsedAuthState = JSON.parse(storedAuthState);
      dispatch(LoginSuccess(parsedAuthState));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleUploadSuccess = (newPhotoUrl) => {
    dispatch(UploadPhotoSuccess({profileImage:newPhotoUrl}));
  };
  return (
    <div
    className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: 'url("https://i.pinimg.com/736x/58/bc/f0/58bcf033d8fc4ea996a61be7bd8163e1.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
      <div className="bg-white p-8 shadow-md rounded-md w-full text-center">
        <ProfilePhoto 
          photoUrl={photoUrl ? `http://localhost:5000/uploads/${photoUrl}` : null}
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
