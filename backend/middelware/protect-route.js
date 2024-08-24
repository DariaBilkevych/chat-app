import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user-model.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ e: 'Unauthorized - no token provided!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ e: 'Unauthorized - invalid token!' });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ e: 'User not found!' });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log('Error in protectRoute midderware: ', e.message);
    res.status(500).json({ e: 'Internal server error' });
  }
};

export default protectRoute;
