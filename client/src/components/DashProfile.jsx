import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useRef } from 'react'
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage'
import { ref } from 'firebase/storage';
import app from '../firebase'
import { signOutSuccess, updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imagefileUploadProgress, setimageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [userupdateSuccess, setuserupdateSuccess] = useState(false);
  const [formData, setformData] = useState({});
  const [showModal, setshowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(filePickerRef);
  //console.log(imagefileUploadProgress,imageFileUploadError);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setuserupdateSuccess(false)
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await axios.put(`http://localhost:4000/api/v1/user/update/${currentUser._id}`, formData, { withCredentials: true });
      console.log(res.data);
      if (!res) dispatch(updateFailure(res.message));
      else {
        dispatch(updateSuccess(res.data));
        setuserupdateSuccess("user updated successfully");
      }

    } catch (error) {
      dispatch(updateFailure(error));
      console.log("Error in updating user details", error);
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }
  //console.log(imageFile, imageFileUrl)
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile])

  const uploadImage = async () => {
    //console.log("uploadImage..")
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image (File must be less than 2MB)")
        setimageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setformData({ ...formData, profilePicture: downloadUrl });
        });
        setimageFileUploadProgress(null);
      }
    )
  }

  const handleDeleteUser = async () => {
    setshowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`http://localhost:4000/api/v1/user/delete/${currentUser._id}`, { withCredentials: true });
      console.log(res.data);
      if (!res) dispatch(deleteUserFailure(res.message));
      else {
        dispatch(deleteUserSuccess());
        navigate("/");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignout = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/v1/user/signout', { withCredentials: true });
      console.log(res)
      if (!res) console.log(res);
      else {
        dispatch(signOutSuccess());
        navigate("/")
      }
    } catch (error) {
      console.log("error in signout", error)
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='w-32 h-32 self-center  shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'></img>
        </div>

        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='text' id='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline> Update </Button>
        {
          currentUser && currentUser.isAdmin && (
            <Link to="/create-post">
            <Button type='button' gradientDuoTone='purpleToPink' className='w-full'>
                  create a post
            </Button>
            </Link>
          )
        }
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setshowModal(true)} className='cursor-pointer'>Delete Account</span>

        <span onClick={handleSignout} className='cursor-pointer'>Sign out</span>

      </div>
      {userupdateSuccess &&
        <Alert color='success' className='mt-5'>{userupdateSuccess}</Alert>
      }

      <Modal show={showModal} onClose={() => setshowModal(false)} popup size='md'>

        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500'>Are You sure to you want to delete your account</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>Yes,i am sure</Button>
              <Button color='gray' onClick={() => setshowModal(false)}>No,cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile
