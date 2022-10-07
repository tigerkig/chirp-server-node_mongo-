const router = require('express').Router();
const userController = require('../controllers/userController');
const  { protect } = require('../middlewares/protect');

router.get('/profile' , protect , userController.getProfile)
router.get('/all' , protect , userController.getAllUsers);

module.exports = router;