"use client"
import BlogForm from '@/components/BlogForm'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const EditBlog = () => {
  const [blogInfo, setBlogInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;

  useEffect(()=>{
    if(!id){
      return
    }
    axios.get(`/api/blogs?id=` + id).then(response =>{
      setBlogInfo(response.data)
    })
  },[id]);
  return <>
  <DashboardLayout>
  {blogInfo &&(
    <BlogForm {...blogInfo}/>
  )}
  </DashboardLayout>
  </>
}

export default EditBlog