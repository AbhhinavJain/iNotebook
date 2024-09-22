const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleWare/fetchuser');

const JWT_SECRET = "ThisisiNotebook."
const {
  body,
  validationResult
} = require('express-validator');

//Route 1: create a user using : Post "/api/auth/createUser" . No login required
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({
    min: 3
  }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({
    min: 5
  })
], async (req, res) => {
  // If there are  errors, return Bad request and the errors
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success,
      errors: errors.array()
    });
  }
  try {

    // check whether the user with this email exists already
    let user = await User.findOne({
      email: req.body.email
    });
    if (user) {
      return res.status(400).json({
        error: "Sorry a user with this email already exists"
      })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


//Route 2: Authenticate a user using : Post "/api/auth/login" . login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  let success = false;
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email and password is not match." });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Email and password is not match." });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Route 3: get loggedin user detail using : Post "/api/auth/getUser" .login required
router.post('/getUser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router