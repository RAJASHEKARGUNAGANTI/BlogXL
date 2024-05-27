"use client"
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import {Trash} from "lucide-react";
import axios from 'axios'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import {ReactSortable} from "react-sortablejs";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: -1 }, { indent: +1 }],
    ["link", "image", , "video", "code-block"],
    ["clean"],
    [{ color: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
]

const BlogForm = (
 { _id,
  title: existingTitle,
  description: existingDescription,
  type: existingType,
  deploymentLink: existingDeploymentLink,
  images: existingImages}
) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [images, setImages] = useState(existingImages || []);
  const [deploymentLink, setDeploymentLink] = useState(existingDeploymentLink || "");
  const [type, setType] = useState(existingType || "");
  const [isUploading , setIsUploading] = useState(false);
  const {data:session} = useSession()
  const [redirect , setRedirect] = useState(false);
  const router = useRouter()

  const uploadImageQueue = [];

  const updateImagesOrder = (images)=>{
    setImages(images);
  }

  const handleDeleteImage = (index)=>{
    const updateImages = [...images];
    updateImages.splice(index,1);
    setImages(updateImages);
  }

  async function uploadImages(ev){
    const files = ev.target.files;
    if(files.length >0){
      setIsUploading(true);
      for(const file of files){
        const data = new FormData();
        data.append('file', file);

        uploadImageQueue.push(
          axios.post('/api/upload', data).then(res =>{
            setImages(oldImags =>[...oldImags, ...res.data.links])
          })
        )
      }
      await Promise.all(uploadImageQueue);
      setIsUploading(false);
    }
  }

  async function createBlog(ev){
    ev.preventDefault();
    if(isUploading){
      await Promise.all(uploadImageQueue);
    }
    const data = {
      title,
      type,
      deploymentLink,
      images,
      description,
      user:session.user
    };
    if(_id){
      await axios.put('/api/blogs', {...data, _id});
    }else{
      await axios.post('/api/blogs',data);
    }
    setRedirect(true);
  }

  if(redirect){
    router.push('/dashboard');
    return null;
  }
  return (
    <>
      <form className="p-3 space-y-6" onSubmit={createBlog}>
        <Input type="text" placeholder="Blog Title" value={title} onChange={(e)=> setTitle(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <select className="border rounded-md px-3 py-2 w-full" value={type} onChange={(e)=> setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Technical">Technical</option>
            <option value="Non-technical">Non-Technical</option>
          </select>
          <Input type="url" placeholder="Deploymen URL" value={deploymentLink} onChange={(e)=> setDeploymentLink(e.target.value)}/>
        </div>
        <div className="w-full items-center gap-2">
          <Label>Blog Images</Label>
          <Input type="file" onChange={uploadImages} />
          {isUploading && (
            <div className="">
            <Spinner />
            </div>
          )}
          {!isUploading && (
            <div className="w-full">
            <ReactSortable
            list={Array.isArray(images)? images: []}
            setList={updateImagesOrder}
            className='grid grid-cols-3 gap-4'
            >
            {Array.isArray(images) && images.map((link,index)=>(
              <div className="relative" key={link}>
              <img src={link} alt="blog Images" className="object-cover h-full w-full rounded-md border p-2
              cursor-pointer transition-transform transform-gpu duration-300 group-hover:scale-110 " />
              <div className="absolute top-3 right-3 cursor-pointer opacity-100">
              <Button onClick={()=> handleDeleteImage(index)} >
              <Trash className="w-4 h-4 gb-white text-red-600 rounded-full p-1" />
              </Button>
              </div>
              </div>
            ))}
            </ReactSortable>
            </div>
          )}
          {/* blog images*/}
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Write your blog here..."
          className="flex-grow my-3 h-auto "
          value={description} onChange={(newValue)=> setDescription(newValue)}
        />
        <Button>
          {_id ? "Update Blog" : "Create Blog"}
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
