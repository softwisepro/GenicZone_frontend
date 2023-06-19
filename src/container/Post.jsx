import React, { useState } from 'react';

import { PostDetails, Feed, Navbar, Search } from '../components'
import { Route, Routes } from 'react-router-dom';

const Post = ({ user }) => {

  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className='w-full px-0 md:px-1'>
       <div className='bg-gray-50'>
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
       </div>
       <div className='h-full w-full'>
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/hashtags/:hashtag_name' element={<Feed />} />
            <Route path='/post/:slug' element={<PostDetails user={user && user} />} />
            <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Routes>
       </div>
    </div>
  )
}

export default Post