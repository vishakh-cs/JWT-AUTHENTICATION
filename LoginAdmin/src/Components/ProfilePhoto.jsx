import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UploadPhotoSuccess } from '../Redux/AuthSlice';

const ProfilePhoto = ({ photoUrl, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = useSelector((state) => state.auth.userId); 

  const dispatch = useDispatch()

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file provided');
        return;
      }

      const formData = new FormData();
      formData.append('profileImg', selectedFile);
      formData.append('userId', userId);

      const response = await axios.post("http://localhost:5000/profileImg", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data.photoUrl);
      const profileImage=response.data.photoUrl
      onUploadSuccess(profileImage)
    } catch (error) {
      console.error('Photo upload failed:', error.response.data);
    }
  };

  return (
    <div>
        <img
          src={photoUrl}
          alt="Profile"
          className="rounded-full w-36 h-36 mt-4 mx-auto"
        />
      
          <input
            type="file"
            onChange={handleFileChange}
            id="profileImg"
            name="profileImg"
            accept="image/*"
          />

          <button className='bg-red-500 text-white font-serif font-bold rounded-xl' onClick={handleUpload}>Upload Photo</button>
    </div>
  );
};

export default ProfilePhoto;
