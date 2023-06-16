import React from 'react';
import { NavLink, Link, useResolvedPath } from 'react-router-dom';
import { RiAddBoxLine, RiEarthLine, RiHome8Line, RiMessage2Line, RiNotificationLine } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai';
import logo from '../assets/logo.png'

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
        <span className={`absolute !text-2xl transition-all ease-out duration-100 ${router.pathname === to ? '' : 'group-hover:!text-[1.6rem]' } `}>{ icon }</span>
        <span className='pl-10'>{ label }</span>
      </div>
    </NavLink>
  )
}


const Sidebar = ({ user, closeToggle }) => {

  return (
    <div
      className='flex flex-col overflow-x-hidden justify-between bg-white h-full min-w-210 hide-scrollbar'
    >
      <div className='flex flex-col w-full justify-center items-center my-7'>
        <h1 className='font-semibold text-2xl italic'>GenicZone</h1>
      </div>
      <div className='w-full h-full mt-10 px-8 flex flex-col gap-5'>
        <CustomeLink to={'/'} label={'Exprole'} icon={<RiEarthLine />}  closeToggle={closeToggle}/>
        <CustomeLink to={'/messages'} label={'Messages'} icon={<RiMessage2Line />} closeToggle={closeToggle} />
        <CustomeLink to={'/nofifications'} label={'Notifications'} icon={<RiNotificationLine />} closeToggle={closeToggle} />
        <CustomeLink to={'/create'} label={'Create'} icon={<RiAddBoxLine />} closeToggle={closeToggle} />
        <CustomeLink to={'/profile'} label={'Profile'} icon={<AiOutlineUser />} closeToggle={closeToggle} />
      </div>
    </div>
  )
}

export default Sidebar