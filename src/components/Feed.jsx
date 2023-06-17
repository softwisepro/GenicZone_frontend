import React, { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import Loading from './Loading'
import { useParams } from 'react-router-dom';

const Feed = () => {

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  const category = useParams()

  useEffect(() => {
    setLoading(true)

    const delayDebounceFn = setTimeout(() => {

      console.log(searchTerm)
      try {
        fetch(`${process.env.REACT_APP_API_URL}/feeds`)
          .then(res => res.json())
          .then((data) => setPost(data))

      } catch (err) {

      }

    }, 3000)

    setLoading(false)
    
    return () => clearTimeout(delayDebounceFn);

  }, [])


  if (loading) {
    return <Loading />
  }
  return (
    <div>
      {post && (<MasonryLayout post={post} />)}
    </div>
  )
}

export default Feed