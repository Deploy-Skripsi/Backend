const express = require('express');
const router = express.Router();
const { createSubmitTugas, getAllTugas, deleteSubmission } = require('../controllers/submitTugasController');
const Auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/ufloaders');
const checkSession = require('../middlewares/checkSession');

router.post('/submit',Auth,checkRole(['User']), upload.single('fileTugas'), createSubmitTugas);
router.get('/',checkSession,Auth,checkRole(['Admin']),getAllTugas);
router.delete('/:id',Auth,checkRole(['Admin']), deleteSubmission)

module.exports = router;
