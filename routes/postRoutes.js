const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

const router = express.Router();

router.post("/create-post", requireSignIn, createPostController);

router.get("/get-all-posts", getAllPostsController);

router.get("/get-user-post", requireSignIn, getUserPostController);

router.delete("/delete-post/:id", requireSignIn, deletePostController);

router.put("/update-post/:id", requireSignIn, updatePostController);

module.exports = router;
