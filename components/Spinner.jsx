"use client"
import React from 'react'
import {HashLoader} from "react-spinners"

const Spinner = () => {
  return (
    <div className="p-2"><HashLoader color="#5f5f5f" size={30} /></div>

  )
}

export default Spinner