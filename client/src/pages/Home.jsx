import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className='flex flex-col items-center gap-10 p-10'>
      {listOfPosts.map((post, key) => (
        <div key={key} className='flex flex-col justify-between w-[400px] h-[250px] shadow-lg rounded-lg overflow-hidden cursor-pointer'>
          <div className='flex flex-col'>
            <p className='h-10 w-full flex items-center justify-center bg-blue-300'>{post.title}</p>
            <p className='flex w-full p-5'>{post.postText}</p>
          </div>
          <p className='h-10 w-full flex items-center px-5 bg-blue-300'>{post.username}</p>
        </div>
      ))}
    </div>
  )
}

export default Home