const express = require('express');
const router = express.Router();
const { registerUser,loginUser,editUser, getAllUser, findUserById, logoutUser,deleteUserById } = require('../controllers/userController');
const Auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const checkSession = require('../middlewares/checkSession');
const cekRole = require('../middlewares/cekRole')

router.get('/',checkSession, cekRole(['Admin']),Auth, checkRole(['Admin']), getAllUser );
router.get('/:_id',findUserById);
router.post('/register',Auth, checkRole(['Admin']), registerUser);
router.post('/login', loginUser);
router.put('/edit/:_id', Auth, checkRole(['User']), editUser);
router.post('/logout',logoutUser);
router.delete('/:_id', Auth,checkRole(['Admin']),deleteUserById)

module.exports = router;
