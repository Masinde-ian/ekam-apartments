// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;