import React, { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import { useParams } from 'react-router-dom';
import Preloader from './Preloader';

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
    <Preloader>
      {post && (<MasonryLayout post={post} />)}
    </Preloader>
  )
}

export default Feed