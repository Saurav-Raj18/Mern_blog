import { getDownloadURL, getStorage, uploadBytesResumable, } from 'firebase/storage';
import { Select, TextInput, FileInput, Button, Alert } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import app from '../firebase'
import { ref } from 'firebase/storage';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
  const [file, setfile] = useState(null);
  const [imageUploadProgress, setimageUploadProgress] = useState(null);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [formdata, setformdata] = useState({});
  const [publisError, setpublisError] = useState(null);
  const navigate = useNavigate();
  const {postId}=useParams();
 // console.log(postId);
  const {currentUser}=useSelector((state)=>state.user);
 // console.log(formdata);
  useEffect(()=>{
       try {
          const fetchPost=async()=>{
              const res=await axios.get(`http://localhost:4000/api/v1/post/getposts?postId=${postId}`)
              //console.log(res.data.posts);
              if(res){
                 setpublisError(null);
                 setformdata(res.data.posts[0]);
                 //console.log(formdata);
              }
          }

          fetchPost();
       } catch (error) {
          console.log(error.message)
       }
  },[postId])
  //uploading image functionality......
  const handleUploadImage = async () => {
    try {
      // console.log(file);
      if (!file) {
        setimageUploadError("Please Select an image");
        return;
      }
      setimageUploadError(null);
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setimageUploadProgress(progress.toFixed(0));

        },
        (error) => {
          setimageUploadError("Image upload failed")
          setimageUploadProgress(null);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setimageUploadProgress(null);
            setimageUploadError(null);
            setformdata({ ...formdata, image: downloadUrl });
          });
        }
      )

    } catch (error) {
      setimageUploadError("image upload failed")
      setimageUploadProgress(null);
      console.log("Error in uploading file", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log(formdata._id);
     // console.log(currentUser.currentUser._id);
      const res = await axios.put(`http://localhost:4000/api/v1/post/updatepost/${formdata._id}/${currentUser._id}`, formdata, { withCredentials: true });
     // console.log(res);
      if (res.status != 200) {
  
      }
      else {
        setpublisError(null);
        navigate(`/post/${res.data.slug}`)
      }
     // console.log(res);
    } catch (error) {
      console.log("Error in post", error);
    }
  }

  return (
    <div className=' p-3 min-h-screen max-w-3xl mx-auto'>
      <h1 className='text-center my-5 text-3xl font-semibold'>Update a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex sm:flex-row flex-col gap-4 justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => setformdata({ ...formdata, title: e.target.value })}  value={formdata.title}/>
          <Select className='' onChange={(e) => setformdata({ ...formdata, category: e.target.value })} value={formdata.category}>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' onChange={(e) => setfile(e.target.files[0])} />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage}>Upload Image</Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formdata && formdata.image && (
          <img src={formdata.image} alt='upload' className='w-full h-72 object-cover' />

        )}
        <ReactQuill value={formdata.content} required theme='snow' placeholder='write something...' className='h-72 mb-12' onChange={(value) => setformdata({ ...formdata, content: value })}></ReactQuill>
        <Button type='submit' gradientDuoTone='purpleToPink' >Update post</Button>
      </form>
    </div>
  )
}

export default UpdatePost