const Account = require("../models/account");

exports.getAccounts = async(req, res) => {
    try {
        const result = await Account.find().select("email password");
        if (result && result.length !== 0) {
            return res.status(200).json({
                count: result.length,
                accounts: result.map((account) => {
                    return {
                        ...account.toObject(),
                        request: {
                            type: "GET",
                            url: `http://localhost:3000/account/${account.email}`,
                        },
                    };
                }),
            });
        }
        res.status(404).json({ msg: "accounts not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};


exports.getAccount = async(req, res) => {
    try {
        const result = await Account.findOne({ email: req.params.email }).select("-__v");
        if (result) {
            return res.status(200).json({
                ...result.toObject(),
                request: {
                    type: "GET",
                    url: "http://127.0.0.1:3000/account",
                },
            });
        }
        res.status(404).json({ msg: "Book not found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
};