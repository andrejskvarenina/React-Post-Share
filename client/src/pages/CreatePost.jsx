import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const CreatePost = () => {

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title can not be empty."),
    postText: Yup.string().required("Post can not be empty."),
    username: Yup.string().min(3).max(15).required("You must enter an username."),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data)
  }

  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='flex flex-col w-[400px] border-2 border-blue-200 px-10 py-5 rounded-lg gap-5'>
          <div className='flex flex-col gap-2'>
            <label>Title:</label>
            <ErrorMessage name='title' component='span' className='text-red-500 text-xs'/>
            <Field name="title" placeholder="(Ex. Title...)" className='border p-2 rounded-md'/>
          </div>

          <div className='flex flex-col gap-2'>
            <label>Post:</label>
            <ErrorMessage name='postText' component='span' className='text-red-500 text-xs'/>
            <Field name="postText" placeholder="(Ex. Post...)" className='border p-2 rounded-md'/>
          </div>

          <div className='flex flex-col gap-2'>
            <label>Username:</label>
            <ErrorMessage name='username' component='span' className='text-red-500 text-xs'/>
            <Field name="username" placeholder="(Ex. John123...)" className='border p-2 rounded-md'/>
          </div>

          <button type='submit' className='mt-5 bg-blue-200 rounded-md py-1 border border-black'>Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost