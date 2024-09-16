const UserModel = require("../models/User.model");
const { v2 } = require("cloudinary");
const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id;
    const user = await UserModel.find(userId);
    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }
    if (!text && !img) {
      return res.status(400).json({ err: "Post must have text or image" });
    }

    if (img) {
      const uploadedResponse = await v2.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new PostModel({
      user: userId,
      text,
      img,
    });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: "Internal server error" });
  }
};
const likeDislikePost = async (req, res) => {
  res.send("working");
};

const commentPost = async (req, res) => {
  res.send("working");
};

const deletePost = async (req, res) => {
  res.send("working");
};

module.exports = {
  createPost,
  deletePost,
  likeDislikePost,
  commentPost,
};
