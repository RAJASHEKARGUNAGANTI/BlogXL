import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Head from "next/head"; // Import the Head component
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard description",
};

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>{metadata.title} - BlogXL</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
