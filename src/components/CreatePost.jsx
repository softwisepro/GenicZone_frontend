import axios from 'axios'
import React, { useState } from 'react'
import { RiImageAddFill } from 'react-icons/ri'

const CreatePost = ({ user, openModel, setCloseModel }) => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [post_image, setPost_image] = useState(null)

  const [imagePreview, setImagePreview] = useState(null)

  const handleChangeFile = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setPost_image(e.target.files[0])
  }

  const submitForm = e => {
    e.preventDefault()

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", post_image);

    axios.post(`${process.env.REACT_APP_API_URL}/create_post/${user?.user?.id}`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (res.data.success) {
          setCloseModel(false)
          setTitle('')
          setPost_image('')
          setContent('')
        } else {
          
        }
      })
  }



  const handleModel = (e) => {
    if (openModel === true) {
      if (e.target.id === 'model_') {
        setCloseModel(false)
      }
    }
  }

  if (!openModel) return null
  return (
    <>
      <div id='model_' onClick={e => handleModel(e)} className='absolute bg-black/30 w-full inset-0 z-50 flex justify-center items-center'>
        <div className='bg-white p-5 md:w-1/2 lg:1/3 rounded-lg shadow-inner bg-opacuty-70'>
          <form onSubmit={submitForm} className='flex flex-col gap-5'>
            <button
            type='submit'
              className='bg-gray-300 p-2 rounded'
            >
              Post
            </button>
            <input
              className={`text-sm w-full px-4 py-2 border  border-gray-300 rounded outline-none bg-transparent`}
              type="text"
              placeholder={`Title...`}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <div className='relative'>
              <textarea
                className={`text-sm w-full px-4 py-2 border resize-none border-gray-300 rounded outline-none bg-transparent`}
                type="text"
                rows={20}
                placeholder={`Write something...`}
                value={content}
                onChange={e => setContent(e.target.value)}
              ></textarea>

              <div
                className='absolute bottom-0 z-40 flex items-center justify-center opacity-60 cursor-pointer rounded-full p-3 group-hover:bg-black/50 group-hover:w-full group-hover:h-full group-hover:text-white transition-all ease-in-out duration-300'
              >
                <label className='hover:bg-black/90 group-hover:text-white cursor-pointer rounded-full p-2 transition-all ease-in-out duration-150'>
                  <RiImageAddFill fontSize={40} />
                  <input
                    type="file"
                    accept='images/*'
                    onChange={handleChangeFile}
                    className='w-20 bg-black hidden'
                  />
                </label>
              </div>
              {
                imagePreview ? (
                  <div className='absolute right-0 bottom-0 h-[150px] overflow-hidden p-2 m-4'>
                    <img src={imagePreview} className='w-fit h-full object-contain rounded-2xl' />
                  </div>
                ) : ''
              }
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreatePost