const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const images = req.files.map((file) => file.filename);

    const newUser = new User({
      name,
      socialHandle,
      images,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user' });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
