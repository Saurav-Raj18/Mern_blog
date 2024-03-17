import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import OaAuth from '../components/OaAuth';

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/signup", {
        username: username,
        email: email,
        password: password
      })
     // console.log(res.data);
      if (res)navigate("/sign-in")
    }
    catch (error) {
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
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@flowbite.com" onChange={(e) => setemail(e.target.value)} required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" placeholder='password' onChange={(e) => setpassword(e.target.value)} required />
          </div>
          <Button type="submit">Submit</Button>
          <OaAuth/>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Already have an account, <Link to="/sign-in" className="text-blue-500">click here</Link>.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
