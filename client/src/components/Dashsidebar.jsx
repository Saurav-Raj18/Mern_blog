import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Link, useLocation} from 'react-router-dom';
const Dashsidebar = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  }, [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
         <Link to='/dashboard?tab=profile'>
          <Sidebar.Item href="#" active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark'>
            Profile
          </Sidebar.Item>   
          </Link>    
          <Sidebar.Item href="#" icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default Dashsidebar