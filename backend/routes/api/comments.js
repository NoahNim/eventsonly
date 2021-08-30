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
router.get("/events/:id(\\d+)'", asyncHandler(async (req, res) => {
    const eventId = req.params.id
    const event = await Event.findByPk(eventId)
    const comments = await Comment.findAll({
        include: event
    })

    return res.json({comments})
}))

//Create comment
router.post("/events/:id(\\d+)/comment/new", require, validateComment, asyncHandler(async (req, res) => {
    let userId = req.user.id;
    let eventId = req.params.id;

    const { content } = req.body;

    const comment = {
        content,
        userId,
        eventId
    }

    await comment.save();

    return res.json({ comments: comment })
}))


//Edit comment
router.put("/events/:id(\\d+)/comment/:id(\\d+)/edit", requireAuth, validateComment, asyncHandler(async (req, res) => {
    let userId = req.user.id;
    let commentId = req.params.id;

    const comment = await Comment.findByPk(commentId);

    const { content, eventId } = req.body;

    const updatedComment = {
        content,
        userId,
        eventId
    }

    await comment.update(updatedComment)

    return res.json({ comment })
}))
