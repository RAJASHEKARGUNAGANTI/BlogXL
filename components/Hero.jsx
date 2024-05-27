import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const Hero = () => {
  const {data:session} = useSession()
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pb-16 pt-20 sm:pt-24 lg:pb-24 lg:pt-24">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Destination for <span className="text-green-500">Blogging</span> your expertise and knowledge 
          </h1>
          <p className="mt-6 text-gray-600">Looking for quick start on your next Blog? Welcom to <span className="text-indigo-600">BlogXL </span>
          , where developers like you share their expertise through a diverse collection of <span className="text-red-600">blogs </span>
          . Whether you&apos;re blogging a <span className="text-yellow-600">blog </span>
           or describing a new features, find the <span className="text-blue-600">perfect </span>
           starting point right there.</p>
          </div>
          <div className="mt-12 text-center">
          {session ? (
            <Button variant="custom" onClick={()=>{window.location.href='/dashboard'}} >
          Share your Blogs</Button>
          ):
            (<Button variant="custom" onClick={()=>{window.location.href='/login'}} >
            Sign In to start Blogging</Button>)
          }
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
