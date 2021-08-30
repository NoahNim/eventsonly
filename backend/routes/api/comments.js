const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Event, User, Comment } = require("../../db/models");
const router = require("./events");

const validateComment = [
    check("content")
        .exists({ checkFalsy: true })
        .withMessage("Please input a comment to be posted"),
    handleValidationErrors
]

//Get comments
router.get("/", asyncHandler(async (req, res) => {
    const comments = await Comment.findAll()

    return res.json({comments})
}))

