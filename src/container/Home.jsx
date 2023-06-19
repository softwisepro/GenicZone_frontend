import React, { useState, useEffect, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Post from './Post';
import defaulProfile from '../assets/default_profile.png';
import SessionExpired from '../components/SessionExpired';
import EditProfile from '../components/EditProfile';
import Preloader from '../components/Preloader'

const Home = ({ user, passUser, setOpenModel, openModel }) => {

  const scrollRef = useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const navigate = useNavigate()

  const profileImage = `${user?.profile_image}`

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])

  if (!user) {
    return (
      <div className='p-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/expired_session' element={<SessionExpired />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className='flex bg-slate-50 md:flex-row flex-col h-screen transition-height ease-out duration-300'>
      <div className='hidden md:flex h-screen flex-initial '>
        <Sidebar user={user && user} passUser={passUser} setOpenModel={setOpenModel} openModel={openModel} />
      </div>
      <div className='flex md:hidden flex-row z-30'>
        <div className='p-2 w-full flex justify-between items-center'>

          <Link to={'/'} className='flex w-full px-3 justify-start items-center'>
            <h1 className='font-semibold font-sans text-2xl italic'>GenicZone</h1>
          </Link>

          <div className='flex justify-center items-center'>
            <div className='border rounded-full w-8 h-8 overflow-hidden'>
              <img
                src={`${user?.profile_image !== null ? profileImage : defaulProfile}`}
                alt={user?.username}
                className='cursor-pointer w-full h-full object-cover'
                onClick={() =>
                  setToggleSidebar(true)} />
            </div>
          </div>

        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className='cursor-pointer z-10 bg-white rounded-full p-1' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} passUser={passUser} setOpenModel={setOpenModel} openModel={openModel} />
          </div>
        )}
      </div>

      <div className='p-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Preloader>
          <Routes>
            <Route path='/*' element={<Post user={user && user} />} />
            <Route path='/profile/:username' element={<UserProfile user={user && user} />} />
            <Route path='/profile/edit/:username' element={<EditProfile user={user && user} passUser={passUser} />} />
          </Routes>
        </Preloader>
      </div>
    </div>
  )
}

export default Home