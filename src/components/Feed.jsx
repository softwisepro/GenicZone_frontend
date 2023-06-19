import React, { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import { useParams } from 'react-router-dom';

const Feed = () => {

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  const category = useParams()

  useEffect(() => {
    setLoading(true)

    try {
      fetch(`${process.env.REACT_APP_API_URL}/feeds`)
        .then(res => res.json())
        .then((data) => setPost(data))
        setLoading(false)
    } catch (err) {

    }

  }, [])

  return (
    <div>
      {post && (<MasonryLayout post={post} />)}
    </div>
  )
}

export default Feed