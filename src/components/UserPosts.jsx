import React from 'react'
import Masonry from 'react-masonry-css'
import { useNavigate } from 'react-router-dom'

const UserPosts = ({ posts, user, posts: { title, slug, image } }) => {

  const navigate = useNavigate()

  const breakpointObj = {
    default: 4,
    3000: 4,
    2000: 5,
    1200: 4,
    1000: 3,
    500: 3,
  }

  return (
    <>
      <Masonry className='flex animate' breakpointCols={breakpointObj}>
        {posts.map((post) => (
          <div key={slug} className='p-[0.02rem] md:p-1'>
            <div
              onClick={() => navigate(`/post/${post.slug}`)}
              className='relative cursor-pointer group overflow-hidden rounded border'
            >
              <img
                className='w-full'
                alt={post.title}
                src={`${post.image}`}
              />
            </div>
          </div>
        ))}
      </Masonry>
    </>
  )
}

export default UserPosts