const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../middleware/validation');

// @desc    Register a new user
const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ message: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    location: req.body.location,
    description: req.body.description,
    occupation: req.body.occupation
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: savedUser._id,
      firstName: savedUser.firstName 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Login user
const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'Email or password is wrong' });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: 'Email or password is wrong' });

  res.status(200).json({ 
    message: 'Logged in successfully',
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
};

module.exports = { register, login };