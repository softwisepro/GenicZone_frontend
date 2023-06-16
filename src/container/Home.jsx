import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Post from './Post';
import logo from '../assets/logo.png';
import SessionExpired from '../components/SessionExpired';

const Home = () => {
  const [user, setUser] = useState();
  const scrollRef = useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const navigate = useNavigate();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {

    if (!userInfo) {
      navigate('/login', { replace: true })
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/user/${userInfo?.id}`)
        .then(res => res.json())
        .then((data) => {
          setUser(data)
        })
    }

  }, [userInfo?.id])


  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])

  if (!userInfo) {
    return (
      <div className='p-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/expired_session' element={<SessionExpired />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className='flex bg-slate-50 md:flex-row flex-col h-screen transition-height ease-out duration-75'>
      <div className='hidden md:flex h-screen flex-initial '>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex justify-between items-center'>

          <Link to={'/'} className='flex w-full px-3 justify-start items-center'>
            <h1 className='font-semibold font-sans text-2xl italic'>GenicZone</h1>
          </Link>

          <div className='flex justify-center items-center'>
            <div className='border rounded-full w-8 h-8 overflow-hidden'>
              <img
                src={`${process.env.REACT_APP_API_URL}${userInfo?.profile_image}`}
                alt={userInfo?.username}
                className='cursor-pointer w-full h-full object-cover'
                onClick={() => setToggleSidebar(true)}
              />
            </div>
          </div>

        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className='cursor-pointer z-10 bg-white rounded-full p-1' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className='p-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/*' element={<Post />} />
          <Route path='/user-profile' user={user && user} element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home