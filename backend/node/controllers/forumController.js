const Forum = require("../models/forum");

// ✅ Create a new post
const createPost = async (req, res) => {
    try {
        const { username, userType, message } = req.body;

        if (!username || !userType || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newPost = await Forum.create({ username, userType, message });

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get paginated forum posts (Infinite Scrolling)
const getAllPosts = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1; // Default page 1
        limit = parseInt(limit) || 20; // Default 20 posts per request
        const skip = (page - 1) * limit;

        const posts = await Forum.find()
            .sort({ createdAt: -1 }) // Newest posts first
            .skip(skip)
            .limit(limit);

        const totalPosts = await Forum.countDocuments();

        res.status(200).json({
            success: true,
            data: posts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update a post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await Forum.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete a post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Forum.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        res.status(200).json({ success: true, message: "Post deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPost, getAllPosts, updatePost, deletePost };
