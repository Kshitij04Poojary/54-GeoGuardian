const Post = require('../models/post');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, description, organizationName, urgent } = req.body;
        const newPost = new Post({ title, description, organizationName, urgent });
        await newPost.save();
        res.status(201).json({ success: true, message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });

        res.status(200).json({ success: true, post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPost) return res.status(404).json({ success: false, message: "Post not found" });

        res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ success: false, message: "Post not found" });

        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
