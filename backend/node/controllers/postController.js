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

    try {
        let { page, limit, userType } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;
        const skip = (page - 1) * limit;

        // Construct query object for filtering by userType
        let query = {};

        if (userType) {
            query.userType = userType;
        }

        const posts = await Forum.find(query) // Use query object for filtering
            .sort({ createdAt: -1 }) // Newest posts first
            .skip(skip)
            .limit(limit);

        const totalPosts = await Post.countDocuments(query); // Count with filter applied

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
