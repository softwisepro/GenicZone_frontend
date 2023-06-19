import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from "react-loader-spinner";
import axios from 'axios';

const Login = ({ user, passUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const formData = { username, password }

  const submitForm = e => {
    
    e.preventDefault()

    setLoading(true)
    if (username === '' && password === '') {
      setError('Both field are required')
    } else if (!user) {

      try {
        axios.post(`${process.env.REACT_APP_API_URL}/login`, formData)
          .then(res => {

            if (res.data.error) {
              setPassword('')
              setError(res.data.error)
              localStorage.clear()
            } else {
              localStorage.getItem('profileObj') === 'profileObj' ? localStorage.clear() : localStorage.setItem('profileObj', JSON.stringify(res.data.user));
              setUsername('')
              setPassword('')
              navigate('/', { replace: true })
            }
          })
      } catch (error) {

      }
    }
    setLoading(false)
  }
  

  const profileObj = localStorage.getItem('profileObj') !== 'undefined' ? JSON.parse(localStorage.getItem('profileObj')) : localStorage.clear();

  const checkUser = () => {
    if (profileObj) {
      passUser(profileObj)
    }
  }

  useEffect(() => {
    checkUser();
  }, [])



  if (user !== null) {
    navigate('/', { replace: true })
  }


  return (
    <>
      <section onClick={() => setError('')} className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image" />
        </div>
        <form className="md:w-1/3 max-w-sm relative" onSubmit={submitForm}>

          {/* Error */}

          <div className={`absolute rounded-xl -translate-y-16 w-full flex justify-center items-center p-2 bg-red-300 my-5 ${error ? 'block animate-error-in' : 'hidden'}`}>
            <p className='text-red-800 text-xs '>{error}</p>
          </div>


          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded ${error ? '!border-red-600' : ''}`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />


          <div className="mt-4 flex justify-between font-semibold text-sm">

            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>

            <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Username?</a>

          </div>

          <div className="text-center md:text-left">

            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit"
            >
              {
                loading ? <ThreeDots color={'#fff'} width={30} height={18} /> : 'Login'
              }
            </button>

          </div>

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account? <Link className="text-red-600 hover:underline hover:underline-offset-4" to={'/register'}  >Register</Link>
          </div>

        </form>
      </section>
    </>
  )
}

export default Login