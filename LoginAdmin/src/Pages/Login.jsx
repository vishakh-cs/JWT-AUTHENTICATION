import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginSuccess,LoginFail } from "../Redux/AuthSlice";
import { useDispatch } from "react-redux";


const Login = () => {

  const dispatch = useDispatch()

  const Navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [password,setpassword] = useState('')


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogged = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (userLogged.data.success) {
        dispatch(
          LoginSuccess({
            userName: userLogged.data.userName,
            email: userLogged.data.email,
          })
        );
        console.log('Login successful');

        Navigate('/home')

      } else {
        alert('Invalid Credentials! Please check your Email or Password and Try Again')
        dispatch(LoginFail())
        console.error('Login failed:', userLogged.data.message);
      }

    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  

  const goToSignUp = () => {
    Navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <input
              type="text" onChange={(e)=>setEmail(e.target.value)}
              id="username" placeholder="Email"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password" onChange={(e)=>setpassword(e.target.value)}
              id="password" placeholder="Password"
              className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button onClick={handleLogin}
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
          <h2>
            Not Have an Account{' '}
            <span
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={goToSignUp}
            >
              SignUp
            </span>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Login;
