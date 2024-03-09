import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

const FooterCmp = () => {
  return (
    <Footer className='bg-gray-200 py-4 mt-7'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-2xl font-bold mb-4 md:mb-0 md:text-xl' gradientDuoTone='purpleToBlue'>Saurav's Blog</div>
          <div className='flex flex-wrap justify-center md:justify-end gap-10'>
            <div className='mb-4 md:mb-0'>
              <div className='font-semibold'>ABOUT</div>
              <div>100 Js projects</div>
              <div>Saurav Blog</div>
            </div>
            <div className='mb-4 md:mb-0'>
              <div className='font-semibold'>FOLLOW US</div>
              <div>
                <Link to='https://github.com/yourgithubusername' target='_blank' className='text-blue-600 hover:underline'>GitHub</Link>
              </div>
              <div>
                <Link to='https://www.facebook.com/yourfacebookusername' target='_blank' className='text-blue-600 hover:underline'>Facebook</Link>
              </div>
              <div>
                <Link to='https://www.instagram.com/yourinstagramusername' target='_blank' className='text-blue-600 hover:underline'>Instagram</Link>
              </div>
            </div>
            <div>
              <div className='font-semibold'>LEGAL</div>
              <div>Privacy Policy</div>
              <div>Terms & conditions</div>
            </div>
          </div>
        </div>
        <div>
        <div className='text-center text-gray-600 mt-4'>&copy; 2024   Saurav's Blog</div>
        <div className='flex justify-center mt-4'>
          <Link to="https://github.com/yourgithubusername"><FaGithub className='text-blue-600 hover:underline mr-4 text-2xl' /></Link>
          <Link to="https://github.com/yourgithubusername"><FaFacebook className='text-blue-600 hover:underline mr-4 text-2xl' /></Link>
          <Link to="https://github.com/yourgithubusername"><FaInstagram className='text-blue-600 hover:underline text-2xl' /></Link>
        </div>
      </div>
      </div>
     
    </Footer>
  );
}

export default FooterCmp;
