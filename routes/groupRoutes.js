const router = require('express').Router();
const groupController = require('../controllers/groupController');
const  { protect } = require('../middlewares/protect');
const   upload  = require('../middlewares/upload');



router.post('/create' , protect , upload.single('groupCoverImage') , groupController.createGroup);
router.get('/my' , protect , groupController.getMyGroups);
router.get('/all' , protect , groupController.getAllGroups);
router.get('/:id' , protect, groupController.getSingleGroup);


module.exports = router;