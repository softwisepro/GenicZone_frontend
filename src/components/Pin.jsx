import React, { useState } from 'react';
import { RiHeartLine, RiMessageFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import PostDetails from './PostDetails';


const Pin = ({ post, post: { id, title, image, slug, about, user } }) => {

  const navigate = useNavigate()

  const [openPost, setOpenPost] = useState(false)

  const closePostDetails = () => setOpenPost(false)

  const openPostDetails = (e) => {
    e.preventDefault()
    setOpenPost(true)
  }

  return (
    <div className='p-[0.02rem] md:p-1'>
      <div
        onClick={() => navigate(`/post/${slug}`)}
        className='relative cursor-pointer group overflow-hidden rounded border'
      >
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