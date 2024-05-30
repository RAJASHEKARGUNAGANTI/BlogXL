"use client"
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Spinner from "../Spinner";
import axios from "axios";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Image from "next/image";

const DashboardContent = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog , setSelectedBlog] = useState(null);
  


  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/blogs");
        // console.log(response)
        const userBlogs = response.data.filter(
          (blog) => blog?.user?.id === session?.user?.id
        );
        setBlogs(userBlogs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, [session]);

const deleteBlog = async()=>{
  try {
    axios.delete(`/api/blogs?id=${selectedBlog}`)
    const response = await axios.get('/api/blogs');
    const userBlogs = response.data.filter(
      (blog) => blog.user.id === session.user.id
    );
    setBlogs(userBlogs);
  } catch (error) {
    console.error(error)
  }
}

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card
          className="w-[320px] h-auto bg-gray-100 cursor-pointer mb-3 hover:bg-white"
          onClick={() => {
            window.location.href = "/dashboard/projects/new";
          }}
        >
          <CardContent className="flex flex-col items-center justify-center mt-2 text-center h-full">
            <CirclePlus className="w-12 h-12 mb-2" />
            <h1>New Blog</h1>
          </CardContent>
        </Card>
        {[...blogs].reverse().map((blog) => (
          <Card key={blog._id} className="bg-white w-[320px] mb-3">
            <CardHeader>
              <CardTitle className="truncate text-clamp-1">
                {blog.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
              width={400} height={400}
                src={blog.images[0]}
                alt="blog image"
                className="h-40 w-full rounded-md object-cover object-center"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() =>
                  (window.location.href = "/dashboard/projects/edit/" + blog._id)
                }
              >
                <Pencil />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button
                variant="destructive"
                onClick={() => {setSelectedBlog(blog._id)}
                }
              >
                <Trash />
              </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                variant="destructive"
                onClick={deleteBlog}>
                Delete
              </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default DashboardContent;
