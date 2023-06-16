import React, { useEffect, useState } from 'react'
import backgroundImage from '../assets/gallery-g9a7fbd4a2_1920.jpg'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [user, setUser] = useState()
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submitForm = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user/${username}`)
      .then(res => res.json())
      .then((data) => {
        if (data.error) {
          localStorage.clear()
          setError('Username is incorrect')
        } else {
          localStorage.getItem('user') === 'user' ? localStorage.clear() : localStorage.setItem('user', JSON.stringify(data))
          setUser(JSON.stringify(data))
        }
      })
  }



  const checkUser = () => {

    const existed_user = localStorage.getItem('user')

    if (existed_user) {
      navigate('/', { replace: true })
    } else {
      localStorage.clear()
    }
  }

  useEffect(() => {
    checkUser()
  }, [])


  if (user) {
    navigate('/', { replace: true })
  }


  return (
    <div className='w-full h-screen relative overflow-hidden flex justify-center items-center'>
      <img src={backgroundImage} className='w-full h-full object-cover' />
      <div className='absolute inset-0 w-full h-full bg-black/70 flex flex-col justify-center items-center'>
        <div>
          <h1 className='text-white italic text-xl md:text-3xl '>GenicZone</h1>
        </div>
        {error && (
          <div className='text-red-700 px-5 py-2 font-bold bg-white/40'>
            {error}
          </div>
        )}
        <div>
          <form onSubmit={(e) => {
            e.preventDefault()
            if (!user) {
              submitForm()
            }
          }} className='flex flex-col gap-2 p-2'>
            <input type="text"
              placeholder='Usename'
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='px-3 py-2 text-sm rounded'
            />
            <button
              className='bg-blue-300 text-blue-600 p-1 rounded text-sm'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login