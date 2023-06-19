import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './container/Home'
import Register from './components/auth/Register'
import { CreatePost } from './components'
import Preloader from './components/Preloader'

const App = () => {

  const [user, setUser] = useState(null)

  const [openCreateModel, setOpenCreateModel] = useState(false)

  const navigate = useNavigate();

  const userInfo = localStorage.getItem('profileObj') !== 'undefined' ? JSON.parse(localStorage.getItem('profileObj')) : localStorage.clear();

  useEffect(() => {

    if (!userInfo) {
      navigate('/login', { replace: true })
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/user/${userInfo?.username}`)
        .then(res => res.json())
        .then((data) => {
          setUser(data)
        })
    }

  }, [userInfo?.username])

  const profileObj = localStorage.getItem('profileObj') !== 'undefined' ? JSON.parse(localStorage.getItem('profileObj')) : localStorage.clear();

  useEffect(() => {
    if (profileObj) {
      setUser(profileObj)
    } else {
      localStorage.clear()
      navigate('login', { replace: true })
    }
  }, [])

  return (
    <Preloader>
      <Routes>
        <Route path='login' element={<Login user={user && user} passUser={setUser} />} />
        <Route path='register' element={<Register user={user && user} passUser={setUser} />} />
        <Route path='/*' element={<Home user={user && user} passUser={setUser} setOpenModel={setOpenCreateModel} openModel={openCreateModel} />} />
      </Routes>
      {openCreateModel ? (
        <div className='transition-all ease-out duration-200'>
          <CreatePost user={user && user} setCloseModel={setOpenCreateModel} openModel={openCreateModel} />
        </div>
      ) : ''}
    </Preloader>
  )
}

export default App