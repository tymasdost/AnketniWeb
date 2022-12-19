const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    group: { type: String, required: true },
});


module.exports = mongoose.model("Account", accountSchema);