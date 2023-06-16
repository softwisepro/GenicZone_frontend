import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
      <ColorRing
        colors={['#000']}
        width={40}
        height={40}
      />
    </div>
  )
}

export default Loading