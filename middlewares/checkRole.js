const checkRole = (roles) => (req, res, next) => {
    try {
      // Memeriksa apakah pengguna ada di request (disetel oleh middleware otentikasi sebelumnya)
      if (!req.user) {
        return res.status(401).json({ msg: 'No user found, authorization denied' });
      }
  
      // Memeriksa apakah peran pengguna termasuk dalam peran yang diizinkan
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: `Access denied: You are not authorized to access this resource.` });
      }
  
      // Melanjutkan ke rute berikutnya
      next();
    } catch (err) {
      console.error('Role check failed:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  module.exports = checkRole;
  