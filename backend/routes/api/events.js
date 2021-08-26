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
router.get("/", requireAuth, asyncHandler(async (req, res) => {
    const events = await Event.findAll({})

    return res.json({ events })
}))

//Create event
router.post("/new", asyncHandler(async (req, res) => {
    
}))

module.exports = router;