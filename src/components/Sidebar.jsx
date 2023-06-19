import React from 'react';
import { NavLink, Link, useResolvedPath, useNavigate } from 'react-router-dom';
import { RiAddBoxLine, RiEarthLine, RiLogoutBoxLine, RiMessage2Line, RiNotificationLine } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';

const CustomeLink = ({ to, label, className = '', icon, closeToggle }) => {
  const router = useResolvedPath()
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <NavLink
      to={to}
      onClick={handleCloseSidebar}
      className={`${className} text-sm group p-2 transition-all ease-linear duration-100 ${router.pathname === to ? 'font-bold' : ''}`}
    >
      <div className='relative flex gap-5 justify-start items-center'>
        <span className={`absolute !text-2xl transition-all ease-out duration-100 ${router.pathname === to ? '' : 'group-hover:!text-[1.6rem]'} `}>{icon}</span>
        <span className='pl-10'>{label}</span>
      </div>
    </NavLink>
  )
}



const Sidebar = ({ user, closeToggle, passUser, setOpenModel, openModel }) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    if (user !== null) {
      axios.post(`${process.env.REACT_APP_API_URL}/logout`)
        .then(res => {
          if (res.data.success) {
            passUser(null)
            const profileObj = localStorage.getItem('profileObj')
            if (profileObj) {
              localStorage.clear()
            }
            navigate('/login', { replace: true })

          } else {
            console.log(res.error)
          }
        })
    }
  }

  const handleModel = () => {
    if (openModel === false) {
      setOpenModel(true)
    }
  }

  return (
    <div
      className='flex flex-col overflow-x-hidden justify-between bg-white h-full min-w-210 hide-scrollbar'
    >
      <div className='flex flex-col w-full justify-center items-center my-7'>
        <h1 className='font-semibold text-2xl italic'>GenicZone</h1>
      </div>
      <div className='w-full h-full mt-10 px-8 flex flex-col gap-5'>
        <CustomeLink to={'/'} label={'Exprole'} icon={<RiEarthLine />} closeToggle={closeToggle} />
        <CustomeLink to={'/messages'} label={'Messages'} icon={<RiMessage2Line />} closeToggle={closeToggle} />
        <CustomeLink to={'/nofifications'} label={'Notifications'} icon={<RiNotificationLine />} closeToggle={closeToggle} />

        <NavLink
          onClick={handleModel}
          className={`text-sm group p-2 transition-all ease-linear duration-100`}
        >
          <div className='relative flex gap-5 justify-start items-center'>
            <span className={`absolute !text-2xl transition-all ease-out duration-100 `}><RiAddBoxLine /></span>
            <span className='pl-10'>Create Post</span>
          </div>
        </NavLink>

        <CustomeLink to={`/profile/${user?.username}`} label={'Profile'} icon={<AiOutlineUser />} closeToggle={closeToggle} />
      </div>
      <div className='bottom-0 w-full shadow-inner text-sm font-semibold flex justify-center items-center'>
        <button
          className='bg-slate-200 p-3 w-full flex justify-center items-center gap-2'
          onClick={handleLogout}
        >
          <RiLogoutBoxLine fontSize={20} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar