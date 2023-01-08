const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    upvote: { type: Number, required: true },
    group: { type: String, required: true },
    comments: { type: Array}
});

module.exports = mongoose.model("problem", problemSchema);