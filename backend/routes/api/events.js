const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Event, User, Comment } = require("../../db/models");

const router = express.Router();

const validateCreateEvent = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Please enter a name for your event!"),
    check("date")
        .exists({ checkFalsy: true })
        .withMessage("Please enter a date for the event"),
    check("eventPhoto")
        .exists({ checkFalsy: true })
        .withMessage("Please give this event a photo"),
    handleValidationErrors
]


const validateComment = [
    check("content")
        .exists({ checkFalsy: true })
        .withMessage("Please input a comment to be posted"),
    handleValidationErrors
]


// Get events
router.get("/", asyncHandler(async (req, res) => {
    const events = await Event.findAll({})

    return res.json({ events })
}))

//Create event
router.post("/new", requireAuth, validateCreateEvent, asyncHandler(async (req, res) => {
    let userId = req.user.id
    
    const { name, description, date, eventPhoto } = req.body;

    const event = await Event.build({
        userId,
        name,
        description,
        date,
        eventPhoto,
    })

    await event.save();

    return res.json({ events: event })
}))

//Get Event
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    eventId = req.params.id;

    const event = Event.findByPk(eventId, {
        include: User
    })
    return res.json({ event })
}))

//Edit event
router.put('/:id(\\d+)/edit', requireAuth, validateCreateEvent, asyncHandler( async (req, res) => {
    let eventId = req.params.id;
    let userId = req.user.id;
    const event = await Event.findByPk(eventId);

    const { name, description, date, eventPhoto } = req.body;
    
    const updatedEvent = {
        name,
        description,
        date,
        eventPhoto,
        userId
    }

    await event.update(updatedEvent);

    return res.json({ event })
}))

//Delete event
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    let eventId = req.params.id;
    const event = await Event.findByPk(eventId);

    await event.destroy()
    return res.json();
}))

//Get comments
router.get("/:eventId(\\d+)/comments'", asyncHandler(async (req, res) => {
    const eventId = req.params.eventId;
    const comments = await Comment.findAll({
        include: User
    })

    return res.json({ comments })
}))

//Create Comment

router.post("/:eventId(\\d+)/comment/new", requireAuth, validateComment, asyncHandler(async (req, res) => {
    let userId = req.user.id;
    let eventId = req.params.eventId;
  
    const { content } = req.body;
   
    const comment = await Comment.build({
        content,
        userId,
        eventId
    })

    await comment.save();

    return res.json({ comments: comment })
}))

//Edit comment
router.put("/:eventId(\\d+)/comment/:id(\\d+)/edit", requireAuth, validateComment, asyncHandler(async (req, res) => {
    let userId = req.user.id;
    let eventId = req.params.eventId;
    let commentId = req.params.id;

    const comment = await Comment.findByPk(commentId);

    const { content } = req.body;

    const updatedComment = {
        content,
        userId,
        eventId
    }

    await comment.update(updatedComment)

    return res.json({ comment })
}))

//Delete comment
router.delete("/:eventId(\\d+)/comment/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    let commentId = req.params.id;

    const comment = await Comment.findByPk(commentId);

    const resComment = res.json(comment);

    await comment.destroy()
    return resComment;
}))

module.exports = router;