import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const Comment = ({comment}) => {
    const [user,setuser]=useState({});
    //console.log(user)
    useEffect(()=>{
         const getUser=async()=>{
             try {
                const res=await axios.get(`http://localhost:4000/api/v1/user/${comment.userId}`);
                if(res.data){
                    setuser(res.data);
                }
             } catch (error) {
                
             }
         }
         getUser();
    },[comment])
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
           <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture}/>
        </div>
        <div className='flex-1'>
        <div className='flex items-center mb-1'>
           <span className='font-bold mr-1 text-xs truncated'>{user?`@${user.username}`:'anonymous user'}</span>
           <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment