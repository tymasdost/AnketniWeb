const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team");

router.get("/:group", teamController.getTeams);
router.get("/", teamController.getTeamsTeacher);
router.get("/:id", teamController.getTeam);
router.patch("/:id", teamController.patchTeam);

module.exports = router;