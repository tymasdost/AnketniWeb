const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    problems: { type: Array},
    group: { type: String, required: true }
});

module.exports = mongoose.model("team", teamSchema);