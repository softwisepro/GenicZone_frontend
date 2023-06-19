import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'
import Preloader from './Preloader'

const MasonryLayout = ({ post }) => {

  const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 6,
    1200: 5,
    1000: 4,
    500: 2,
  }

  return (
    <Masonry className='flex animate' breakpointCols={breakpointObj}>

      <Preloader>
        {post?.map((post) => (

          <Pin
            key={post.id}
            post={post}
            className='w-max'
          />

        ))}
      </Preloader>

    </Masonry>
  )
}

export default MasonryLayout