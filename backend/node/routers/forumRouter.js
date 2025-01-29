const express = require("express");
const { createPost, getAllPosts, updatePost, deletePost } = require("../controllers/forumController");

const router = express.Router();

router.post("/", createPost); 
router.get("/", getAllPosts); 
router.put("/:id", updatePost); 
router.delete("/:id", deletePost); 

module.exports = router;
