import axios from 'axios'
import React, { useEffect, useState } from 'react'
import defaulProfile from '../assets/default_profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { RiAtLine, RiCamera2Line, RiGalleryLine, RiGridLine, RiHashtag, RiPencilFill } from 'react-icons/ri'
import UserPosts from './UserPosts'
import Preloader from './Preloader'

const UserProfile = ({ user }) => {

  const [posts, setPosts] = useState(null)
  const [num_posts, setNum_posts] = useState(0)

  const [openPosts, setOpenPosts] = useState(false)
  const [openTags, setOpenTags] = useState(false)

  const navigate = useNavigate()

  const handleOpenClosePost = () => {
    if (!openPosts) {
      setOpenTags(false)
      setOpenPosts(true)
    }
  }

  const handleOpenCloseTags = () => {
    if (!openTags) {
      setOpenPosts(false)
      setOpenTags(true)
    }
  }

  const profileObj = localStorage.getItem('profileObj') !== 'undefined' ? JSON.parse(localStorage.getItem('profileObj')) : localStorage.clear()

  useEffect(() => {

    if (profileObj) {
      axios.get(`${process.env.REACT_APP_API_URL}/user_posts/${user?.user?.id}`)
        .then(res => {
          if (res.data.success) {
            setPosts(res.data.success)
            setNum_posts(res.data.num_posts)
          } else if (res.data.NoPost) {
            setPosts(null)
          }
        })
    }

  }, [num_posts])

  useEffect(() => {
    setOpenPosts(true)
    setOpenTags(false)
  }, [])


  const NOPOST = (
    <>
      <div> <RiCamera2Line fontSize={50} /></div>
      <p className='max-w-xs text-center'>When you share Photos they will appear on your profile</p>
    </>
  )

  const profileImage = `${user?.profile_image}`

  return (
    <Preloader>
      <div className='flex flex-col w-full relative'>
        <div className=' absolute h-[150px] rounded-xl w-full bg-black/40 overflow-hidden'>
          <img src={profileImage} className={`w-full h-auto object-cover`} />
        </div>
        <div className='w-full h-full px-8 py-10 mt-5 z-10'>
          <div className='grid grid-row justify-center md:grid-cols-2 md:justify-between items-center gap-1 py-1'>

            <div className='flex md:block justify-center items-center'>
              <div className='rounded-full w-28 h-28 z-10 bg-white overflow-hidden border-2 shadow-lg flex justify-center items-center'>
                <img src={user?.profile_image !== null ? profileImage : defaulProfile} alt={user?.username} className='w-full h-full object-cover bg-white' />
              </div>
            </div>

            <div className='flex justify-end items-end'>
              <div className='bg-slate-50 md:shadow-lg px-4 py-4 flex justify-end items-center gap-5 rounded-t-lg'>
                <div className='flex flex-col justify-center items-center'>
                  <span className='text-xl'>{num_posts}</span>
                  <span className='text-xs font-semibold'>Posts</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <span className='text-xl'>200k</span>
                  <span className='text-xs font-semibold'>Following</span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <span className='text-xl'>300</span>
                  <span className='text-xs font-semibold'>Followers</span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex justify-start items-center text-start text-xs py-1'>
            <p className='max-w-sm'>{user?.bio ? user?.bio : ''}</p>
          </div>

          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-1 justify-between items-center mt-4'>
            <div className='flex justify-center md:justify-start items-center cursor-default gap-3 p-2 px-1'>
              <div className='flex gap-2 text-xl'>
                <h3 className='font-bold'>{user?.first_name ? user?.first_name : (<button className='text-sm font-light text-blue-400' onClick={() => navigate(`/profile/edit/${user?.username}`)} >Add Your Name</button>)}</h3>
                <h3 className='font-bold'>{user?.first_name ? user?.last_name : ''}</h3>
              </div>
              <div className='flex justify-center items-center gap-[0.1rem] hover:border-b'>
                <span className='h-full'><RiAtLine fontSize={15} /></span>
                <span className='text-sm lowercase h-full'>{user?.username}</span>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <button
                onClick={() => navigate(`/profile/edit/${user?.username}`)}
                className='bg-slate-300 hover:bg-slate-400 transition-colors duration-150 ease-linear p-2 rounded text-sm w-full flex justify-center items-center gap-3'
              >
                <span><RiPencilFill fontSize={20} /></span>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col relative h-full'>
          <div className='flex flex-col'>
            <div className='w-full border-b flex justify-between items-center'>

              <div
                onClick={handleOpenClosePost}
                className={`flex justify-center items-center w-1/2 ${openPosts ? 'border-b border-b-gray-900' : ''} p-1  cursor-pointer`}
              >
                <RiGridLine fontSize={30} />
              </div>
              <div
                onClick={handleOpenCloseTags}
                className={`flex justify-center items-center w-1/2 p-1 animate-in  cursor-pointer ${openTags ? 'border-b border-b-gray-900 animate-in' : ''}`}
              >
                <RiGalleryLine fontSize={30} />
              </div>
            </div>

            <div className='relative py-2 md:p-5'>

              <Preloader>
                {openPosts && (
                  <div style={{ height: 300 }} className='flex w-full'>
                    <div className={`w-full flex flex-col gap-5 ${posts === null ? 'justify-center items-center' : ''}`}>
                      {posts === null ? NOPOST : <UserPosts user={user && user} posts={posts} />}
                    </div>
                  </div>
                )}


                {openTags && (
                  <div style={{ height: 300 }} className='flex w-full h-full'>
                    <div className={`w-full flex flex-col gap-5 ${posts === null ? 'justify-center items-center' : ''}`}>
                      <div><RiHashtag fontSize={50} /></div>
                      <p className='max-w-xs text-center'>When someone tags you the Tagged Photo will appear on your profile</p>
                    </div>
                  </div>
                )}
              </Preloader>

            </div>
          </div>
        </div>
      </div>
    </Preloader>
  )
}

export default UserProfile