import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const PostDetails = () => {

  const [postDetail, setPostDetail] = useState()

  const slug = useParams()

  const current_user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/feed/${slug.slug}`)
        .then(res => res.json())
        .then((data) => {
          setPostDetail(data)
        })
    } catch (err) {

    }
  }, [slug.slug])


  return (
    <div className='w-full flex flex-col'>
      <div className='grid grid-col-1 md:grid-cols-2 gap-5 md:gap-10 h-[500px]'>
        <div className='flex justify-center items-center h-[500px]'>
          <img
            src={`${process.env.REACT_APP_API_URL}${postDetail?.image}`}
            alt={postDetail?.title}
            className='w-auto max-h-full'
          />
        </div>
        <div className='w-full'>
          <div className='w-full flex gap-2 justify-between py-2 md:py-7 px-5 items-center'>

            <Link className='flex justify-center items-center gap-2'>
              <div className='w-16 h-16 flex rounded-full border overflow-hidden'>
                <img
                  src={`${process.env.REACT_APP_API_URL}${ postDetail?.postedByProfile?.profile_image }`}
                  alt={postDetail?.postedByProfile?.username}
                  className='w-full h-full'
                />
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div className='w-full flex gap-2 text-xl font-semibold justify-center items-center'>
                  <h1>{postDetail?.postedByProfile?.first_name}</h1>
                  <h1>{postDetail?.postedByProfile?.last_name}</h1>
                </div>
                <div>
                  <h4 className='text-sm font-light'>@{postDetail?.postedByProfile?.username}</h4>
                </div>
              </div>
            </Link>

            <div className='flex justify-end items-center'>
              {postDetail?.postedByProfile?.id === current_user.id ? '' : (
                <button
                  className='bg-blue-400 hover:bg-blue-300 transition-colors ease-linear duration-150  px-2 py-1 rounded text-blue-700'
                >
                  Follow
                </button>
              )}
            </div>
          </div>

          <div className='w-full h-full'>
            <div className='px-10 text-justify text-sm'>
              <p>{ postDetail?.content }</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PostDetails