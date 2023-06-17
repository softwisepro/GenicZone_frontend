import React, { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import Loading from './Loading'
import { useParams } from 'react-router-dom';

const Feed = () => {

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  const category = useParams()
  setLoading(true)
  useEffect(() => {


    const delayDebounceFn = setTimeout(() => {

      console.log(searchTerm)
      try {
        fetch(`${process.env.REACT_APP_API_URL}/feeds`)
          .then(res => res.json())
          .then((data) => setPost(data))

      } catch (err) {

      }

    }, 3000)



    return () => clearTimeout(delayDebounceFn);

  }, [])
  setLoading(false)

  if (loading) return <Loading />
  return (
    <div>
      {post && (<MasonryLayout post={post} />)}
    </div>
  )
}

export default Feed