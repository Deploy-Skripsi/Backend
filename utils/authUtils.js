// Di dalam middleware atau controller
const jwt = require('jsonwebtoken');

// Fungsi untuk membuat token
const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      role: user.role,
    },
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};

// Fungsi untuk memverifikasi token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded.user;
  } catch (err) {
    console.error('Token verification failed');
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
