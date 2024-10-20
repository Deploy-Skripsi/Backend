const express = require('express');
const router = express.Router();
const { createTugas,updateTugas,deleteTugas,getAllTugas } = require('../controllers/tugasController');
const Auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/ufloaders');
const checkSession = require('../middlewares/checkSession');

router.post('/create',Auth, checkRole(['Admin']), upload.single('file'), createTugas);
router.put('/edit/:_id',Auth, checkRole(['Admin']), upload.single('file'), updateTugas);
router.delete('/:_id',Auth, checkRole(['Admin']), upload.single('file'), deleteTugas);
router.get('/',checkSession, Auth, checkRole(['User', 'Admin']), getAllTugas);

module.exports = router;
