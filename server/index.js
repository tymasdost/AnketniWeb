const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3000;

const accountRouter = require("./routes/account");
const teamRouter = require("./routes/team");
const problemRouter = require("./routes/problem");

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.iitlbvi.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/account", accountRouter);
app.use("/team", teamRouter);
app.use("/problem", problemRouter);
app.listen(PORT, () => console.log(`App is running on ${PORT}`));