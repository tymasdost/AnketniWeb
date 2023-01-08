const Team = require("../models/team");

exports.getTeams = async(req, res) => {
    try {
        const result = await Team.find({ group: req.params.group }).select("name icon group");
        if (result && result.length !== 0) {
            return res.status(200).json({
                count: result.length,
                teams: result.map((team) => {
                    return {
                        ...team.toObject(),
                        request: {
                            type: "GET",
                            url: `http://localhost:3000/team/${team._id}`,
                        },
                    };
                }),
            });
        }
        res.status(404).json({ msg: "Team not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};

exports.getTeamsTeacher = async(req, res) => {
    try {
        const result = await Team.find().select("name icon group");
        if (result && result.length !== 0) {
            return res.status(200).json({
                count: result.length,
                teams: result.map((team) => {
                    return {
                        ...team.toObject(),
                        request: {
                            type: "GET",
                            url: `http://localhost:3000/team/${team._id}`,
                        },
                    };
                }),
            });
        }
        res.status(404).json({ msg: "Team not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};

exports.getTeam = async(req, res) => {
    try {
        const result = await Team.findById(req.params.id).select("-__v");
        if (result) {
            return res.status(200).json({
                ...result.toObject(),
                request: {
                    type: "GET",
                    url: "http://127.0.0.1:3000/team",
                },
            });
        }
        res.status(404).json({ msg: "Team not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};

exports.patchTeam = async(req, res) => {
    try {
        const update = {};
        for (const ops of req.body) {
            update[ops.propName] = ops.value;
        }
        const result = await Team.findByIdAndUpdate(req.params.id, update);
        if (result) {
            return res.status(200).json({
                msg: `Team ${req.params.id} was updated`,
                request: {
                    type: "GET",
                    url: `http://127.0.0.1:3000/team/${req.params.id}`,
                },
            });
        }
        res.status(500).json({ msg: "Team could not be updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};