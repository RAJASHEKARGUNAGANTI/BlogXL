import {SquareDot } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import Image from "next/image";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/blogs").then(response => {
      setBlogs(response.data);
      // console.log(blogs);
    });
  }, []);
  // console.log(blogs);


  const filterBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.type.toLowerCase().includes(search.toLowerCase()) ||
      blog.user.name.toLowerCase().includes(search.toLowerCase())
  );
// console.log(filterBlogs)
  return (
    <>
      <header className="border-b mb-3">
        <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <SquareDot className="text-indigo-600" />
                Latest Blogs
              </h1>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center w-full max-w-xl">
              <Input
                placeholder="Search by title or type"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>
      {(loading && blogs.length === 0) && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          {[
            ...Array(8)].map((_, index) => (
              <div className="flex flex-col space-y-3 " key={index}>
                <Skeleton className={"h-[125px] w-[250px] rounded-xl"} />
                <div className="space-y-2">
                  <Skeleton className={"h-4 w-[250px] "} />
                  <Skeleton className={"h-4 w-[250px] "} />
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 md:grid-cols-3">
        {filterBlogs.map((blog, index) => (
          <div
            className="relative overflow-hidden rounded-lg shadow-lg border transition hover:shadow-xl "
            key={blog.id || index}
          >
            <Link href={"/blogs/" + blog._id}>
              <div className="h-[210px] ">
                <Image
                  width={270}
                  height={80}
                  alt="blog image"
                  src={blog?.images[0]}
                  className=" object-fill rounded-t-lg"
                  layout="responsive"
                  quality={100}
                />
              </div>
              <div className="flex items-center gap-x-2 px-4 mt-6">
              <Image width={20}
              height={20} src={blog?.user?.image} alt="user image" className="h-8 w-8 rounded-full" />
              <h3 className="text-base font-semibold leading-7 tracking-tight">
              {blog.user.name}
              </h3>
              </div>
              <div className="bg-white p-4 rounded-b-lg">
              <h3 className="text-lg font-semibold transition duration-300 line-clamp-1 truncate mb-10 hover:text-primary text-gray-600">
              {blog.title}
              </h3>
              </div>
            </Link>
          </div>
  ))}
      </div>
    </>
  );
};

export default Blogs;
