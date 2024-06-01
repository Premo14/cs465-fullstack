const mongoose = require('mongoose')
const Blog = require('../models/blogs')
const Model = mongoose.model('blogs')
const User = mongoose.model('users')

const getUser = async (req) => {
    console.error("Payload: ", req.payload);
    try {
        if (req.payload && req.payload.email) {
            const user = await User.findOne({ email: req.payload.email });
            if (!user) {
                console.error("User not found");
                return null; // Return null if user not found
            }
            return user;
        } else {
            console.error("Email not found in payload");
            return null; // Return null if email not found
        }
    } catch (err) {
        console.error("Error finding user:", err);
        throw err; // Throw error for caller to handle
    }
};

const blogsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec()

    console.log()

    if (!q) {
        return res
            .status(404)
            .json(err)
    } else {
        return res
            .status(200)
            .json(q)
    }
}
const blogsFindByTitle = async (req, res) => {
    const q = await Model
        .find({'code': req.params.title})
        .exec()

    console.log(q)

    if(!q)
    {
        return res
            .status(404)
            .json(err)
    } else {
        return res
            .status(200)
            .json(q)
    }
}

const blogsAddBlog = async (req, res) => {
    try {
        const user = await getUser(req)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const blog = await Blog.create({
            title: req.body.title,
            date: req.body.date,
            author: req.body.author,
            summary: req.body.summary,
            description: req.body.description,
            image: req.body.image
        })
        return res.status(201).json(blog)
    } catch (err) {
        console.error("Error adding blog: ", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const blogsUpdateBlog = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Blog
                .findOneAndUpdate({'title': req.params.title },{
                    title: req.body.title,
                    date: req.body.date,
                    author: req.body.author,
                    summary: req.body.summary,
                    description: req.body.description,
                    image: req.body.image
                }, { new: true })
                .then(blog => {
                    if (!blog) {
                        return res
                            .status(404)
                            .send({
                                message: "Blog not found with code" + req.params.title
                            });
                    }
                    res.send(blog);
                }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: "Blog not found with title" + req.params.title
                        });
                }
                return res
                    .status(500)
                    .json(err);
            });
        }
    );
}

module.exports = {
    blogsList,
    blogsFindByTitle,
    blogsAddBlog,
    blogsUpdateBlog
}