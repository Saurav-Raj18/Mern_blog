// Navbar.js
import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa'
import {useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Header = () => {
    const path=useLocation().pathname;
    const currentUser=useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {theme}=useSelector((state)=>state.theme);

    const handleSignout=async()=>{
        try {
            const res=await axios.post('http://localhost:4000/api/v1/user/signout',{ withCredentials: true});
            console.log(res)
            if(!res)console.log(res);
            else{
             dispatch(signOutSuccess());
             navigate("/");
            }
        } catch (error) {
          console.log("error in signout",error)
        }
     }

    //console.log(currentUser.currentUser.profilePicture);
    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center whitespace-nowrap text-small sm:text-xl font-semibold dark:text-white' >
                <span className='py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Bridge's</span>
                Blog
            </Link>

            <form>
                <TextInput type="text" placeholder='search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
            </form>

            <Button color='gray' className='w-12 h-10 lg:hidden' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-3 md:order-2 mr-1'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                    {theme==='light'?<FaSun/>:<FaMoon/>}
                </Button>

                {currentUser && currentUser.currentUser ?(
                    <Dropdown  arrowIcon={false} inline label={<Avatar rounded  alt='user' img={currentUser.currentUser.profilePicture} />}>
                       <Dropdown.Header>
                         <span className='block text-sm'>{currentUser.currentUser.username}</span>
                         <span className='block text-sm font-medium truncate '>{currentUser.currentUser.email}</span>
                       </Dropdown.Header>

                       <Link to={'/dashboard?tab=profile'}>
                         <Dropdown.Item>Profile</Dropdown.Item>
                       </Link>

                       <Dropdown.Divider/>
                       <Dropdown.Item  onClick={handleSignout}>Sign out</Dropdown.Item>
                         
                    </Dropdown>
                ):(
                    <Link to='/sign-up'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                      Sign In
                    </Button>
                  </Link>
        
                )}
                
                <Navbar.Toggle/>
            </div>

            <Navbar.Collapse>
                <Navbar.Link active={path==="/"}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path=="/about"}>
                    <Link to="/about" >
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path==="/projects"}>
                    <Link to="/projects">
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>

        </Navbar>
    );
};

export default Header;
