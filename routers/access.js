const express = require('express');
const router = express.Router();

// Middleware cek session di sisi frontend
router.get('/check-access', (req, res) => {
    // console.log('Session on access check:', req.session); // Log sesi untuk debugging
    if (req.session && req.session.userId) {
        const userRole = req.session.role; // Ambil role dari session
        return res.status(200).json({ role: userRole });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});


module.exports = router;