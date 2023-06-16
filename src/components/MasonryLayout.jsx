import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const MasonryLayout = ({ post }) => {

  const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 6,
    1200: 5,
    1000: 4,
    500: 3,
  }

  return (
    <Masonry className='flex animate' breakpointCols={breakpointObj}>

      {post?.map((post) => (

        <Pin
          key={post.id}
          post={post}
          className='w-max'
        />

      ))}

    </Masonry>
  )
}

export default MasonryLayout