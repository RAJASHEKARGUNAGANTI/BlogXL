import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Head from "next/head"; // Import the Head component
import React from "react";

export const metadata = {
  title: "Dashboard - BlogXL",
  description: "Dashboard can use to add new blogs and edit or delete them",
};

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
