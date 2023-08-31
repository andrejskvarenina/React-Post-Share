import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  return (
    <div className='flex flex-col justify-between w-[400px] h-[250px] shadow-lg rounded-lg overflow-hidden cursor-pointer'>
          <div className='flex flex-col'>
            <p className='h-10 w-full flex items-center justify-center bg-blue-300'>{post?.title}</p>
            <p className='flex w-full p-5'>{post?.postText}</p>
          </div>
          <p className='h-10 w-full flex items-center px-5 bg-blue-300'>{post?.username}</p>
    </div>
  )
}

export default Post