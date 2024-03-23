import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiDocumentText, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

const Dashsidebar = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user)
  console.log(currentUser.currentUser)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  }, [location.search])


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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>

        <Sidebar.ItemGroup className='flex flex-col gap-1'>

          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.currentUser && currentUser.currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item as='div' active={tab === 'posts'} icon={HiDocumentText} labelColor='dark'>
                Posts
              </Sidebar.Item>
            </Link>
          )}


          <Sidebar.Item href="#" icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default Dashsidebar