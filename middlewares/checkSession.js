const sessionExpired = require('./sessionExpired'); // mengimpor sessionExpired sebagai fungsi tunggal

const checkSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Authorization denied. Please login first.' });
  }

  // Pemeriksaan tambahan untuk memastikan session masih valid
  if (sessionExpired(req.session)) {
    return res.status(401).json({ msg: 'Session expired. Please login again.' });
  }

  next();
};

module.exports = checkSession;



