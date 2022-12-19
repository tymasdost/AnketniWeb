const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account");

router.get("/", accountController.getAccounts);
router.get("/:email", accountController.getAccount);

module.exports = router;