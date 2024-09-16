const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      require: true,
    },

    text: String,
    img: String,
    likes: [
      {
        types: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserModel",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
