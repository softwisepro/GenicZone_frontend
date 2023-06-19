import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from "react-loader-spinner";
import axios from "axios"

const Register = ({ user, passUser }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [v_password, setV_password] = useState('')

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const formData = { username, email, password, v_password }

  const submitForm = e => {
    e.preventDefault()

    setLoading(true)

    if (username !== '' && email !== '' && password !== '' && v_password !== '') {
      axios.post(`${process.env.REACT_APP_API_URL}/register`, formData)
        .then(res => {
          if (res.data.error) {
            setError(res.data.error)
            setPassword('')
            setV_password('')
          }
          setEmail('')
          setUsername('')
          setPassword('')
          setV_password('')
          navigate('/login', { replace: true })
        })
    } else {
      setError('Fill all the fields on the form')
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


  if (user) {
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

          <div className={`absolute rounded-xl -translate-y-16 w-full p-2 flex justify-center items-center bg-red-300 my-5 ${error ? 'block animate-error-in' : 'hidden'}`}>
            <p className='text-red-800 text-xs '>{error}</p>
          </div>

          <input
            className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />


          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Verify password"
            value={v_password}
            onChange={e => setV_password(e.target.value)}
          />

          <div className="mt-4 flex justify-between font-semibold text-sm">

            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" required />
              <span>I Agree to Terms and Services of geniczone</span>
            </label>

          </div>

          <div className="text-center md:text-left">

            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit"
            >
              {
                loading ? (
                  <ThreeDots
                    color={'#fff'}
                    width={30}
                    height={18}
                  />
                ) :
                  'Register'
              }
            </button>

          </div>

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account? <Link className="text-red-600 hover:underline hover:underline-offset-4" to={'/login'}>Login</Link>
          </div>

        </form>
      </section>
    </>
  )
}

export default Register