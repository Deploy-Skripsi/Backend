const express = require('express');
const router = express.Router();
const { registerPeserta, getAllPeserta } = require('../controllers/pesertaController');
const Auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/ufloaders');
const checkSession = require('../middlewares/checkSession');

router.post('/register', upload.single('suratPengantarMagang'), registerPeserta);
router.get('/',checkSession,Auth, checkRole(['Admin']), getAllPeserta)

module.exports = router;
