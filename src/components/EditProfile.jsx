import React, { useEffect, useState } from 'react'
import defaulProfile from '../assets/default_profile.png'
import axios from 'axios'
import { AiOutlineCamera } from 'react-icons/ai'

const EditProfile = ({ user, passUser }) => {

  const [username, setUsername] = useState(user?.username)
  const [first_name, setFirst_name] = useState(user?.first_name)
  const [last_name, setLast_name] = useState(user?.last_name)
  const [bio, setBio] = useState(user?.bio)
  const [new_profile_image, setNew_profile_image] = useState('')

  const [imagePreview, setImagePreview] = useState(null)

  const [error, setError] = useState(null)

  const profileImage = `${process.env.REACT_APP_MEDIA_URL}${user?.profile_image}`

  const handleChangeFile = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setNew_profile_image(e.target.files[0])
  }

  const submitForm = e => {
    e.preventDefault()

    const ProfileformData = new FormData();

    ProfileformData.append("profile_image", new_profile_image);

    const formData = new FormData();

    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("bio", bio);

    axios.post(`${process.env.REACT_APP_API_URL}/edit/${user?.user?.id}/${user?.user?.username}`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (res.data.success) {

          if (new_profile_image !== '') {

            axios.put(`${process.env.REACT_APP_API_URL}/edit_profile_image/${user?.user?.id}/${user?.user?.username}`, ProfileformData, {
              headers: {
                'content-type': 'multipart/form-data'
              }
            })
              .then(res => {
                if (res.data.success) {
                  localStorage.clear()
                  const new_userObj = localStorage.setItem('profileObj', JSON.stringify(res.data.new_profile))
                  passUser(new_userObj)
                  setNew_profile_image('')
                  handleRefresh()
                }
              })
          }
        } else {
          localStorage.clear()
          const new_userObj = localStorage.setItem('profileObj', JSON.stringify(res.data.new_profile))
          passUser(new_userObj)
          setNew_profile_image('')
          handleRefresh()
        }
      })
  }
  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    setUsername(user?.username)
    setFirst_name(user?.first_name)
    setLast_name(user?.last_name)
    setBio(user?.bio)
    setImagePreview(false)
  }, [user])

  return (
    <form onSubmit={e => submitForm(e)} className='relative flex flex-col gap-5 px-5 md:px-0 transition-all ease-linear duration-75 lg:px-16 py-16'>

      <div className='flex justify-center items-center p-5 w-full'>
        <div className=' absolute h-[200px] md:h-[250px] -translate-y-16 rounded-xl w-full bg-black/40 overflow-hidden'>
          <img src={profileImage} className={`w-full h-auto object-cover`} />
        </div>
        <div className='relative rounded-full group w-40 md:w-52 h-40 md:h-52 overflow-hidden border flex justify-center items-center bg-white'>
          {imagePreview ?
            <img src={user?.profile_image ? imagePreview : imagePreview || defaulProfile} alt={user?.username} className='w-full h-full object-cover' />
            :
            <img src={user?.profile_image ? profileImage : imagePreview || defaulProfile} alt={user?.username} className='w-full h-full object-cover' />
          }
          <div
            className='absolute z-10 flex items-center justify-center opacity-60 cursor-pointer rounded-full p-3 group-hover:bg-black/50 group-hover:w-full group-hover:h-full group-hover:text-white transition-all ease-in-out duration-300'
          >
            <label className='hover:bg-black/90 group-hover:text-white cursor-pointer rounded-full p-2 transition-all ease-in-out duration-150'>
              <AiOutlineCamera fontSize={40} />
              <input
                type="file"
                accept='images/*'
                onChange={handleChangeFile}
                className='w-20 bg-black hidden'
              />
            </label>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-5 md:px-32 justify-center items-center'>

        <div className='px-2 text-gray-600 text-sm items-start w-full'>
          <p>You can change your username easly and anytime</p>
        </div>
        <input
          className={`text-sm w-full px-4 py-2 border  border-gray-300 rounded outline-none bg-transparent ${error ? '!border-red-600' : ''}`}
          type="text"
          placeholder={`${user?.username}`}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <div className='px-2 text-gray-600 text-sm items-start w-full'>
          <p>Your First name is not enough to define your profile infomations so your required to add your last name and it is important to notice that your can not submit this form without filling all the fields</p>
        </div>

        <input
          className={`text-sm w-full px-4 py-2 border  border-gray-300 rounded outline-none bg-transparent ${error ? '!border-red-600' : ''}`}
          type="text"
          placeholder={`${user?.first_name ? user?.first_name : 'Enter your first name'}`}
          value={first_name}
          onChange={e => setFirst_name(e.target.value)}
        />

        <input
          className={`text-sm w-full px-4 py-2 border  border-gray-300 rounded outline-none bg-transparent ${error ? '!border-red-600' : ''}`}
          type="text"
          placeholder={`${user?.last_name ? user?.last_name : 'Enter your last name'}`}
          value={`${user?.last_name !== null ? last_name : ''}`}
          onChange={e => setLast_name(e.target.value)}
        />

        <div className='px-2 text-gray-600 text-sm'>
          <p>Email and Passwords are case sensitive informations, we are still working on how you can update your Email and password</p>
        </div>

        <textarea
          className={`text-sm resize-y w-full px-4 py-4 border border-solid border-gray-300 rounded outline-none bg-transparent ${error ? '!border-red-600' : ''}`}
          type="bio"
          placeholder="Bio"
          cols={10}
          rows={5}
          value={bio}
          onChange={e => setBio(e.target.value)}
        ></textarea>

        <div className='flex px-1'>
          <button type="submit"
            className='bg-blue-500 px-3 py-2 rounded-md text-blue-950 shadow-lg w-[120px] shadow-blue-300'
          >
            Save
          </button>
        </div>

      </div>
    </form>
  )
}

export default EditProfile