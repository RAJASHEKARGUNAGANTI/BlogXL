const { Schema, model, models } = require("mongoose");

const BlogSchema = new Schema({
  user: {
    type: Schema.Types.Mixed,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  deploymentLink: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

export const Blog = models.Blog || model("Blog", BlogSchema);