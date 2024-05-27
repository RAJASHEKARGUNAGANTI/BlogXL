import Spinner from '@/components/Spinner';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const BlogPage = () => {
const [blogInfo, setBlogInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true);
    if(!id){
      return
    }
    axios.get(`/api/blogs?id=` + id).then(response =>{
      setBlogInfo(response.data)
      setLoading(false);
    })
  },[id]);

  if(loading){
    return<>
    <div className="flex justify-center items-center h-screen">
    <Spinner/>
    </div>
    </>
  }
  return (
    <>
    <div className="mx-auto px-4 sm:px-6 ld:px-8 mt-10 ">
    <section className="pb-24 pt-6 ">
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 ">
    <div className="lg:block fixed top-36">
    <Link href={'/'} className='flex text-md items-center mb-3 text-gray-500 '>
    <MoveLeft/>
    Go back
    </Link>
    <Badge variant={'outline'} className={'flex items-center justify-start gap-2'}>
    <Avatar className='my-4' size='large'>
    <AvatarImage src={blogInfo?.user.image} alt={blogInfo?.user.name}/>
    </Avatar>
    <h1 className="text-xl font-bold text-gray-700">{blogInfo?.user.name}</h1>
    </Badge>
    <h2 className="text-xl font-semibold my-6">{blogInfo?.title}</h2>
    <div className="border-b p-3 text-gray-500 text-md flex justify-between ">
    <p className="text-md font-medium">Type</p>
    <p className="text-md font-medium">{blogInfo?.type}</p>
    </div>
    </div>
    <div className="col-span-2 border-l border-gray-300 sm:ml-[380px] w-full">
    <Image src={blogInfo?.images[0]} alt=""  className='border-b-gray-400 p-4 rounded-3xl object-center ' />
    <div className="list-disc mb-4 ml-3 p-4 mt-4 " dangerouslySetInnerHTML={{__html: blogInfo?.description}} ></div>
    </div>
    </div>
    </section>
    </div>
    </>
  )
}

export default BlogPage