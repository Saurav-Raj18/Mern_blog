import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import axios from 'axios';
import OaAuth from '../components/OaAuth';

const SignIn = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user)
 // console.log(error)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post("http://localhost:4000/api/v1/user/signin", {
        username,
        password
      })
      // console.log(res);
      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
    }
    catch (error) {
      if (error.response.data.success == false) {
        dispatch(signInFailure(error.response.data.message));
      }
       console.log("Error in sending data", error);
    }
  }

  return (
    <div className="flex items-center mt-20 justify-center min-h-[585px]">
      <div className="max-w-md w-full mx-auto">

        <form className="flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-white" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput id="username" type="text" placeholder="Your username" onChange={(e) => setusername(e.target.value)} required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)} required />
          </div>
          <Button type="submit">Submit</Button>
          <OaAuth/>
        </form>
            
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account ? <Link to="/sign-up" className="text-blue-500">sign up</Link>.</p>
        </div>
        {
          error && (
            <Alert className="mt-5" color='failure'>
              {error}
            </Alert>
          )
        }
      </div>
    </div>
  );
}

export default SignIn;
