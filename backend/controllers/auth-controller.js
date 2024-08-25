import emailValidator from 'email-validator';
import bcrypt from 'bcryptjs';

import User from '../models/user-model.js';
import generateToken from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!emailValidator.validate(email)) {
      return res.status(400).json({ error: 'Invalid email format!' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: 'User with this email is already exists!' });
    }

    const avatar = `https://robohash.org/${firstname}.png`;

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      avatar,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data!' });
    }
  } catch (e) {
    console.log('Error in signin', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials!' });
    }

    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (e) {
    console.log('Error in login', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully!' });
  } catch (e) {
    console.log('Error in logout', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
