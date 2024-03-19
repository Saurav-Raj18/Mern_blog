import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Dashsidebar from '../components/Dashsidebar'
import DashProfile from '../components/DashProfile'
const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')

  //console.log(location)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
    //console.log(tabFromUrl)
  }, [location.search])

  return (
    <div className='min-h-screen flex md:flex-row flex-col'>
      {/*sidebar*/}
      <div className='md:w-56'>
        <Dashsidebar />
      </div>

      {/*profile*/}
      {tab === 'profile' &&
          <DashProfile/>
      }

    </div>
  )
}

export default Dashboard