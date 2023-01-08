const Problem = require("../models/problem");

exports.getProblems = async(req, res) => {
    try {
        const result = await Problem.find({ group: req.params.group }).select("name description upvote");
        if (result && result.length !== 0) {
            return res.status(200).json({
                count: result.length,
                problems: result.map((problem) => {
                    return {
                        ...problem.toObject(),
                        request: {
                            type: "GET",
                            url: `http://localhost:3000/problem`,
                        },
                    };
                }),
            });
        }
        res.status(404).json({ msg: "problems not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};


exports.getProblem = async(req, res) => {
    try {
        const result = await Problem.findById(req.params.id).select("-__v");
        if (result) {
            return res.status(200).json({
                ...result.toObject(),
                request: {
                    type: "GET",
                    url: "http://127.0.0.1:3000/problem",
                },
            });
        }
        res.status(404).json({ msg: "Problem not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};

exports.postProblem = async(req, res) => {
    try {
        const problem = new Problem({
            name: req.body.name,
            description:  req.body.description,
            upvote:  req.body.upvote,
            group: req.body.group,
            comments:  req.body.comments,
        });
        const result = await problem.save();
        if (result) {
            return res.status(201).json({
                message: "Your problem was created",
                createdProblem: {
                    ...result.toObject(),
                    payload: {
                        type: "GET",
                        url: `http://127.0.0.1:3000/problem/${result._id}`,
                    },
                },
            });
        }
        res.status(500).json({ msg: "Problem was not created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
        });
    }
};

exports.patchProblem = async(req, res) => {
    try {
        const update = {};
        for (const ops of req.body) {
            update[ops.propName] = ops.value;
        }
        const result = await Problem.findByIdAndUpdate(req.params.id, update);
        if (result) {
            return res.status(200).json({
                msg: `Problem ${req.params.id} was updated`,
                request: {
                    type: "GET",
                    url: `http://127.0.0.1:3000/problem/${req.params.id}`,
                },
            });
        }
        res.status(500).json({ msg: "Problem could not be updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};
  
  