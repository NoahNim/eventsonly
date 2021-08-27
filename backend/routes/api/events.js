const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Event, db } = require("../../db/models");

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

    // console.log(event)

    return res.json({ events: event })
}))

//Edit event
router.put('/:id(\\d+)/edit', requireAuth, validateCreateEvent, asyncHandler((req, res) => {
    let eventId = req.params.id;
    let userId = req.user.id;
    const event = await Event.findByPk(eventId);

    const { name, description, date, eventPhoto } = req.body;
    
    const updatedEvent = await Event.build({
        userId,
        name,
        description,
        date,
        eventPhoto,
    })

    await event.update(updatedEvent);

    return res.json({ event })
}))

module.exports = router;