// ProfileSection.jsx
import { useState } from 'react';
import axios from 'axios';

const ProfilePhoto = ({ photoUrl, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
  
      const response = await axios.post(
        'http://localhost:5000/profileImg',
        
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.data.success) {
        onUploadSuccess(response.data.photoUrl);
      } else {
        console.error('Photo upload failed:', response.data.message);
        
      }
    } catch (error) {
      console.error('Photo upload failed:', error.message);
      
    }
  };
  

  return (
    <div>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Profile"
          className="rounded-full w-20 h-20 mt-4 mx-auto"
        />
      ) : (
        <>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Photo</button>
        </>
      )}
    </div>
  );
};

export default ProfilePhoto ;

