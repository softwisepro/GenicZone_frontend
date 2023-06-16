import React, { useState } from 'react';
import { RiHeartLine, RiMessageFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import PostDetails from './PostDetails';


const Pin = ({post,  post: { id, title, image, slug, about, user } }) => {

  const navigate = useNavigate()

  const [openPost, setOpenPost] = useState(false)

  const closePostDetails =() => setOpenPost(false)

  const openPostDetails =(e) => {
    e.preventDefault()
    setOpenPost(true)
  }

  return (
    <div className='p-[0.02rem] md:p-1'>
      <div
        onClick={() => navigate(`/post/${slug}`)}
        className='relative cursor-pointer group overflow-hidden rounded border'
      >
        {/* <div
          className='absolute top-0 p-1 h-full transition-all px-16 ease-linear duration-300 w-full flex justify-center items-center'
        >
          <div className='absolute rounded-full px-5 flex bottom-0 justify-center items-center m-2 gap-5 bg-black/50 p-2  text-white'>
            <div className='flex font-bold gap-1 justify-center items-center'>
              <RiHeartLine />
              <span className='text-xs'>10</span>
            </div>
            <div className='flex font-bold gap-1 justify-center items-center'>
              <RiMessageFill />
              <span className='text-xs'>6</span>
            </div>
          </div>
        </div> */}
        <img
          className='w-full'
          alt={title}
          src={`${process.env.REACT_APP_API_URL}${image}`}
        />
      </div>
    </div>
  )
}

export default Pin