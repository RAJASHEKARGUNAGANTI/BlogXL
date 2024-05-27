import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

const DashboardHeader = () => {
    const {data: session} = useSession()
    const router = useRouter()
    // useEffect(()=>{
    //     if(!session){
    //         router.puush()
    //     }
    // })
    const logout = async() =>{
        await router.push('/')
        await signOut()
    }
  return (
      <>
      <div className="flex justify-between items-center">
      </div> 
        <aside className={` fixed z-40 w-80 h-auto`}>
          <div className="h-full px-3 py-4 overflow-auto bg-gray-50">
            <ul className="space-y-2 font-medium">
              <li>
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <div className="flex flex-col items-center p-3">
                  <img src={session?.user?.image} alt={session?.user?.name} className="w-24 h-24 mb-3 rounded-full shadow-lg"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{session?.user?.name}</h5>
                    <span className="text-sm text-gray-900">{session?.user?.email}</span>
                    <Button variant ='outline' className='w-full mt-2' onClick={()=> window.location.href = '/dashboard'} >Dashboard</Button>
                    <Button variant ='outline' className='w-full mt-2'onClick={logout} >Logout</Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
    </>
  );
};

export default DashboardHeader;
