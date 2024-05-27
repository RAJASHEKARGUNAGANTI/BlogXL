import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blogs";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method == "POST") {
    const { user, title, description, date, type, deploymentLink, images } =
      req.body;
    const blogDoc = await Blog.create({
      user,
      title,
      description,
      date,
      type,
      deploymentLink,
      images,
    });
    res.json(blogDoc);
  }
  if (method == "PUT") {
    const {
      _id,
      user,
      title,
      description,
      date,
      type,
      deploymentLink,
      images,
    } = req.body;
    await Blog.updateOne(
      { _id },
      { user, title, description, date, type, deploymentLink, images }
    );
    res.json(true)
  }
  if(method == "GET") {
    if(req.query?.id){
        res.json(await Blog.findOne({_id: req.query?.id}));
    }else{
        res.json(await Blog.find())
    }
  }
  if(method == "DELETE"){
    if(req.query?.id){
        await Blog.deleteOne({_id: req.query?.id});
        res.json(true);
    }
  }
}
