"use client"
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";

const DashboardLayout = ({ children }) => {
  return (
    <div className="mx-auto justify-center items-center mt-20 min-h-screen sm:flex-col sm:items-center sm:justify-center">
    <DashboardHeader/>
      <div className="p-4 sm:ml-80">
        <div className="p-4 border border-gray-200 rounded-lg bg-white h-full">
        {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
