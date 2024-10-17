const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config');

exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({ username, password: hashedPassword });
  await newAdmin.save();

  res.status(201).json({ message: 'Admin created' });
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, config.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
