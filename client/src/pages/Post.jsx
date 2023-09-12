import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPost(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });

  }, []);

  const addComment = () => {
    axios.post("http://localhost:3001/comments", 
      {
        commentBody: newComment, 
        PostId: id
      }).then((response) => {
        const commentToAdd = { commentBody : newComment }
        setComments([...comments, commentToAdd])
        setNewComment("")
      })
  }

  return (
    <div className='flex w-full min-h-screen justify-between p-20'>
      <div className='flex flex-col justify-between w-[400px] h-[250px] shadow-lg rounded-lg overflow-hidden cursor-pointer'>
          <div className='flex flex-col'>
            <p className='h-10 w-full flex items-center justify-center bg-blue-300'>{post?.title}</p>
            <p className='flex w-full p-5'>{post?.postText}</p>
          </div>
          <p className='h-10 w-full flex items-center px-5 bg-blue-300'>{post?.username}</p>
    </div>

      <div className='flex flex-col items-start'>
        <input 
          type="text" 
          placeholder='Comment...' 
          className='border p-2 rounded-md' 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          className='mt-5 bg-blue-200 rounded-md py-1 px-10 border border-black'
          onClick={addComment}
        >
            Add Coment
        </button>
        {comments.length > 0 ? comments.map((comment, key) => (
        <p key={key}>{comment.commentBody}</p>)) 
        : 
        <p>There are no comments for this post</p>
        }
      </div>

    </div>
  )
}

export default Post