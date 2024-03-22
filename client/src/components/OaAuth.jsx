import React from 'react'
import { Button } from 'flowbite-react';
import {AiFillGoogleCircle} from 'react-icons/ai'
import app from '../firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
const OaAuth = () => {
  const auth=getAuth(app);
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const handleGoogleClick=async()=>{
      const provider=new GoogleAuthProvider()
      provider.setCustomParameters({prompt:'select_account'})
      try {
         const resultsFromGoogle=await signInWithPopup(auth,provider)
        // console.log(resultsFromGoogle.user)
         const response=await axios.post('http://localhost:4000/api/v1/auth/google',{
            name:resultsFromGoogle.user.displayName,
            email:resultsFromGoogle.user.email,
            googlePhotoUrl:resultsFromGoogle.user.photoURL,
         },{withCredentials:true})
        // console.log(response)
         if(response){
           dispatch(signInSuccess(response.data))
           navigate('/')
         }
      } catch (error) {
         console.log(error)
      }
  }
  return (
    <>
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
     <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
     Continue with Google
    </Button>
    </>
  )
}

export default OaAuth