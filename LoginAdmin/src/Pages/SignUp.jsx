import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [email,setEmail] = useState('')
  const [username,setUserName] = useState('')
  const [password,setpassword] = useState('')
  const [ConfirmPAssword,setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  console.log(email,username,password,ConfirmPAssword);



  const Navigate =useNavigate()

  const handleSignup= async(e)=>{
    e.preventDefault()
    if (password !== ConfirmPAssword) {
      setError("Password and Confirm Password do not match");
      return;
    }
  
    if (!email || !username || !password || !ConfirmPAssword) {
      setError("All fields are required");
      return;
    }
  
    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }
    try {
     
       // Check if the email already exists
       const checkEmailResponse = await axios.post('http://localhost:5000/checkEmail', { email });

       if (!checkEmailResponse.data.available) {
         setError('Email already exists. Please choose a different one.');
         return;
       }

      const response = await axios.post('http://localhost:5000/signup', {
        email,
        username,
        password,
      });

      if (response.data.success) {
       
        console.log('Signup successful');
        Navigate('/')
      } else {
        
        console.error('Signup failed:', response.data.message);
       
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
     
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <h4 className="text-xl mb-3 font-semibold">Create And Account</h4>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">

            <input 
              type="text" onChange={(e)=>setUserName(e.target.value)}
              id="username" name="userName" placeholder="Username"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">

            <input
              type="email" onChange={(e)=>setEmail(e.target.value)}
              id="email" placeholder="Email"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">

            <input
              type="password" onChange={(e)=>setpassword(e.target.value)}
              id="password" name="password" placeholder="Password"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">

            <input
              type="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)}
              id="confirmPassword" name="confirmPassword" placeholder="confirm Password"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit" onClick={handleSignup}
            className="w-full bg-purple-700 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp