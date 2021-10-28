const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .isLength({ max: 100 })
  ,
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 100 })
    .withMessage('Please provide a username with at least 4 characters but less than 100 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.')
    .exists({ checkFalsy: true })
    .withMessage("please input a username"),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("Please put in a first name.")
    .isLength({ max: 100 })
    .withMessage("First names can not be more than 100 characters"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Please put in a last name.")
    .isLength({ max: 100 })
    .withMessage("Last names can not be more than 100 characters"),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, firstName, lastName, biography, profilePhoto } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName, biography, profilePhoto });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/:id', asyncHandler(async (req, res) => {
  userId = req.params.id;

  const user = await User.findByPk(userId);

  console.log('USER IN BACKEND', user.dataValues);

  return res.json( user.dataValues );
})
)

router.put('/:id(\\d+)/edit', requireAuth, validateSignup, asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  const { email, password, username, firstName, lastName, biography, profilePhoto } = req.body;

  const updatedUser = {
    email,
    password,
    username, firstName,
    lastName,
    biography,
    profilePhoto
  }
  
  await user.update(updatedUser);
  
  return res.json( user.dataValues );
}))

module.exports = router;