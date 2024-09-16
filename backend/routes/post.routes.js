const {
  createPost,
  likeDislikePost,
  commentPost,
  deletePost,
} = require("../controllers/postControllers");
const { protectRoute } = require("../middleware/ProtectRoute");

const router = require("express").Router();

router.get("/create", protectRoute, createPost);
router.delete("/like/:id", protectRoute, likeDislikePost);
router.post("/comment/:id", protectRoute, commentPost);
router.delete("/delete", protectRoute, deletePost);
module.exports = router;
