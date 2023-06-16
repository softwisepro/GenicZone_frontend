import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ searchTerm, setSearchTerm}) => {

  return (
    <div className='w-full px-3 py-3 mb-3 flex justify-center items-center gap-2 overflow-x-auto'>
      <form className='w-full border rounded-full overflow-hidden'>
        <input
          type="text"
          name=""
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search'
          className='w-full rounded-full p-2 px-8 text-sm outline-none'
        />
      </form>
    </div>
  )
}

export default Navbar