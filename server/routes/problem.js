const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problem");

// GET request to retrieve all problems in a group
router.get("/:group", problemController.getProblems);

// GET request to retrieve a specific problem by ID
router.get("/:id", problemController.getProblem);

// POST request to create a new problem
router.post("/", problemController.postProblem);

// PATCH request to update a specific problem by ID
router.patch("/:id", problemController.patchProblem);

module.exports = router;
