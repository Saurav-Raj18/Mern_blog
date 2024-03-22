import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
const Dashsidebar = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  }, [location.search])


  const handleSignout=async()=>{
    try {
        const res=await axios.post('http://localhost:4000/api/v1/user/signout',{ withCredentials: true});
        console.log(res)
        if(!res)console.log(res);
        else{
         dispatch(signOutSuccess());
         navigate("/")
        }
    } catch (error) {
      console.log("error in signout",error)
    }
 }


  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
         <Link to='/dashboard?tab=profile'>
          <Sidebar.Item href="#" active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark'>
            Profile
          </Sidebar.Item>   
          </Link>    
          <Sidebar.Item href="#" icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default Dashsidebar