const express = require('express');
const router = express.Router();
const { createSertifikat,getAllSertifikat, deleteSertifikat } = require('../controllers/sertifikatController');
const Auth = require('../middlewares/authMiddleware');
const checkSession = require('../middlewares/checkSession');
const checkRole = require('../middlewares/checkRole');
const cekRole = require('../middlewares/cekRole');

router.get('/all',Auth, checkRole(['Admin']), getAllSertifikat);

router.post('/create', checkSession, Auth, checkRole(['User']), createSertifikat);
router.delete('/:id', Auth,checkRole(['Admin']),deleteSertifikat)
// router.post('/',Auth,checkRole(['User']), createSertifikat)

module.exports = router;
