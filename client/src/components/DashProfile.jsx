import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useRef } from 'react'
import {getDownloadURL, getStorage, uploadBytesResumable} from 'firebase/storage'
import { ref } from 'firebase/storage';
import app from '../firebase'
import { updateFailure,updateStart,updateSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imagefileUploadProgress,setimageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [userupdateSuccess,setuserupdateSuccess] = useState(false);
  const [formData,setformData] = useState({});
  const filePickerRef=useRef();
  const dispatch=useDispatch();
  //console.log(filePickerRef);
  //console.log(imagefileUploadProgress,imageFileUploadError);
  const handleChange=(e)=>{
        setformData({...formData,[e.target.id]:e.target.value});
  }
 const handleSubmit=async(e)=>{
    e.preventDefault();
    setuserupdateSuccess(false)
    if(Object.keys(formData).length=== 0){
       return ;
    }
    try {
      dispatch(updateStart());
      const res = await axios.put(`http://localhost:4000/api/v1/user/update/${currentUser._id}`, formData,{withCredentials:true});
      console.log(res.data);
      if(!res)dispatch(updateFailure(res.message));
      else{
            dispatch(updateSuccess(res.data));
            setuserupdateSuccess("user updated successfully");
      }

    } catch (error) {
      dispatch(updateFailure(error));
      console.log("Error in updating user details",error);
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
  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile])
  
  const uploadImage= async()=>{
      //console.log("uploadImage..")
      const storage=getStorage(app);
      const fileName=new Date().getTime()+imageFile.name;
      const storageRef=ref(storage,fileName);
      const uploadTask=uploadBytesResumable(storageRef,imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setimageFileUploadProgress(progress.toFixed(0));
        },
        (error)=>{
          setImageFileUploadError("Could not upload image (File must be less than 2MB)")
          setimageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        ()=>{
           getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                setImageFileUrl(downloadUrl);
                setformData({...formData,profilePicture:downloadUrl});
           });
           setimageFileUploadProgress(null);
        }
      )
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className='w-32 h-32 self-center  shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'></img>
        </div>

        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}  onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='text' id='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline> Update </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign out</span>
      </div>
      {userupdateSuccess && 
         <Alert color='success' className='mt-5'>{userupdateSuccess}</Alert>
      }
    </div>
  )
}

export default DashProfile