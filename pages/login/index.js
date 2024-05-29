"use client"
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Head from "next/head"; // Import the Head component

export const metadata = {
  title: "Login",
  description: "Login to exceel the BlogXL",
};

const Login = () => {
  const {data: session} = useSession()
  const router = useRouter();
  useEffect(()=>{
    if(session) {
      // window.location.href="/dashboard"
      router.push("/dashboard")
    }
  })
  
  return <>
  <title>{metadata.title} - BlogXL</title>
        <meta name="description" content={metadata.description} />
  <section>
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 relative z-10">
  <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text:6xl">
  We invest in the future of Development
  </h1>
  <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
  Here at the BlogXL we focus on helping you find the best templete built by developers for blogging
  </p>
  {session ? (<Button variant='custom' onClick={() => window.location.href='/dashboard'} >Share your Blogs</Button>) : 
    (<Button variant='custom' onClick={() => signIn("google")} >Continue with google</Button>)
  }
  </div>
  <Image width={1000} height={1000} src="/login.jpg" alt="Photo"  className=' object-cover max-w-xl mx-auto'/>
  </section>
  </>
}

export default Login