// Navbar.js
import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa'
const Header = () => {
    const path=useLocation().pathname;
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

            <div className='flex gap-3 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
                </Button>
                <Link to="/sign-up">
                    <Button gradientDuoTone='purpleToBlue' >
                        Sign In
                    </Button>
                </Link>
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
