const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Event, db } = require("../../db/models");

const router = express.Router();

// Get events
router.get("/", asyncHandler(async (req, res) => {
    const events = await Event.findAll({
        include: db.User
    })

    return res.json({ events })
}))