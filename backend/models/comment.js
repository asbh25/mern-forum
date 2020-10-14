const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    photoUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Comment", commentSchema, "comments");
