import BlogForm from '@/components/BlogForm'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import React from 'react'

const NewBlog = () => {
  return (
    <DashboardLayout>
    <BlogForm/>
    </DashboardLayout>
  )
}

export default NewBlog